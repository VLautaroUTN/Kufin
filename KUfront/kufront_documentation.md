# Documentación de Kufront

> [!NOTE]
> Esta documentación proporciona una visión general del proyecto frontend **Kufront**, su estructura de componentes y el plan para la futura integración con el backend.

## 1. Visión General del Proyecto

**Kufront** es una aplicación web SPA (Single Page Application) desarrollada con **React** y **Vite**, utilizando **TypeScript** para el tipado fuerte y **Material UI (MUI)** para el diseño de la interfaz de usuario.
La aplicación está diseñada como un panel de control (Dashboard) financiero interactivo que permite gestionar ingresos, egresos y visualizar reportes.

## 2. Tecnologías Principales

- **Framework**: React 18+
- **Build Tool**: Vite
- **Lenguaje**: TypeScript
- **Librería de Componentes / UI**: Material UI (MUI)
- **Iconografía**: `@mui/icons-material`

## 3. Estructura de Directorios

La estructura principal del código fuente (`src/`) es la siguiente:

```text
src/
├── assets/          # Recursos estáticos (imágenes, iconos, etc.)
├── components/      # Componentes de React
│   └── Dashboard/   # Componentes específicos del panel de control
│       ├── DashboardHome.tsx   # Vista principal resumen
│       ├── LoginModal.tsx      # Modal de inicio de sesión
│       ├── Navbar.tsx          # Barra de navegación superior
│       ├── Reports.tsx         # Vista de reportes y gráficos
│       ├── Sidebar.tsx         # Menú lateral de navegación
│       └── Transactions.tsx    # Gestión y listado de movimientos
├── App.tsx          # Componente raíz y gestor del estado global
├── index.css        # Estilos globales y reset
└── main.tsx         # Punto de entrada de la aplicación React
```

## 4. Estado Global y Gestión de Datos

Actualmente, el estado global de la aplicación está centralizado en el componente principal `App.tsx`. Este componente se encarga de manejar:
- **Estado del Usuario (`username`)**: Gestiona la sesión actual del usuario.
- **Estado de Navegación (`activeTab`)**: Controla qué vista del dashboard se renderiza.
- **Notificaciones (`notification`)**: Maneja los mensajes temporales (Toasts/Snackbars).
- **Lista de Transacciones (`transactions`)**: Un arreglo en memoria que contiene los ingresos y egresos.

> [!IMPORTANT]
> **Integración Backend:** Todos los estados que actualmente tienen datos "mockeados" (de prueba) en `App.tsx` han sido comentados con etiquetas `// TODO(Backend):`. Cuando el backend esté listo, las funciones de creación, eliminación y obtención de transacciones deberán sustituirse por llamadas API (ej. utilizando `fetch` o `axios`).

## 5. Descripción de Componentes Principales

### `App.tsx`
Actúa como el orquestador principal. Proveedor del `ThemeProvider` de MUI, renderiza la estructura base (`Navbar`, `Sidebar`, `Main Content`) y mantiene los métodos para interactuar con la lista de transacciones (`handleAddTransaction`, `handleDeleteTransaction`).

### `LoginModal.tsx`
Un modal estilizado para la autenticación de usuarios. Contiene un formulario con validaciones visuales.
**Futura integración:** El método `handleSubmit` actualmente simula latencia de red. Aquí se deberá enviar la solicitud de inicio de sesión al endpoint correspondiente (ej. `/api/auth/login`).

### `DashboardHome.tsx`
Muestra un resumen financiero, incluyendo saldos totales e información rápida generada a partir de las transacciones pasadas por `props`.

### `Transactions.tsx`
Permite al usuario visualizar el historial detallado de movimientos. Incluye los formularios necesarios para agregar nuevas transacciones y las acciones para eliminar las existentes.

### `Reports.tsx`
Encargado de la visualización analítica (potenciales gráficos y estadísticas avanzadas) del historial de movimientos.

## 6. Pasos a seguir para la Integración con Backend

1. **Autenticación (Login):** Reemplazar el `setTimeout` en `LoginModal.tsx` por una petición HTTP real. Manejar los tokens JWT o cookies, almacenarlos de forma segura, y actualizar el estado del `username` en `App.tsx`.
2. **Carga inicial de Datos:** En `App.tsx`, agregar un `useEffect` que realice un `GET /api/transactions` cuando el usuario inicie sesión, poblando el estado `transactions`.
3. **Creación de Movimientos:** En `handleAddTransaction` (`App.tsx`), realizar un `POST /api/transactions`. Utilizar la respuesta del servidor para añadir la nueva transacción con su ID real de base de datos.
4. **Eliminación de Movimientos:** En `handleDeleteTransaction` (`App.tsx`), ejecutar un `DELETE /api/transactions/:id` y, en caso de éxito, remover el elemento del estado local.

> [!TIP]
> Se ha dejado código comentado en los archivos `App.tsx` y `LoginModal.tsx` como guía rápida para las modificaciones requeridas. Se recomienda implementar un cliente HTTP dedicado (como Axios) para estandarizar los headers de autorización en las llamadas al backend.
