<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import AppSidebar from './AppSidebar.vue';
import AppHeader from './AppHeader.vue';

defineProps<{
  session: any;
}>();

const route = useRoute();
const isOpen = ref(true);
const isMobile = ref(false);

const toggleSidebar = () => {
  isOpen.value = !isOpen.value;
};

const checkMobile = () => {
  isMobile.value = window.innerWidth < 768;
  if (isMobile.value) {
    isOpen.value = false;
  } else {
    isOpen.value = true;
  }
};

watch(() => route.path, () => {
  if (isMobile.value) {
    isOpen.value = false;
  }
});

onMounted(() => {
  checkMobile();
  window.addEventListener('resize', checkMobile);
});
</script>

<template>
  <AppSidebar :is-open="isOpen" @toggle="toggleSidebar" />
  
  <div class="flex flex-col flex-1 overflow-x-hidden">
    <AppHeader @toggle-sidebar="toggleSidebar" class="dark:bg-gray-900 shadow-md"/>
    
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
</template> 