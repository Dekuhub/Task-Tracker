import React, { useState, useEffect } from 'react';
import TaskForm from './TaskForm.jsx';

function Sidebar({ open, onClose, task, onSave, onDelete }) {
  const [formTask, setFormTask] = useState(task || {});

  useEffect(() => {
    setFormTask(task || {});
  }, [task]);

  const handleChange = (field, value) => {
    setFormTask({ ...formTask, [field]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formTask.title) return;
    const now = new Date().toISOString();
    const newTask = {
      ...formTask,
      id: formTask.id || Date.now().toString(),
      startDate: formTask.startDate || now,
      status: formTask.status || 'todo',
    };
    onSave(newTask);
    onClose();
  };

  const handleDelete = () => {
    if (formTask.id) {
      onDelete(formTask.id);
    }
  };

  return (
    <div className={`sidebar${open ? ' open' : ''}`}>
      <div className="sidebar-header">
        <span>{formTask.id ? 'Редактировать задачу' : 'Новая задача'}</span>
        <button className="sidebar-close" onClick={onClose}>&times;</button>
      </div>
      <div className="sidebar-content">
        <form onSubmit={handleSubmit}>
          <TaskForm task={formTask} onChange={handleChange} />
          <div className="form-actions">
            <button className="btn btn-primary" type="submit">Сохранить</button>
            {formTask.id && <button className="btn btn-danger" type="button" onClick={handleDelete}>Удалить</button>}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Sidebar; 