import { useState, useEffect, useCallback } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/firebase/config';

interface CabeceraPd {
  descripcionObjetivo: string;
  uuaRaw: string;
  uuaMaster: string;
  historicoRequerido: string;
  agrupacionParticiones: string;
}

// Define the fields we want to count
const FORM_FIELDS = [
  'descripcionObjetivo',
  'uuaRaw',
  'uuaMaster',
  'historicoRequerido',
  'agrupacionParticiones'
] as const;

export function useCabeceraPd(tablaId: string) {
  const [filledFields, setFilledFields] = useState(0);
  const [totalFields, setTotalFields] = useState(FORM_FIELDS.length);
  const [loading, setLoading] = useState(true);

  const fetchCabeceraPd = useCallback(async () => {
    try {
      setLoading(true);
      const q = query(collection(db, 'cabeceraPd'), where('tablaId', '==', tablaId));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        const data = doc.data();
        
        // Count filled fields by checking each field in our predefined list
        const filled = FORM_FIELDS.reduce((count, field) => {
          const value = data[field];
          return value && value.trim() !== '' ? count + 1 : count;
        }, 0);
        
        setFilledFields(filled);
      } else {
        setFilledFields(0);
      }
    } catch (error) {
      console.error('Error fetching cabecera data:', error);
    } finally {
      setLoading(false);
    }
  }, [tablaId]);

  useEffect(() => {
    fetchCabeceraPd();
  }, [fetchCabeceraPd]);

  return { 
    filledFields, 
    totalFields, 
    loading, 
    refresh: fetchCabeceraPd 
  };
} 