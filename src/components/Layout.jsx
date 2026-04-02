import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  ArrowUpCircle, 
  ArrowDownCircle, 
  Wallet, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  PieChart as PieChartIcon,
  TrendingUp,
  ShieldCheck,
  Eye
} from 'lucide-react';
import { useTransactions } from '../context/TransactionContext';

export default function Layout({ children }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { state, dispatch } = useTransactions();

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, active: true },
    { name: 'Transactions', icon: Wallet, active: false },
    { name: 'Insights', icon: TrendingUp, active: false },
    { name: 'Settings', icon: Settings, active: false },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-auto
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
              <button
                key={item.name}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                  ${item.active 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}
                `}
              >
                <item.icon size={20} />
                <span className="font-medium">{item.name}</span>
              </button>
            ))}
          </nav>

          <div className="p-4 mt-auto border-t border-gray-100">
            <div className="bg-gray-50 p-2 rounded-2xl flex items-center justify-between mb-4">
              <button 
                onClick={() => dispatch({ type: 'SET_ROLE', payload: 'viewer' })}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-semibold transition-all ${state.role === 'viewer' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500'}`}
              >
                <Eye size={14} /> Viewer
              </button>
              <button 
                onClick={() => dispatch({ type: 'SET_ROLE', payload: 'admin' })}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-semibold transition-all ${state.role === 'admin' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500'}`}
              >
                <ShieldCheck size={14} /> Admin
              </button>
            </div>
            
            <div className="flex items-center gap-3 px-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 border-2 border-white shadow-md" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-900 truncate">Alex Sterling</p>
                <p className="text-xs text-gray-500 truncate capitalize">{state.role} Account</p>
              </div>
              <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                <LogOut size={18} />
              </button>
            </div>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-gray-200 px-4 flex items-center justify-between sticky top-0 z-30">
          <button 
            className="lg:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={24} />
          </button>
          
          <div className="flex-1 max-w-xl mx-4 hidden sm:block">
            <div className="relative group">
              <Menu size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500" />
              <input 
                type="text" 
                placeholder="Search transactions, insights..." 
                className="w-full bg-gray-50 border-none rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
             <div className="flex flex-col items-end mr-2">
               <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Active Mode</span>
               <span className={`text-xs font-bold ${state.role === 'admin' ? 'text-emerald-600' : 'text-blue-600'}`}>
                 {state.role === 'admin' ? 'Full Control' : 'Read Only'}
               </span>
             </div>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
