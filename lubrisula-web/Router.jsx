import { createBrowserRouter } from "react-router-dom"

import AuthLayout from "./src/layouts/AuthLayout"
import DashboardLayout from "./src/layouts/DashboardLayout"
import ProtectedRoute from "./src/components/ProtectedRoute"

import Login from "./src/views/Login"
import Registro from "./src/views/Registro"
import RecuperarPassword from "./src/views/RecuperarPassword"
import CambiarPassword from "./src/views/CambiarPassword"
import Home from "./src/views/Home"
import Dashboard from "./src/views/Dashboard"
import Cotizaciones from "./src/views/Cotizaciones"
import Clientes from "./src/views/Clientes"
import Vehiculos from "./src/views/Vehiculos"
import Ordenes from "./src/views/Ordenes"
import Inventario from "./src/views/Inventario"
import Kanban from "./src/views/Kanban"
import Reportes from "./src/views/Reportes"
import AccesoDenegado from "./src/views/AccesoDenegado"
import { AuthProvider } from "./src/context/AuthContext"

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "auth",
        element: <AuthLayout />,
        children: [
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "register",
                element: <Registro />,
            },
            {
                path: "recuperar-password",
                element: <RecuperarPassword />,
            },
            {
                path: "cambiar-password",
                element: <CambiarPassword />,
            },
        ],
    },
    {
        path: "/dashboard",
        element: (
            <AuthProvider>
                <ProtectedRoute />
            </AuthProvider>
        ),
        children: [
            {
                path: "",
                element: <DashboardLayout />,
                children: [
                    {
                        path: "",
                        element: <Dashboard />,
                    },
                    {
                        path: "cotizaciones",
                        element: <ProtectedRoute allowedRoles={["admin", "cliente", "aseguradora"]} />,
                        children: [
                            {
                                path: "",
                                element: <Cotizaciones />,
                            },
                        ],
                    },
                    {
                        path: "clientes",
                        element: <ProtectedRoute allowedRoles={["admin", "aseguradora"]} />,
                        children: [
                            {
                                path: "",
                                element: <Clientes />,
                            },
                        ],
                    },
                    {
                        path: "vehiculos",
                        element: <ProtectedRoute allowedRoles={["admin", "cliente", "aseguradora"]} />,
                        children: [
                            {
                                path: "",
                                element: <Vehiculos />,
                            },
                        ],
                    },
                    {
                        path: "ordenes",
                        element: <ProtectedRoute allowedRoles={["admin", "cliente", "tecnico"]} />,
                        children: [
                            {
                                path: "",
                                element: <Ordenes />,
                            },
                        ],
                    },
                    {
                        path: "inventario",
                        element: <ProtectedRoute allowedRoles={["admin", "tecnico"]} />,
                        children: [
                            {
                                path: "",
                                element: <Inventario />,
                            },
                        ],
                    },
                    {
                        path: "kanban",
                        element: <ProtectedRoute allowedRoles={["admin", "tecnico"]} />,
                        children: [
                            {
                                path: "",
                                element: <Kanban />,
                            },
                        ],
                    },
                    {
                        path: "reportes",
                        element: <ProtectedRoute allowedRoles={["admin", "aseguradora"]} />,
                        children: [
                            {
                                path: "",
                                element: <Reportes />,
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        path: "/acceso-denegado",
        element: <AccesoDenegado />,
    },
])

export default router

