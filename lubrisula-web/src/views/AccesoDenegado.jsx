"use client"

import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { ShieldAlert } from "lucide-react"

function AccesoDenegado() {
  const navigate = useNavigate()
  const { userRole } = useAuth()

  // Determinar a dónde redirigir según el rol
  const handleRedirect = () => {
    switch (userRole) {
      case "admin":
        navigate("/dashboard")
        break
      case "cliente":
        navigate("/dashboard/vehiculos")
        break
      case "tecnico":
        navigate("/dashboard/ordenes")
        break
      case "aseguradora":
        navigate("/dashboard/clientes")
        break
      default:
        navigate("/")
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <ShieldAlert className="w-16 h-16 mx-auto text-red-500 mb-4" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Acceso Denegado</h1>
        <p className="text-gray-600 mb-6">
          No tienes permisos para acceder a esta sección. Esta área está restringida para usuarios con roles
          específicos.
        </p>
        <button
          onClick={handleRedirect}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Volver a una página accesible
        </button>
      </div>
    </div>
  )
}

export default AccesoDenegado

