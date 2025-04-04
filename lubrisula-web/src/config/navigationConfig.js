// ✅ 1. navigationConfig.js
// src/config/navigationConfig.js

export const navigationByRole = {
    cliente: [
      { label: "Dashboard", path: "/clientes/dashboard" },
      { label: "Vehículos", path: "/clientes/vehiculos" },
      { label: "Citas", path: "/clientes/citas" },
      { label: "Ordenes", path: "/clientes/ordenes" },
      { label: "Facturas", path: "/clientes/facturas" },
      { label: "Notificaciones", path: "/clientes/notificaciones" },
    ],
    taller: [
      { label: "Dashboard", path: "/talleres/dashboard" },
      { label: "Citas", path: "/talleres/citas" },
      { label: "Kanban", path: "/talleres/kanban" },
      { label: "Inventario", path: "/talleres/inventario" },
      { label: "Técnicos", path: "/talleres/tecnicos" },
      { label: "Ordenes", path: "/talleres/ordenes" },
    ],
    aseguradora: [
      { label: "Dashboard", path: "/aseguradoras/dashboard" },
      { label: "Vehículos", path: "/aseguradoras/vehiculos" },
      { label: "Siniestros", path: "/aseguradoras/siniestros" },
      { label: "Facturación", path: "/aseguradoras/facturacion" },
      { label: "Reportes", path: "/aseguradoras/reportes" },
    ],
    admin: [
      { label: "Usuarios", path: "/admin/users" },
      { label: "Configuración", path: "/admin/settings" },
      { label: "Reportes", path: "/admin/reportes" },
      { label: "KPIs", path: "/admin/kpis" },
    ],
  }
  
  // Opcional: exportar redirecciones
  export const redirectByRole = {
    cliente: "/clientes/dashboard",
    taller: "/talleres/dashboard",
    aseguradora: "/aseguradoras/dashboard",
    admin: "/admin/users",
  }
  