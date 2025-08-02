// Local Storage utilities for Budget App

export const STORAGE_KEYS = {
  TRANSACTIONS: 'budget_transactions',
  CATEGORIES: 'budget_categories',
  SETTINGS: 'budget_settings'
};

// Default categories
export const DEFAULT_CATEGORIES = {
  income: [
    { id: 'salary', name: 'Salaire', type: 'income' },
    { id: 'freelance', name: 'Freelance', type: 'income' },
    { id: 'investments', name: 'Investissements', type: 'income' },
    { id: 'other_income', name: 'Autres revenus', type: 'income' }
  ],
  expense: [
    { id: 'food', name: 'Alimentation', type: 'expense' },
    { id: 'transport', name: 'Transport', type: 'expense' },
    { id: 'housing', name: 'Logement', type: 'expense' },
    { id: 'entertainment', name: 'Loisirs', type: 'expense' },
    { id: 'health', name: 'Santé', type: 'expense' },
    { id: 'shopping', name: 'Shopping', type: 'expense' },
    { id: 'utilities', name: 'Factures', type: 'expense' },
    { id: 'other_expense', name: 'Autres dépenses', type: 'expense' }
  ]
};

// Load data from localStorage
export const loadFromStorage = (key, defaultValue = []) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return defaultValue;
  }
};

// Save data to localStorage
export const saveToStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Error saving to localStorage:', error);
    return false;
  }
};

// Initialize default data if not exists
export const initializeStorage = () => {
  const categories = loadFromStorage(STORAGE_KEYS.CATEGORIES);
  if (categories.length === 0) {
    const allCategories = [...DEFAULT_CATEGORIES.income, ...DEFAULT_CATEGORIES.expense];
    saveToStorage(STORAGE_KEYS.CATEGORIES, allCategories);
  }
};

// Generate unique ID
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Transaction utilities
export const addTransaction = (transaction) => {
  const transactions = loadFromStorage(STORAGE_KEYS.TRANSACTIONS, []);
  const newTransaction = {
    ...transaction,
    id: generateId(),
    date: transaction.date || new Date().toISOString(),
    createdAt: new Date().toISOString()
  };
  transactions.push(newTransaction);
  saveToStorage(STORAGE_KEYS.TRANSACTIONS, transactions);
  return newTransaction;
};

export const updateTransaction = (id, updates) => {
  const transactions = loadFromStorage(STORAGE_KEYS.TRANSACTIONS, []);
  const index = transactions.findIndex(t => t.id === id);
  if (index !== -1) {
    transactions[index] = { ...transactions[index], ...updates, updatedAt: new Date().toISOString() };
    saveToStorage(STORAGE_KEYS.TRANSACTIONS, transactions);
    return transactions[index];
  }
  return null;
};

export const deleteTransaction = (id) => {
  const transactions = loadFromStorage(STORAGE_KEYS.TRANSACTIONS, []);
  const filtered = transactions.filter(t => t.id !== id);
  saveToStorage(STORAGE_KEYS.TRANSACTIONS, filtered);
  return true;
};

export const getTransactions = () => {
  return loadFromStorage(STORAGE_KEYS.TRANSACTIONS, []);
};

export const getCategories = () => {
  return loadFromStorage(STORAGE_KEYS.CATEGORIES, [...DEFAULT_CATEGORIES.income, ...DEFAULT_CATEGORIES.expense]);
};