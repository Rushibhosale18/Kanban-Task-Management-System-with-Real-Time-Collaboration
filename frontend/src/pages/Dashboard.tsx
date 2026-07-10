import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const projects = [
    { id: '1', name: 'Frontend Redesign', description: 'Revamp the main website architecture', progress: 75, members: ['R', 'S'] },
    { id: '2', name: 'Backend Migration', description: 'Move to microservices in Node.js', progress: 30, members: ['A'] },
    { id: '3', name: 'Marketing Campaign', description: 'Q3 Product launch assets', progress: 90, members: ['R', 'J', 'M'] }
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto w-full h-full overflow-y-auto">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-4xl font-extrabold text-white tracking-tight mb-2">Projects Overview</h2>
          <p className="text-slate-400 font-light">Select a workspace to manage your tasks.</p>
        </div>
        <button className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-105 transition-all duration-300 flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          New Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {projects.map((project, idx) => (
          <div key={project.id} 
               className="glass-card p-6 rounded-2xl cursor-pointer group relative overflow-hidden"
               onClick={() => navigate(`/boards/${project.id}`)}>
            
            {/* Subtle glow effect behind card */}
            <div className={`absolute -right-10 -top-10 w-40 h-40 rounded-full blur-[60px] opacity-20 pointer-events-none ${idx % 2 === 0 ? 'bg-indigo-500' : 'bg-fuchsia-500'}`}></div>

            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-xl bg-slate-700/50 flex items-center justify-center border border-slate-600/50 group-hover:bg-indigo-500/20 transition-colors">
                <svg className={`w-6 h-6 ${idx % 2 === 0 ? 'text-indigo-400' : 'text-fuchsia-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <div className="flex -space-x-2">
                {project.members.map((m, i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-800 bg-slate-700 flex items-center justify-center text-xs font-bold text-white shadow-sm z-10">{m}</div>
                ))}
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">{project.name}</h3>
            <p className="text-slate-400 text-sm font-light mb-6 line-clamp-2">{project.description}</p>
            
            <div className="w-full bg-slate-700/50 rounded-full h-1.5 mb-2 overflow-hidden">
              <div className={`h-1.5 rounded-full ${idx % 2 === 0 ? 'bg-gradient-to-r from-indigo-500 to-blue-400' : 'bg-gradient-to-r from-fuchsia-500 to-pink-400'}`} style={{ width: `${project.progress}%` }}></div>
            </div>
            <div className="flex justify-between text-xs text-slate-400 font-medium">
              <span>Progress</span>
              <span>{project.progress}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
