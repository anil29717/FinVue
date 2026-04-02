import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  LineChart,
  Line,
  Legend
} from 'recharts';
import { useDashboardData } from '../hooks/useDashboardData';
import { TrendingUp, PieChart as PieChartIcon, Activity, Target } from 'lucide-react';
import { motion } from 'framer-motion';

const CATEGORY_COLORS = {
  'Salary': '#3b82f6',
  'Freelance': '#10b981',
  'Groceries': '#f59e0b',
  'Rent/Mortgage': '#6366f1',
  'Entertainment': '#ef4444',
  'Utilities': '#06b6d4',
  'Dining Out': '#f97316',
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/90 backdrop-blur-md p-3 border border-gray-100 shadow-xl rounded-xl">
        <p className="text-xs font-bold text-gray-400 mb-1">{label}</p>
        {payload.map((p, i) => (
          <p key={i} className="text-sm font-bold" style={{ color: p.color }}>
            {p.name}: ${p.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function Insights() {
  const data = useDashboardData();

  const monthlyData = [
    { name: 'Jan', income: 4500, expenses: 3200 },
    { name: 'Feb', income: 5200, expenses: 3800 },
    { name: 'Mar', income: data.income, expenses: data.expenses },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <header>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Advanced Insights</h1>
        <p className="text-gray-500 text-sm">Deep analysis and trend forecasting for your financial health.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Income vs Expenses Bar Chart */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <Activity className="text-blue-600" size={20} />
            <h3 className="text-lg font-bold text-gray-900">Income vs Expenses</h3>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend iconType="circle" />
                <Bar dataKey="income" fill="#10b981" radius={[4, 4, 0, 0]} barSize={20} />
                <Bar dataKey="expenses" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Savings Growth Over Time */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="text-blue-600" size={20} />
            <h3 className="text-lg font-bold text-gray-900">Savings Rate Trend</h3>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.trendData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="date" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: '#64748b' }}
                  tickFormatter={(val) => new Date(val).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="balance" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: '#3b82f6' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Category Breakdown Progress */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex items-center gap-2 mb-6">
          <Target className="text-blue-600" size={20} />
          <h3 className="text-lg font-bold text-gray-900">Spending Allocation</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.breakdownData.map((cat, i) => (
            <div key={i} className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-gray-700">{cat.name}</span>
                <span className="text-sm font-bold text-gray-400">${cat.value.toLocaleString()}</span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${(cat.value / data.expenses) * 100}%` }}
                  className="h-full"
                  style={{ backgroundColor: CATEGORY_COLORS[cat.name] || '#3b82f6' }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
