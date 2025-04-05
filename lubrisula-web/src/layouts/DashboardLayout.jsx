import { useState } from "react";
import { Menu, X, Moon, Sun, User, Settings, LogOut } from "lucide-react";
import { Outlet } from "react-router-dom";

function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);

  const navLinks = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Clientes", path: "/clientes" },
    { name: "Cotizaciones", path: "/cotizaciones" },
    { name: "Vehículos", path: "/vehiculos" },
    { name: "Ordenes", path: "/ordenes" },
    { name: "Inventario", path: "/inventario" },
    { name: "Kanban", path: "/kanban" },
    { name: "Reportes", path: "/reportes" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/**Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-white shadow-sm relative">
        <div className="flex items-center gap-4">
          <button
            className="md:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>
          <h2 className="font-bold text-xl text-blue-700">AUTOFLOWX</h2>
        </div>

        {/**Desktop nav */}
        <nav className="hidden md:flex gap-6 text-sm text-gray-600 font-medium">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.path}
              className="hover:text-blue-700 transition-colors duration-200"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/**User menu */}
        <div className="flex items-center gap-4 relative">
          <button
            onClick={() => setThemeMenuOpen(!themeMenuOpen)}
            className="hover:bg-gray-100 p-2 rounded-md"
          >
            <Sun className="h-5 w-5" />
          </button>

          {themeMenuOpen && (
            <div className="absolute right-24 top-12 bg-white shadow-lg rounded-md text-sm z-50">
              <ul>
                {["Claro", "Oscuro", "Sistema"].map((theme) => (
                  <li key={theme} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    {theme}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/**User profile */}
          <div className="relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-md"
            >
              <img
                src="https://ui-avatars.com/api/?name=Usuario+Taller"
                alt="avatar"
                className="w-8 h-8 rounded-full"
              />
              <span className="text-sm hidden md:inline">usuario@taller.com</span>
            </button>

            {userMenuOpen && (
              <div className="absolute right-0 top-12 bg-white shadow-lg rounded-md text-sm z-50">
                <ul>
                  <li className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    <User className="h-5 w-5" /> Perfil
                  </li>
                  <li className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    <Settings className="h-5 w-5" /> Configuración
                  </li>
                  <li className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    <LogOut className="h-5 w-5" /> Cerrar sesión
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/**Mobile nav */}
        {sidebarOpen && (
          <div className="absolute top-0 left-0 w-full h-screen bg-white z-50 flex flex-col px-6 py-4 shadow-lg md:hidden">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-bold text-xl text-blue-700">AUTOFLOWX</h2>
              <button onClick={() => setSidebarOpen(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="flex flex-col gap-4 text-sm text-gray-600 font-medium">
              {
                navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.path}
                    className="hover:text-blue-600"
                    onClick={() => setSidebarOpen(false)}
                  >
                    {link.name}
                  </a>
                ))
              }
            </nav>
          </div>
        )}
      </header>

      {/* Contenido */}
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  )
}

export default DashboardLayout;