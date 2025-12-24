import React from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, Users, Settings, LogOut, Coffee } from 'lucide-react';
import { BRAND_NAME } from '../constants';

export const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('jaitea_auth');
    navigate('/admin/login');
  };

  const navItems = [
    { label: 'Dashboard', icon: <LayoutDashboard size={20} />, href: '/admin' },
    { label: 'Pages & Blogs', icon: <FileText size={20} />, href: '/admin/pages' },
    { label: 'Leads (CRM)', icon: <Users size={20} />, href: '/admin/leads' },
    { label: 'Settings', icon: <Settings size={20} />, href: '/admin/settings' },
  ];

  return (
    <div className="min-h-screen bg-stone-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-earth-900 text-stone-300 flex flex-col fixed h-full">
        <div className="p-6 border-b border-earth-800 flex items-center gap-2 text-white font-bold text-xl">
          <Coffee className="text-primary-500" />
          {BRAND_NAME} <span className="text-xs bg-primary-600 px-2 py-0.5 rounded ml-2">CMS</span>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map(item => (
            <NavLink
              key={item.href}
              to={item.href}
              end={item.href === '/admin'}
              className={({ isActive }) => 
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive 
                  ? 'bg-primary-600 text-white' 
                  : 'hover:bg-earth-800 hover:text-white'
                }`
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-earth-800">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-earth-800 hover:text-red-300 w-full rounded-lg transition-colors"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-earth-900">
            {navItems.find(i => i.href === location.pathname)?.label || 'Admin Panel'}
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-stone-500">Logged in as Admin</span>
            <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-bold">A</div>
          </div>
        </header>
        {children}
      </main>
    </div>
  );
};