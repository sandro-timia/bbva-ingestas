'use client';
import { useState } from 'react';
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import TablasTable from '@/components/TablasTable';

export default function TablasPage() {
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
        <h2 className="text-[#00A3FF] text-xl font-semibold mb-6">Mis Tablas</h2>
        
        {/* Search Section */}
        <div className="flex justify-between items-center mb-6">
          <div className="relative flex-1 max-w-lg">
            <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por Ticket Jira"
              className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Table Component */}
        <TablasTable />
      </main>
    </div>
  );
} 