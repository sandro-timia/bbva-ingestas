'use client';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase/config';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ClockIcon, TableCellsIcon, CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  color: string;
}

interface Ingesta {
  id: string;
  estado: string;
  fechaCreacion: Date;
  fechaFin?: Date;
}

interface Tabla {
  id: string;
  estado: string;
}

interface TimelineData {
  name: string;
  tiempo: number;
}

const MetricCard = ({ title, value, icon, trend, color }: MetricCardProps) => (
  <div className="bg-white rounded-lg shadow p-6">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-semibold mt-1">{value}</p>
        {trend && (
          <p className="text-xs text-gray-500 mt-1">
            {trend}
          </p>
        )}
      </div>
      <div className={`p-3 rounded-full ${color} bg-opacity-10 flex items-center justify-center w-12 h-12`}>
        {icon}
      </div>
    </div>
  </div>
);

export default function DashboardMetrics() {
  const [metrics, setMetrics] = useState({
    totalIngestas: 0,
    completedIngestas: 0,
    averageTime: '0',
    pendingTables: 0
  });
  const [timelineData, setTimelineData] = useState<TimelineData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const ingestasSnapshot = await getDocs(collection(db, 'ingestas'));
        const tablasSnapshot = await getDocs(collection(db, 'tablas'));

        // Calculate metrics
        const ingestas = ingestasSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as Ingesta));

        const tablas = tablasSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as Tabla));

        const completedIngestas = ingestas.filter(i => i.estado === 'completed').length;
        const pendingTables = tablas.filter(t => t.estado !== 'completed').length;

        // Calculate average time (mock data for now)
        const avgTime = '3.5 días';

        // Timeline data (mock data for now)
        const mockTimelineData = [
          { name: 'Muestra', tiempo: 1.2 },
          { name: 'Pre-diccionario', tiempo: 2.5 },
          { name: 'Diccionario', tiempo: 3.8 },
          { name: 'Nebula', tiempo: 1.5 },
        ];

        setMetrics({
          totalIngestas: ingestas.length,
          completedIngestas,
          averageTime: avgTime,
          pendingTables
        });

        setTimelineData(mockTimelineData);
      } catch (error) {
        console.error('Error fetching metrics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Cargando métricas...</div>;
  }

  return (
    <div className="space-y-8">
      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Ingestas"
          value={metrics.totalIngestas}
          icon={<TableCellsIcon className="h-6 w-6 text-blue-600" />}
          color="bg-blue-600"
        />
        <MetricCard
          title="Ingestas Completadas"
          value={metrics.completedIngestas}
          icon={<CheckCircleIcon className="h-6 w-6 text-green-600" />}
          trend={`${((metrics.completedIngestas / metrics.totalIngestas) * 100).toFixed(1)}% del total`}
          color="bg-green-600"
        />
        <MetricCard
          title="Tiempo Promedio"
          value={metrics.averageTime}
          icon={<ClockIcon className="h-6 w-6 text-purple-600" />}
          color="bg-purple-600"
        />
        <MetricCard
          title="Tablas Pendientes"
          value={metrics.pendingTables}
          icon={<ExclamationTriangleIcon className="h-6 w-6 text-orange-600" />}
          color="bg-orange-600"
        />
      </div>

      {/* Timeline Chart */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium mb-6">Tiempo Promedio por Etapa</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={timelineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis label={{ value: 'Días', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Bar dataKey="tiempo" fill="#0A3977" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
} 