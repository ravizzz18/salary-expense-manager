import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogOut, Moon, Sun, IndianRupee, TrendingDown, PiggyBank, User } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { expenseAPI } from '../services/api';
import StatCard from '../components/StatCard';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseCharts from '../components/ExpenseCharts';
import AIInsights from '../components/AIInsights';
import ExpenseHistory from '../components/ExpenseHistory';

const Dashboard = ({ darkMode, setDarkMode }) => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [latestExpense, setLatestExpense] = useState(null);
  const [stats, setStats] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      fetchExpenses();
      fetchStats();
    }
  }, [isAuthenticated, navigate]);

  const fetchExpenses = async () => {
    try {
      const response = await expenseAPI.getExpenses();
      setExpenses(response.data);
      if (response.data.length > 0) {
        setLatestExpense(response.data[0]);
      }
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await expenseAPI.getStats();
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleExpenseSubmit = async (expenseData) => {
    setLoading(true);
    try {
      const response = await expenseAPI.createExpense(expenseData);
      setLatestExpense(response.data.expense);
      await fetchExpenses();
      await fetchStats();
      setShowForm(false);
    } catch (error) {
      console.error('Error creating expense:', error);
      alert(error.response?.data?.message || 'Failed to create expense');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteExpense = async (id) => {
    if (!window.confirm('Are you sure you want to delete this expense?')) {
      return;
    }

    try {
      await expenseAPI.deleteExpense(id);
      await fetchExpenses();
      await fetchStats();
      if (latestExpense && latestExpense._id === id) {
        setLatestExpense(expenses.length > 1 ? expenses[1] : null);
      }
    } catch (error) {
      console.error('Error deleting expense:', error);
      alert('Failed to delete expense');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen pb-12">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center">
                <IndianRupee className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  Expense Manager
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <User className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {user?.name}
                </span>
              </div>

              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden md:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back, {user?.name}! 👋
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Track your expenses and get AI-powered insights for better financial planning.
          </p>
        </motion.div>

        {/* Stats Cards */}
        {latestExpense && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatCard
              title="Monthly Salary"
              value={latestExpense.salary}
              icon={IndianRupee}
              color="bg-blue-600"
            />
            <StatCard
              title="Total Expenses"
              value={latestExpense.totalExpenses}
              icon={TrendingDown}
              color="bg-red-600"
            />
            <StatCard
              title="Savings"
              value={latestExpense.savings}
              icon={PiggyBank}
              color={latestExpense.savings >= 0 ? 'bg-green-600' : 'bg-red-600'}
            />
          </div>
        )}

        {/* Add Expense Button */}
        {!showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8"
          >
            <button
              onClick={() => setShowForm(true)}
              className="btn-primary"
            >
              + Add New Expense Entry
            </button>
          </motion.div>
        )}

        {/* Expense Form */}
        {showForm && (
          <div className="mb-8">
            <ExpenseForm onSubmit={handleExpenseSubmit} loading={loading} />
            <button
              onClick={() => setShowForm(false)}
              className="mt-4 btn-secondary"
            >
              Cancel
            </button>
          </div>
        )}

        {/* Charts */}
        {latestExpense && (
          <div className="mb-8">
            <ExpenseCharts data={latestExpense} />
          </div>
        )}

        {/* AI Insights */}
        {latestExpense && latestExpense.aiInsights && (
          <div className="mb-8">
            <AIInsights insights={latestExpense.aiInsights} />
          </div>
        )}

        {/* Expense History */}
        <ExpenseHistory
          expenses={expenses}
          onDelete={handleDeleteExpense}
          loading={loading}
        />

        {/* Empty State */}
        {expenses.length === 0 && !showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="card text-center py-12"
          >
            <div className="text-6xl mb-4">💰</div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              No Expenses Yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Start tracking your finances by adding your first expense entry
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="btn-primary"
            >
              Add Your First Entry
            </button>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
