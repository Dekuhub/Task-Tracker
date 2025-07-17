import React from 'react';

function formatDate(date) {
  if (!date) return '';
  return new Date(date).toLocaleDateString();
}

function TaskCard({ task, onClick }) {
  return (
    <div className={`task-card ${task.status.replace('_', '-')}`} onClick={onClick}>
      <div className="task-title">{task.title}</div>
      {task.description && <div className="task-description">{task.description}</div>}
      <div className="task-dates">
        <span>Начало: {formatDate(task.startDate)}</span>
        {task.endDate && <span>Конец: {formatDate(task.endDate)}</span>}
      </div>
    </div>
  );
}

export default TaskCard; 