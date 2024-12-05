import { useState } from 'react';
import { db } from '@/lib/firebase/client';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { XMarkIcon } from '@heroicons/react/24/outline';
import ConfettiEffect from './ConfettiEffect';

interface CreateIngestaFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateIngestaForm({ isOpen, onClose }: CreateIngestaFormProps) {
  const [formData, setFormData] = useState({
    ticketJira: '',
    nombreProyecto: '',
    nombreModelo: '',
    fechaFin: '',
  });
  const [error, setError] = useState<string>('');
  const [showConfetti, setShowConfetti] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.ticketJira || !formData.nombreProyecto || !formData.nombreModelo) {
      setError('Por favor complete todos los campos obligatorios');
      return;
    }

    try {
      const ingestasRef = collection(db, 'ingestas');
      const docRef = await addDoc(ingestasRef, {
        ...formData,
        fechaCreacion: serverTimestamp(),
        estado: 'pendiente',
        fechaFin: formData.fechaFin ? new Date(formData.fechaFin) : null,
      });

      console.log('Ingesta created with ID: ', docRef.id);
      setShowConfetti(true);
      // onClose will be called after confetti animation completes
    } catch (err) {
      setError('Error al crear la ingesta');
      console.error('Error adding document: ', err);
    }
  };

  const handleConfettiComplete = () => {
    setShowConfetti(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <ConfettiEffect 
        isActive={showConfetti} 
        onComplete={handleConfettiComplete}
      />
      
      <div className="bg-white rounded-lg p-8 max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        <h2 className="text-2xl font-bold text-[#0A3977] mb-6">Crear Nueva Ingesta</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ticket Jira *
            </label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={formData.ticketJira}
              onChange={(e) => setFormData({ ...formData, ticketJira: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre del Proyecto *
            </label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={formData.nombreProyecto}
              onChange={(e) => setFormData({ ...formData, nombreProyecto: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre del Modelo *
            </label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={formData.nombreModelo}
              onChange={(e) => setFormData({ ...formData, nombreModelo: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fecha Fin
            </label>
            <input
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={formData.fechaFin}
              onChange={(e) => setFormData({ ...formData, fechaFin: e.target.value })}
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm mt-2">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-[#0A3977] text-white px-4 py-2 rounded-md hover:bg-[#0A3977]/90 transition-colors"
          >
            Crear Ingesta
          </button>
        </form>
      </div>
    </div>
  );
} 