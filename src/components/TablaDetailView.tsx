'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase/config';
import WorkflowDiagram from './WorkflowDiagram';

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
  solicitudURL?: string;
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
          const ingestaDoc = await getDoc(doc(db, 'ingestas', data.ingestaId));
          const ingestaData = ingestaDoc.exists() ? ingestaDoc.data() : null;
          
          setTabla({
            ...data,
            fechaCreacion: data.fechaCreacion?.toDate().toLocaleDateString() || '',
            solicitudURL: ingestaData?.solicitudURL || '',
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
          className="flex items-center space-x-2 text-[#666666] hover:text-gray-900 transition-colors mb-6"
        >
          <ArrowLeftIcon className="h-5 w-5" />
          <span>Volver a Tablas</span>
        </button>
        
        <h2 className="text-[#00A3FF] text-xl font-medium mb-8">
          Tabla: {tabla?.nombreLegacy || ''}
        </h2>
        
        {loading ? (
          <div className="text-center py-4">Loading...</div>
        ) : tabla ? (
          <WorkflowDiagram 
            tablaName={tabla.nombreLegacy} 
            solicitudURL={tabla.solicitudURL}
          />
        ) : (
          <div className="text-center py-4 text-gray-500">No se encontró la tabla</div>
        )}
      </div>
    </motion.div>
  );
} 