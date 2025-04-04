"use client"

import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const ProtectedRoute = ({ allowedRoles }) => {
  const { user, userRole, loading } = useAuth()
  const location = useLocation()

  // Mientras se verifica la autenticación, mostrar un indicador de carga
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  // Si no hay usuario autenticado, redirigir al login
  if (!user) {
    return <Navigate to="/auth/login" replace state={{ from: location }} />
  }

  // Si se especifican roles permitidos, verificar si el usuario tiene acceso
  if (allowedRoles && allowedRoles.length > 0) {
    const hasPermission = allowedRoles.includes(userRole)

    if (!hasPermission) {
      // Redirigir a una página de acceso denegado
      return <Navigate to="/acceso-denegado" replace />
    }
  }

  // Si todo está bien, renderizar el contenido protegido
  return <Outlet />
}

export default ProtectedRoute

