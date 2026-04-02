import { useMemo } from 'react';
import { useTransactions } from '../context/TransactionContext';

export function useDashboardData() {
  const { state } = useTransactions();
  const { transactions } = state;

  return useMemo(() => {
    const income = transactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + Number(t.amount), 0);

    const expenses = transactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + Number(t.amount), 0);

    const balance = income - expenses;

    const categories = transactions
      .filter((t) => t.type === 'expense')
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + Number(t.amount);
        return acc;
      }, {});

    const breakdownData = Object.entries(categories).map(([name, value]) => ({
      name,
      value,
    })).sort((a, b) => b.value - a.value);

    const trendData = [...transactions]
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .reduce((acc, t) => {
        const lastBalance = acc.length > 0 ? acc[acc.length - 1].balance : 0;
        const newBalance = t.type === 'income' ? lastBalance + t.amount : lastBalance - t.amount;
        acc.push({
          date: t.date,
          balance: newBalance,
        });
        return acc;
      }, []);

    const topCategory = breakdownData[0] || { name: 'N/A', value: 0 };
    const savingsRate = income > 0 ? ((income - expenses) / income) * 100 : 0;

    return {
      income,
      expenses,
      balance,
      breakdownData,
      trendData,
      topCategory,
      savingsRate,
    };
  }, [transactions]);
}
