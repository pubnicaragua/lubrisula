const KanbanCard = ({ title, subtitle, className = "" }) => {
    return (
      <div
        className={`p-2 bg-gray-50 dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600 text-xs ${className}`}
      >
        <div className="font-medium">{title}</div>
        <div className="text-gray-500 dark:text-gray-400">{subtitle}</div>
      </div>
    )
  }
  
  export default KanbanCard
  
  