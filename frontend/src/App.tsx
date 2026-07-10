import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Board from './pages/Board';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col relative overflow-hidden">
        {/* Decorative background blobs */}
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-600/20 blur-[100px] pointer-events-none animate-pulse-slow"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-fuchsia-600/10 blur-[120px] pointer-events-none animate-pulse-slow" style={{ animationDelay: '1s' }}></div>

        <header className="glass px-8 py-5 flex items-center justify-between z-10 sticky top-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-gradient">KanbanFlow</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-300 font-medium">Logged in as <span className="text-white">Rushi</span></span>
            <div className="w-10 h-10 rounded-full bg-slate-800 border-2 border-indigo-500/50 flex items-center justify-center font-bold text-indigo-300 shadow-lg cursor-pointer hover:scale-105 transition-transform">
              R
            </div>
          </div>
        </header>
        <main className="flex-1 flex flex-col z-10 relative h-[calc(100vh-80px)] overflow-hidden">
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/boards/:boardId" element={<Board />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
