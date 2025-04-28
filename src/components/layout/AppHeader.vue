<script setup lang="ts">
import { ref, computed } from 'vue';
import { useColorMode } from '@vueuse/core';
import { useI18n } from 'vue-i18n';
import { BellIcon, MoonIcon, SunIcon, Bars3Icon, UserIcon } from '@heroicons/vue/24/outline';
import AppNotifications from './AppNotifications.vue';
import AppLanguageSwitch from './AppLanguageSwitch.vue';

const emit = defineEmits(['toggle-sidebar']);
const { t } = useI18n();

const notificationsOpen = ref(false);
const userMenuOpen = ref(false);
const colorMode = useColorMode();
const isDark = computed(() => colorMode.value === 'dark');

const toggleColorMode = () => {
  colorMode.value = isDark.value ? 'light' : 'dark';
};

const toggleNotifications = () => {
  notificationsOpen.value = !notificationsOpen.value;
  if (notificationsOpen.value) {
    userMenuOpen.value = false;
  }
};

const toggleUserMenu = () => {
  userMenuOpen.value = !userMenuOpen.value;
  if (userMenuOpen.value) {
    notificationsOpen.value = false;
  }
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
        <AppLanguageSwitch />
        
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
            @click="toggleUserMenu"
            class="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-full"
            :aria-label="t('common.userMenu')"
          >
            <div class="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white">
              <span class="text-sm font-medium">JD</span>
            </div>
          </button>
          
          <!-- 用户菜单下拉 -->
          <div 
            v-if="userMenuOpen" 
            class="absolute right-0 mt-2 w-48 py-2 bg-white dark:bg-gray-800 rounded-md shadow-lg z-50 border border-gray-200 dark:border-gray-700"
          >
            <div class="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
              <div class="font-medium text-gray-800 dark:text-gray-200">John Doe</div>
              <div class="text-sm text-gray-500 dark:text-gray-400">john.doe@example.com</div>
            </div>
            
            <button 
              @click="toggleNotifications"
              class="w-full text-left px-4 py-2 flex items-center hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <BellIcon class="w-5 h-5 mr-2 text-gray-600 dark:text-gray-400" />
              <span class="text-gray-700 dark:text-gray-300">{{ t('common.notifications') }}</span>
              <span class="ml-auto w-2 h-2 bg-error-500 rounded-full"></span>
            </button>
            
            <router-link to="/profile" class="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
              <div class="flex items-center">
                <UserIcon class="w-5 h-5 mr-2 text-gray-600 dark:text-gray-400" />
                <span>{{ t('common.profile') }}</span>
              </div>
            </router-link>
            
            <router-link to="/settings" class="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
              <div class="flex items-center">
                <svg class="w-5 h-5 mr-2 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                <span>{{ t('common.settings') }}</span>
              </div>
            </router-link>
            
            <div class="border-t border-gray-200 dark:border-gray-700 my-1"></div>
            
            <router-link to="/logout" class="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
              <div class="flex items-center">
                <svg class="w-5 h-5 mr-2 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                </svg>
                <span>{{ t('common.logout') }}</span>
              </div>
            </router-link>
          </div>
          
          <!-- 通知面板 -->
          <div class="absolute right-0 top-full" v-if="notificationsOpen">
            <AppNotifications @close="notificationsOpen = false" />
          </div>
        </div>
      </div>
    </div>
  </header>
</template>