'use client';
import Header from '@/components/Header';
import DashboardMetrics from '@/components/DashboardMetrics';

export default function HomePage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-[#00A3FF] text-xl font-semibold mb-6">Dashboard</h2>
        <DashboardMetrics />
      </main>
    </div>
  );
}
