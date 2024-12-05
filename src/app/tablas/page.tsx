'use client';
import { Suspense } from 'react';
import Header from '@/components/Header';
import TablasPageContent from '@/components/TablasPageContent';

export default function TablasPage() {
  return (
    <div className="bg-gray-50">
      <Header />
      <div className="relative">
        <Suspense fallback={<div className="text-center py-4">Loading...</div>}>
          <TablasPageContent />
        </Suspense>
      </div>
    </div>
  );
} 