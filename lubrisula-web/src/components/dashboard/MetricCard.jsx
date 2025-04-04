const MetricCard = ({ title, value, change, icon, className = "" }) => {
    return (
      <div className={`bg-white dark:bg-gray-800 rounded-lg shadow p-6 ${className}`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
          {icon}
        </div>
  
        <div className="flex flex-col">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">{value}</span>
          <span className="text-sm text-gray-500 dark:text-gray-400 mt-1">{change}</span>
        </div>
      </div>
    )
  }
  
  export default MetricCard
  
  