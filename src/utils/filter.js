export function filterTasks(tasks, search, dateRange) {
  return tasks.filter(task => {
    const matchesTitle = task.title.toLowerCase().includes(search.toLowerCase());
    let matchesDate = true;
    if (dateRange.start) {
      matchesDate = matchesDate && task.startDate && task.startDate.slice(0, 10) >= dateRange.start;
    }
    if (dateRange.end) {
      matchesDate = matchesDate && task.startDate && task.startDate.slice(0, 10) <= dateRange.end;
    }
    return matchesTitle && matchesDate;
  });
} 