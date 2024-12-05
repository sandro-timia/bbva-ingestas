'use client';
import { motion } from 'framer-motion';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

interface TablaDetailViewProps {
  onBack: () => void;
  tablaId: string;
}

export default function TablaDetailView({ onBack, tablaId }: TablaDetailViewProps) {
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
        
        {/* Detail content will go here */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900">Detalles de la Tabla</h2>
          {/* Add your detail content here */}
        </div>
      </div>
    </motion.div>
  );
} 