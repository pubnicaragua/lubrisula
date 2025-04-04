"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { supabase } from "../../supabase"

function RecuperarPassword() {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage("")
    setError("")
    setLoading(true)

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/cambiar-password`,
      })

      if (error) {
        throw error
      }

      setMessage("Se ha enviado un enlace de recuperación a su correo electrónico.")
    } catch (error) {
      setError(error.message || "Error al enviar el correo de recuperación.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2 className="text-xl font-semibold text-center text-gray-800 mb-6">Recuperar Contraseña</h2>

      <p className="text-sm text-gray-600 mb-6 text-center">
        Ingrese su correo electrónico y le enviaremos un enlace para restablecer su contraseña.
      </p>

      {message && <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md text-sm">{message}</div>}

      {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Correo electrónico
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ejemplo@correo.com"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Enviando..." : "Enviar enlace de recuperación"}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          <Link to="/auth/login" className="text-blue-600 hover:text-blue-800">
            Volver al inicio de sesión
          </Link>
        </p>
      </div>
    </div>
  )
}

export default RecuperarPassword

