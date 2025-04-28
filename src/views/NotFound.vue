<template>
  <div class="flex flex-col items-center justify-center h-full p-6 text-center">
    <h1 class="text-6xl font-bold text-primary-500 mb-2">404</h1>
    <p class="text-2xl font-semibold mb-6">Page Not Found</p>
    <p class="text-gray-600 dark:text-gray-400 mb-8 max-w-md">
      The page you are looking for might have been removed, had its name changed,
      or is temporarily unavailable.
    </p>
    <router-link to="/" class="btn btn-primary">
      Return to Dashboard
    </router-link>
  </div>
</template>