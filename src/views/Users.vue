<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useUsersStore, User } from '../stores/users';
import { PlusIcon, MagnifyingGlassIcon, XMarkIcon, PencilIcon, TrashIcon } from '@heroicons/vue/24/outline';

const usersStore = useUsersStore();
const users = computed(() => usersStore.users);

const search = ref('');
const showAddUserForm = ref(false);
const isLoading = ref(true);
const isDeleting = ref(false);
const userToDelete = ref<string | null>(null);
const sortBy = ref('name');
const sortDirection = ref('asc');

// New user form data
const newUser = ref({
  name: '',
  email: '',
  role: 'user',
  status: 'active'
});

// Filtered users based on search
const filteredUsers = computed(() => {
  const searchLower = search.value.toLowerCase();
  
  return users.value
    .filter(user => 
      user.name.toLowerCase().includes(searchLower) || 
      user.email.toLowerCase().includes(searchLower)
    )
    .sort((a, b) => {
      const aValue = a[sortBy.value as keyof User] as string;
      const bValue = b[sortBy.value as keyof User] as string;
      
      if (sortDirection.value === 'asc') {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    });
});

// Formatted date
const formatDate = (dateString: string) => {
  if (!dateString) return 'Never';
  
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

// Status badge class
const getStatusClass = (status: string) => {
  switch (status) {
    case 'active':
      return 'bg-success-100 text-success-800 dark:bg-success-900 dark:text-success-200';
    case 'inactive':
      return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    case 'pending':
      return 'bg-warning-100 text-warning-800 dark:bg-warning-900 dark:text-warning-200';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
  }
};

// Role badge class
const getRoleClass = (role: string) => {
  switch (role) {
    case 'admin':
      return 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200';
    case 'moderator':
      return 'bg-secondary-100 text-secondary-800 dark:bg-secondary-900 dark:text-secondary-200';
    case 'user':
      return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
  }
};

// Sort table
const toggleSort = (column: string) => {
  if (sortBy.value === column) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortBy.value = column;
    sortDirection.value = 'asc';
  }
};

// Add new user
const addUser = () => {
  if (newUser.value.name && newUser.value.email) {
    usersStore.addUser({
      name: newUser.value.name,
      email: newUser.value.email,
      role: newUser.value.role as 'admin' | 'moderator' | 'user',
      status: newUser.value.status as 'active' | 'inactive' | 'pending',
      lastLogin: ''
    });
    
    // Reset form
    newUser.value = {
      name: '',
      email: '',
      role: 'user',
      status: 'active'
    };
    
    showAddUserForm.value = false;
  }
};

// Delete user
const confirmDelete = (userId: string) => {
  userToDelete.value = userId;
  isDeleting.value = true;
};

const deleteUser = () => {
  if (userToDelete.value) {
    usersStore.deleteUser(userToDelete.value);
    userToDelete.value = null;
    isDeleting.value = false;
  }
};

// Cancel delete
const cancelDelete = () => {
  userToDelete.value = null;
  isDeleting.value = false;
};

onMounted(() => {
  // Simulate loading
  setTimeout(() => {
    isLoading.value = false;
  }, 800);
});
</script>

<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-2xl font-semibold">User Management</h1>
        <p class="text-sm text-gray-600 dark:text-gray-400">Manage your system users</p>
      </div>
      <button 
        @click="showAddUserForm = true"
        class="btn btn-primary"
      >
        <PlusIcon class="h-5 w-5 mr-1" />
        Add User
      </button>
    </div>

    <!-- Search and filters -->
    <div class="card p-4 mb-6">
      <div class="flex flex-col md:flex-row gap-4">
        <div class="md:flex-1 relative">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <MagnifyingGlassIcon class="h-5 w-5 text-gray-400" />
          </div>
          <input
            v-model="search"
            type="text"
            class="form-control pl-10"
            placeholder="Search users..."
          />
        </div>
        
        <div class="flex gap-4">
          <select class="form-control">
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="moderator">Moderator</option>
            <option value="user">User</option>
          </select>
          
          <select class="form-control">
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Loading state -->
    <div v-if="isLoading" class="flex items-center justify-center h-64">
      <div class="animate-pulse-slow flex space-x-4">
        <div class="w-12 h-12 rounded-full bg-primary-500 opacity-75"></div>
        <div class="w-12 h-12 rounded-full bg-primary-500 opacity-50"></div>
        <div class="w-12 h-12 rounded-full bg-primary-500 opacity-25"></div>
      </div>
    </div>

    <!-- Users table -->
    <div v-else class="card overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50 dark:bg-gray-700 text-left">
            <tr>
              <th 
                @click="toggleSort('name')"
                class="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                <div class="flex items-center">
                  Name
                  <span v-if="sortBy === 'name'" class="ml-1">
                    {{ sortDirection === 'asc' ? '↑' : '↓' }}
                  </span>
                </div>
              </th>
              <th 
                @click="toggleSort('email')"
                class="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                <div class="flex items-center">
                  Email
                  <span v-if="sortBy === 'email'" class="ml-1">
                    {{ sortDirection === 'asc' ? '↑' : '↓' }}
                  </span>
                </div>
              </th>
              <th 
                @click="toggleSort('role')"
                class="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                <div class="flex items-center">
                  Role
                  <span v-if="sortBy === 'role'" class="ml-1">
                    {{ sortDirection === 'asc' ? '↑' : '↓' }}
                  </span>
                </div>
              </th>
              <th 
                @click="toggleSort('status')"
                class="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                <div class="flex items-center">
                  Status
                  <span v-if="sortBy === 'status'" class="ml-1">
                    {{ sortDirection === 'asc' ? '↑' : '↓' }}
                  </span>
                </div>
              </th>
              <th 
                @click="toggleSort('lastLogin')"
                class="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                <div class="flex items-center">
                  Last Login
                  <span v-if="sortBy === 'lastLogin'" class="ml-1">
                    {{ sortDirection === 'asc' ? '↑' : '↓' }}
                  </span>
                </div>
              </th>
              <th class="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
            <tr 
              v-for="user in filteredUsers" 
              :key="user.id"
              class="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150"
            >
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="font-medium">{{ user.name }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">{{ user.email }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="[getRoleClass(user.role), 'badge']">
                  {{ user.role }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="[getStatusClass(user.status), 'badge']">
                  {{ user.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {{ formatDate(user.lastLogin) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex space-x-2">
                  <button class="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 hover:text-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500">
                    <PencilIcon class="h-5 w-5" />
                  </button>
                  <button 
                    @click="confirmDelete(user.id)"
                    class="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 hover:text-error-500 focus:outline-none focus:ring-2 focus:ring-error-500"
                  >
                    <TrashIcon class="h-5 w-5" />
                  </button>
                </div>
              </td>
            </tr>
            
            <tr v-if="filteredUsers.length === 0">
              <td colspan="6" class="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                No users found matching your search criteria.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Add User Modal -->
    <div 
      v-if="showAddUserForm"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    >
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md mx-4">
        <div class="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 class="text-lg font-semibold">Add New User</h3>
          <button 
            @click="showAddUserForm = false"
            class="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <XMarkIcon class="h-5 w-5" />
          </button>
        </div>
        
        <div class="p-4">
          <form @submit.prevent="addUser">
            <div class="mb-4">
              <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
              <input
                v-model="newUser.name"
                id="name"
                type="text"
                class="form-control"
                required
              />
            </div>
            
            <div class="mb-4">
              <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
              <input
                v-model="newUser.email"
                id="email"
                type="email"
                class="form-control"
                required
              />
            </div>
            
            <div class="mb-4">
              <label for="role" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Role</label>
              <select
                v-model="newUser.role"
                id="role"
                class="form-control"
              >
                <option value="admin">Admin</option>
                <option value="moderator">Moderator</option>
                <option value="user">User</option>
              </select>
            </div>
            
            <div class="mb-4">
              <label for="status" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
              <select
                v-model="newUser.status"
                id="status"
                class="form-control"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
              </select>
            </div>
            
            <div class="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                @click="showAddUserForm = false"
                class="btn btn-outline"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="btn btn-primary"
              >
                Add User
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div 
      v-if="isDeleting"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    >
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md mx-4">
        <div class="p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 class="text-lg font-semibold">Confirm Deletion</h3>
        </div>
        
        <div class="p-4">
          <p class="text-gray-700 dark:text-gray-300">
            Are you sure you want to delete this user? This action cannot be undone.
          </p>
          
          <div class="flex justify-end space-x-3 mt-6">
            <button
              @click="cancelDelete"
              class="btn btn-outline"
            >
              Cancel
            </button>
            <button
              @click="deleteUser"
              class="btn btn-error"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>