import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import TaskDetailsDrawer from '../components/TaskDetailsDrawer';

const initialData = {
  columns: {
    'col-1': { id: 'col-1', title: 'To Do', taskIds: ['task-1', 'task-2'] },
    'col-2': { id: 'col-2', title: 'In Progress', taskIds: ['task-3'] },
    'col-3': { id: 'col-3', title: 'Review', taskIds: [] },
    'col-4': { id: 'col-4', title: 'Done', taskIds: [] },
  },
  tasks: {
    'task-1': { id: 'task-1', content: 'Design glassmorphism UI components', priority: 'High', assignee: 'R' },
    'task-2': { id: 'task-2', content: 'Set up WebSocket connection', priority: 'Medium', assignee: 'S' },
    'task-3': { id: 'task-3', content: 'Write robust drag and drop logic', priority: 'High', assignee: 'R' },
  },
  columnOrder: ['col-1', 'col-2', 'col-3', 'col-4'],
};

const Board = () => {
  const [data, setData] = useState(initialData);
  const [selectedTask, setSelectedTask] = useState<any>(null);

  const handleTaskClick = (taskId: string) => {
    setSelectedTask(data.tasks[taskId as keyof typeof data.tasks]);
  };

  const handleSaveTask = (updatedTask: any) => {
    setData({
      ...data,
      tasks: {
        ...data.tasks,
        [updatedTask.id]: updatedTask
      }
    });
  };

  const onDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const start = data.columns[source.droppableId as keyof typeof data.columns];
    const finish = data.columns[destination.droppableId as keyof typeof data.columns];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);
      const newColumn = { ...start, taskIds: newTaskIds };
      setData({ ...data, columns: { ...data.columns, [newColumn.id]: newColumn } });
      return;
    }

    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = { ...start, taskIds: startTaskIds };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = { ...finish, taskIds: finishTaskIds };

    setData({
      ...data,
      columns: {
        ...data.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    });
  };

  const getPriorityColor = (priority: string) => {
    if (priority === 'High') return 'bg-rose-500/20 text-rose-300 border-rose-500/30';
    if (priority === 'Low') return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
    return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
  };

  const getColumnColor = (index: number) => {
    const colors = ['bg-blue-500', 'bg-indigo-500', 'bg-purple-500', 'bg-emerald-500'];
    return colors[index % colors.length];
  };

  return (
    <div className="p-8 h-full flex flex-col flex-1 overflow-hidden relative">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Frontend Redesign</h2>
          <p className="text-slate-400 font-light mt-1">Board ID: PRJ-1204</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex -space-x-3">
            {['R', 'S', 'A'].map((initial, i) => (
              <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-700 flex items-center justify-center text-sm font-bold text-white shadow-sm z-10 hover:-translate-y-1 transition-transform cursor-pointer">{initial}</div>
            ))}
          </div>
          <button className="w-10 h-10 rounded-full border border-slate-600 border-dashed flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-400 transition-colors">
            +
          </button>
        </div>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex space-x-6 h-full overflow-x-auto pb-6">
          {data.columnOrder.map((columnId, colIndex) => {
            const column = data.columns[columnId as keyof typeof data.columns];
            const tasks = column.taskIds.map((taskId) => data.tasks[taskId as keyof typeof data.tasks]);

            return (
              <div key={column.id} className="glass-card rounded-2xl min-w-[320px] max-w-[320px] flex flex-col overflow-hidden">
                <div className="p-5 border-b border-slate-700/50 bg-slate-800/40 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full shadow-lg ${getColumnColor(colIndex)}`}></div>
                    <h3 className="font-bold text-white tracking-wide">{column.title}</h3>
                  </div>
                  <span className="text-xs font-bold text-slate-400 bg-slate-800/80 border border-slate-700 px-2.5 py-1 rounded-full">{tasks.length}</span>
                </div>
                
                <Droppable droppableId={column.id}>
                  {(provided, snapshot) => (
                    <div 
                      ref={provided.innerRef} 
                      {...provided.droppableProps} 
                      className={`flex-1 p-4 overflow-y-auto transition-colors duration-200 ${snapshot.isDraggingOver ? 'bg-slate-700/20' : ''}`}
                    >
                      {tasks.map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              onClick={() => handleTaskClick(task.id)}
                              className={`bg-slate-800 p-5 mb-4 rounded-xl border border-slate-600/50 cursor-grab active:cursor-grabbing hover:border-indigo-500/50 hover:shadow-[0_0_15px_rgba(99,102,241,0.15)] transition-all group relative overflow-hidden ${snapshot.isDragging ? 'shadow-2xl shadow-indigo-500/20 scale-105 border-indigo-500 ring-1 ring-indigo-500/50' : 'shadow-lg'}`}
                            >
                              {/* Left accent border */}
                              <div className={`absolute left-0 top-0 bottom-0 w-1 ${getColumnColor(colIndex)} opacity-0 group-hover:opacity-100 transition-opacity`}></div>

                              <div className="flex justify-between items-start mb-3">
                                <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${getPriorityColor(task.priority)}`}>
                                  {task.priority || 'Medium'}
                                </span>
                                <button className="text-slate-500 hover:text-white opacity-0 group-hover:opacity-100 transition-all focus:outline-none">
                                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" /></svg>
                                </button>
                              </div>
                              <p className="text-slate-200 text-sm font-medium leading-relaxed mb-4">{task.content}</p>
                              
                              <div className="flex justify-between items-center mt-auto">
                                <div className="flex items-center gap-1.5 text-slate-500 text-xs font-medium">
                                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                                  <span>2</span>
                                </div>
                                <div className="w-7 h-7 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center text-[10px] font-bold text-white shadow-sm">
                                  {task.assignee || 'R'}
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                      
                      <button className="w-full mt-2 py-3 rounded-xl border border-dashed border-slate-600/50 text-slate-400 text-sm font-medium hover:bg-slate-700/30 hover:text-white hover:border-slate-500 transition-all flex items-center justify-center gap-2">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                        Add Task
                      </button>
                    </div>
                  )}
                </Droppable>
              </div>
            );
          })}
        </div>
      </DragDropContext>

      {selectedTask && (
        <TaskDetailsDrawer 
          task={selectedTask} 
          onClose={() => setSelectedTask(null)} 
          onSave={handleSaveTask} 
        />
      )}
    </div>
  );
};

export default Board;
