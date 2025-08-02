import React, { useState, useEffect } from 'react';
import { Plus, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { Card, CardHeader, CardContent, Button, Grid, Container, Chart } from '../../kaury-ui';
import { TransactionForm } from './TransactionForm';
import { TransactionList } from './TransactionList';
import { 
  getTransactions, 
  initializeStorage 
} from '../utils/localStorage';
import { 
  calculateTotals, 
  formatCurrency, 
  prepareChartData,
  getCurrentMonth 
} from '../utils/calculations';

export const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [totals, setTotals] = useState({ totalIncome: 0, totalExpenses: 0, balance: 0 });
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    initializeStorage();
    loadTransactions();
  }, []);

  const loadTransactions = () => {
    const loadedTransactions = getTransactions();
    setTransactions(loadedTransactions);
    setTotals(calculateTotals(loadedTransactions));
    setChartData(prepareChartData(loadedTransactions, 'monthly'));
  };

  const handleTransactionAdded = () => {
    loadTransactions();
    setIsModalOpen(false);
  };

  const currentMonth = getCurrentMonth();
  const currentMonthTransactions = transactions.filter(t => {
    const transactionMonth = new Date(t.date).toISOString().substring(0, 7);
    return transactionMonth === currentMonth;
  });
  const currentMonthTotals = calculateTotals(currentMonthTransactions);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <Container size="xl" className="py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Budget Planner
            </h1>
            <p className="text-gray-600 mt-2">Gérez vos finances personnelles facilement</p>
          </div>
          <Button
            onClick={() => setIsModalOpen(true)}
            size="lg"
            className="mt-4 md:mt-0 gap-2"
          >
            <Plus className="w-5 h-5" />
            Nouvelle transaction
          </Button>
        </div>

        {/* Stats Cards */}
        <Grid cols={3} gap="lg" className="mb-8">
          <Card hover className="text-center">
            <CardContent>
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-green-100 rounded-xl">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Revenus</h3>
              <p className="text-3xl font-bold text-green-600 mt-2">
                {formatCurrency(totals.totalIncome)}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Ce mois: {formatCurrency(currentMonthTotals.totalIncome)}
              </p>
            </CardContent>
          </Card>

          <Card hover className="text-center">
            <CardContent>
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-red-100 rounded-xl">
                <TrendingDown className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Dépenses</h3>
              <p className="text-3xl font-bold text-red-600 mt-2">
                {formatCurrency(totals.totalExpenses)}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Ce mois: {formatCurrency(currentMonthTotals.totalExpenses)}
              </p>
            </CardContent>
          </Card>

          <Card hover className="text-center">
            <CardContent>
              <div className={`flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-xl ${
                totals.balance >= 0 ? 'bg-blue-100' : 'bg-orange-100'
              }`}>
                <DollarSign className={`w-6 h-6 ${
                  totals.balance >= 0 ? 'text-blue-600' : 'text-orange-600'
                }`} />
              </div>
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Solde</h3>
              <p className={`text-3xl font-bold mt-2 ${
                totals.balance >= 0 ? 'text-blue-600' : 'text-orange-600'
              }`}>
                {formatCurrency(totals.balance)}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Ce mois: {formatCurrency(currentMonthTotals.balance)}
              </p>
            </CardContent>
          </Card>
        </Grid>

        {/* Charts and Transactions */}
        <Grid cols={2} gap="lg">
          {/* Monthly Chart */}
          <Card>
            <CardHeader>
              <h3 className="text-xl font-semibold text-gray-900">Évolution mensuelle</h3>
            </CardHeader>
            <CardContent>
              {chartData.length > 0 ? (
                <Chart
                  type="line"
                  data={chartData}
                  height={300}
                />
              ) : (
                <div className="flex items-center justify-center h-64 text-gray-500">
                  <p>Aucune donnée à afficher</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Transactions */}
          <Card>
            <CardHeader>
              <h3 className="text-xl font-semibold text-gray-900">Transactions récentes</h3>
            </CardHeader>
            <CardContent>
              <TransactionList 
                transactions={transactions.slice(0, 8)} 
                onTransactionUpdate={loadTransactions}
                compact={true}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* All Transactions */}
        <Card className="mt-8">
          <CardHeader>
            <h3 className="text-xl font-semibold text-gray-900">Toutes les transactions</h3>
          </CardHeader>
          <CardContent>
            <TransactionList 
              transactions={transactions} 
              onTransactionUpdate={loadTransactions}
            />
          </CardContent>
        </Card>
      </Container>

      {/* Transaction Form Modal */}
      <TransactionForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onTransactionAdded={handleTransactionAdded}
      />
    </div>
  );
};