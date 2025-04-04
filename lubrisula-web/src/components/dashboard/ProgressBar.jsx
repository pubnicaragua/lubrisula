const ProgressBar = ({ progress, color = "blue", height = "h-2.5" }) => {
    // Asegurarse de que el progreso esté entre 0 y 100
    const safeProgress = Math.min(Math.max(0, progress), 100)
  
    return (
      <div className={`w-full bg-gray-200 dark:bg-gray-700 rounded-full ${height}`}>
        <div
          className={`bg-${color}-500 ${height} rounded-full transition-all duration-300 ease-in-out`}
          style={{ width: `${safeProgress}%` }}
        ></div>
      </div>
    )
  }
  
  export default ProgressBar
  
  