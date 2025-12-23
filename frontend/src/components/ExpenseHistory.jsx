import { motion } from 'framer-motion';
import { Trash2, Calendar } from 'lucide-react';

const ExpenseHistory = ({ expenses, onDelete, loading }) => {
  if (!expenses || expenses.length === 0) {
    return (
      <div className="card">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Expense History
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-center py-8">
          No expense records yet. Start by adding your first entry above.
        </p>
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="card"
    >
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        Expense History
      </h3>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {expenses.map((expense, index) => (
          <motion.div
            key={expense._id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05 * index }}
            className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary-500 dark:hover:border-primary-500 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {formatDate(expense.createdAt)}
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Salary:</span>
                    <span className="ml-1 font-semibold text-gray-900 dark:text-white">
                      ₹{expense.salary.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Total Expenses:</span>
                    <span className="ml-1 font-semibold text-red-600 dark:text-red-400">
                      ₹{expense.totalExpenses.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Savings:</span>
                    <span className={`ml-1 font-semibold ${
                      expense.savings >= 0 
                        ? 'text-green-600 dark:text-green-400' 
                        : 'text-red-600 dark:text-red-400'
                    }`}>
                      ₹{expense.savings.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <div className="mt-2 flex items-center gap-2">
                  <span className="text-xs px-2 py-1 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300">
                    {expense.aiInsights?.length || 0} insights
                  </span>
                  {expense.insurance.hasInsurance && (
                    <span className="text-xs px-2 py-1 rounded-full bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300">
                      Insured
                    </span>
                  )}
                </div>
              </div>

              <button
                onClick={() => onDelete(expense._id)}
                disabled={loading}
                className="ml-4 p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors disabled:opacity-50"
                aria-label="Delete expense"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ExpenseHistory;
