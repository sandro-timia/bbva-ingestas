'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase/config';

interface TablaDetailViewProps {
  onBack: () => void;
  tablaId: string;
}

interface TablaDetail {
  ticketJira: string;
  nombreLegacy: string;
  alias: string;
  fechaCreacion: string;
  estado: string;
  ingestaId: string;
}

export default function TablaDetailView({ onBack, tablaId }: TablaDetailViewProps) {
  const [tabla, setTabla] = useState<TablaDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTablaDetails = async () => {
      try {
        const tablaDoc = await getDoc(doc(db, 'tablas', tablaId));
        if (tablaDoc.exists()) {
          const data = tablaDoc.data();
          setTabla({
            ...data,
            fechaCreacion: data.fechaCreacion?.toDate().toLocaleDateString() || '',
          } as TablaDetail);
        }
      } catch (error) {
        console.error('Error fetching tabla details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTablaDetails();
  }, [tablaId]);

  return (
    <motion.div
      initial={{ x: '100%', opacity: 0, scale: 0.95 }}
      animate={{ x: 0, opacity: 1, scale: 1 }}
      exit={{ x: '100%', opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
      className="absolute inset-0 bg-gray-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors mb-6"
        >
          <ArrowLeftIcon className="h-5 w-5" />
          <span>Volver a Tablas</span>
        </button>
        
        <div className="bg-white rounded-lg shadow p-6">
          {loading ? (
            <div className="text-center py-4">Loading...</div>
          ) : tabla ? (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Detalles de la Tabla</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Ticket Jira</h3>
                  <p className="mt-1 text-sm text-gray-900">{tabla.ticketJira}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Nombre Legacy</h3>
                  <p className="mt-1 text-sm text-gray-900">{tabla.nombreLegacy}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Alias</h3>
                  <p className="mt-1 text-sm text-gray-900">{tabla.alias}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Fecha Creación</h3>
                  <p className="mt-1 text-sm text-gray-900">{tabla.fechaCreacion}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Estado</h3>
                  <span className="mt-1 inline-flex px-2 text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    {tabla.estado}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-4 text-gray-500">No se encontró la tabla</div>
          )}
        </div>
      </div>
    </motion.div>
  );
} 