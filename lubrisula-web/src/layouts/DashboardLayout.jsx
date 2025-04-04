"use client"

import { useState, useEffect } from "react"
import { Outlet, useNavigate, Link } from "react-router-dom"
import { Car, Sun, Moon, LogOut, User, ChevronDown } from "lucide-react"
import { useAuth } from "../context/AuthContext"

// Definición de navegación por rol
const navigationByRole = {
  admin: [
    { id: 1, name: "Dashboard", path: "/dashboard" },
    { id: 2, name: "Cotizaciones", path: "/dashboard/cotizaciones" },
    { id: 3, name: "Clientes", path: "/dashboard/clientes" },
    { id: 4, name: "Vehículos", path: "/dashboard/vehiculos" },
    { id: 5, name: "Ordenes", path: "/dashboard/ordenes" },
    { id: 6, name: "Inventario", path: "/dashboard/inventario" },
    { id: 7, name: "Kanban", path: "/dashboard/kanban" },
    { id: 8, name: "Reportes", path: "/dashboard/reportes" },
  ],
  cliente: [
    { id: 1, name: "Dashboard", path: "/dashboard" },
    { id: 2, name: "Mis Vehículos", path: "/dashboard/vehiculos" },
    { id: 3, name: "Mis Cotizaciones", path: "/dashboard/cotizaciones" },
    { id: 4, name: "Mis Órdenes", path: "/dashboard/ordenes" },
  ],
  tecnico: [
    { id: 1, name: "Dashboard", path: "/dashboard" },
    { id: 2, name: "Órdenes", path: "/dashboard/ordenes" },
    { id: 3, name: "Inventario", path: "/dashboard/inventario" },
    { id: 4, name: "Kanban", path: "/dashboard/kanban" },
  ],
  aseguradora: [
    { id: 1, name: "Dashboard", path: "/dashboard" },
    { id: 2, name: "Clientes", path: "/dashboard/clientes" },
    { id: 3, name: "Vehículos", path: "/dashboard/vehiculos" },
    { id: 4, name: "Cotizaciones", path: "/dashboard/cotizaciones" },
    { id: 5, name: "Reportes", path: "/dashboard/reportes" },
  ],
}

function DashboardLayout() {
  const { user, userRole, logout } = useAuth()
  const [darkMode, setDarkMode] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const navigate = useNavigate()

  // Obtener la navegación según el rol del usuario
  const navigation = userRole ? navigationByRole[userRole] || [] : []

  // Efecto para aplicar el tema oscuro
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const handleLogout = async () => {
    const { success, redirectTo } = await logout()
    if (success) {
      navigate(redirectTo)
    }
  }

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } transition-all duration-300 ease-in-out bg-gray-800 text-white flex flex-col`}
      >
        {/* Logo */}
        <div className="flex items-center gap-2 p-4 bg-gray-900">
          <Car className="w-10 h-10" />
          {sidebarOpen && <h1 className="text-xl font-bold">AUTOFLOWX</h1>}
        </div>

        {/* Navegación */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="flex flex-col gap-1 px-2">
            {navigation.map((item) => (
              <li key={item.id}>
                <Link
                  to={item.path}
                  className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
                >
                  {item.icon && <item.icon className="w-5 h-5" />}
                  {sidebarOpen && <span>{item.name}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            {sidebarOpen && <span>Cerrar Sesión</span>}
          </button>
        </div>
      </aside>

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm z-10">
          <div className="flex items-center justify-between px-4 py-3">
            <button onClick={toggleSidebar} className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <div className="flex items-center gap-4">
              {/* Botón de tema */}
              <button onClick={toggleDarkMode} className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700">
                {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
              </button>

              {/* Menú de usuario */}
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                    <User className="w-5 h-5" />
                  </div>
                  {userRole && (
                    <div className="flex items-center">
                      <span className="text-sm font-medium capitalize">{userRole}</span>
                      <ChevronDown className="w-4 h-4 ml-1" />
                    </div>
                  )}
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-20 border dark:border-gray-700">
                    <div className="px-4 py-2 border-b dark:border-gray-700">
                      <p className="text-sm font-medium">{user?.email}</p>
                      <p className="text-xs text-gray-500 capitalize">{userRole}</p>
                    </div>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Perfil
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Configuración
                    </a>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Cerrar sesión
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Contenido principal */}
        <main className="flex-1 overflow-y-auto p-4 bg-gray-100 dark:bg-gray-900">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout

