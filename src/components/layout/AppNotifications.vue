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
  <div class="w-64 sm:w-80 px-2 mt-2 bg-white dark:bg-gray-900 rounded-md shadow-lg z-50 max-w-[calc(100vw-2rem)] origin-top-right border border-gray-200 dark:border-gray-700">
    <div class="p-2 border-b border-gray-200 dark:border-gray-700">
      <div class="flex items-center justify-between">
        <h3 class="text-sm font-semibold text-gray-900 dark:text-white">通知</h3>
        <button
          @click="close"
          class="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <XMarkIcon class="w-4 h-4 text-gray-500 dark:text-gray-400" />
        </button>
      </div>
    </div>
    
    <div class="max-h-72 sm:max-h-96 overflow-y-auto">
      <div v-if="notifications.length === 0" class="py-4 text-center text-gray-500 dark:text-gray-400">
        没有通知
      </div>
      
      <div v-else class="py-1">
        <div
          v-for="notification in notifications"
          :key="notification.id"
          @click="markAsRead(notification.id)"
          class="px-3 py-2 border-t first:border-t-0 border-gray-200 dark:border-gray-800 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-150"
          :class="{ 'bg-gray-50 dark:bg-gray-800': !notification.read }"
        >
          <div class="flex">
            <div :class="[getTypeClass(notification.type), 'w-2 h-2 mt-1.5 mr-3 rounded-full flex-shrink-0']"></div>
            <div class="flex-1 overflow-hidden">
              <p class="text-sm font-medium text-gray-900 dark:text-white">{{ notification.title }}</p>
              <p class="text-xs text-gray-600 dark:text-gray-400 mt-0.5 line-clamp-2">{{ notification.message }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="p-2 border-t border-gray-200 dark:border-gray-700 text-right">
      <button class="text-xs text-primary-600 dark:text-primary-400 hover:underline">
        查看所有通知
      </button>
    </div>
  </div>
</template>