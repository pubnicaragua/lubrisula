function Kanban () {
    return (
        <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold">Kanban</h1>
            <p className="text-gray-500">Gestión de tareas y proyectos</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-semibold">Tablero Kanban</h2>
            {/* Aquí puedes agregar el contenido del tablero Kanban */}
        </div>
        </div>
    );
}

export default Kanban;