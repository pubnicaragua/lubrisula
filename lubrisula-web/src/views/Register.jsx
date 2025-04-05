import { useForm } from "react-hook-form";
import { supabase } from "../../supabase";
import { useState } from "react";

function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async (data) => {
    setError("");
    setSuccess("");

    if (data.password !== data.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            first_name: data.firstName,
            last_name: data.lastName,
            phone: data.phone,
          },
        },
      });


      if (signUpError) throw signUpError;

      console.log(signUpData)

      setSuccess("Registro exitoso. Por favor, verifica tu correo electrónico.");

    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">Crear cuenta</h2>
      <p className="text-center text-sm text-gray-500 mb-6">Registrate para comenzar a usar AutoFlowX</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div>
          <input
            {...register("firstName", { required: "Nombre requerido" })}
            type="text"
            placeholder="Nombre"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
        </div>

        <div>
          <input
            {...register("lastName", { required: "Apellido requerido" })}
            type="text"
            placeholder="Apellido"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
        </div>

        <div>
          <input
            {...register("email", { required: "Correo requerido" })}
            type="email"
            placeholder="ejemplo@correo.com"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        <div>
          <input
            {...register("phone", { required: "Telefono requerido" })}
            type="tel"
            placeholder="Tu número de teléfono"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
        </div>

        <div>
          <input
            {...register("password", { required: "Contraseña requerida", minLength: 6 })}
            type="password"
            placeholder="Contraseña"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>

        <div>
          <input
            {...register("confirmPassword", { required: "Confirma tu contraseña", minLength: 6 })}
            type="password"
            placeholder="Confirmar contraseña"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-700 hover:bg-blue-800 text-white py-2 rounded-xl font-semibold transition duration-200"
        >
          Registrarse
        </button>

        {success && <p className="text-green-600 text-sm text-center mt-2">{success}</p>}
        {error && <p className="text-red-600 text-sm text-center mt-2">{error}</p>}
      </form>

      <p className="text-sm text-center text-gray-400 mt-6">© 2025 AutoFlowX</p>
    </div>
  );
}

export default Register;
