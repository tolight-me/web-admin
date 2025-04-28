<script setup lang="ts">
import { ref } from 'vue';
import { XMarkIcon } from '@heroicons/vue/24/outline';

const emit = defineEmits(['close']);

const notifications = ref([
  {
    id: 1,
    title: 'New user registered',
    message: 'John Doe just created an account.',
    time: '2 minutes ago',
    read: false,
    type: 'user'
  },
  {
    id: 2,
    title: 'Server alert',
    message: 'High CPU usage detected on main server.',
    time: '1 hour ago',
    read: false,
    type: 'alert'
  },
  {
    id: 3,
    title: 'Maintenance scheduled',
    message: 'System maintenance scheduled for tonight at 2AM UTC.',
    time: '3 hours ago',
    read: true,
    type: 'system'
  }
]);

const close = () => {
  emit('close');
};

const markAsRead = (id: number) => {
  const notification = notifications.value.find(n => n.id === id);
  if (notification) {
    notification.read = true;
  }
};

const getTypeClass = (type: string) => {
  switch (type) {
    case 'user':
      return 'bg-primary-500';
    case 'alert':
      return 'bg-error-500';
    case 'system':
      return 'bg-warning-500';
    default:
      return 'bg-gray-500';
  }
};
</script>

<template>
  <div class="absolute right-0 w-80 mt-2 bg-white rounded-md shadow-lg dark:bg-gray-800 z-50">
    <div class="p-2 border-b border-gray-200 dark:border-gray-700">
      <div class="flex items-center justify-between">
        <h3 class="text-sm font-semibold">Notifications</h3>
        <button
          @click="close"
          class="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <XMarkIcon class="w-4 h-4" />
        </button>
      </div>
    </div>
    
    <div class="max-h-96 overflow-y-auto">
      <div v-if="notifications.length === 0" class="py-4 text-center text-gray-500 dark:text-gray-400">
        No notifications
      </div>
      
      <div v-else>
        <div
          v-for="notification in notifications"
          :key="notification.id"
          @click="markAsRead(notification.id)"
          class="p-3 border-b border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150"
          :class="{ 'bg-gray-50 dark:bg-gray-700': !notification.read }"
        >
          <div class="flex items-start">
            <div :class="[getTypeClass(notification.type), 'w-2 h-2 mt-1.5 rounded-full']"></div>
            <div class="ml-3 flex-1">
              <div class="flex items-center justify-between">
                <p class="text-sm font-medium text-gray-900 dark:text-white">{{ notification.title }}</p>
                <span class="text-xs text-gray-500 dark:text-gray-400">{{ notification.time }}</span>
              </div>
              <p class="text-xs text-gray-600 dark:text-gray-300 mt-1">{{ notification.message }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="p-2 border-t border-gray-200 dark:border-gray-700">
      <button class="w-full text-center text-xs text-primary-600 dark:text-primary-400 hover:underline">
        View all notifications
      </button>
    </div>
  </div>
</template>