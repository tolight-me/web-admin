<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Line, Doughnut } from 'vue-chartjs';
import { 
  Chart as ChartJS, 
  CategoryScale,
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend, 
  ArcElement 
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const isLoading = ref(true);

// Traffic data
const trafficData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      label: 'Page Views',
      borderColor: '#0A84FF',
      backgroundColor: 'rgba(10, 132, 255, 0.1)',
      data: [3500, 4200, 5100, 4800, 6200, 7800, 8200, 9100, 10500, 9800, 11200, 12800],
      fill: true,
      tension: 0.4
    },
    {
      label: 'Unique Visitors',
      borderColor: '#5E5CE6',
      backgroundColor: 'rgba(94, 92, 230, 0.1)',
      data: [1800, 2100, 2400, 2300, 3100, 3600, 3800, 4200, 4800, 4500, 5200, 5800],
      fill: true,
      tension: 0.4
    }
  ]
};

const trafficOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const
    },
    title: {
      display: true,
      text: 'Website Traffic'
    }
  },
  scales: {
    y: {
      beginAtZero: true
    }
  }
};

// Traffic sources
const sourcesData = {
  labels: ['Direct', 'Search', 'Social', 'Referral', 'Email'],
  datasets: [
    {
      data: [35, 25, 20, 15, 5],
      backgroundColor: ['#0A84FF', '#5E5CE6', '#FF9F0A', '#30D158', '#FF453A'],
      hoverBackgroundColor: ['#0869CC', '#4B49B8', '#CC7F08', '#26A746', '#CC372E']
    }
  ]
};

const sourcesOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'right' as const
    },
    title: {
      display: true,
      text: 'Traffic Sources'
    }
  }
};

// Browser usage
const devicesData = {
  labels: ['Desktop', 'Mobile', 'Tablet'],
  datasets: [
    {
      data: [55, 35, 10],
      backgroundColor: ['#0A84FF', '#FF9F0A', '#5E5CE6'],
      hoverBackgroundColor: ['#0869CC', '#CC7F08', '#4B49B8']
    }
  ]
};

const devicesOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'right' as const
    },
    title: {
      display: true,
      text: 'Device Usage'
    }
  }
};

onMounted(() => {
  // Simulate loading
  setTimeout(() => {
    isLoading.value = false;
  }, 800);
});
</script>

<template>
  <div>
    <div class="mb-6">
      <h1 class="text-2xl font-semibold">Analytics</h1>
      <p class="text-sm text-gray-600 dark:text-gray-400">View detailed analytics data</p>
    </div>

    <div v-if="isLoading" class="flex items-center justify-center h-64">
      <div class="animate-pulse-slow flex space-x-4">
        <div class="w-12 h-12 rounded-full bg-primary-500 opacity-75"></div>
        <div class="w-12 h-12 rounded-full bg-primary-500 opacity-50"></div>
        <div class="w-12 h-12 rounded-full bg-primary-500 opacity-25"></div>
      </div>
    </div>

    <div v-else>
      <!-- Date range selector -->
      <div class="card p-4 mb-6">
        <div class="flex flex-wrap items-center gap-4">
          <div>
            <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Date Range</label>
            <select class="form-control mt-1">
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
              <option value="90days">Last 90 Days</option>
              <option value="year">Last Year</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>
          
          <div>
            <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Comparison</label>
            <select class="form-control mt-1">
              <option value="none">None</option>
              <option value="previous">Previous Period</option>
              <option value="year">Same Period Last Year</option>
            </select>
          </div>
          
          <button class="btn btn-primary mt-6">
            Apply
          </button>
        </div>
      </div>

      <!-- Traffic Overview -->
      <div class="card mb-6">
        <div class="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 class="font-semibold">Traffic Overview</h2>
        </div>
        <div class="p-4 h-80">
          <Line :data="trafficData" :options="trafficOptions" />
        </div>
      </div>

      <!-- Traffic Sources and Device Usage -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div class="card">
          <div class="p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 class="font-semibold">Traffic Sources</h2>
          </div>
          <div class="p-4 h-80">
            <Doughnut :data="sourcesData" :options="sourcesOptions" />
          </div>
        </div>
        
        <div class="card">
          <div class="p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 class="font-semibold">Device Usage</h2>
          </div>
          <div class="p-4 h-80">
            <Doughnut :data="devicesData" :options="devicesOptions" />
          </div>
        </div>
      </div>

      <!-- Top Pages -->
      <div class="card">
        <div class="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 class="font-semibold">Top Pages</h2>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50 dark:bg-gray-700 text-left">
              <tr>
                <th class="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Page
                </th>
                <th class="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Views
                </th>
                <th class="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Unique
                </th>
                <th class="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Avg. Time
                </th>
                <th class="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Bounce Rate
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
              <tr class="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="font-medium">/dashboard</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">8,742</td>
                <td class="px-6 py-4 whitespace-nowrap">4,218</td>
                <td class="px-6 py-4 whitespace-nowrap">3m 12s</td>
                <td class="px-6 py-4 whitespace-nowrap">24.3%</td>
              </tr>
              <tr class="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="font-medium">/users</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">6,529</td>
                <td class="px-6 py-4 whitespace-nowrap">3,812</td>
                <td class="px-6 py-4 whitespace-nowrap">2m 45s</td>
                <td class="px-6 py-4 whitespace-nowrap">18.7%</td>
              </tr>
              <tr class="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="font-medium">/settings</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">5,891</td>
                <td class="px-6 py-4 whitespace-nowrap">3,103</td>
                <td class="px-6 py-4 whitespace-nowrap">4m 31s</td>
                <td class="px-6 py-4 whitespace-nowrap">12.9%</td>
              </tr>
              <tr class="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="font-medium">/analytics</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">4,218</td>
                <td class="px-6 py-4 whitespace-nowrap">2,491</td>
                <td class="px-6 py-4 whitespace-nowrap">5m 12s</td>
                <td class="px-6 py-4 whitespace-nowrap">9.8%</td>
              </tr>
              <tr class="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="font-medium">/reports</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">3,756</td>
                <td class="px-6 py-4 whitespace-nowrap">1,982</td>
                <td class="px-6 py-4 whitespace-nowrap">3m 45s</td>
                <td class="px-6 py-4 whitespace-nowrap">14.2%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>