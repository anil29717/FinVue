import React from 'react';
import { Wallet, ArrowDownCircle, ArrowUpCircle, TrendingUp, TrendingDown } from 'lucide-react';
import { motion } from 'framer-motion';

const Card = ({ title, amount, icon: Icon, color, trend, trendValue }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
  >
    <div className={`absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 rounded-full opacity-[0.03] group-hover:scale-110 transition-transform duration-500 ${color === 'blue' ? 'bg-blue-600' : color === 'green' ? 'bg-emerald-600' : 'bg-rose-600'}`} />
    
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900 tracking-tight">
          ${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </h3>
        
        {trendValue !== undefined && (
          <div className="flex items-center gap-1 mt-2">
            {trend === 'up' ? (
              <TrendingUp size={14} className="text-emerald-500" />
            ) : (
              <TrendingDown size={14} className="text-rose-500" />
            )}
            <span className={`text-xs font-bold ${trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}>
              {trendValue}% 
            </span>
            <span className="text-[10px] text-gray-400 font-medium ml-1">vs last month</span>
          </div>
        )}
      </div>

      <div className={`p-3 rounded-xl ${
        color === 'blue' ? 'bg-blue-50 text-blue-600' : 
        color === 'green' ? 'bg-emerald-50 text-emerald-600' : 
        'bg-rose-50 text-rose-600'
      }`}>
        <Icon size={24} />
      </div>
    </div>
  </motion.div>
);

export default function SummaryCards({ data }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card 
        title="Total Balance" 
        amount={data.balance} 
        icon={Wallet} 
        color="blue" 
        trend="up" 
        trendValue={12.5}
      />
      <Card 
        title="Total Income" 
        amount={data.income} 
        icon={ArrowUpCircle} 
        color="green" 
        trend="up" 
        trendValue={8.2}
      />
      <Card 
        title="Total Expenses" 
        amount={data.expenses} 
        icon={ArrowDownCircle} 
        color="red" 
        trend="down" 
        trendValue={5.1}
      />
    </div>
  );
}
