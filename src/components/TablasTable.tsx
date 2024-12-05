'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import { collection, query, orderBy, limit, getDocs, startAfter, DocumentData } from 'firebase/firestore';
import { db } from '@/firebase/config';
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

interface Tabla {
  id: string;
  ticketJira: string;
  nombreLegacy: string;
  alias: string;
  fechaCreacion: string;
  estado: string;
}

export default function TablasTable() {
  const [tablas, setTablas] = useState<Tabla[]>([]);
  const [lastDoc, setLastDoc] = useState<DocumentData | null>(null);
  const [loading, setLoading] = useState(true);
  const ITEMS_PER_PAGE = 5;
  const initialFetchDone = useRef(false);

  const fetchTablas = useCallback(async (page = 1) => {
    try {
      setLoading(true);
      let q = query(
        collection(db, 'tablas'),
        orderBy('fechaCreacion', 'desc'),
        limit(ITEMS_PER_PAGE)
      );

      if (page > 1 && lastDoc) {
        q = query(
          collection(db, 'tablas'),
          orderBy('fechaCreacion', 'desc'),
          startAfter(lastDoc),
          limit(ITEMS_PER_PAGE)
        );
      }

      const querySnapshot = await getDocs(q);
      setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);

      const tablasData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        fechaCreacion: doc.data().fechaCreacion?.toDate().toLocaleDateString() || ''
      })) as Tabla[];

      setTablas(tablasData);
    } catch (error) {
      console.error('Error fetching tablas:', error);
    } finally {
      setLoading(false);
    }
  }, [lastDoc]);

  useEffect(() => {
    if (!initialFetchDone.current) {
      const initializeData = async () => {
        const snapshot = await getDocs(collection(db, 'tablas'));
        await fetchTablas(1);
        initialFetchDone.current = true;
      };
      initializeData();
    }
  }, [fetchTablas]);

  if (loading) return <div className="text-center py-4">Loading...</div>;

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-[#EEF3F8]">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">TicketJira</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Nombre Legacy</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Alias</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Fecha Creación</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Estado</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {tablas.map((tabla) => (
            <tr key={tabla.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm">{tabla.ticketJira}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">{tabla.nombreLegacy}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">{tabla.alias}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">{tabla.fechaCreacion}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                  {tabla.estado}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <div className="flex space-x-3">
                  <PencilIcon className="h-5 w-5 text-blue-600 cursor-pointer" />
                  <TrashIcon className="h-5 w-5 text-blue-600 cursor-pointer" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 