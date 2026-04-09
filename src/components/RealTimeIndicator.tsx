import React, { useEffect, useState } from 'react';
import { fetchRealTimeStatus } from '../utils/api';
import { RealTimeData } from '../types';

export const RealTimeIndicator: React.FC = () => {
  const [rtData, setRtData] = useState<RealTimeData | null>(null);

  useEffect(() => {
    const updateStatus = async () => {
      const data = await fetchRealTimeStatus();
      setRtData(data);
    };

    updateStatus();
    const intervalId = setInterval(updateStatus, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="rt-indicator">
      <h4>Estado de Flota Live</h4>
      {rtData ? (
        <>
          <p>🚚 Camiones en ruta: <strong>{rtData.camionesEnRuta}</strong></p>
          <small>Última actualización: {rtData.ultimaActualizacion}</small>
        </>
      ) : <p>Sincronizando...</p>}
    </div>
  );
};