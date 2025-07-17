import React, { useState, useEffect } from 'react';
import './index.css';
import TaskBoard from './components/TaskBoard.jsx';
import Sidebar from './components/Sidebar.jsx';
import SearchBar from './components/SearchBar.jsx';
import { loadTasks, saveTasks } from './utils/storage.js';
import { filterTasks } from './utils/filter.js';

const STATUSES = [
  { key: 'todo', label: 'To Do' },
  { key: 'in_progress', label: 'In Progress' },
  { key: 'ready', label: 'Ready' },
];

function App() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    setTasks(loadTasks());
  }, []);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const handleAddTask = (task) => {
    setTasks([task, ...tasks]);
  };

  const handleUpdateTask = (updated) => {
    setTasks(tasks.map(t => t.id === updated.id ? updated : t));
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
    setSidebarOpen(false);
  };

  const handleOpenSidebar = (task) => {
    setSelectedTask(task);
    setEditingTask(task);
    setSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setSidebarOpen(false);
    setEditingTask(null);
  };

  const handleSearch = (text) => {
    setSearch(text);
  };
  
  const handleDateRange = (range) => setDateRange(range);

  const filteredTasks = filterTasks(tasks, search, dateRange);

  return (
    <div className="container">
      <header className="header">
        <h1>Трекер задач</h1>
      </header>
      <SearchBar
        search={search}
        onSearch={handleSearch}
        dateRange={dateRange}
        onDateRange={handleDateRange}
      />
      <div className="boards-container">
        {STATUSES.map(status => (
          <TaskBoard
            key={status.key}
            status={status.key}
            title={status.label}
            tasks={filteredTasks.filter(t => t.status === status.key)}
            onTaskClick={handleOpenSidebar}
          />
        ))}
      </div>
      <button className="add-task-btn" onClick={() => { setEditingTask(null); setSidebarOpen(true); }}>+</button>
      <Sidebar
        open={sidebarOpen}
        onClose={handleCloseSidebar}
        task={editingTask}
        onSave={editingTask ? handleUpdateTask : handleAddTask}
        onDelete={handleDeleteTask}
      />
      {sidebarOpen && <div className="overlay open" onClick={handleCloseSidebar}></div>}
    </div>
  );
}

export default App; 