import React, { useState, useEffect } from 'react';
import { useFetch } from '../hooks/useFetch';
import { fetchSolicitudes } from '../utils/api';
import { SolicitudTraslado } from '../types';

export const ItemList: React.FC = () => {
  const { data, loading, error } = useFetch<SolicitudTraslado[]>(fetchSolicitudes);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState<SolicitudTraslado[]>([]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (data) {
        const filtered = data.filter((item) =>
          item.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.origen.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.destino.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredItems(filtered);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, data]);

  // --- CORRECCIÓN CRÍTICA ---
  // Si el error es un AbortError, lo tratamos como si estuviera cargando 
  // o simplemente no mostramos el mensaje de error.
  if (loading) return <div className="status">🚚 Cargando logística de traslados...</div>;
  
  // Solo mostramos el error si existe y NO es un aborto de la petición
  if (error && error !== 'AbortError') {
    return <div className="error-msg">⚠️ Error: {error}</div>;
  }

  return (
    <div className="list-container" style={{ padding: '1rem', border: '1px solid #eee', borderRadius: '8px', backgroundColor: 'white' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '10px' }}>
        <h3 style={{ margin: 0 }}>📋 Solicitudes de Traslado</h3>
        
        <input
          type="text"
          placeholder="Buscar por cliente o ruta..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', width: '250px' }}
        />
      </header>

      {filteredItems.length > 0 ? (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {filteredItems.map((item) => (
            <li 
              key={item.id} 
              style={{ 
                padding: '12px', 
                borderBottom: '1px solid #f0f0f0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div>
                <strong style={{ color: '#2c3e50' }}>{item.cliente}</strong>
                <div style={{ fontSize: '0.85rem', color: '#666' }}>
                  📍 {item.origen} → 🏁 {item.destino}
                </div>
              </div>
              
              <span style={{
                padding: '4px 8px',
                borderRadius: '12px',
                fontSize: '0.75rem',
                backgroundColor: item.estado === 'en-ruta' ? '#e3f2fd' : '#fff3e0',
                color: item.estado === 'en-ruta' ? '#1976d2' : '#f57c00',
                fontWeight: 'bold',
                textTransform: 'uppercase'
              }}>
                {item.estado}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p style={{ textAlign: 'center', color: '#999', marginTop: '20px' }}>
          {searchTerm ? 'No se encontraron traslados que coincidan.' : 'No hay datos disponibles.'}
        </p>
      )}

      {searchTerm && (
        <button 
          onClick={() => setSearchTerm('')}
          style={{ marginTop: '10px', background: 'none', border: 'none', color: '#007bff', cursor: 'pointer', textDecoration: 'underline' }}
        >
          Limpiar búsqueda
        </button>
      )}
    </div>
  );
};