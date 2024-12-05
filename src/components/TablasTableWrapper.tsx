'use client';
import { useSearchParams } from 'next/navigation';
import TablasTable from './TablasTable';

interface TablasTableWrapperProps {
  onRowClick: (tablaId: string) => void;
}

export default function TablasTableWrapper({ onRowClick }: TablasTableWrapperProps) {
  const searchParams = useSearchParams();
  const ingestaId = searchParams.get('ingestaId');

  return <TablasTable onRowClick={onRowClick} ingestaId={ingestaId} />;
} 