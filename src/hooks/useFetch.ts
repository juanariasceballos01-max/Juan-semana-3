import { useState, useEffect, useCallback } from 'react';

export const useFetch = <T>(fetchFn: (signal?: AbortSignal) => Promise<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Usamos useCallback para que la función sea estable y no cause bucles infinitos en los useEffect
  const executeFetch = useCallback(async (signal?: AbortSignal) => {
    try {
      setLoading(true);
      setError(null); // Limpiamos errores previos antes de intentar de nuevo
      
      const result = await fetchFn(signal);
      
      setData(result);
    } catch (err: any) {
      // Si el error es por abortar la petición, lo ignoramos silenciosamente
      if (err.name === 'AbortError') {
        console.log('Fetch abortado');
        return; 
      }
      setError(err.message || 'Error al obtener datos');
    } finally {
      // Solo quitamos el estado de carga si la petición no fue abortada
      // Para evitar parpadeos innecesarios o estados inconsistentes
      setLoading(false);
    }
  }, [fetchFn]);

  useEffect(() => {
    const controller = new AbortController();
    
    executeFetch(controller.signal);
    
    // Función de limpieza: se ejecuta cuando el componente se destruye
    return () => {
      controller.abort();
    };
  }, [executeFetch]);

  return { data, loading, error, refetch: executeFetch };
};