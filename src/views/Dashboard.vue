<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { supabase } from '../api/supabase/SupabaseApi'; 

import { 
  ArrowUpIcon, 
  ArrowDownIcon, 
  UsersIcon, 
  BellAlertIcon, 
  ServerIcon, 
  CurrencyDollarIcon 
} from '@heroicons/vue/24/outline';
import { Bar } from 'vue-chartjs';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';

interface Instrument {
  id: number;
  name: string;
  // 添加其他需要的字段
}

const instruments = ref<Instrument[]>([]);
async function getInstruments() {
  const { data } = await supabase.from('msp_db').select()
  instruments.value = data || []
  isLoading.value = false; 
}


// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Mock data for stats
const stats = ref([
  {
    title: 'Total Users',
    value: '5,678',
    change: '+12%',
    increase: true,
    icon: UsersIcon,
    color: 'primary'
  },
  {
    title: 'Active Sessions',
    value: '1,243',
    change: '+18%',
    increase: true,
    icon: ServerIcon,
    color: 'secondary'
  },
  {
    title: 'Conversion Rate',
    value: '3.2%',
    change: '-2%',
    increase: false,
    icon: CurrencyDollarIcon,
    color: 'warning'
  },
  {
    title: 'Alerts',
    value: '12',
    change: '+3',
    increase: true,
    icon: BellAlertIcon,
    color: 'error'
  }
]);

// Chart data
const chartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
  datasets: [
    {
      label: 'User Registrations',
      backgroundColor: '#0A84FF',
      data: [65, 59, 80, 81, 56, 55, 72, 88, 96]
    },
    {
      label: 'Active Users',
      backgroundColor: '#5E5CE6',
      data: [28, 48, 40, 19, 86, 27, 90, 65, 80]
    }
  ]
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'User Activity'
    }
  }
};

// Recent activities
const recentActivities = ref([
  {
    id: 1,
    user: 'John Doe',
    action: 'logged in',
    time: '2 minutes ago'
  },
  {
    id: 2,
    user: 'Jane Smith',
    action: 'updated user profile',
    time: '1 hour ago'
  },
  {
    id: 3,
    user: 'Admin',
    action: 'deleted post #1234',
    time: '3 hours ago'
  },
  {
    id: 4,
    user: 'Robert Johnson',
    action: 'changed password',
    time: 'Yesterday at 4:30 PM'
  },
  {
    id: 5,
    user: 'Emily Davis',
    action: 'created new account',
    time: 'Yesterday at 2:15 PM'
  }
]);

const isLoading = ref(true);

onMounted(() => {
  getInstruments(); 
 
});

const getStatColorClass = (color: string) => {
  switch (color) {
    case 'primary': return 'bg-primary-500';
    case 'secondary': return 'bg-secondary-500';
    case 'warning': return 'bg-warning-500';
    case 'error': return 'bg-error-500';
    default: return 'bg-gray-500';
  }
};
</script>

<template>
  <div>
    <div class="mb-6">
      <h1 class="text-2xl font-semibold">Dashboard</h1>
      <p class="text-sm text-gray-600 dark:text-gray-400">
      Welcome to your admin dashboard
      {{ instruments }}
      </p>
    </div>

    <div v-if="isLoading" class="flex items-center justify-center h-64">
      <div class="animate-pulse-slow flex space-x-4">
        <div class="w-12 h-12 rounded-full bg-primary-500 opacity-75"></div>
        <div class="w-12 h-12 rounded-full bg-primary-500 opacity-50"></div>
        <div class="w-12 h-12 rounded-full bg-primary-500 opacity-25"></div>
      </div>
    </div>

    <div v-else>
      <!-- Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div
          v-for="(stat, index) in stats"
          :key="index"
          class="card p-5 flex flex-col"
        >
          <div class="flex items-start justify-between">
            <div class="text-sm font-medium text-gray-600 dark:text-gray-400">{{ stat.title }}</div>
            <div 
              :class="[
                getStatColorClass(stat.color), 
                'p-2 rounded-md'
              ]"
            >
              <component :is="stat.icon" class="h-5 w-5 text-white" />
            </div>
          </div>
          
          <div class="mt-2">
            <div class="text-2xl font-semibold">{{ stat.value }}</div>
            <div class="flex items-center mt-1">
              <div 
                :class="[
                  'flex items-center text-xs', 
                  stat.increase ? 'text-success-600 dark:text-success-400' : 'text-error-600 dark:text-error-400'
                ]"
              >
                <component 
                  :is="stat.increase ? ArrowUpIcon : ArrowDownIcon" 
                  class="h-3 w-3 mr-1" 
                />
                {{ stat.change }}
              </div>
              <div class="text-xs text-gray-500 dark:text-gray-400 ml-2">since last month</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Charts Row -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div class="lg:col-span-2 card">
          <div class="p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 class="font-semibold">User Activity</h2>
          </div>
          <div class="p-4 h-80">
            <Bar :data="chartData" :options="chartOptions" />
          </div>
        </div>

        <div class="card">
          <div class="p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 class="font-semibold">Recent Activity</h2>
          </div>
          <div class="divide-y divide-gray-200 dark:divide-gray-700">
            <div 
              v-for="activity in recentActivities" 
              :key="activity.id"
              class="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150"
            >
              <div class="flex items-start justify-between">
                <div>
                  <div class="font-medium">{{ activity.user }}</div>
                  <div class="text-sm text-gray-600 dark:text-gray-400">{{ activity.action }}</div>
                </div>
                <div class="text-xs text-gray-500 dark:text-gray-400">{{ activity.time }}</div>
              </div>
            </div>
          </div>
          <div class="p-4 border-t border-gray-200 dark:border-gray-700">
            <button class="text-sm text-primary-600 dark:text-primary-400 hover:underline">
              View all activity
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>