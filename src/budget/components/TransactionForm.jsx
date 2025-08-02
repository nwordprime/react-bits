import React, { useState, useEffect } from 'react';
import { 
  Modal, 
  ModalHeader, 
  ModalContent, 
  ModalFooter, 
  Input, 
  Select, 
  Button 
} from '../../kaury-ui';
import { addTransaction, getCategories } from '../utils/localStorage';

export const TransactionForm = ({ isOpen, onClose, onTransactionAdded, transaction = null }) => {
  const [formData, setFormData] = useState({
    type: 'expense',
    amount: '',
    category: '',
    description: '',
    date: new Date().toISOString().split('T')[0]
  });
  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setCategories(getCategories());
      if (transaction) {
        setFormData({
          type: transaction.type,
          amount: transaction.amount.toString(),
          category: transaction.category,
          description: transaction.description || '',
          date: transaction.date ? transaction.date.split('T')[0] : new Date().toISOString().split('T')[0]
        });
      } else {
        resetForm();
      }
    }
  }, [isOpen, transaction]);

  const resetForm = () => {
    setFormData({
      type: 'expense',
      amount: '',
      category: '',
      description: '',
      date: new Date().toISOString().split('T')[0]
    });
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Le montant doit être supérieur à 0';
    }

    if (!formData.category) {
      newErrors.category = 'Veuillez sélectionner une catégorie';
    }

    if (!formData.date) {
      newErrors.date = 'Veuillez sélectionner une date';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const transactionData = {
        ...formData,
        amount: parseFloat(formData.amount)
      };

      addTransaction(transactionData);
      onTransactionAdded();
      resetForm();
    } catch (error) {
      setErrors({ submit: 'Erreur lors de l\'enregistrement de la transaction' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field) => (e) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const filteredCategories = categories
    .filter(cat => cat.type === formData.type)
    .map(cat => ({ value: cat.name, label: cat.name }));

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <form onSubmit={handleSubmit}>
        <ModalHeader onClose={onClose}>
          {transaction ? 'Modifier la transaction' : 'Nouvelle transaction'}
        </ModalHeader>
        
        <ModalContent>
          <div className="space-y-6">
            {/* Type de transaction */}
            <Select
              label="Type de transaction"
              value={formData.type}
              onChange={handleInputChange('type')}
              options={[
                { value: 'income', label: '💰 Revenus' },
                { value: 'expense', label: '💸 Dépenses' }
              ]}
              error={errors.type}
            />

            {/* Montant */}
            <Input
              label="Montant (€)"
              type="number"
              step="0.01"
              min="0"
              value={formData.amount}
              onChange={handleInputChange('amount')}
              placeholder="0.00"
              error={errors.amount}
            />

            {/* Catégorie */}
            <Select
              label="Catégorie"
              value={formData.category}
              onChange={handleInputChange('category')}
              options={filteredCategories}
              placeholder="Sélectionner une catégorie"
              error={errors.category}
            />

            {/* Description */}
            <Input
              label="Description (optionnel)"
              value={formData.description}
              onChange={handleInputChange('description')}
              placeholder="Description de la transaction..."
            />

            {/* Date */}
            <Input
              label="Date"
              type="date"
              value={formData.date}
              onChange={handleInputChange('date')}
              error={errors.date}
            />

            {errors.submit && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{errors.submit}</p>
              </div>
            )}
          </div>
        </ModalContent>
        
        <ModalFooter>
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Annuler
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            variant={formData.type === 'income' ? 'success' : 'primary'}
          >
            {isSubmitting ? 'Enregistrement...' : 'Enregistrer'}
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
};