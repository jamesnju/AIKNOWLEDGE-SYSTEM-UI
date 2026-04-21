'use client';

import QueryChart from '@/src/components/dashboard/QueryChart';
import RecentQueries from '@/src/components/dashboard/RecentQueries';
import StatsCards from '@/src/components/dashboard/StatsCards';
import { useAuth } from '@/src/contexts/AuthContext';
import apiService from '@/src/lib/api';
import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [timeline, setTimeline] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
    const { user } = useAuth();


  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [statsData, timelineData] = await Promise.all([
          apiService.getDashboardStats(),
          apiService.getQueryTimeline(7),
        ]);
        setStats(statsData);
        setTimeline(timelineData);
      } catch (error) {
        console.error('Error loading dashboard:', error);
      } finally {
        setLoading(false);
      }
    };
    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500 dark:text-gray-400">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Track AI performance and team efficiency</p>
                <p>Welcome, {user?.staff_name}!</p>

      </div>

      <StatsCards stats={stats} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <QueryChart timeline={timeline} />
        <RecentQueries />
      </div>
    </div>
  );
}