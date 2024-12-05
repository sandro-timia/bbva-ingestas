'use client';
import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/firebase/config';
import ConfettiEffect from './ConfettiEffect';

interface CreateIngestaFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const RequiredLabel = ({ children }: { children: React.ReactNode }) => (
  <label className="block text-sm font-medium text-gray-900">
    {children}
    <span className="text-red-500 ml-1">*</span>
  </label>
);

export default function CreateIngestaForm({ isOpen, onClose }: CreateIngestaFormProps) {
  const [formData, setFormData] = useState({
    ticketJira: '',
    nombreProyecto: '',
    nombreModelo: '',
    fechaFin: '',
    estado: 'Pendiente',
    solicitudURL: ''
  });
  const [showConfetti, setShowConfetti] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'ingestas'), {
        ...formData,
        fechaCreacion: new Date(),
        fechaFin: new Date(formData.fechaFin),
        createdAt: new Date()
      });
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
        onClose();
        setFormData({
          ticketJira: '',
          nombreProyecto: '',
          nombreModelo: '',
          fechaFin: '',
          estado: 'Pendiente',
          solicitudURL: ''
        });
      }, 2000);
    } catch (error) {
      console.error('Error creating ingesta:', error);
    }
  };

  return (
    <>
      <ConfettiEffect isActive={showConfetti} onComplete={() => setShowConfetti(false)} />
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={onClose}>
          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1">
                      <div className="bg-[#0A3977] px-4 py-6 sm:px-6">
                        <div className="flex items-center justify-between">
                          <Dialog.Title className="text-base font-semibold leading-6 text-white">
                            Crear Ingesta
                          </Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="rounded-md bg-[#0A3977] text-white hover:text-gray-300"
                              onClick={onClose}
                            >
                              <XMarkIcon className="h-6 w-6" />
                            </button>
                          </div>
                        </div>
                      </div>

                      <form onSubmit={handleSubmit} className="flex-1 divide-y divide-gray-200 px-4 py-6 sm:px-6">
                        <div className="space-y-6 pb-5">
                          <div>
                            <RequiredLabel>Ticket Jira</RequiredLabel>
                            <input
                              type="text"
                              required
                              value={formData.ticketJira}
                              onChange={(e) => setFormData({ ...formData, ticketJira: e.target.value })}
                              className="mt-2 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600"
                            />
                          </div>

                          <div>
                            <RequiredLabel>Nombre del Proyecto</RequiredLabel>
                            <input
                              type="text"
                              required
                              value={formData.nombreProyecto}
                              onChange={(e) => setFormData({ ...formData, nombreProyecto: e.target.value })}
                              className="mt-2 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-900">
                              Modelo (opcional)
                            </label>
                            <input
                              type="text"
                              value={formData.nombreModelo}
                              onChange={(e) => setFormData({ ...formData, nombreModelo: e.target.value })}
                              className="mt-2 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600"
                            />
                          </div>

                          <div>
                            <RequiredLabel>Solicitud de Información</RequiredLabel>
                            <input
                              type="url"
                              required
                              placeholder="https://..."
                              value={formData.solicitudURL}
                              onChange={(e) => setFormData({ ...formData, solicitudURL: e.target.value })}
                              className="mt-2 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-900">
                              Fecha Fin (opcional)
                            </label>
                            <input
                              type="datetime-local"
                              value={formData.fechaFin}
                              onChange={(e) => setFormData({ ...formData, fechaFin: e.target.value })}
                              className="mt-2 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600"
                            />
                          </div>

                          <div>
                            <RequiredLabel>Estado</RequiredLabel>
                            <select
                              required
                              value={formData.estado}
                              onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
                              className="mt-2 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600"
                            >
                              <option value="Pendiente">Pendiente</option>
                              <option value="En proceso">En proceso</option>
                              <option value="Finalizada">Finalizada</option>
                            </select>
                          </div>
                        </div>

                        <div className="flex justify-end pt-5">
                          <button
                            type="submit"
                            className="rounded-md bg-[#0A3977] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
                          >
                            Crear
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </Dialog.Panel>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
} 