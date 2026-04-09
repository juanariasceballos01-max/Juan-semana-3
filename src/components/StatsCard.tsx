import React, { useState, useEffect } from 'react';
import { fetchStats } from '../utils/api';

export const StatsCard: React.FC = () => {
  // Estados independientes para cada métrica de la empresa de mudanzas
  const [totalServicios, setTotalServicios] = useState<number>(0);
  const [conductoresLibres, setConductoresLibres] = useState<number>(0);
  const [ingresosEstimados, setIngresosEstimados] = useState<string>("$0");

  // Efecto 1: Carga servicios del día
  useEffect(() => {
    const loadServices = async () => {
      const data = await fetchStats();
      setTotalServicios(data.serviciosHoy);
    };
    loadServices();
  }, []);

  // Efecto 2: Carga disponibilidad de conductores
  useEffect(() => {
    const loadDrivers = async () => {
      const data = await fetchStats();
      setConductoresLibres(data.conductoresActivos);
    };
    loadDrivers();
  }, []);

  // Efecto 3: Simulación de ingresos (actualización independiente)
  useEffect(() => {
    // Imaginemos que esta métrica viene de otro endpoint
    const timer = setTimeout(() => {
      setIngresosEstimados("$4,250.00");
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  const cardStyle: React.CSSProperties = {
    padding: '15px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    marginBottom: '15px'
  };

  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      <div style={cardStyle}>
        <h4>Servicios Hoy</h4>
        <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#2c3e50' }}>
          {totalServicios}
        </p>
      </div>

      <div style={cardStyle}>
        <h4>Conductores Activos</h4>
        <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#27ae60' }}>
          {conductoresLibres}
        </p>
      </div>

      <div style={cardStyle}>
        <h4>Tarifas Proyectadas</h4>
        <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#2980b9' }}>
          {ingresosEstimados}
        </p>
      </div>
    </div>
  );
};