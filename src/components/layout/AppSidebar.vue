<script setup lang="ts">
import { useRoute } from 'vue-router';
import { 
  HomeIcon, 
  UsersIcon, 
  Cog6ToothIcon, 
  ChartBarIcon, 
  BellAlertIcon,
  DocumentTextIcon,
  ArrowLeftOnRectangleIcon
} from '@heroicons/vue/24/outline';

defineProps<{
  isOpen: boolean
}>();

const emit = defineEmits(['toggle']);

const route = useRoute();

const navigation = [
  { name: 'Dashboard', icon: HomeIcon, path: '/' },
  { name: 'Users', icon: UsersIcon, path: '/users' },
  { name: 'Analytics', icon: ChartBarIcon, path: '/analytics' },
  { name: 'Notifications', icon: BellAlertIcon, path: '/notifications' },
  { name: 'Reports', icon: DocumentTextIcon, path: '/reports' },
  { name: 'Settings', icon: Cog6ToothIcon, path: '/settings' },
];

const isActive = (path: string) => {
  return route.path === path;
};
</script>

<template>
  <aside
    :class="[
      'z-20 h-full overflow-y-auto bg-white dark:bg-gray-900 transition-all duration-300',
      'fixed md:static md:block',
      isOpen ? 'left-0 w-60' : '-left-20 md:left-0 md:w-14',
    ]"
  >
    <div class="py-4">
      <div class="px-0 py-2 mx-2">
        <div :class="['flex items-center py-2', isOpen ? 'px-4' : 'justify-center']">
          <div class="w-8 h-8 bg-primary-500 rounded-md flex items-center justify-center flex-shrink-0">
            <span class="text-white font-bold">A</span>
          </div>
          <span v-if="isOpen" class="ml-3 text-lg font-semibold dark:text-white transition-opacity duration-300">Admin</span>
        </div>
      </div>
      <div class="mt-6">
        <nav>
          <ul>
            <li v-for="item in navigation" :key="item.name" 
              :class="['mb-2 px-0 py-1 mx-2']">
              <router-link
                :to="item.path"
                :class="[
                  'flex items-center py-2 rounded-md transition-colors duration-150',
                  isActive(item.path) 
                    ? 'bg-primary-500 text-white' 
                    : 'hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white',
                  !isOpen ? 'justify-center px-2' : 'px-4'
                ]"
              >
                <component :is="item.icon" class="w-6 h-6" />
                <span v-if="isOpen" class="ml-3 whitespace-nowrap transition-opacity duration-300">{{ item.name }}</span>
              </router-link>
            </li>
          </ul>
        </nav>
      </div>
      <div :class="['absolute bottom-0 border-t border-gray-200 dark:border-gray-100', isOpen ? 'w-60' : 'w-14']">
        <router-link
          to="/logout"
          :class="[
            'flex items-center py-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-800 transition-colors duration-150',
            !isOpen ? 'justify-center mx-2 my-4 px-2' : 'mx-2 my-4 px-4'
          ]"
        >
          <component :is="ArrowLeftOnRectangleIcon" class="w-6 h-6" />
          <span v-if="isOpen" class="ml-3 whitespace-nowrap transition-opacity duration-300">Logout</span>
        </router-link>
      </div>
    </div>
  </aside>
  
  <!-- Mobile sidebar backdrop -->
  <div
    v-if="isOpen"
    class="fixed inset-0 z-10 flex items-end bg-black bg-opacity-50 sm:items-center sm:justify-center md:hidden"
    @click="emit('toggle')"
  ></div>
</template>

<style scoped>
aside {
  will-change: width, left;
  transition: width 0.3s ease, left 0.3s ease;
}

.transition-opacity {
  will-change: opacity;
}

@media (max-width: 768px) {
  aside {
    transition: left 0.3s ease, width 0s;
  }
}
</style>