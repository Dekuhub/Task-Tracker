import React from 'react';

function TaskForm({ task, onChange }) {
  return (
    <>
      <div className="form-group">
        <label className="form-label">Название *</label>
        <input
          className="form-input"
          type="text"
          value={task.title || ''}
          onChange={e => onChange('title', e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label className="form-label">Описание</label>
        <textarea
          className="form-textarea"
          value={task.description || ''}
          onChange={e => onChange('description', e.target.value)}
        />
      </div>
      <div className="form-group">
        <label className="form-label">Дата начала</label>
        <input
          className="form-input"
          type="datetime-local"
          value={task.startDate ? task.startDate.slice(0, 16) : ''}
          onChange={e => onChange('startDate', e.target.value)}
        />
      </div>
      <div className="form-group">
        <label className="form-label">Дата окончания</label>
        <input
          className="form-input"
          type="datetime-local"
          value={task.endDate ? task.endDate.slice(0, 16) : ''}
          onChange={e => onChange('endDate', e.target.value)}
        />
      </div>
      <div className="form-group">
        <label className="form-label">Статус</label>
        <select
          className="form-select"
          value={task.status || 'todo'}
          onChange={e => onChange('status', e.target.value)}
        >
          <option value="todo">To Do</option>
          <option value="in_progress">In Progress</option>
          <option value="ready">Ready</option>
        </select>
      </div>
    </>
  );
}

export default TaskForm; 