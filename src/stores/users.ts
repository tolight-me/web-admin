import { defineStore } from 'pinia';
import { ref } from 'vue';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'moderator' | 'user';
  status: 'active' | 'inactive' | 'pending';
  lastLogin: string;
  createdAt: string;
}

export const useUsersStore = defineStore('users', () => {
  const users = ref<User[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'admin',
      status: 'active',
      lastLogin: '2023-09-15T10:30:00Z',
      createdAt: '2023-01-10T08:15:00Z'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'moderator',
      status: 'active',
      lastLogin: '2023-09-14T14:45:00Z',
      createdAt: '2023-02-22T11:30:00Z'
    },
    {
      id: '3',
      name: 'Robert Johnson',
      email: 'robert@example.com',
      role: 'user',
      status: 'inactive',
      lastLogin: '2023-08-30T09:15:00Z',
      createdAt: '2023-03-15T16:20:00Z'
    },
    {
      id: '4',
      name: 'Emily Davis',
      email: 'emily@example.com',
      role: 'user',
      status: 'pending',
      lastLogin: '',
      createdAt: '2023-09-10T13:45:00Z'
    },
    {
      id: '5',
      name: 'Michael Brown',
      email: 'michael@example.com',
      role: 'moderator',
      status: 'active',
      lastLogin: '2023-09-13T11:20:00Z',
      createdAt: '2023-04-05T09:30:00Z'
    }
  ]);

  const isLoading = ref(false);
  const error = ref<string | null>(null);

  function getUserById(id: string): User | undefined {
    return users.value.find(user => user.id === id);
  }

  function addUser(user: Omit<User, 'id' | 'createdAt'>): void {
    const newUser: User = {
      ...user,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    
    users.value.push(newUser);
  }

  function updateUser(id: string, updates: Partial<User>): void {
    const index = users.value.findIndex(user => user.id === id);
    if (index !== -1) {
      users.value[index] = { ...users.value[index], ...updates };
    }
  }

  function deleteUser(id: string): void {
    users.value = users.value.filter(user => user.id !== id);
  }

  return {
    users,
    isLoading,
    error,
    getUserById,
    addUser,
    updateUser,
    deleteUser
  };
});