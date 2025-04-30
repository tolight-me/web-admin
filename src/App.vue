<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useColorMode } from '@vueuse/core';
 
import Auth from './components/user/Auth.vue';
import { supabase } from './api/supabase/SupabaseApi';
import AppHome from './components/layout/AppHome.vue';

const session = ref();
const colorMode = useColorMode();

onMounted(() => {
  supabase.auth.getSession().then(({ data }: { data: any }) => {
    session.value = data.session
  });

  supabase.auth.onAuthStateChange((_: any, _session: any) => {
    session.value = _session
  });
});
</script>

<template>
  <div :class="[
    'flex h-screen antialiased bg-gray-100 dark:bg-gray-900 transition-colors duration-300',
    colorMode === 'dark' ? 'dark' : 'light'
  ]">
    <AppHome v-if="session && session.user" :session="session" />
    <Auth v-else />
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