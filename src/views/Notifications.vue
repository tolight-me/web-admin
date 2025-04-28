<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { 
  BellIcon, 
  ExclamationTriangleIcon, 
  InformationCircleIcon, 
  CheckCircleIcon,
  TrashIcon
} from '@heroicons/vue/24/outline';

interface Notification {
  id: number;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  read: boolean;
  time: string;
}

const notifications = ref<Notification[]>([
  {
    id: 1,
    title: 'New user registered',
    message: 'John Doe just created an account.',
    type: 'info',
    read: false,
    time: '2 minutes ago'
  },
  {
    id: 2,
    title: 'Server alert',
    message: 'High CPU usage detected on main server.',
    type: 'warning',
    read: false,
    time: '1 hour ago'
  },
  {
    id: 3,
    title: 'Payment failed',
    message: 'Monthly subscription payment for Premium Plan failed.',
    type: 'error',
    read: false,
    time: '3 hours ago'
  },
  {
    id: 4,
    title: 'Backup completed',
    message: 'Weekly backup completed successfully.',
    type: 'success',
    read: true,
    time: '5 hours ago'
  },
  {
    id: 5,
    title: 'System update',
    message: 'New version 2.5.0 has been released and will be applied tonight.',
    type: 'info',
    read: true,
    time: 'Yesterday'
  },
  {
    id: 6,
    title: 'New comments',
    message: 'You have 3 new comments on your recent post.',
    type: 'info',
    read: true,
    time: 'Yesterday'
  },
  {
    id: 7,
    title: 'Database maintenance',
    message: 'Database optimization scheduled for tomorrow at 2AM UTC.',
    type: 'warning',
    read: true,
    time: '2 days ago'
  },
  {
    id: 8,
    title: 'Account security',
    message: 'Unusual login attempt detected from a new location.',
    type: 'error',
    read: true,
    time: '3 days ago'
  }
]);

const selectedTab = ref('all');
const isLoading = ref(true);

const filteredNotifications = ref<Notification[]>([]);

// Function to filter notifications based on selected tab
const filterNotifications = () => {
  if (selectedTab.value === 'all') {
    filteredNotifications.value = [...notifications.value];
  } else if (selectedTab.value === 'unread') {
    filteredNotifications.value = notifications.value.filter(notification => !notification.read);
  } else {
    filteredNotifications.value = notifications.value.filter(notification => notification.type === selectedTab.value);
  }
};

// Mark a notification as read
const markAsRead = (id: number) => {
  const notification = notifications.value.find(n => n.id === id);
  if (notification) {
    notification.read = true;
    filterNotifications();
  }
};

// Mark all notifications as read
const markAllAsRead = () => {
  notifications.value.forEach(notification => {
    notification.read = true;
  });
  filterNotifications();
};

// Delete a notification
const deleteNotification = (id: number) => {
  notifications.value = notifications.value.filter(n => n.id !== id);
  filterNotifications();
};

// Get icon based on notification type
const getIcon = (type: string) => {
  switch (type) {
    case 'info':
      return InformationCircleIcon;
    case 'warning':
      return ExclamationTriangleIcon;
    case 'error':
      return ExclamationTriangleIcon;
    case 'success':
      return CheckCircleIcon;
    default:
      return BellIcon;
  }
};

// Get color based on notification type
const getTypeColorClass = (type: string) => {
  switch (type) {
    case 'info':
      return 'text-primary-500 bg-primary-100 dark:bg-primary-900 dark:text-primary-300';
    case 'warning':
      return 'text-warning-500 bg-warning-100 dark:bg-warning-900 dark:text-warning-300';
    case 'error':
      return 'text-error-500 bg-error-100 dark:bg-error-900 dark:text-error-300';
    case 'success':
      return 'text-success-500 bg-success-100 dark:bg-success-900 dark:text-success-300';
    default:
      return 'text-gray-500 bg-gray-100 dark:bg-gray-800 dark:text-gray-300';
  }
};

// Watch for tab changes
watch(selectedTab, () => {
  filterNotifications();
});

onMounted(() => {
  // Simulate loading
  setTimeout(() => {
    isLoading.value = false;
    filterNotifications();
  }, 800);
});
</script>

<template>
  <div>
    <div class="mb-6">
      <h1 class="text-2xl font-semibold">Notifications</h1>
      <p class="text-sm text-gray-600 dark:text-gray-400">Manage your system notifications</p>
    </div>

    <div v-if="isLoading" class="flex items-center justify-center h-64">
      <div class="animate-pulse-slow flex space-x-4">
        <div class="w-12 h-12 rounded-full bg-primary-500 opacity-75"></div>
        <div class="w-12 h-12 rounded-full bg-primary-500 opacity-50"></div>
        <div class="w-12 h-12 rounded-full bg-primary-500 opacity-25"></div>
      </div>
    </div>

    <div v-else class="card">
      <!-- Tabs and actions -->
      <div class="border-b border-gray-200 dark:border-gray-700">
        <div class="flex flex-wrap items-center justify-between px-4 py-3">
          <div class="flex space-x-2 overflow-x-auto pb-1">
            <button 
              @click="selectedTab = 'all'" 
              :class="[
                'px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150',
                selectedTab === 'all' 
                  ? 'bg-primary-500 text-white' 
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              ]"
            >
              All
            </button>
            <button 
              @click="selectedTab = 'unread'" 
              :class="[
                'px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150',
                selectedTab === 'unread' 
                  ? 'bg-primary-500 text-white' 
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              ]"
            >
              Unread
            </button>
            <button 
              @click="selectedTab = 'info'" 
              :class="[
                'px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150',
                selectedTab === 'info' 
                  ? 'bg-primary-500 text-white' 
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              ]"
            >
              Info
            </button>
            <button 
              @click="selectedTab = 'warning'" 
              :class="[
                'px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150',
                selectedTab === 'warning' 
                  ? 'bg-primary-500 text-white' 
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              ]"
            >
              Warnings
            </button>
            <button 
              @click="selectedTab = 'error'" 
              :class="[
                'px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150',
                selectedTab === 'error' 
                  ? 'bg-primary-500 text-white' 
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              ]"
            >
              Errors
            </button>
            <button 
              @click="selectedTab = 'success'" 
              :class="[
                'px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150',
                selectedTab === 'success' 
                  ? 'bg-primary-500 text-white' 
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              ]"
            >
              Success
            </button>
          </div>
          
          <button 
            @click="markAllAsRead"
            class="px-3 py-2 text-sm font-medium text-primary-500 hover:text-primary-600 transition-colors duration-150"
          >
            Mark all as read
          </button>
        </div>
      </div>
      
      <!-- Notifications list -->
      <div class="divide-y divide-gray-200 dark:divide-gray-700">
        <div v-if="filteredNotifications.length === 0" class="p-8 text-center text-gray-500 dark:text-gray-400">
          No notifications found
        </div>
        
        <div
          v-for="notification in filteredNotifications"
          :key="notification.id"
          :class="[
            'p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150',
            !notification.read ? 'bg-gray-50 dark:bg-gray-700' : ''
          ]"
        >
          <div class="flex items-start">
            <div :class="[getTypeColorClass(notification.type), 'p-2 rounded-md mr-4']">
              <component :is="getIcon(notification.type)" class="h-5 w-5" />
            </div>
            
            <div class="flex-1" @click="markAsRead(notification.id)">
              <div class="flex items-center justify-between">
                <div :class="[!notification.read ? 'font-semibold' : 'font-medium', 'text-gray-900 dark:text-white']">
                  {{ notification.title }}
                </div>
                <span class="text-xs text-gray-500 dark:text-gray-400">{{ notification.time }}</span>
              </div>
              <p class="text-sm text-gray-600 dark:text-gray-300 mt-1">{{ notification.message }}</p>
            </div>
            
            <button 
              @click="deleteNotification(notification.id)"
              class="ml-4 p-1 text-gray-400 hover:text-error-500 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-150"
            >
              <TrashIcon class="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>