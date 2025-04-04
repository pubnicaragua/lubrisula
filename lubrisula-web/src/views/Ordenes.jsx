"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import { supabase } from "../../supabase"
import { Eye, FileEdit, Trash } from "lucide-react"
import RoleBasedComponent from "../components/RoleBasedComponent"

function Ordenes() {
    const [ordenes, setOrdenes] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const { user, userRole } = useAuth()

    useEffect(() => {
        const fetchOrdenes = async () => {
            try {
                setLoading(true)
                let query = supabase.from("ordenes_trabajo").select(`
          id,
          descripcion,
          costo,
          estado,
          fecha_creacion,
          vehiculos (id, marca, modelo, placa),
          cliente_id
        `)

                // Filtrar por cliente si el usuario es un cliente
                if (userRole === "cliente") {
                    // Obtener el ID del cliente asociado al usuario
                    const { data: clienteData, error: clienteError } = await supabase
                        .from("clientes")
                        .select("id")
                        .eq("correo", user.email)
                        .single()

                    if (clienteError && clienteError.code !== "PGRST116") {
                        throw clienteError
                    }

                    if (clienteData) {
                        query = query.eq("cliente_id", clienteData.id)
                    }
                }

                // Filtrar por técnico si el usuario es un técnico
                if (userRole === "tecnico") {
                    // Obtener el ID del técnico asociado al usuario
                    const { data: tecnicoData, error: tecnicoError } = await supabase
                        .from("tecnicos")
                        .select("id")
                        .eq("correo", user.email)
                        .single()

                    if (tecnicoError && tecnicoError.code !== "PGRST116") {
                        throw tecnicoError
                    }

                    if (tecnicoData) {
                        query = query.eq("tecnico_id", tecnicoData.id)
                    }
                }

                const { data, error } = await query

                if (error) {
                    throw error
                }

                setOrdenes(data || [])
            } catch (error) {
                console.error("Error al cargar órdenes:", error)
                setError("No se pudieron cargar las órdenes. Por favor, intenta de nuevo más tarde.")
            } finally {
                setLoading(false)
            }
        }

        fetchOrdenes()
    }, [user, userRole])

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Error:</strong>
                <span className="block sm:inline"> {error}</span>
            </div>
        )
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Órdenes de Servicio</h1>

                <RoleBasedComponent allowedRoles={["admin", "tecnico"]}>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2">
                        <span>Nueva Orden</span>
                    </button>
                </RoleBasedComponent>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Nº Orden
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Vehículo
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Descripción
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Fecha
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Estado
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Total
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            {ordenes.length > 0 ? (
                                ordenes.map((orden) => (
                                    <tr key={orden.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                            {orden.id.substring(0, 8)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                            {orden.vehiculos
                                                ? `${orden.vehiculos.marca} ${orden.vehiculos.modelo} (${orden.vehiculos.placa})`
                                                : "N/A"}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300 max-w-xs truncate">
                                            {orden.descripcion}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                            {new Date(orden.fecha_creacion).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${orden.estado === "Pendiente"
                                                        ? "bg-yellow-100 text-yellow-800"
                                                        : orden.estado === "En Proceso"
                                                            ? "bg-blue-100 text-blue-800"
                                                            : "bg-green-100 text-green-800"
                                                    }`}
                                            >
                                                {orden.estado}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                            L {orden.costo?.toFixed(2) || "0.00"}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex space-x-2">
                                                <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                                                    <Eye className="w-5 h-5" />
                                                </button>

                                                <RoleBasedComponent allowedRoles={["admin", "tecnico"]}>
                                                    <button className="text-yellow-600 hover:text-yellow-900 dark:text-yellow-400 dark:hover:text-yellow-300">
                                                        <FileEdit className="w-5 h-5" />
                                                    </button>
                                                </RoleBasedComponent>

                                                <RoleBasedComponent allowedRoles={["admin"]}>
                                                    <button className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                                                        <Trash className="w-5 h-5" />
                                                    </button>
                                                </RoleBasedComponent>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                                        No hay órdenes disponibles
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Ordenes

