'use client';
import { Suspense, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Header from '@/components/Header';
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import TablasTable from '@/components/TablasTable';
import TablaDetailView from '@/components/TablaDetailView';
import { useRouter, useSearchParams } from 'next/navigation';

export default function TablasPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedTablaId, setSelectedTablaId] = useState<string | null>(
    searchParams.get('detail')
  );

  const handleRowClick = (tablaId: string) => {
    setSelectedTablaId(tablaId);
    router.push(`/tablas?detail=${tablaId}`, { scroll: false });
  };

  const handleBack = () => {
    setSelectedTablaId(null);
    router.back();
  };

  return (
    <div className="bg-gray-50">
      <Header />
      <div className="relative">
        <AnimatePresence mode="wait">
          {!selectedTablaId ? (
            <main key="list" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

              {/* Table Component wrapped in Suspense */}
              <Suspense fallback={<div className="text-center py-4">Loading...</div>}>
                <TablasTable onRowClick={handleRowClick} />
              </Suspense>
            </main>
          ) : (
            <TablaDetailView 
              key="detail"
              tablaId={selectedTablaId} 
              onBack={handleBack}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
} 