import React from 'react';
import { ItemList } from './ItemList';
import { StatsCard } from './StatsCard';
import { RealTimeIndicator } from './RealTimeIndicator';
// @ts-ignore
import '../App.css'; 

export const Dashboard: React.FC = () => {
  const fechaHoy = new Date().toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="dashboard-container">
      <header style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '2rem',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div>
          <h1 style={{ color: 'var(--primary-color)', margin: 0 }}>
            🚛 Mudanzas Express
          </h1>
          <p style={{ color: 'var(--text-muted)', margin: '5px 0 0 0' }}>
            Sistema de Gestión de Traslados y Logística
          </p>
        </div>
        
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontWeight: 'bold', color: 'var(--accent-color)' }}>
            {fechaHoy}
          </div>
          <span className="status-badge completado" style={{ marginTop: '5px', display: 'inline-block' }}>
            Sistema Operativo
          </span>
        </div>
      </header>

      <div className="dashboard-grid">
        <aside className="stats-group">
          <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Métricas Operativas</h2>
          <StatsCard />
          
          <h2 style={{ fontSize: '1.2rem', margin: '1.5rem 0 1rem 0' }}>Estado en Vivo</h2>
          <RealTimeIndicator />

          <div style={{ 
            marginTop: '2rem', 
            padding: '1rem', 
            backgroundColor: '#fff', 
            borderRadius: '12px',
            border: '1px dashed #ccc' 
          }}>
            {/* CORRECCIÓN: var(--text-muted) debe ir entre comillas */}
            <small style={{ color: 'var(--text-muted)' }}>
              <strong>Nota:</strong> Los datos se sincronizan automáticamente cada 5 segundos.
            </small>
          </div>
        </aside>

        <main className="item-list-wrapper">
          <ItemList />
        </main>
      </div>

      <footer style={{ 
        marginTop: '3rem', 
        textAlign: 'center', 
        padding: '1rem', 
        color: 'var(--text-muted)',
        borderTop: '1px solid #eee'
      }}>
        <p>© 2026 Mudanzas Express S.A. - Panel de Control Interno</p>
      </footer>
    </div>
  );
};