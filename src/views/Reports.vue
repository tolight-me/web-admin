<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { DocumentArrowDownIcon, AdjustmentsHorizontalIcon, ArrowPathIcon } from '@heroicons/vue/24/outline';

interface Report {
  id: string;
  name: string;
  description: string;
  type: string;
  frequency: string;
  lastRun: string;
  status: 'completed' | 'failed' | 'pending';
}

const reports = ref<Report[]>([
  {
    id: '1',
    name: 'Monthly User Activity',
    description: 'Summary of user logins, registrations, and activity levels',
    type: 'User Activity',
    frequency: 'Monthly',
    lastRun: '2023-09-01T08:30:00Z',
    status: 'completed'
  },
  {
    id: '2',
    name: 'Weekly Performance',
    description: 'Server performance, response times, and error rates',
    type: 'System',
    frequency: 'Weekly',
    lastRun: '2023-09-15T10:15:00Z',
    status: 'completed'
  },
  {
    id: '3',
    name: 'Daily Security Audit',
    description: 'Failed login attempts, permission changes, and security alerts',
    type: 'Security',
    frequency: 'Daily',
    lastRun: '2023-09-17T00:05:00Z',
    status: 'failed'
  },
  {
    id: '4',
    name: 'Quarterly Revenue',
    description: 'Revenue breakdown by product, category, and region',
    type: 'Financial',
    frequency: 'Quarterly',
    lastRun: '2023-07-01T12:00:00Z',
    status: 'completed'
  },
  {
    id: '5',
    name: 'Content Engagement',
    description: 'Content views, time spent, and interaction metrics',
    type: 'Analytics',
    frequency: 'Weekly',
    lastRun: '',
    status: 'pending'
  }
]);

const isLoading = ref(true);
const selectedReport = ref<Report | null>(null);
const showReportModal = ref(false);

// Format date
const formatDate = (dateString: string) => {
  if (!dateString) return 'Never';
  
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

// Status badge class
const getStatusClass = (status: string) => {
  switch (status) {
    case 'completed':
      return 'bg-success-100 text-success-800 dark:bg-success-900 dark:text-success-200';
    case 'failed':
      return 'bg-error-100 text-error-800 dark:bg-error-900 dark:text-error-200';
    case 'pending':
      return 'bg-warning-100 text-warning-800 dark:bg-warning-900 dark:text-warning-200';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
  }
};

// View report details
const viewReport = (report: Report) => {
  selectedReport.value = report;
  showReportModal.value = true;
};

// Close modal
const closeModal = () => {
  showReportModal.value = false;
  selectedReport.value = null;
};

// Generate report
const generateReport = (report: Report) => {
  report.status = 'pending';
  report.lastRun = '';
  
  // Simulate report generation
  setTimeout(() => {
    report.status = 'completed';
    report.lastRun = new Date().toISOString();
  }, 3000);
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
      <h1 class="text-2xl font-semibold">Reports</h1>
      <p class="text-sm text-gray-600 dark:text-gray-400">View and generate system reports</p>
    </div>

    <div v-if="isLoading" class="flex items-center justify-center h-64">
      <div class="animate-pulse-slow flex space-x-4">
        <div class="w-12 h-12 rounded-full bg-primary-500 opacity-75"></div>
        <div class="w-12 h-12 rounded-full bg-primary-500 opacity-50"></div>
        <div class="w-12 h-12 rounded-full bg-primary-500 opacity-25"></div>
      </div>
    </div>

    <div v-else>
      <!-- Reports filters -->
      <div class="card p-4 mb-6">
        <div class="flex flex-wrap gap-4">
          <div class="flex-1">
            <input
              type="text"
              class="form-control"
              placeholder="Search reports..."
            />
          </div>
          
          <div>
            <select class="form-control">
              <option value="all">All Types</option>
              <option value="user">User Activity</option>
              <option value="system">System</option>
              <option value="security">Security</option>
              <option value="financial">Financial</option>
              <option value="analytics">Analytics</option>
            </select>
          </div>
          
          <div>
            <select class="form-control">
              <option value="all">All Frequencies</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
          
          <div>
            <select class="form-control">
              <option value="all">All Statuses</option>
              <option value="completed">Completed</option>
              <option value="failed">Failed</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Reports list -->
      <div class="card overflow-hidden">
        <table class="w-full">
          <thead class="bg-gray-50 dark:bg-gray-700 text-left">
            <tr>
              <th class="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Report Name
              </th>
              <th class="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Type
              </th>
              <th class="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Frequency
              </th>
              <th class="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Last Run
              </th>
              <th class="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Status
              </th>
              <th class="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
            <tr 
              v-for="report in reports" 
              :key="report.id"
              class="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150"
            >
              <td class="px-6 py-4">
                <div class="font-medium cursor-pointer text-primary-600 dark:text-primary-400 hover:underline" @click="viewReport(report)">
                  {{ report.name }}
                </div>
                <div class="text-sm text-gray-500 dark:text-gray-400">{{ report.description }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">{{ report.type }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ report.frequency }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {{ formatDate(report.lastRun) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="[getStatusClass(report.status), 'badge']">
                  {{ report.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex space-x-2">
                  <button 
                    v-if="report.status !== 'pending'"
                    @click="generateReport(report)"
                    class="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 hover:text-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    title="Run report"
                  >
                    <ArrowPathIcon class="h-5 w-5" />
                  </button>
                  <button 
                    v-if="report.status === 'pending'"
                    disabled
                    class="p-1 rounded-md text-gray-300 dark:text-gray-600 cursor-not-allowed"
                    title="Report is running"
                  >
                    <ArrowPathIcon class="h-5 w-5 animate-spin" />
                  </button>
                  <button 
                    @click="viewReport(report)"
                    class="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 hover:text-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    title="View details"
                  >
                    <AdjustmentsHorizontalIcon class="h-5 w-5" />
                  </button>
                  <button 
                    v-if="report.status === 'completed'"
                    class="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 hover:text-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    title="Download report"
                  >
                    <DocumentArrowDownIcon class="h-5 w-5" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Report details modal -->
    <div 
      v-if="showReportModal && selectedReport"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    >
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-xl mx-4">
        <div class="p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 class="text-lg font-semibold">{{ selectedReport.name }}</h3>
        </div>
        
        <div class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <div class="text-sm text-gray-500 dark:text-gray-400">Type</div>
              <div>{{ selectedReport.type }}</div>
            </div>
            <div>
              <div class="text-sm text-gray-500 dark:text-gray-400">Frequency</div>
              <div>{{ selectedReport.frequency }}</div>
            </div>
            <div>
              <div class="text-sm text-gray-500 dark:text-gray-400">Last Run</div>
              <div>{{ formatDate(selectedReport.lastRun) }}</div>
            </div>
            <div>
              <div class="text-sm text-gray-500 dark:text-gray-400">Status</div>
              <span :class="[getStatusClass(selectedReport.status), 'badge']">
                {{ selectedReport.status }}
              </span>
            </div>
          </div>
          
          <div class="mb-6">
            <div class="text-sm text-gray-500 dark:text-gray-400 mb-1">Description</div>
            <div>{{ selectedReport.description }}</div>
          </div>
          
          <div v-if="selectedReport.status === 'completed'" class="mb-6">
            <div class="text-sm text-gray-500 dark:text-gray-400 mb-1">Available Formats</div>
            <div class="flex space-x-2 mt-2">
              <button class="btn btn-outline">
                <DocumentArrowDownIcon class="h-5 w-5 mr-1" />
                PDF
              </button>
              <button class="btn btn-outline">
                <DocumentArrowDownIcon class="h-5 w-5 mr-1" />
                CSV
              </button>
              <button class="btn btn-outline">
                <DocumentArrowDownIcon class="h-5 w-5 mr-1" />
                Excel
              </button>
            </div>
          </div>
          
          <div class="flex justify-end space-x-3 mt-6">
            <button
              @click="closeModal"
              class="btn btn-outline"
            >
              Close
            </button>
            <button
              v-if="selectedReport.status !== 'pending'"
              @click="generateReport(selectedReport)"
              class="btn btn-primary"
            >
              <ArrowPathIcon class="h-5 w-5 mr-1" />
              Run Report
            </button>
            <button
              v-else
              disabled
              class="btn btn-primary opacity-50 cursor-not-allowed"
            >
              <ArrowPathIcon class="h-5 w-5 mr-1 animate-spin" />
              Running...
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>