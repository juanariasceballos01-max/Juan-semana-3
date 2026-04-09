export interface SolicitudTraslado {
  id: string;
  cliente: string;
  origen: string;
  destino: string;
  estado: 'pendiente' | 'en-ruta' | 'completado';
  fecha: string;
}

export interface Stats {
  serviciosHoy: number;
  conductoresActivos: number;
  ocupacionFlota: number; // Porcentaje
}

export interface RealTimeData {
  camionesEnRuta: number;
  ultimaActualizacion: string;
}