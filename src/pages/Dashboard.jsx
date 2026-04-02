import React, { useState } from 'react';
import SummaryCards from '../components/SummaryCards';
import DashboardCharts from '../components/DashboardCharts';
import TransactionList from '../components/TransactionList';
import TransactionForm from '../components/TransactionForm';
import { useDashboardData } from '../hooks/useDashboardData';
import { TrendingUp, Target, CreditCard, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const InsightCard = ({ title, value, icon: Icon, color, description }) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-4">
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
      color === 'blue' ? 'bg-blue-50 text-blue-600' : 
      color === 'purple' ? 'bg-purple-50 text-purple-600' : 
      'bg-amber-50 text-amber-600'
    }`}>
      <Icon size={24} />
    </div>
    <div>
      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{title}</p>
      <h4 className="text-xl font-bold text-gray-900">{value}</h4>
      <p className="text-xs text-gray-500 mt-1 font-medium">{description}</p>
    </div>
  </div>
);

export default function Dashboard() {
  const data = useDashboardData();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
    setIsFormOpen(true);
  };

  const handleAdd = () => {
    setEditingTransaction(null);
    setIsFormOpen(true);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
            Global Overview <Sparkles className="text-amber-500" size={24} />
          </h1>
          <p className="text-gray-500 font-medium">Visualize and manage your financial ecosystem.</p>
        </div>
        <div className="flex items-center gap-3">
        </div>
      </header>

      <SummaryCards data={data} />

      <DashboardCharts 
        trendData={data.trendData} 
        breakdownData={data.breakdownData} 
      />

      <section>
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="text-blue-600" size={20} />
          <h2 className="text-xl font-bold text-gray-900">Financial Insights</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <InsightCard 
            title="Top Spending Category" 
            value={data.topCategory.name}
            icon={Target}
            color="purple"
            description={`$${data.topCategory.value.toLocaleString()} spent this period. Consider reviewing allocations.`}
          />
          <InsightCard 
            title="Savings Rate" 
            value={`${data.savingsRate.toFixed(1)}%`}
            icon={CreditCard}
            color="blue"
            description={data.savingsRate > 20 ? "Excellent! You're saving more than 20% of your income." : "You're building your net worth steadily."}
          />
          <InsightCard 
            title="Avg. Daily Expense" 
            value={`$${(data.expenses / 30).toFixed(2)}`}
            icon={TrendingUp}
            color="amber"
            description="Based on the last 30 days of recorded activity."
          />
        </div>
      </section>

      <TransactionList 
        onEdit={handleEdit} 
        onAdd={handleAdd} 
      />

      <TransactionForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
        editingTransaction={editingTransaction}
      />
    </div>
  );
}
