import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { supabase } from '../../supabase';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setError("");

    const { email, password } = data;

    const { error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (loginError) {
      setError("Credenciales inválidas. Intenta de nuevo.");
    } else {
      navigate("/admin/dashboard");
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">
        Bienvenido de nuevo
      </h2>
      <p className="text-center text-sm text-gray-500 mb-6">
        Ingresa tus credenciales para continuar
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Correo electrónico
          </label>
          <input
            type="email"
            {...register("email", { required: "Correo requerido" })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="ejemplo@correo.com"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Contraseña
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", { required: "Contraseña requerida" })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-gray-500 text-sm"
            >
              {showPassword ? "Ocultar" : "Mostrar"}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-700 hover:bg-blue-800 text-white py-2 rounded-xl font-semibold transition duration-200"
        >
          Iniciar Sesión
        </button>

        {error && <p className="text-red-600 text-sm text-center mt-2">{error}</p>}
      </form>

      <p className="text-sm text-center text-gray-400 mt-4">
        © 2025 AutoFlowX
      </p>
    </>
  );
}
