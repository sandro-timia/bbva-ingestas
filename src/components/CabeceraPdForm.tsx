'use client';
import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/firebase/config';

interface CabeceraPdFormProps {
  isOpen: boolean;
  onClose: () => void;
  tablaId: string;
}

const Label = ({ children }: { children: React.ReactNode }) => (
  <label className="block text-sm font-medium text-gray-900">
    {children}
  </label>
);

export default function CabeceraPdForm({ isOpen, onClose, tablaId }: CabeceraPdFormProps) {
  const [formData, setFormData] = useState({
    descripcionObjetivo: '',
    uuaRaw: '',
    uuaMaster: '',
    historicoRequerido: '',
    agrupacionParticiones: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const nonEmptyFields = Object.fromEntries(
        Object.entries(formData).filter(([_, value]) => value.trim() !== '')
      );
      
      await addDoc(collection(db, 'cabeceraPd'), {
        ...nonEmptyFields,
        tablaId,
        fechaCreacion: new Date()
      });
      onClose();
      setFormData({
        descripcionObjetivo: '',
        uuaRaw: '',
        uuaMaster: '',
        historicoRequerido: '',
        agrupacionParticiones: ''
      });
    } catch (error) {
      console.error('Error creating cabecera:', error);
    }
  };

  return (
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
                          Cabecera
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
                          <Label>Descripción del Objeto</Label>
                          <textarea
                            rows={3}
                            value={formData.descripcionObjetivo}
                            onChange={(e) => setFormData({ ...formData, descripcionObjetivo: e.target.value })}
                            className="mt-2 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600"
                          />
                        </div>

                        <div>
                          <Label>UUA RAW</Label>
                          <input
                            type="text"
                            value={formData.uuaRaw}
                            onChange={(e) => setFormData({ ...formData, uuaRaw: e.target.value })}
                            className="mt-2 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600"
                          />
                        </div>

                        <div>
                          <Label>UUA MASTER</Label>
                          <input
                            type="text"
                            value={formData.uuaMaster}
                            onChange={(e) => setFormData({ ...formData, uuaMaster: e.target.value })}
                            className="mt-2 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600"
                          />
                        </div>

                        <div>
                          <Label>Histórico Requerido</Label>
                          <input
                            type="text"
                            value={formData.historicoRequerido}
                            onChange={(e) => setFormData({ ...formData, historicoRequerido: e.target.value })}
                            className="mt-2 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600"
                          />
                        </div>

                        <div>
                          <Label>Agrupación Particiones</Label>
                          <input
                            type="text"
                            value={formData.agrupacionParticiones}
                            onChange={(e) => setFormData({ ...formData, agrupacionParticiones: e.target.value })}
                            className="mt-2 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600"
                          />
                        </div>
                      </div>

                      <div className="flex justify-end pt-5">
                        <button
                          type="submit"
                          className="rounded-md bg-[#0A3977] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
                        >
                          Guardar
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
  );
} 