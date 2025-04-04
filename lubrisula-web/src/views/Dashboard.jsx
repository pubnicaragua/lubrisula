"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import { Activity, Car, Calendar, FileCheck, Download, PlusCircle } from "lucide-react"
import RoleBasedComponent from "../components/RoleBasedComponent"
import { Link } from "react-router-dom"
import MetricCard from "../components/dashboard/MetricCard"
import ProgressBar from "../components/dashboard/ProgressBar"
import KanbanCard from "../components/dashboard/KanbanCard"

function Dashboard() {
    const { userRole } = useAuth()
    const [stats, setStats] = useState({
        serviciosActivos: { total: 15, cambio: "+2 desde ayer" },
        vehiculosRegistrados: { total: 42, cambio: "+5 desde la semana pasada" },
        citasPendientes: { total: 8, cambio: "3 para hoy" },
        ordenesCompletadas: { total: 324, cambio: "+18 este mes" },
    })

    const [ordenesActivas, setOrdenesActivas] = useState([
        {
            id: 1,
            cliente: "Juan Pérez",
            vehiculo: "Toyota Corolla",
            servicio: "Reparación Mayor",
            progreso: 75,
            color: "blue",
        },
        { id: 2, cliente: "Ana López", vehiculo: "Honda Civic", servicio: "Pintura General", progreso: 45, color: "blue" },
        {
            id: 3,
            cliente: "Grupo Logístico XYZ",
            vehiculo: "Ford Explorer",
            servicio: "Mantenimiento",
            progreso: 90,
            color: "green",
        },
        {
            id: 4,
            cliente: "María Rodríguez",
            vehiculo: "Nissan Sentra",
            servicio: "Diagnóstico",
            progreso: 20,
            color: "yellow",
        },
    ])

    const [kanbanTareas, setKanbanTareas] = useState({
        recepcion: [
            { id: 1, vehiculo: "Toyota RAV4", tarea: "Diagnóstico inicial" },
            { id: 2, vehiculo: "Kia Sportage", tarea: "Revisión" },
        ],
        enProceso: [
            { id: 3, vehiculo: "Honda Civic", tarea: "Pintura" },
            { id: 4, vehiculo: "Ford Explorer", tarea: "Mantenimiento" },
        ],
        terminado: [{ id: 5, vehiculo: "Mazda 3", tarea: "Entrega hoy" }],
    })

    const [activeTab, setActiveTab] = useState("General")

    // Aquí podrías cargar datos reales desde Supabase
    useEffect(() => {
        // Ejemplo de cómo cargar datos (comentado para usar datos de prueba)
        /*
        const fetchDashboardData = async () => {
          try {
            // Obtener servicios activos
            const { data: serviciosData, error: serviciosError } = await supabase
              .from('ordenes_trabajo')
              .select('count')
              .eq('estado', 'En Proceso');
              
            if (serviciosError) throw serviciosError;
            
            // Actualizar el estado con datos reales
            // setStats({ ... })
            
          } catch (error) {
            console.error('Error al cargar datos del dashboard:', error);
          }
        };
        
        fetchDashboardData();
        */
    }, [])

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Dashboard</h1>

                <div className="flex gap-2">
                    <RoleBasedComponent allowedRoles={["admin", "aseguradora"]}>
                        <Link
                            to="/dashboard/reportes"
                            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:text-white transition-colors"
                        >
                            <Download className="w-5 h-5" />
                            <span>Descargar Reportes</span>
                        </Link>
                    </RoleBasedComponent>

                    <RoleBasedComponent allowedRoles={["admin", "tecnico"]}>
                        <Link
                            to="/dashboard/ordenes"
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 transition-colors"
                        >
                            <PlusCircle className="w-5 h-5" />
                            <span>Nueva Orden</span>
                        </Link>
                    </RoleBasedComponent>
                </div>
            </div>

            {/* Pestañas */}
            <div className="flex border-b border-gray-200 dark:border-gray-700">
                {["General", "Ordenes", "Vehiculos", "Clientes"].map((tab) => (
                    <button
                        key={tab}
                        className={`px-4 py-2 font-medium text-sm ${activeTab === tab
                            ? "text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400"
                            : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                            }`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Tarjetas de métricas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard
                    title="Servicios Activos"
                    value={stats.serviciosActivos.total}
                    change={stats.serviciosActivos.cambio}
                    icon={<Activity className="w-5 h-5 text-blue-500" />}
                />

                <MetricCard
                    title="Vehículos Registrados"
                    value={stats.vehiculosRegistrados.total}
                    change={stats.vehiculosRegistrados.cambio}
                    icon={<Car className="w-5 h-5 text-indigo-500" />}
                />

                <MetricCard
                    title="Citas Pendientes"
                    value={stats.citasPendientes.total}
                    change={stats.citasPendientes.cambio}
                    icon={<Calendar className="w-5 h-5 text-yellow-500" />}
                />

                <MetricCard
                    title="Órdenes Completadas"
                    value={stats.ordenesCompletadas.total}
                    change={stats.ordenesCompletadas.cambio}
                    icon={<FileCheck className="w-5 h-5 text-green-500" />}
                />
            </div>

            {/* Contenido principal */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                {/* Progreso de Órdenes Activas */}
                <div className="lg:col-span-3 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Progreso de Órdenes Activas</h2>

                    <div className="space-y-6">
                        {ordenesActivas.map((orden) => (
                            <div key={orden.id} className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-3 h-3 rounded-full bg-${orden.color}-500`}></div>
                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            {orden.vehiculo} - {orden.servicio}
                                        </span>
                                    </div>
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{orden.progreso}%</span>
                                </div>

                                <ProgressBar progress={orden.progreso} color={orden.color} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Tablero Kanban */}
                <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Tablero Kanban</h2>

                        <Link
                            to="/dashboard/kanban"
                            className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                            Ver completo
                        </Link>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                        {/* Columna: Recepción */}
                        <div className="space-y-2">
                            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 pb-2 border-b dark:border-gray-700">
                                Recepción
                            </h3>

                            {kanbanTareas.recepcion.map((tarea) => (
                                <KanbanCard key={tarea.id} title={tarea.vehiculo} subtitle={tarea.tarea} />
                            ))}
                        </div>

                        {/* Columna: En Proceso */}
                        <div className="space-y-2">
                            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 pb-2 border-b dark:border-gray-700">
                                En Proceso
                            </h3>

                            {kanbanTareas.enProceso.map((tarea) => (
                                <KanbanCard key={tarea.id} title={tarea.vehiculo} subtitle={tarea.tarea} />
                            ))}
                        </div>

                        {/* Columna: Terminado */}
                        <div className="space-y-2">
                            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 pb-2 border-b dark:border-gray-700">
                                Terminado
                            </h3>

                            {kanbanTareas.terminado.map((tarea) => (
                                <KanbanCard key={tarea.id} title={tarea.vehiculo} subtitle={tarea.tarea} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard

