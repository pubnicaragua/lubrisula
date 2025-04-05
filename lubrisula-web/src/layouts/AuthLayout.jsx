import { Outlet } from "react-router-dom"

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 flex items-center justify-center px-4">
      <div className="w-full max-w-4xl flex bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="hidden md:flex w-1/2 bg-gradient-to-br from-blue-900 to-blue-700 text-white flex-col items-center justify-center p-10">
          <img src="/autoflowx.png" alt="Logo AutoFlowX" className="h-48 mb-6" />
          <h2 className="text-3xl font-bold">AutoFlowX</h2>
          <p className="text-center mt-2">Optimiza tu flota, simplifica tu taller</p>
        </div>
        <div className="w-full md:w-1/2 p-8">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
