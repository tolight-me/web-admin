<script setup lang="ts">
import { ref, computed } from 'vue';
import { useColorMode } from '@vueuse/core';
import { BellIcon, MoonIcon, SunIcon, Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline';
import AppNotifications from './AppNotifications.vue';

const emit = defineEmits(['toggle-sidebar']);

const notificationsOpen = ref(false);
const colorMode = useColorMode();
const isDark = computed(() => colorMode.value === 'dark');

const toggleColorMode = () => {
  colorMode.value = isDark.value ? 'light' : 'dark';
};

const toggleNotifications = () => {
  notificationsOpen.value = !notificationsOpen.value;
};

const toggleSidebar = () => {
  emit('toggle-sidebar');
};
</script>

<template>
  <header class="z-10 py-3 bg-white shadow-sm">
    <div class="flex items-center justify-between px-4 md:px-6">
      <div class="flex items-center">
        <button
          @click="toggleSidebar"
          class="p-1 mr-4 -ml-1 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          aria-label="Toggle sidebar"
        >
          <Bars3Icon class="w-6 h-6" />
        </button>
        <h1 class="text-lg font-medium hidden md:block">Admin Dashboard</h1>
      </div>

      <div class="flex items-center space-x-4">
        <div class="relative">
          <button
            @click="toggleNotifications"
            class="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
            aria-label="Notifications"
          >
            <BellIcon class="w-6 h-6" />
            <span class="absolute top-0 right-0 w-2 h-2 bg-error-500 rounded-full"></span>
          </button>
          <AppNotifications 
            v-if="notificationsOpen" 
            @close="notificationsOpen = false" 
          />
        </div>

        <button
          @click="toggleColorMode"
          class="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
          aria-label="Toggle color mode"
        >
          <SunIcon v-if="isDark" class="w-6 h-6" />
          <MoonIcon v-else class="w-6 h-6" />
        </button>

        <div class="relative">
          <button
            class="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-full"
            aria-label="User menu"
          >
            <div class="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white">
              <span class="text-sm font-medium">JD</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>