<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useLangStore } from '../../stores/langStore';

const { t } = useI18n();
const langStore = useLangStore();
const isOpen = ref(false);

const languages = [
  { code: 'zh', name: '中文', shortName: '中' },
  { code: 'en', name: 'English', shortName: 'En' }
];

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const changeLanguage = (langCode: string) => {
  langStore.setLanguage(langCode);
  isOpen.value = false;
};

// 当前语言的短名称
const currentShortName = computed(() => {
  return languages.find(lang => lang.code === langStore.language)?.shortName || '中';
});

// 关闭其他下拉菜单的处理函数
const closeDropdown = (e: MouseEvent) => {
  if (!e.target || !(e.target as HTMLElement).closest('.language-switch')) {
    isOpen.value = false;
  }
};

// 组件挂载时添加点击事件监听器，卸载时移除
onMounted(() => {
  document.addEventListener('click', closeDropdown);
});

onUnmounted(() => {
  document.removeEventListener('click', closeDropdown);
});
</script>

<template>
  <div class="relative language-switch">
    <button
      @click="toggleDropdown"
      class="flex items-center px-2 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-700 dark:text-gray-200 font-medium"
      :aria-label="t('common.language')"
    >
      {{ currentShortName }}
    </button>
    
    <div 
      v-if="isOpen" 
      class="absolute right-0 mt-2 w-32 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-50"
    >
      <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
        <button
          v-for="lang in languages"
          :key="lang.code"
          @click="changeLanguage(lang.code)"
          class="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
          role="menuitem"
          :class="{'bg-gray-100 dark:bg-gray-700': langStore.language === lang.code}"
        >
          {{ lang.name }}
        </button>
      </div>
    </div>
  </div>
</template> 