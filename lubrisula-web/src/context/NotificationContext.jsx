"use client"

import { createContext, useState, useContext, useEffect } from "react"
import { supabase } from "../supabase"
import { useAuth } from "./AuthContext"

const NotificationContext = createContext()

export const useNotifications = () => useContext(NotificationContext)

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([])
    const [unreadCount, setUnreadCount] = useState(0)
    const { user } = useAuth()

    // Cargar notificaciones al iniciar sesión
    useEffect(() => {
        if (user) {
            fetchNotifications()

            // Suscribirse a nuevas notificaciones
            const channel = supabase
                .channel("schema-db-changes")
                .on(
                    "postgres_changes",
                    {
                        event: "INSERT",
                        schema: "public",
                        table: "notificaciones",
                        filter: `user_id=eq.${user.id}`,
                    },
                    (payload) => {
                        // Añadir nueva notificación a la lista
                        setNotifications((prev) => [payload.new, ...prev])
                        // Incrementar contador de no leídas
                        if (!payload.new.leida) {
                            setUnreadCount((prev) => prev + 1)
                        }
                    },
                )
                .subscribe()

            return () => {
                supabase.removeChannel(channel)
            }
        }
    }, [user])

    // Obtener notificaciones del usuario
    const fetchNotifications = async () => {
        if (!user) return

        try {
            const { data, error } = await supabase
                .from("notificaciones")
                .select("*")
                .eq("user_id", user.id)
                .order("created_at", { ascending: false })
                .limit(20)

            if (error) {
                throw error
            }

            setNotifications(data || [])
            setUnreadCount(data.filter((n) => !n.leida).length)
        } catch (error) {
            console.error("Error al cargar notificaciones:", error)
        }
    }

    // Marcar notificación como leída
    const markAsRead = async (notificationId) => {
        try {
            const { error } = await supabase.from("notificaciones").update({ leida: true }).eq("id", notificationId)

            if (error) {
                throw error
            }

            // Actualizar estado local
            setNotifications((prev) => prev.map((n) => (n.id === notificationId ? { ...n, leida: true } : n)))
            setUnreadCount((prev) => Math.max(0, prev - 1))
        } catch (error) {
            console.error("Error al marcar notificación como leída:", error)
        }
    }

    // Marcar todas como leídas
    const markAllAsRead = async () => {
        if (!user || notifications.length === 0) return

        try {
            const unreadIds = notifications.filter((n) => !n.leida).map((n) => n.id)

            if (unreadIds.length === 0) return

            const { error } = await supabase.from("notificaciones").update({ leida: true }).in("id", unreadIds)

            if (error) {
                throw error
            }

            // Actualizar estado local
            setNotifications((prev) => prev.map((n) => ({ ...n, leida: true })))
            setUnreadCount(0)
        } catch (error) {
            console.error("Error al marcar todas las notificaciones como leídas:", error)
        }
    }

    // Eliminar notificación
    const deleteNotification = async (notificationId) => {
        try {
            const { error } = await supabase.from("notificaciones").delete().eq("id", notificationId)

            if (error) {
                throw error
            }

            // Actualizar estado local
            const deleted = notifications.find((n) => n.id === notificationId)
            setNotifications((prev) => prev.filter((n) => n.id !== notificationId))

            if (deleted && !deleted.leida) {
                setUnreadCount((prev) => Math.max(0, prev - 1))
            }
        } catch (error) {
            console.error("Error al eliminar notificación:", error)
        }
    }

    const value = {
        notifications,
        unreadCount,
        fetchNotifications,
        markAsRead,
        markAllAsRead,
        deleteNotification,
    }

    return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>
}

export default NotificationContext

