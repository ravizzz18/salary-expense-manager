import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#06b6d4', '#6366f1'];

const ExpenseCharts = ({ data }) => {
  if (!data) return null;

  const pieData = [
    { name: 'Rent', value: data.expenses.rent },
    { name: 'EMI', value: data.expenses.emi },
    { name: 'Groceries', value: data.expenses.groceries },
    { name: 'Utilities', value: data.expenses.utilities },
    { name: 'Transport', value: data.expenses.transport },
    { name: 'Entertainment', value: data.expenses.entertainment },
    { name: 'Others', value: data.expenses.others },
  ].filter(item => item.value > 0);

  const barData = [
    { category: 'Rent', amount: data.expenses.rent },
    { category: 'EMI', amount: data.expenses.emi },
    { category: 'Groceries', amount: data.expenses.groceries },
    { category: 'Utilities', amount: data.expenses.utilities },
    { category: 'Transport', amount: data.expenses.transport },
    { category: 'Entertainment', amount: data.expenses.entertainment },
    { category: 'Others', amount: data.expenses.others },
  ].filter(item => item.amount > 0);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="font-semibold text-gray-900 dark:text-white">{payload[0].name}</p>
          <p className="text-primary-600 dark:text-primary-400">
            ₹{payload[0].value.toLocaleString('en-IN')}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Pie Chart */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="card"
      >
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Expense Distribution
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Bar Chart */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="card"
      >
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Category Breakdown
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
            <XAxis 
              dataKey="category" 
              tick={{ fill: '#6B7280', fontSize: 12 }}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis tick={{ fill: '#6B7280', fontSize: 12 }} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="amount" fill="#3b82f6" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
};

export default ExpenseCharts;
