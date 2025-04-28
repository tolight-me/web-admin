import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'moderator' | 'user';
  avatar?: string;
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const isAuthenticated = computed(() => !!user.value);
  const isAdmin = computed(() => user.value?.role === 'admin');
  
  // Simulated login for demonstration
  function login(email: string, password: string): Promise<boolean> {
    return new Promise((resolve) => {
      // Simulate API call
      setTimeout(() => {
        if (email === 'admin@example.com' && password === 'password') {
          user.value = {
            id: '1',
            name: 'Admin User',
            email: 'admin@example.com',
            role: 'admin'
          };
          resolve(true);
        } else {
          resolve(false);
        }
      }, 500);
    });
  }
  
  function logout() {
    user.value = null;
  }
  
  return {
    user,
    isAuthenticated,
    isAdmin,
    login,
    logout
  };
});