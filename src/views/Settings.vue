<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useColorMode } from '@vueuse/core';
import { useI18n } from 'vue-i18n';
import { InformationCircleIcon } from '@heroicons/vue/24/outline';
import { useLangStore } from '../stores/langStore';

const colorMode = useColorMode();
const { t } = useI18n();
const langStore = useLangStore();
const isLoading = ref(true);
const activeTab = ref('general');

const generalSettings = ref({
  siteName: 'Admin Console',
  siteDescription: 'Powerful administration dashboard',
  logoUrl: '',
  faviconUrl: '',
  allowRegistration: true,
  requireEmailVerification: true,
  showNotifications: true,
  defaultLanguage: langStore.language,
  timezone: 'UTC'
});

// 监听语言store的变化，更新设置中的默认语言
watch(() => langStore.language, (newLang) => {
  generalSettings.value.defaultLanguage = newLang;
});

const appearanceSettings = ref({
  theme: colorMode.value,
  primaryColor: '#0A84FF',
  secondaryColor: '#5E5CE6',
  accentColor: '#FF9F0A',
  sidebarCollapsed: false,
  showBreadcrumbs: true,
  animationsEnabled: true,
  tableRowsPerPage: 10
});

const notificationSettings = ref({
  emailNotifications: true,
  pushNotifications: false,
  dailyDigest: false,
  securityAlerts: true,
  marketingEmails: false,
  soundEnabled: true
});

const isSaving = ref(false);

const saveSettings = () => {
  isSaving.value = true;
  
  // Update color mode
  colorMode.value = appearanceSettings.value.theme;
  
  // Update language using langStore
  langStore.setLanguage(generalSettings.value.defaultLanguage);
  
  // Simulate API call
  setTimeout(() => {
    isSaving.value = false;
    // Show success notification here
  }, 1000);
};

onMounted(() => {
  isLoading.value = false;
});
</script>

<template>
  <div>
    <div class="mb-6">
      <h1 class="text-2xl font-semibold">{{ t('settings.title') }}</h1>
      <p class="text-sm text-gray-600 dark:text-gray-400">{{ t('settings.subtitle') }}</p>
    </div>

    <div v-if="isLoading" class="flex items-center justify-center h-64">
      <div class="animate-pulse-slow flex space-x-4">
        <div class="w-12 h-12 rounded-full bg-primary-500 opacity-75"></div>
        <div class="w-12 h-12 rounded-full bg-primary-500 opacity-50"></div>
        <div class="w-12 h-12 rounded-full bg-primary-500 opacity-25"></div>
      </div>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <!-- Settings sidebar -->
      <div class="card p-0 overflow-hidden">
        <nav>
          <ul>
            <li>
              <button 
                @click="activeTab = 'general'"
                :class="[
                  'w-full text-left py-3 px-4 border-l-4 flex items-center transition-colors duration-150',
                  activeTab === 'general' 
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900 dark:bg-opacity-20 text-primary-700 dark:text-primary-300' 
                    : 'border-transparent hover:bg-gray-50 dark:hover:bg-gray-700'
                ]"
              >
                <span>{{ t('settings.general') }}</span>
              </button>
            </li>
            <li>
              <button 
                @click="activeTab = 'appearance'"
                :class="[
                  'w-full text-left py-3 px-4 border-l-4 flex items-center transition-colors duration-150',
                  activeTab === 'appearance' 
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900 dark:bg-opacity-20 text-primary-700 dark:text-primary-300' 
                    : 'border-transparent hover:bg-gray-50 dark:hover:bg-gray-700'
                ]"
              >
                <span>{{ t('settings.appearance') }}</span>
              </button>
            </li>
            <li>
              <button 
                @click="activeTab = 'notifications'"
                :class="[
                  'w-full text-left py-3 px-4 border-l-4 flex items-center transition-colors duration-150',
                  activeTab === 'notifications' 
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900 dark:bg-opacity-20 text-primary-700 dark:text-primary-300' 
                    : 'border-transparent hover:bg-gray-50 dark:hover:bg-gray-700'
                ]"
              >
                <span>{{ t('settings.notifications') }}</span>
              </button>
            </li>
            <li>
              <button 
                @click="activeTab = 'security'"
                :class="[
                  'w-full text-left py-3 px-4 border-l-4 flex items-center transition-colors duration-150',
                  activeTab === 'security' 
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900 dark:bg-opacity-20 text-primary-700 dark:text-primary-300' 
                    : 'border-transparent hover:bg-gray-50 dark:hover:bg-gray-700'
                ]"
              >
                <span>{{ t('settings.security') }}</span>
              </button>
            </li>
            <li>
              <button 
                @click="activeTab = 'api'"
                :class="[
                  'w-full text-left py-3 px-4 border-l-4 flex items-center transition-colors duration-150',
                  activeTab === 'api' 
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900 dark:bg-opacity-20 text-primary-700 dark:text-primary-300' 
                    : 'border-transparent hover:bg-gray-50 dark:hover:bg-gray-700'
                ]"
              >
                <span>{{ t('settings.api') }}</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>

      <!-- Settings content -->
      <div class="md:col-span-3">
        <div class="card p-6">
          <!-- General Settings -->
          <form v-if="activeTab === 'general'" @submit.prevent="saveSettings">
            <h2 class="text-xl font-semibold mb-4">{{ t('settings.generalSettings') }}</h2>
            
            <div class="mb-4">
              <label for="siteName" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {{ t('settings.siteName') }}
              </label>
              <input
                v-model="generalSettings.siteName"
                id="siteName"
                type="text"
                class="form-control"
              />
            </div>
            
            <div class="mb-4">
              <label for="siteDescription" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {{ t('settings.siteDescription') }}
              </label>
              <textarea
                v-model="generalSettings.siteDescription"
                id="siteDescription"
                rows="2"
                class="form-control"
              ></textarea>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label for="logoUrl" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {{ t('settings.logoUrl') }}
                </label>
                <input
                  v-model="generalSettings.logoUrl"
                  id="logoUrl"
                  type="text"
                  class="form-control"
                  placeholder="https://example.com/logo.png"
                />
              </div>
              
              <div>
                <label for="faviconUrl" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {{ t('settings.faviconUrl') }}
                </label>
                <input
                  v-model="generalSettings.faviconUrl"
                  id="faviconUrl"
                  type="text"
                  class="form-control"
                  placeholder="https://example.com/favicon.ico"
                />
              </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label for="defaultLanguage" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {{ t('settings.defaultLanguage') }}
                </label>
                <select
                  v-model="generalSettings.defaultLanguage"
                  id="defaultLanguage"
                  class="form-control"
                >
                  <option value="zh">中文</option>
                  <option value="en">English</option>
                </select>
              </div>
              
              <div>
                <label for="timezone" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {{ t('settings.timezone') }}
                </label>
                <select
                  v-model="generalSettings.timezone"
                  id="timezone"
                  class="form-control"
                >
                  <option value="UTC">UTC</option>
                  <option value="America/New_York">Eastern Time (ET)</option>
                  <option value="America/Chicago">Central Time (CT)</option>
                  <option value="America/Denver">Mountain Time (MT)</option>
                  <option value="America/Los_Angeles">Pacific Time (PT)</option>
                  <option value="Europe/London">London</option>
                  <option value="Europe/Paris">Paris</option>
                  <option value="Asia/Tokyo">Tokyo</option>
                </select>
              </div>
            </div>
            
            <div class="mb-6 space-y-3">
              <div class="flex items-center">
                <input
                  v-model="generalSettings.allowRegistration"
                  id="allowRegistration"
                  type="checkbox"
                  class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label for="allowRegistration" class="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  {{ t('settings.allowRegistration') }}
                </label>
              </div>
              
              <div class="flex items-center">
                <input
                  v-model="generalSettings.requireEmailVerification"
                  id="requireEmailVerification"
                  type="checkbox"
                  class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label for="requireEmailVerification" class="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  {{ t('settings.requireEmailVerification') }}
                </label>
              </div>
              
              <div class="flex items-center">
                <input
                  v-model="generalSettings.showNotifications"
                  id="showNotifications"
                  type="checkbox"
                  class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label for="showNotifications" class="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  {{ t('settings.showSystemNotifications') }}
                </label>
              </div>
            </div>
            
            <div class="flex justify-end">
              <button
                type="submit"
                class="btn btn-primary"
                :disabled="isSaving"
              >
                <span v-if="isSaving">{{ t('settings.saving') }}</span>
                <span v-else>{{ t('settings.save') }}</span>
              </button>
            </div>
          </form>

          <!-- Appearance Settings -->
          <form v-if="activeTab === 'appearance'" @submit.prevent="saveSettings">
            <h2 class="text-xl font-semibold mb-4">{{ t('settings.appearanceSettings') }}</h2>
            
            <div class="mb-4">
              <label for="theme" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {{ t('settings.theme') }}
              </label>
              <select
                v-model="appearanceSettings.theme"
                id="theme"
                class="form-control"
              >
                <option value="light">{{ t('settings.light') }}</option>
                <option value="dark">{{ t('settings.dark') }}</option>
              </select>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label for="primaryColor" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {{ t('settings.primaryColor') }}
                </label>
                <div class="flex items-center">
                  <input
                    v-model="appearanceSettings.primaryColor"
                    id="primaryColor"
                    type="color"
                    class="h-8 w-8 border border-gray-300 rounded mr-2"
                  />
                  <input
                    v-model="appearanceSettings.primaryColor"
                    type="text"
                    class="form-control"
                  />
                </div>
              </div>
              
              <div>
                <label for="secondaryColor" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {{ t('settings.secondaryColor') }}
                </label>
                <div class="flex items-center">
                  <input
                    v-model="appearanceSettings.secondaryColor"
                    id="secondaryColor"
                    type="color"
                    class="h-8 w-8 border border-gray-300 rounded mr-2"
                  />
                  <input
                    v-model="appearanceSettings.secondaryColor"
                    type="text"
                    class="form-control"
                  />
                </div>
              </div>
              
              <div>
                <label for="accentColor" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {{ t('settings.accentColor') }}
                </label>
                <div class="flex items-center">
                  <input
                    v-model="appearanceSettings.accentColor"
                    id="accentColor"
                    type="color"
                    class="h-8 w-8 border border-gray-300 rounded mr-2"
                  />
                  <input
                    v-model="appearanceSettings.accentColor"
                    type="text"
                    class="form-control"
                  />
                </div>
              </div>
            </div>
            
            <div class="mb-4">
              <label for="tableRowsPerPage" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {{ t('settings.tableRowsPerPage') }}
              </label>
              <select
                v-model="appearanceSettings.tableRowsPerPage"
                id="tableRowsPerPage"
                class="form-control"
              >
                <option :value="5">5</option>
                <option :value="10">10</option>
                <option :value="15">15</option>
                <option :value="20">20</option>
                <option :value="25">25</option>
                <option :value="50">50</option>
                <option :value="100">100</option>
              </select>
            </div>
            
            <div class="mb-6 space-y-3">
              <div class="flex items-center">
                <input
                  v-model="appearanceSettings.sidebarCollapsed"
                  id="sidebarCollapsed"
                  type="checkbox"
                  class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label for="sidebarCollapsed" class="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  {{ t('settings.collapseSidebar') }}
                </label>
              </div>
              
              <div class="flex items-center">
                <input
                  v-model="appearanceSettings.showBreadcrumbs"
                  id="showBreadcrumbs"
                  type="checkbox"
                  class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label for="showBreadcrumbs" class="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  {{ t('settings.showBreadcrumbs') }}
                </label>
              </div>
              
              <div class="flex items-center">
                <input
                  v-model="appearanceSettings.animationsEnabled"
                  id="animationsEnabled"
                  type="checkbox"
                  class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label for="animationsEnabled" class="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  {{ t('settings.enableAnimations') }}
                </label>
              </div>
            </div>
            
            <div class="flex justify-end">
              <button
                type="submit"
                class="btn btn-primary"
                :disabled="isSaving"
              >
                <span v-if="isSaving">{{ t('settings.saving') }}</span>
                <span v-else>{{ t('settings.save') }}</span>
              </button>
            </div>
          </form>

          <!-- Notifications Settings -->
          <form v-if="activeTab === 'notifications'" @submit.prevent="saveSettings">
            <h2 class="text-xl font-semibold mb-4">{{ t('settings.notificationSettings') }}</h2>
            
            <div class="mb-6 space-y-3">
              <div class="flex items-center">
                <input
                  v-model="notificationSettings.emailNotifications"
                  id="emailNotifications"
                  type="checkbox"
                  class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label for="emailNotifications" class="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  {{ t('settings.emailNotifications') }}
                </label>
              </div>
              
              <div class="flex items-center">
                <input
                  v-model="notificationSettings.pushNotifications"
                  id="pushNotifications"
                  type="checkbox"
                  class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label for="pushNotifications" class="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  {{ t('settings.pushNotifications') }}
                </label>
              </div>
              
              <div class="flex items-center">
                <input
                  v-model="notificationSettings.dailyDigest"
                  id="dailyDigest"
                  type="checkbox"
                  class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label for="dailyDigest" class="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  {{ t('settings.dailyDigest') }}
                </label>
              </div>
              
              <div class="flex items-center">
                <input
                  v-model="notificationSettings.securityAlerts"
                  id="securityAlerts"
                  type="checkbox"
                  class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label for="securityAlerts" class="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  {{ t('settings.securityAlerts') }}
                </label>
              </div>
              
              <div class="flex items-center">
                <input
                  v-model="notificationSettings.marketingEmails"
                  id="marketingEmails"
                  type="checkbox"
                  class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label for="marketingEmails" class="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  {{ t('settings.marketingEmails') }}
                </label>
              </div>
              
              <div class="flex items-center">
                <input
                  v-model="notificationSettings.soundEnabled"
                  id="soundEnabled"
                  type="checkbox"
                  class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label for="soundEnabled" class="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  {{ t('settings.soundEnabled') }}
                </label>
              </div>
            </div>
            
            <div class="bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 p-4 rounded-md mb-6">
              <div class="flex">
                <div class="flex-shrink-0">
                  <InformationCircleIcon class="h-5 w-5 text-blue-400" />
                </div>
                <div class="ml-3">
                  <p class="text-sm text-blue-700 dark:text-blue-300">
                    {{ t('settings.emailNotificationInfo') }}
                  </p>
                </div>
              </div>
            </div>
            
            <div class="flex justify-end">
              <button
                type="submit"
                class="btn btn-primary"
                :disabled="isSaving"
              >
                <span v-if="isSaving">{{ t('settings.saving') }}</span>
                <span v-else>{{ t('settings.save') }}</span>
              </button>
            </div>
          </form>

          <!-- Security Settings -->
          <div v-if="activeTab === 'security'">
            <h2 class="text-xl font-semibold mb-4">{{ t('settings.securitySettings') }}</h2>
            
            <div class="mb-6">
              <h3 class="text-lg font-medium mb-2">{{ t('settings.password') }}</h3>
              <div class="space-y-4">
                <div>
                  <label for="currentPassword" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {{ t('settings.currentPassword') }}
                  </label>
                  <input
                    id="currentPassword"
                    type="password"
                    class="form-control"
                  />
                </div>
                
                <div>
                  <label for="newPassword" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {{ t('settings.newPassword') }}
                  </label>
                  <input
                    id="newPassword"
                    type="password"
                    class="form-control"
                  />
                </div>
                
                <div>
                  <label for="confirmPassword" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {{ t('settings.confirmPassword') }}
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    class="form-control"
                  />
                </div>
                
                <div>
                  <button class="btn btn-primary">
                    {{ t('settings.updatePassword') }}
                  </button>
                </div>
              </div>
            </div>
            
            <div class="mb-6">
              <h3 class="text-lg font-medium mb-2">{{ t('settings.twoFactorAuth') }}</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {{ t('settings.twoFactorAuthDesc') }}
              </p>
              
              <button class="btn btn-primary">
                {{ t('settings.enableTwoFactorAuth') }}
              </button>
            </div>
            
            <div class="mb-6">
              <h3 class="text-lg font-medium mb-2">{{ t('settings.activeSessions') }}</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {{ t('settings.activeSessionsDesc') }}
              </p>
              
              <div class="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md overflow-hidden">
                <div class="p-4 border-b border-gray-200 dark:border-gray-600">
                  <div class="flex items-center justify-between">
                    <div>
                      <div class="font-medium">{{ t('settings.currentSession') }}</div>
                      <div class="text-sm text-gray-600 dark:text-gray-400">Chrome on macOS</div>
                    </div>
                    <div class="badge badge-success">{{ t('settings.active') }}</div>
                  </div>
                </div>
                
                <div class="p-4">
                  <div class="flex items-center justify-between">
                    <div>
                      <div class="font-medium">iPhone App</div>
                      <div class="text-sm text-gray-600 dark:text-gray-400">iOS 16 · {{ t('settings.lastActive') }} 2 hours ago</div>
                    </div>
                    <button class="text-sm text-error-600 dark:text-error-400 hover:underline">
                      {{ t('settings.logout') }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- API Settings -->
          <div v-if="activeTab === 'api'">
            <h2 class="text-xl font-semibold mb-4">{{ t('settings.apiSettings') }}</h2>
            
            <div class="mb-6">
              <h3 class="text-lg font-medium mb-2">{{ t('settings.apiKeys') }}</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {{ t('settings.apiKeysDesc') }}
              </p>
              
              <div class="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md overflow-hidden mb-4">
                <div class="p-4 border-b border-gray-200 dark:border-gray-600">
                  <div class="flex items-center justify-between">
                    <div>
                      <div class="font-medium">{{ t('settings.productionKey') }}</div>
                      <div class="text-sm text-gray-600 dark:text-gray-400">{{ t('settings.createdOn') }} Sep 12, 2023</div>
                    </div>
                    <div class="badge badge-primary">{{ t('settings.active') }}</div>
                  </div>
                </div>
                
                <div class="px-4 py-3 bg-gray-50 dark:bg-gray-800 flex items-center">
                  <div class="flex-1 font-mono text-sm overflow-hidden text-gray-600 dark:text-gray-400">
                    •••••••••••••••••••••••••••••••
                  </div>
                  <button class="text-sm text-primary-600 dark:text-primary-400 hover:underline">
                    {{ t('settings.reveal') }}
                  </button>
                  <button class="ml-4 text-sm text-error-600 dark:text-error-400 hover:underline">
                    {{ t('settings.revoke') }}
                  </button>
                </div>
              </div>
              
              <button class="btn btn-primary">
                {{ t('settings.generateNewApiKey') }}
              </button>
            </div>
            
            <div class="mb-6">
              <h3 class="text-lg font-medium mb-2">{{ t('settings.webhooks') }}</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {{ t('settings.webhooksDesc') }}
              </p>
              
              <div class="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md overflow-hidden mb-4">
                <div class="p-4 border-b border-gray-200 dark:border-gray-600">
                  <div class="flex items-center justify-between">
                    <div>
                      <div class="font-medium">{{ t('settings.userEvents') }}</div>
                      <div class="text-sm text-gray-600 dark:text-gray-400">https://example.com/webhooks/users</div>
                    </div>
                    <div class="badge badge-success">{{ t('settings.active') }}</div>
                  </div>
                </div>
                
                <div class="px-4 py-3 bg-gray-50 dark:bg-gray-800 flex items-center">
                  <div class="flex-1 text-sm text-gray-600 dark:text-gray-400">
                    {{ t('settings.events') }}: user.created, user.updated, user.deleted
                  </div>
                  <button class="text-sm text-primary-600 dark:text-primary-400 hover:underline">
                    {{ t('settings.edit') }}
                  </button>
                  <button class="ml-4 text-sm text-error-600 dark:text-error-400 hover:underline">
                    {{ t('settings.delete') }}
                  </button>
                </div>
              </div>
              
              <button class="btn btn-primary">
                {{ t('settings.addWebhook') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>