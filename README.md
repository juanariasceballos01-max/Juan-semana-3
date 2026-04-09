# 🚛 Mudanzas Express - Dashboard Logístico

Sistema de gestión y monitoreo de traslados desarrollado con **React**, **TypeScript** y **Vite**. Este proyecto permite administrar solicitudes de mudanzas, visualizar métricas operativas en tiempo real y filtrar servicios mediante un sistema de búsqueda optimizado.

## 🚀 Características

- **Gestión de Traslados**: Visualización detallada de clientes, puntos de origen y destinos.
- **Métricas en Tiempo Real**: Panel lateral con estadísticas de conductores activos, servicios del día y ocupación de flota.
- **Búsqueda con Debounce**: Sistema de filtrado inteligente que optimiza el rendimiento al buscar clientes o rutas.
- **Custom Hook `useFetch`**: Implementación robusta para el consumo de datos con manejo de estados (carga, error) y cancelación de peticiones mediante `AbortController`.
- **Diseño Responsivo**: Interfaz adaptativa diseñada para ofrecer una experiencia fluida tanto en escritorio como en dispositivos móviles.

## 🛠️ Tecnologías Utilizadas

*   [React 18](https://reactjs.org/) - Biblioteca para la interfaz de usuario.
*   [TypeScript](https://www.typescriptlang.org/) - Tipado estático para un código más seguro.
*   [Vite](https://vitejs.dev/) - Herramienta de construcción y servidor de desarrollo ultra rápido.
*   [CSS3 Modular](https://developer.mozilla.org/es/docs/Web/CSS) - Estilos personalizados con variables para una fácil tematización.

## 📦 Estructura del Proyecto

```text
src/
├── components/        # Componentes de la interfaz (Dashboard, ItemList, Stats, etc.)
├── hooks/             # Lógica reutilizable (useFetch)
├── types/             # Definiciones e interfaces de TypeScript
├── utils/             # Funciones auxiliares y simulación de API
├── App.tsx            # Componente raíz
└── main.tsx           # Punto de entrada de la aplicación
