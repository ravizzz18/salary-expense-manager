import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, X } from 'lucide-react';

const ExpenseForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    salary: '',
    expenses: {
      rent: '',
      emi: '',
      groceries: '',
      utilities: '',
      transport: '',
      entertainment: '',
      others: '',
    },
    insurance: {
      hasInsurance: false,
      amount: '',
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('expenses.')) {
      const expenseName = name.split('.')[1];
      setFormData({
        ...formData,
        expenses: {
          ...formData.expenses,
          [expenseName]: value,
        },
      });
    } else if (name === 'salary') {
      setFormData({ ...formData, salary: value });
    } else if (name === 'insuranceAmount') {
      setFormData({
        ...formData,
        insurance: {
          ...formData.insurance,
          amount: value,
        },
      });
    }
  };

  const handleInsuranceToggle = () => {
    setFormData({
      ...formData,
      insurance: {
        hasInsurance: !formData.insurance.hasInsurance,
        amount: '',
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const submitData = {
      salary: parseFloat(formData.salary),
      expenses: {
        rent: parseFloat(formData.expenses.rent) || 0,
        emi: parseFloat(formData.expenses.emi) || 0,
        groceries: parseFloat(formData.expenses.groceries) || 0,
        utilities: parseFloat(formData.expenses.utilities) || 0,
        transport: parseFloat(formData.expenses.transport) || 0,
        entertainment: parseFloat(formData.expenses.entertainment) || 0,
        others: parseFloat(formData.expenses.others) || 0,
      },
      insurance: {
        hasInsurance: formData.insurance.hasInsurance,
        amount: formData.insurance.hasInsurance ? parseFloat(formData.insurance.amount) || 0 : 0,
      },
    };

    onSubmit(submitData);
  };

  const expenseFields = [
    { name: 'rent', label: 'Rent', icon: '🏠' },
    { name: 'emi', label: 'EMI', icon: '🏦' },
    { name: 'groceries', label: 'Groceries', icon: '🛒' },
    { name: 'utilities', label: 'Utilities', icon: '💡' },
    { name: 'transport', label: 'Transport', icon: '🚗' },
    { name: 'entertainment', label: 'Entertainment', icon: '🎬' },
    { name: 'others', label: 'Others', icon: '📦' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card"
    >
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Add Expense Entry
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Salary Input */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Monthly Salary <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
            <input
              type="number"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              className="input-field pl-8"
              placeholder="50000"
              required
              min="0"
              step="0.01"
            />
          </div>
        </div>

        {/* Expenses Grid */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
            Monthly Expenses
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {expenseFields.map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-medium mb-2">
                  <span className="mr-1">{field.icon}</span>
                  {field.label}
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                  <input
                    type="number"
                    name={`expenses.${field.name}`}
                    value={formData.expenses[field.name]}
                    onChange={handleChange}
                    className="input-field pl-8"
                    placeholder="0"
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Insurance Toggle */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          <div className="flex items-center justify-between mb-4">
            <label className="text-sm font-medium">Do you have insurance?</label>
            <button
              type="button"
              onClick={handleInsuranceToggle}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                formData.insurance.hasInsurance ? 'bg-primary-600' : 'bg-gray-300 dark:bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  formData.insurance.hasInsurance ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {formData.insurance.hasInsurance && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <label className="block text-sm font-medium mb-2">
                Insurance Premium (Monthly)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                <input
                  type="number"
                  name="insuranceAmount"
                  value={formData.insurance.amount}
                  onChange={handleChange}
                  className="input-field pl-8"
                  placeholder="2000"
                  min="0"
                  step="0.01"
                />
              </div>
            </motion.div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <>
              <Plus className="w-5 h-5" />
              Calculate & Save
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
};

export default ExpenseForm;
