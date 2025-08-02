// Budget calculation utilities

export const calculateTotals = (transactions) => {
  const totals = transactions.reduce((acc, transaction) => {
    if (transaction.type === 'income') {
      acc.totalIncome += parseFloat(transaction.amount);
    } else {
      acc.totalExpenses += parseFloat(transaction.amount);
    }
    return acc;
  }, { totalIncome: 0, totalExpenses: 0 });

  totals.balance = totals.totalIncome - totals.totalExpenses;
  return totals;
};

export const calculateCategoryTotals = (transactions) => {
  const categoryTotals = {};
  
  transactions.forEach(transaction => {
    const { category, amount, type } = transaction;
    if (!categoryTotals[category]) {
      categoryTotals[category] = { income: 0, expense: 0, total: 0 };
    }
    
    if (type === 'income') {
      categoryTotals[category].income += parseFloat(amount);
    } else {
      categoryTotals[category].expense += parseFloat(amount);
    }
    
    categoryTotals[category].total = categoryTotals[category].income - categoryTotals[category].expense;
  });

  return categoryTotals;
};

export const getMonthlyData = (transactions) => {
  const monthlyData = {};
  
  transactions.forEach(transaction => {
    const date = new Date(transaction.date);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    
    if (!monthlyData[monthKey]) {
      monthlyData[monthKey] = { income: 0, expense: 0, balance: 0 };
    }
    
    if (transaction.type === 'income') {
      monthlyData[monthKey].income += parseFloat(transaction.amount);
    } else {
      monthlyData[monthKey].expense += parseFloat(transaction.amount);
    }
    
    monthlyData[monthKey].balance = monthlyData[monthKey].income - monthlyData[monthKey].expense;
  });

  return monthlyData;
};

export const formatCurrency = (amount, currency = '€') => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
  }).format(amount);
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};

export const formatShortDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
};

export const getCurrentMonth = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
};

export const getMonthName = (monthKey) => {
  const [year, month] = monthKey.split('-');
  const date = new Date(year, month - 1);
  return new Intl.DateTimeFormat('fr-FR', {
    year: 'numeric',
    month: 'long',
  }).format(date);
};

export const prepareChartData = (transactions, type = 'monthly') => {
  if (type === 'monthly') {
    const monthlyData = getMonthlyData(transactions);
    return Object.entries(monthlyData)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([month, data]) => ({
        name: getMonthName(month),
        income: data.income,
        expense: data.expense,
        balance: data.balance,
      }));
  }
  
  if (type === 'category') {
    const categoryTotals = calculateCategoryTotals(transactions);
    return Object.entries(categoryTotals).map(([category, data]) => ({
      name: category,
      value: Math.abs(data.expense), // For pie chart, we want positive values
      income: data.income,
      expense: data.expense,
    }));
  }
  
  return [];
};