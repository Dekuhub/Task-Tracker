import React from 'react';
import TaskCard from './TaskCard.jsx';

function TaskBoard({ status, title, tasks, onTaskClick }) {
  return (
    <div className={`board ${status.replace('_', '-')}`}>
      <div className="board-header">
        <span className="board-title">{title}</span>
        <span className="board-count">{tasks.length}</span>
      </div>
      <div className="tasks-list">
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} onClick={() => onTaskClick(task)} />
        ))}
      </div>
    </div>
  );
}

export default TaskBoard; 