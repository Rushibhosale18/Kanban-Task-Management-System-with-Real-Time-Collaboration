import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // MOCK implementation
      localStorage.setItem('token', 'fake-jwt-token');
      navigate('/dashboard');
    } catch (err) {
      alert('Failed to authenticate');
    }
  };

  return (
    <div className="flex items-center justify-center h-[calc(100vh-80px)] relative w-full z-10">
      <div className="glass p-10 rounded-3xl w-full max-w-md relative overflow-hidden">
        {/* Decorative corner glow */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-500/30 rounded-full blur-2xl"></div>

        <div className="text-center mb-8 relative z-10">
          <h2 className="text-3xl font-extrabold text-white mb-2">{isLogin ? 'Welcome back' : 'Create an account'}</h2>
          <p className="text-slate-400 font-light">{isLogin ? 'Enter your details to access your workspace.' : 'Sign up to start collaborating in real-time.'}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Full Name</label>
              <input type="text" required className="block w-full rounded-xl border border-slate-600/50 bg-slate-800/50 text-white placeholder-slate-500 px-4 py-3 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors outline-none" placeholder="John Doe" />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Email address</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="block w-full rounded-xl border border-slate-600/50 bg-slate-800/50 text-white placeholder-slate-500 px-4 py-3 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors outline-none" placeholder="you@company.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="block w-full rounded-xl border border-slate-600/50 bg-slate-800/50 text-white placeholder-slate-500 px-4 py-3 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors outline-none" placeholder="••••••••" />
          </div>
          <button type="submit" className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 px-4 rounded-xl font-bold shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] transition-all duration-300 mt-2">
            {isLogin ? 'Sign in to workspace' : 'Get started'}
          </button>
        </form>
        <div className="mt-6 text-center relative z-10">
          <button onClick={() => setIsLogin(!isLogin)} className="text-slate-400 text-sm hover:text-indigo-400 transition-colors font-medium">
            {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Log in'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
