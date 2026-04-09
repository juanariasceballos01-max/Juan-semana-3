import { SolicitudTraslado, Stats, RealTimeData } from '../types';


const delay = (ms: number, signal?: AbortSignal) => {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(resolve, ms);

    // Si la señal se activa, limpiamos el timer y rechazamos la promesa
    signal?.addEventListener('abort', () => {
      clearTimeout(timer);
      reject(new Error('AbortError'));
    });
  });
};

export const fetchSolicitudes = async (signal?: AbortSignal): Promise<SolicitudTraslado[]> => {
  try {
    // Simulamos latencia de red
    await delay(1200, signal);

    const data: SolicitudTraslado[] = [
      { id: '1', cliente: 'Juan Pérez', origen: 'Sector Norte', destino: 'Sector Sur', estado: 'en-ruta', fecha: '2026-04-09' },
      { id: '2', cliente: 'Maria Lopez', origen: 'Centro Histórico', destino: 'Occidente', estado: 'pendiente', fecha: '2026-04-10' },
      { id: '3', cliente: 'Carlos Ruiz', origen: 'Terminal', destino: 'Norte', estado: 'completado', fecha: '2026-04-08' },
    ];

    return data;
  } catch (error) {
    // Si el error es por abortar, lo relanzamos para que useFetch lo capture
    throw error;
  }
};

export const fetchStats = async (): Promise<Stats> => {
  // Las estadísticas suelen ser rápidas
  await delay(500);
  return { 
    serviciosHoy: 12, 
    conductoresActivos: 8, 
    ocupacionFlota: 75 
  };
};

export const fetchRealTimeStatus = async (): Promise<RealTimeData> => {
  // Simulación de datos cambiantes para el polling (cada 5 seg)
  return {
    camionesEnRuta: Math.floor(Math.random() * 10) + 5,
    ultimaActualizacion: new Date().toLocaleTimeString()
  };
};