import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

export const useLangStore = defineStore('lang', () => {
  // 获取i18n实例
  const { locale } = useI18n();
  
  // 获取浏览器语言设置
  const getBrowserLanguage = (): string => {
    // 支持的语言列表
    const supportedLanguages = ['zh', 'en'];
    
    // 获取浏览器语言
    const browserLang = navigator.language.toLowerCase();
    
    // 检查是否直接匹配支持的语言
    if (supportedLanguages.includes(browserLang)) {
      return browserLang;
    }
    
    // 检查语言前缀是否匹配（例如 zh-CN、zh-TW 等）
    const langPrefix = browserLang.split('-')[0];
    if (supportedLanguages.includes(langPrefix)) {
      return langPrefix;
    }
    
    // 默认返回中文
    return 'zh';
  };
  
  // 默认语言
  const language = ref(locale.value);
  
  // 更新语言的方法
  const setLanguage = (lang: string) => {
    language.value = lang;
    locale.value = lang;
    // 保存到localStorage
    localStorage.setItem('lang', lang);
  };
  
  // 监听locale变化，保持store中的language同步
  watch(locale, (newLocale) => {
    language.value = newLocale;
  });

  // 初始化语言设置
  const initLanguage = () => {
    // 首先尝试从localStorage读取
    const savedLang = localStorage.getItem('lang');
    if (savedLang) {
      setLanguage(savedLang);
    } else {
      // 如果没有保存的语言，则使用浏览器语言
      const browserLang = getBrowserLanguage();
      setLanguage(browserLang);
    }
  };
  
  // 调用初始化
  initLanguage();
  
  return {
    language,
    setLanguage
  };
}); 