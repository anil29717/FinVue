import React from 'react';
import TransactionList from '../components/TransactionList';
import { useTransactions } from '../context/TransactionContext';

export default function Transactions() {
  const { dispatch } = useTransactions();

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Financial Records</h1>
          <p className="text-gray-500 text-sm">Review and manage your complete historical transitions.</p>
        </div>
      </div>
      <TransactionList 
        onEdit={(t) => dispatch({ type: 'OPEN_FORM', payload: t })} 
        onAdd={() => dispatch({ type: 'OPEN_FORM' })} 
      />
    </div>
  );
}
