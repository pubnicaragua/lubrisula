import { createBrowserRouter } from "react-router-dom"

import AuthLayout from "./src/layouts/AuthLayout"
import DashboardLayout from "./src/layouts/DashboardLayout"
// import ProtectedRoute from "./src/components/ProtectedRoute"

import Login from "./src/views/Login"
import Registro from "./src/views/Register"
// import RecoverPassword from "./src/views/RecoverPassword"
// import ChangePassword from "./src/views/ChangePassword"
import Home from "./src/views/Home"
import Dashboard from "./src/views/Dashboard"
// import Quotations from "./src/views/Quotations"
// import Clients from "./src/views/Clients"
// import Vehicles from "./src/views/Vehicles"
// import Orders from "./src/views/Orders"
// import Inventory from "./src/views/Inventory"
// import Kanban from "./src/views/Kanban"
// import Reports from "./src/views/Reports"
// import DeniedAccess from "./src/views/DeniedAccess"

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path: "auth",
        element: <AuthLayout />,
        children: [
            {
                path: "login",
                element: <Login />
            },
            {
                path: "registro",
                element: <Registro />
            }
        ]
    },
    {
        path: "admin",
        element: <DashboardLayout />,
        children: [
            {
                path: "dashboard",
                element: <Dashboard />,
            }
        ]
    }

])

export default router

