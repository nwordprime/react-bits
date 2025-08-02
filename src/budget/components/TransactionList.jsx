import React, { useState } from 'react';
import { Trash2, Edit, Calendar, Tag } from 'lucide-react';
import { Button, Badge, Card } from '../../kaury-ui';
import { deleteTransaction } from '../utils/localStorage';
import { formatCurrency, formatShortDate } from '../utils/calculations';

export const TransactionList = ({ 
  transactions = [], 
  onTransactionUpdate, 
  compact = false 
}) => {
  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette transaction ?')) {
      setDeletingId(id);
      try {
        await deleteTransaction(id);
        onTransactionUpdate();
      } catch (error) {
        console.error('Error deleting transaction:', error);
      } finally {
        setDeletingId(null);
      }
    }
  };

  const getTypeColor = (type) => {
    return type === 'income' ? 'success' : 'error';
  };

  const getTypeIcon = (type) => {
    return type === 'income' ? '💰' : '💸';
  };

  if (transactions.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <Calendar className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune transaction</h3>
        <p className="text-gray-500">Commencez par ajouter votre première transaction</p>
      </div>
    );
  }

  const sortedTransactions = [...transactions].sort((a, b) => 
    new Date(b.date) - new Date(a.date)
  );

  if (compact) {
    return (
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {sortedTransactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <span className="text-lg">{getTypeIcon(transaction.type)}</span>
              <div>
                <p className="font-medium text-gray-900">{transaction.category}</p>
                <p className="text-sm text-gray-500">{formatShortDate(transaction.date)}</p>
              </div>
            </div>
            <div className="text-right">
              <p className={`font-semibold ${
                transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
              }`}>
                {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {sortedTransactions.map((transaction) => (
        <Card key={transaction.id} className="hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                transaction.type === 'income' 
                  ? 'bg-green-100' 
                  : 'bg-red-100'
              }`}>
                <span className="text-xl">{getTypeIcon(transaction.type)}</span>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <Badge 
                    variant={getTypeColor(transaction.type)}
                    size="sm"
                  >
                    {transaction.type === 'income' ? 'Revenus' : 'Dépenses'}
                  </Badge>
                  <span className="text-gray-400">•</span>
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <Tag className="w-3 h-3" />
                    <span>{transaction.category}</span>
                  </div>
                </div>
                
                <h4 className="font-semibold text-gray-900">
                  {transaction.description || transaction.category}
                </h4>
                
                <div className="flex items-center space-x-1 text-sm text-gray-500 mt-1">
                  <Calendar className="w-3 h-3" />
                  <span>{formatShortDate(transaction.date)}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className={`text-xl font-bold ${
                  transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEdit(transaction.id)}
                  className="text-gray-500 hover:text-indigo-600"
                >
                  <Edit className="w-4 h-4" />
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(transaction.id)}
                  disabled={deletingId === transaction.id}
                  className="text-gray-500 hover:text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  function handleEdit(id) {
    // This will be implemented when we add edit functionality
    console.log('Edit transaction:', id);
  }
};