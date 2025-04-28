<script setup lang="ts">
import { ref, computed } from 'vue';
import { useColorMode } from '@vueuse/core';
import { useI18n } from 'vue-i18n';
import { BellIcon, MoonIcon, SunIcon, Bars3Icon } from '@heroicons/vue/24/outline';
import AppNotifications from './AppNotifications.vue';

const emit = defineEmits(['toggle-sidebar']);
const { t } = useI18n();

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
  <header class="z-10 py-2 bg-white dark:bg-gray-900 shadow-sm">
    <div class="flex items-center justify-between px-4 md:px-6">
      <div class="flex items-center justify-start">
        <button
          @click="toggleSidebar"
          class="p-1 mr-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-700 dark:text-gray-200"
          aria-label="Toggle sidebar"
        >
          <Bars3Icon class="w-6 h-6" />
        </button>
        <h1 class="text-lg font-medium text-gray-900 dark:text-white">{{ t('common.adminDashboard') }}</h1>
      </div>

      <div class="flex items-center space-x-4">
        <div class="relative">
          <button
            @click="toggleNotifications"
            class="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
            :aria-label="t('common.notifications')"
          >
            <BellIcon class="w-6 h-6 text-gray-700 dark:text-gray-200" />
            <span class="absolute top-0 right-0 w-2 h-2 bg-error-500 rounded-full"></span>
          </button>
          <div class="absolute right-0 top-full">
            <AppNotifications 
              v-if="notificationsOpen" 
              @close="notificationsOpen = false" 
            />
          </div>
        </div>

        <button
          @click="toggleColorMode"
          class="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-700 dark:text-gray-200"
          :aria-label="t('common.toggleColorMode')"
        >
          <SunIcon v-if="isDark" class="w-6 h-6" />
          <MoonIcon v-else class="w-6 h-6" />
        </button>

        <div class="relative">
          <button
            class="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-full"
            :aria-label="t('common.userMenu')"
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