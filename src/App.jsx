import React from 'react';
import { TransactionProvider } from './context/TransactionContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <TransactionProvider>
      <Layout>
        <Dashboard />
      </Layout>
      <ToastContainer 
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </TransactionProvider>
  );
}

export default App;
