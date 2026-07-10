import React, { useState } from 'react';

const TaskDetailsDrawer = ({ task, onClose, onSave }: any) => {
  const [title, setTitle] = useState(task.content);
  const [description, setDescription] = useState(task.description || '');
  const [priority, setPriority] = useState(task.priority || 'Medium');

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity" aria-hidden="true" onClick={onClose}></div>
        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-md w-full">
          <div className="pointer-events-auto w-full max-w-md transform transition-transform duration-300 ease-in-out shadow-2xl glass border-l border-slate-700/50">
            
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="flex h-full flex-col overflow-y-scroll relative z-10">
              <div className="px-6 py-6 flex items-start justify-between border-b border-slate-700/50 bg-slate-800/30">
                <h2 className="text-2xl font-bold text-white tracking-tight" id="slide-over-title">Task Details</h2>
                <div className="ml-3 flex h-7 items-center">
                  <button type="button" onClick={onClose} className="rounded-full bg-slate-800/80 p-1.5 text-slate-400 hover:text-white hover:bg-slate-700 focus:outline-none transition-colors border border-slate-600/50">
                    <span className="sr-only">Close panel</span>
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="relative mt-6 flex-1 px-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">Task Title</label>
                  <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="block w-full rounded-xl border border-slate-600/50 bg-slate-800/50 text-white placeholder-slate-500 px-4 py-2.5 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">Description</label>
                  <textarea rows={5} value={description} onChange={(e) => setDescription(e.target.value)} className="block w-full rounded-xl border border-slate-600/50 bg-slate-800/50 text-white placeholder-slate-500 px-4 py-3 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors outline-none resize-none" placeholder="Add a more detailed description..." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">Priority</label>
                  <select value={priority} onChange={(e) => setPriority(e.target.value)} className="block w-full rounded-xl border border-slate-600/50 bg-slate-800/50 text-white px-4 py-2.5 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors outline-none appearance-none">
                    <option value="Low" className="bg-slate-800">Low Priority</option>
                    <option value="Medium" className="bg-slate-800">Medium Priority</option>
                    <option value="High" className="bg-slate-800">High Priority</option>
                  </select>
                </div>
                <div className="pt-8">
                  <button onClick={() => { onSave({ ...task, content: title, description, priority }); onClose(); }} className="w-full inline-flex justify-center rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 py-3 px-4 text-sm font-bold text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] focus:outline-none transition-all duration-300">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsDrawer;
