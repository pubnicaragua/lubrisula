"use client"

import { useAuth } from "../context/AuthContext"

// Componente que muestra contenido basado en el rol del usuario
const RoleBasedComponent = ({ children, allowedRoles, fallback = null }) => {
  const { userRole, loading } = useAuth()

  if (loading) {
    return null
  }

  // Verificar si el rol del usuario está en la lista de roles permitidos
  const hasAccess = allowedRoles.includes(userRole)

  // Si tiene acceso, mostrar el contenido, de lo contrario mostrar el fallback
  return hasAccess ? children : fallback
}

export default RoleBasedComponent

