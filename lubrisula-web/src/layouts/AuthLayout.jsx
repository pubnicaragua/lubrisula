import { Outlet } from "react-router-dom"

function AuthLayout() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-sky-50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <div className="flex flex-col items-center mb-6">
          <img src="/logo.png" alt="" />
          <h1 className="text-xl font-bold text-gray-800 uppercase">AUTOFLOWX</h1>
        </div>

        <Outlet />
      </div>

      <footer className="mt-8 text-center text-sm text-gray-600">
        &copy; {new Date().getFullYear()} AutoFlowX. Todos los derechos reservados.
      </footer>
    </div>
  )
}

export default AuthLayout

