<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useColorMode } from '@vueuse/core';
import AppSidebar from './components/layout/AppSidebar.vue';
import AppHeader from './components/layout/AppHeader.vue';

const sidebarOpen = ref(true);
const isMobile = ref(false);
const route = useRoute();
const colorMode = useColorMode();

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
};

const checkMobile = () => {
  isMobile.value = window.innerWidth < 768;
  if (isMobile.value) {
    sidebarOpen.value = false;
  } else {
    sidebarOpen.value = true;
  }
};

watch(() => route.path, () => {
  if (isMobile.value) {
    sidebarOpen.value = false;
  }
});

onMounted(() => {
  checkMobile();
  window.addEventListener('resize', checkMobile);
});
</script>

<template>
  <div :class="[
    'flex h-screen antialiased bg-gray-100 dark:bg-gray-900 transition-colors duration-300',
    colorMode.value === 'dark' ? 'dark' : 'light'
  ]">
    <AppSidebar :is-open="sidebarOpen" @toggle="toggleSidebar" class="dark:bg-gray-900" />
    
    <div class="flex flex-col flex-1 overflow-x-hidden">
      <AppHeader @toggle-sidebar="toggleSidebar" class="dark:bg-gray-900"/>
      
      <main class="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-100 dark:bg-gray-800">
        <router-view v-slot="{ Component }">
          <transition
            name="fade"
            mode="out-in"
            appear
          >
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
    </div>
  </div>
</template>

<style>
@import './assets/styles/main.css';

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>