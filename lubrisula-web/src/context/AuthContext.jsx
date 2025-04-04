"use client"

import { createContext, useState, useEffect, useContext } from "react"
import { supabase } from "../../supabase"

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

// Versión del AuthProvider que no usa useNavigate directamente
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [userRole, setUserRole] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Verificar sesión actual al cargar
    const checkSession = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession()

        if (error) {
          throw error
        }

        if (session) {
          setUser(session.user)
          // Obtener el rol del usuario
          await fetchUserRole(session.user.id)
        }
      } catch (error) {
        console.error("Error al verificar sesión:", error)
      } finally {
        setLoading(false)
      }
    }

    checkSession()

    // Suscribirse a cambios en la autenticación
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session) {
        setUser(session.user)
        await fetchUserRole(session.user.id)
      } else {
        setUser(null)
        setUserRole(null)
      }
      setLoading(false)
    })

    return () => {
      if (authListener) authListener.subscription.unsubscribe()
    }
  }, [])

  // Función para obtener el rol del usuario desde la base de datos
  const fetchUserRole = async (userId) => {
    try {
      const { data, error } = await supabase
        .from("roles_usuario")
        .select("rol_id, roles(nombre)")
        .eq("user_id", userId)
        .single()

      if (error) {
        throw error
      }

      if (data) {
        setUserRole(data.roles.nombre)
      }
    } catch (error) {
      console.error("Error al obtener el rol del usuario:", error)
    }
  }

  // Función para iniciar sesión
  const login = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        throw error
      }

      return { success: true, data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  // Función para registrar un nuevo usuario
  const register = async (email, password, userData) => {
    try {
      // 1. Registrar el usuario en Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      })

      if (authError) {
        throw authError
      }

      // 2. Crear perfil de usuario con rol predeterminado (cliente)
      if (authData.user) {
        // Crear perfil de usuario
        const { error: profileError } = await supabase.from("perfil_usuario").insert([
          {
            auth_id: authData.user.id,
            nombre: userData.nombre,
            apellido: userData.apellido,
            correo: email,
            telefono: userData.telefono,
            estado: true,
          },
        ])

        if (profileError) {
          throw profileError
        }

        // Asignar rol (por defecto cliente - id 2)
        const { error: roleError } = await supabase.from("roles_usuario").insert([
          {
            user_id: authData.user.id,
            rol_id: 2, // ID del rol 'cliente'
          },
        ])

        if (roleError) {
          throw roleError
        }
      }

      return { success: true, data: authData }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  // Función para cerrar sesión
  const logout = async (redirectTo = "/auth/login") => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) {
        throw error
      }
      // No usamos navigate aquí, en su lugar devolvemos la ruta a la que redirigir
      return { success: true, redirectTo }
    } catch (error) {
      console.error("Error al cerrar sesión:", error)
      return { success: false, error: error.message }
    }
  }

  // Verificar si el usuario tiene un rol específico
  const hasRole = (roles) => {
    if (!userRole) return false

    if (Array.isArray(roles)) {
      return roles.includes(userRole)
    }

    return userRole === roles
  }

  const value = {
    user,
    userRole,
    loading,
    login,
    register,
    logout,
    hasRole,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContext

