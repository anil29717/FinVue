import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ArrowUpCircle, 
  ArrowDownCircle, 
  Wallet, 
  Settings as SettingsIcon, 
  LogOut, 
  Menu, 
  X,
  PieChart as PieChartIcon,
  TrendingUp,
  ShieldCheck,
  Eye,
  User,
  Bell,
  Search,
  Plus
} from 'lucide-react';
import { useTransactions } from '../context/TransactionContext';
import TransactionForm from './TransactionForm';

export default function Layout() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { state, dispatch } = useTransactions();

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { name: 'Transactions', icon: Wallet, path: '/transactions' },
    { name: 'Insights', icon: TrendingUp, path: '/insights' },
    { name: 'Settings', icon: SettingsIcon, path: '/settings' },
  ];

  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden">
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Admin Action Button (Mobile Floating) */}
      {state.role === 'admin' && (
        <button 
          onClick={() => dispatch({ type: 'OPEN_FORM' })}
          className="lg:hidden fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-2xl flex items-center justify-center z-50 animate-bounce group hover:bg-blue-700 transition-all"
        >
          <Plus size={24} className="group-hover:rotate-90 transition-transform duration-300" />
        </button>
      )}

      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 lg:translate-x-0 lg:relative
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="h-full flex flex-col">
          <div className="p-6 flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
              <TrendingUp size={24} />
            </div>
            <span className="text-xl font-bold tracking-tight text-gray-900">FinVue</span>
          </div>

          <nav className="flex-1 px-4 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) => `
                  w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                  ${isActive 
                    ? 'bg-blue-50 text-blue-600 shadow-sm' 
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}
                `}
              >
                <item.icon size={20} />
                <span className="font-medium">{item.name}</span>
              </NavLink>
            ))}
          </nav>

          <div className="p-4 mt-auto border-t border-gray-100">
            <div className="bg-gray-50 p-2 rounded-2xl flex items-center justify-between mb-4">
              <button 
                onClick={() => dispatch({ type: 'SET_ROLE', payload: 'viewer' })}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-semibold transition-all ${state.role === 'viewer' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <Eye size={14} /> Viewer
              </button>
              <button 
                onClick={() => dispatch({ type: 'SET_ROLE', payload: 'admin' })}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-semibold transition-all ${state.role === 'admin' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <ShieldCheck size={14} /> Admin
              </button>
            </div>
            
            <div className="flex items-center gap-3 px-2">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 border-2 border-white shadow-md flex items-center justify-center text-white uppercase font-bold text-sm">
                   AS
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-900 truncate">Alex Sterling</p>
                <div className="flex items-center gap-2">
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{state.role}</p>
                  <span className="text-[10px] bg-gray-100 text-gray-400 px-1.5 py-0.5 rounded font-bold uppercase tracking-tighter">v1.0.0</span>
                </div>
              </div>
              <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                <LogOut size={18} />
              </button>
            </div>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <header className="h-16 bg-white border-b border-gray-200 px-4 flex items-center justify-between sticky top-0 z-30">
          <button 
            className="lg:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={24} />
          </button>
          
          <div className="flex-1 max-w-xl mx-4 hidden sm:block">
            <div className="relative group">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500" />
              <input 
                type="text" 
                placeholder="Search everything..." 
                className="w-full bg-gray-50 border-none rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-blue-500/20 transition-all font-medium"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
             {state.role === 'admin' && (
               <button 
                 onClick={() => dispatch({ type: 'OPEN_FORM' })}
                 className="hidden md:flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all active:scale-95"
               >
                 <Plus size={18} /> New Entry
               </button>
             )}
             <div className="h-8 w-[1px] bg-gray-100 mx-1" />
             <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-xl relative transition-all">
                <Bell size={20} />
                <span className="absolute top-2 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
             </button>
             <div className="flex flex-col items-end">
               <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">System Status</span>
               <span className={`text-xs font-bold ${state.role === 'admin' ? 'text-emerald-600' : 'text-blue-600'}`}>
                 {state.role === 'admin' ? 'Master Control' : 'Read Access'}
               </span>
             </div>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>

      <TransactionForm 
        isOpen={state.isFormOpen} 
        onClose={() => dispatch({ type: 'CLOSE_FORM' })} 
        editingTransaction={state.editingItem}
      />
    </div>
  );
}
