import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  ArrowUpDown, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  Plus, 
  ArrowUpRight, 
  ArrowDownLeft 
} from 'lucide-react';
import { useTransactions } from '../context/TransactionContext';
import { toast } from 'react-toastify';

export default function TransactionList({ onEdit, onAdd }) {
  const { state, dispatch } = useTransactions();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });

  const filteredTransactions = useMemo(() => {
    return state.transactions
      .filter((t) => {
        const matchesSearch = t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            t.category.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = filterType === 'all' || t.type === filterType;
        return matchesSearch && matchesType;
      })
      .sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
  }, [state.transactions, searchTerm, filterType, sortConfig]);

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      dispatch({ type: 'DELETE_TRANSACTION', payload: id });
      toast.success('Transaction deleted successfully');
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mt-8">
      <div className="p-6 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h3 className="text-lg font-bold text-gray-900">Recent Transactions</h3>
        
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative group flex-1 md:flex-none md:w-64">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500" />
            <input 
              type="text" 
              placeholder="Search..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-50 border-none rounded-xl py-2 pl-9 pr-4 text-sm focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <div className="bg-gray-50 p-1 rounded-xl flex items-center">
            {['all', 'income', 'expense'].map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`
                  px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all
                  ${filterType === type ? 'bg-white shadow-sm text-blue-600' : 'text-gray-400'}
                `}
              >
                {type}
              </button>
            ))}
          </div>

          {state.role === 'admin' && (
            <button 
              onClick={onAdd}
              className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-xl flex items-center gap-2 text-sm font-bold shadow-lg shadow-blue-200"
            >
              <Plus size={18} /> <span className="hidden sm:inline">Add</span>
            </button>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-50 text-[10px] uppercase tracking-widest font-bold text-gray-400">
              <th className="px-6 py-4 cursor-pointer hover:text-blue-600" onClick={() => requestSort('date')}>
                <div className="flex items-center gap-1">Date <ArrowUpDown size={12} /></div>
              </th>
              <th className="px-6 py-4">Description</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4 cursor-pointer hover:text-blue-600 text-right" onClick={() => requestSort('amount')}>
                <div className="flex items-center gap-1 justify-end">Amount <ArrowUpDown size={12} /></div>
              </th>
              {state.role === 'admin' && <th className="px-6 py-4 text-center">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filteredTransactions.map((t) => (
              <tr key={t.id} className="group hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 text-sm text-gray-500 font-medium">
                  {new Date(t.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${t.type === 'income' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                      {t.type === 'income' ? <ArrowDownLeft size={16} /> : <ArrowUpRight size={16} />}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">{t.description}</p>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">{t.type}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-block px-2 py-1 rounded-lg text-[10px] font-bold bg-gray-100 text-gray-600">
                    {t.category}
                  </span>
                </td>
                <td className={`px-6 py-4 text-sm font-bold text-right ${t.type === 'income' ? 'text-emerald-600' : 'text-gray-900'}`}>
                  {t.type === 'income' ? '+' : '-'}${Number(t.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </td>
                {state.role === 'admin' && (
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => onEdit(t)}
                        className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(t.id)}
                        className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>

        {filteredTransactions.length === 0 && (
          <div className="p-12 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-4">
              <Search size={32} />
            </div>
            <p className="text-lg font-bold text-gray-900">No transactions found</p>
            <p className="text-sm text-gray-500">Try adjusting your filters or search term.</p>
          </div>
        )}
      </div>
    </div>
  );
}
