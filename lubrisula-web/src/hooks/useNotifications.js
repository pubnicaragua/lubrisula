"use client"

import { useContext } from "react"
import NotificationContext from "../context/NotificationContext"

// Hook personalizado para acceder al contexto de notificaciones
const useNotifications = () => {
    const context = useContext(NotificationContext)

    if (!context) {
        throw new Error("useNotifications debe ser usado dentro de un NotificationProvider")
    }

    return context
}

export default useNotifications

