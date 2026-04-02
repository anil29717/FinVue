import React, { useState, useEffect } from 'react';
import { X, Save, AlertCircle } from 'lucide-react';
import { useTransactions } from '../context/TransactionContext';
import { toast } from 'react-toastify';

const INCOME_CATEGORIES = ['Salary', 'Freelance', 'Investment', 'Gift', 'Other Income'];
const EXPENSE_CATEGORIES = [
  'Groceries', 'Shopping', 'Entertainment', 'Utilities', 
  'Transport', 'Healthcare', 'Dining Out', 'Rent/Mortgage', 'Other Expense'
];

export default function TransactionForm({ isOpen, onClose, editingTransaction }) {
  const { dispatch } = useTransactions();
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    description: '',
    category: '',
    amount: '',
    type: 'expense'
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingTransaction) {
      setFormData({
        ...editingTransaction,
        date: editingTransaction.date
      });
    } else {
      setFormData({
        date: new Date().toISOString().split('T')[0],
        description: '',
        category: '',
        amount: '',
        type: 'expense'
      });
    }
  }, [editingTransaction, isOpen]);

  const validate = () => {
    const newErrors = {};
    if (!formData.description) newErrors.description = 'Description is required';
    if (!formData.amount || formData.amount <= 0) newErrors.amount = 'Valid amount is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.date) newErrors.date = 'Date is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (editingTransaction) {
      dispatch({ type: 'EDIT_TRANSACTION', payload: formData });
      toast.success('Transaction updated successfully');
    } else {
      dispatch({ 
        type: 'ADD_TRANSACTION', 
        payload: { ...formData, id: Date.now().toString() } 
      });
      toast.success('Transaction added successfully');
    }
    onClose();
  };

  if (!isOpen) return null;

  const categories = formData.type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-900">
            {editingTransaction ? 'Edit Transaction' : 'Add New Transaction'}
          </h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="bg-gray-50 p-1.5 rounded-2xl flex items-center">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, type: 'income', category: '' })}
              className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${formData.type === 'income' ? 'bg-white shadow-md text-emerald-600' : 'text-gray-400'}`}
            >
              Income
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, type: 'expense', category: '' })}
              className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${formData.type === 'expense' ? 'bg-white shadow-md text-rose-600' : 'text-gray-400'}`}
            >
              Expense
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Date</label>
              <input 
                type="date" 
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="input-field" 
              />
              {errors.date && <p className="text-[10px] text-rose-500 font-bold flex items-center gap-1"><AlertCircle size={10} /> {errors.date}</p>}
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Amount ($)</label>
              <input 
                type="number" 
                step="0.01"
                placeholder="0.00"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className="input-field" 
              />
               {errors.amount && <p className="text-[10px] text-rose-500 font-bold flex items-center gap-1"><AlertCircle size={10} /> {errors.amount}</p>}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Description</label>
            <input 
              type="text" 
              placeholder="e.g. Monthly Rent"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="input-field" 
            />
            {errors.description && <p className="text-[10px] text-rose-500 font-bold flex items-center gap-1"><AlertCircle size={10} /> {errors.description}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Category</label>
            <select 
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="input-field appearance-none"
            >
              <option value="">Select Category</option>
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            {errors.category && <p className="text-[10px] text-rose-500 font-bold flex items-center gap-1"><AlertCircle size={10} /> {errors.category}</p>}
          </div>

          <div className="pt-4 flex items-center gap-3">
            <button type="button" onClick={onClose} className="btn-ghost flex-1">Cancel</button>
            <button type="submit" className="btn-primary flex-1 flex items-center justify-center gap-2 shadow-lg shadow-blue-200">
              <Save size={18} /> {editingTransaction ? 'Save Changes' : 'Save Transaction'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
