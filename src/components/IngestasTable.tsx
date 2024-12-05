'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import { collection, query, orderBy, limit, getDocs, startAfter, DocumentData } from 'firebase/firestore';
import { db } from '@/firebase/config';
import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";

interface Ingesta {
  id: string;
  ticketJira: string;
  nombreProyecto: string;
  fechaCreacion: string;
  fechaFin: string;
  estado: string;
}

export default function IngestasTable() {
  const [ingestas, setIngestas] = useState<Ingesta[]>([]);
  const [lastDoc, setLastDoc] = useState<DocumentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const ITEMS_PER_PAGE = 5;
  
  // Use ref to prevent infinite loops
  const initialFetchDone = useRef(false);

  const fetchIngestas = useCallback(async (page = 1) => {
    try {
      setLoading(true);
      let q;
      
      if (page === 1) {
        q = query(
          collection(db, 'ingestas'),
          orderBy('fechaCreacion', 'desc'),
          limit(ITEMS_PER_PAGE)
        );
      } else {
        q = query(
          collection(db, 'ingestas'),
          orderBy('fechaCreacion', 'desc'),
          startAfter(lastDoc),
          limit(ITEMS_PER_PAGE)
        );
      }

      const querySnapshot = await getDocs(q);
      const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
      setLastDoc(lastVisible);

      const ingestasData = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          fechaCreacion: data.fechaCreacion?.toDate().toLocaleDateString() || '',
          fechaFin: data.fechaFin?.toDate().toLocaleDateString() || ''
        };
      }) as Ingesta[];

      setIngestas(ingestasData);
      setCurrentPage(page);
    } catch (error) {
      console.error('Error fetching ingestas:', error);
    } finally {
      setLoading(false);
    }
  }, [lastDoc]);

  // Initial data fetch
  useEffect(() => {
    if (!initialFetchDone.current) {
      const initializeData = async () => {
        const snapshot = await getDocs(collection(db, 'ingestas'));
        const total = Math.ceil(snapshot.size / ITEMS_PER_PAGE);
        setTotalPages(total);
        await fetchIngestas(1);
        initialFetchDone.current = true;
      };

      initializeData();
    }
  }, []); // Empty dependency array

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      fetchIngestas(newPage);
    }
  };

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  return (
    <div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#EEF3F8]">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">TicketJira</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Nombre del proyecto</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Fecha Creación</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Fecha Fin</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Estado</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {ingestas.map((ingesta) => (
              <tr key={ingesta.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{ingesta.ticketJira}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{ingesta.nombreProyecto}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{ingesta.fechaCreacion}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{ingesta.fechaFin}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    {ingesta.estado}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex space-x-3">
                    <PencilIcon className="h-5 w-5 text-blue-600 cursor-pointer" />
                    <PlusIcon className="h-5 w-5 text-blue-600 cursor-pointer" />
                    <TrashIcon className="h-5 w-5 text-blue-600 cursor-pointer" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center space-x-2 mt-6">
        <button 
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-2 text-sm ${currentPage === 1 ? 'text-gray-400' : 'text-gray-700 hover:bg-gray-100'} rounded-md`}
        >
          Previous
        </button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i + 1}
            onClick={() => handlePageChange(i + 1)}
            className={`px-3 py-2 text-sm ${
              currentPage === i + 1 
                ? 'text-white bg-[#0A3977]' 
                : 'text-gray-700 hover:bg-gray-100'
            } rounded-md`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-2 text-sm ${currentPage === totalPages ? 'text-gray-400' : 'text-gray-700 hover:bg-gray-100'} rounded-md`}
        >
          Next
        </button>
      </div>
    </div>
  );
} 