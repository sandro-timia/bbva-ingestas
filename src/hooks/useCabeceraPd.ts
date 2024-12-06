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

export function useCabeceraPd(tablaId: string) {
  const [filledFields, setFilledFields] = useState(0);
  const [totalFields, setTotalFields] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchCabeceraPd = useCallback(async () => {
    try {
      setLoading(true);
      const q = query(collection(db, 'cabeceraPd'), where('tablaId', '==', tablaId));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        const data = doc.data() as CabeceraPd;
        
        // Count non-empty fields
        const filled = Object.values(data).filter(value => 
          value !== null && value !== undefined && value.trim() !== ''
        ).length;
        
        // Count total fields (excluding id, tablaId, and dates)
        const total = Object.keys(data).filter(key => 
          !['id', 'tablaId', 'fechaCreacion', 'fechaActualizacion'].includes(key)
        ).length;
        
        setFilledFields(filled);
        setTotalFields(total);
      } else {
        // If no document exists, set total fields based on interface
        setFilledFields(0);
        setTotalFields(5); // Number of fields in CabeceraPd interface
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

  return { filledFields, totalFields, loading, refresh: fetchCabeceraPd };
} 