import React, { createContext, useContext, useReducer, useEffect } from 'react';
import initialData from '../data/mock_data.json';

const TransactionContext = createContext();

const initialState = {
  transactions: JSON.parse(localStorage.getItem('transactions')) || initialData,
  role: 'admin',
  isFormOpen: false,
  editingItem: null,
};

function transactionReducer(state, action) {
  switch (action.type) {
    case 'ADD_TRANSACTION': {
      const newState = {
        ...state,
        transactions: [action.payload, ...state.transactions],
      };
      localStorage.setItem('transactions', JSON.stringify(newState.transactions));
      return newState;
    }
    case 'EDIT_TRANSACTION': {
      const newState = {
        ...state,
        transactions: state.transactions.map((t) =>
          t.id === action.payload.id ? action.payload : t
        ),
      };
      localStorage.setItem('transactions', JSON.stringify(newState.transactions));
      return newState;
    }
    case 'DELETE_TRANSACTION': {
      const newState = {
        ...state,
        transactions: state.transactions.filter((t) => t.id !== action.payload),
      };
      localStorage.setItem('transactions', JSON.stringify(newState.transactions));
      return newState;
    }
    case 'SET_ROLE': {
      return { ...state, role: action.payload };
    }
    case 'OPEN_FORM': {
      return { ...state, isFormOpen: true, editingItem: action.payload || null };
    }
    case 'CLOSE_FORM': {
      return { ...state, isFormOpen: false, editingItem: null };
    }
    default:
      return state;
  }
}

export function TransactionProvider({ children }) {
  const [state, dispatch] = useReducer(transactionReducer, initialState);

  return (
    <TransactionContext.Provider value={{ state, dispatch }}>
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error('useTransactions must be used within a TransactionProvider');
  }
  return context;
}
