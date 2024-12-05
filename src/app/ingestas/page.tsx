'use client';
import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/outline";
import IngestasTable from '@/components/IngestasTable';
import CreateIngestaForm from '@/components/CreateIngestaForm';
import { useState } from 'react';

export default function IngestasPage() {
  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);

  return (
    <div className="bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div>
            <h1 className="text-2xl font-bold text-[#0A3977]">PLATAFORMA INGESTAS</h1>
            <p className="text-gray-500 text-sm">Bienvenido usuario: juanpablo.contractor@gdevtools.com</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-[#00A3FF] text-xl font-semibold mb-6">Mis Ingestas</h2>
        
        {/* Search and Create Section */}
        <div className="flex justify-between items-center mb-6">
          <div className="relative flex-1 max-w-lg">
            <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por Ticket Jira"
              className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button 
            onClick={() => setIsCreateFormOpen(true)}
            className="ml-4 bg-[#0A3977] text-white px-4 py-2 rounded-md flex items-center"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Crear Ingesta
          </button>
        </div>

        {/* Table Component */}
        <IngestasTable />

        {/* Create Form */}
        <CreateIngestaForm 
          isOpen={isCreateFormOpen}
          onClose={() => setIsCreateFormOpen(false)}
        />
      </main>
    </div>
  );
} 