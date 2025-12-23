import { motion } from 'framer-motion';
import { AlertTriangle, Lightbulb, TrendingUp, CheckCircle } from 'lucide-react';

const AIInsights = ({ insights }) => {
  if (!insights || insights.length === 0) {
    return null;
  }

  const getInsightIcon = (type) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="w-5 h-5" />;
      case 'suggestion':
        return <Lightbulb className="w-5 h-5" />;
      case 'tip':
        return <TrendingUp className="w-5 h-5" />;
      case 'success':
        return <CheckCircle className="w-5 h-5" />;
      default:
        return <Lightbulb className="w-5 h-5" />;
    }
  };

  const getInsightColor = (type) => {
    switch (type) {
      case 'warning':
        return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-700 dark:text-red-400';
      case 'suggestion':
        return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 text-yellow-700 dark:text-yellow-400';
      case 'tip':
        return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-400';
      case 'success':
        return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-700 dark:text-green-400';
      default:
        return 'bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-400';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="card"
    >
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <span className="text-2xl">🤖</span>
        AI Financial Insights
      </h3>

      <div className="space-y-3">
        {insights.map((insight, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index }}
            className={`p-4 rounded-lg border ${getInsightColor(insight.type)}`}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                {getInsightIcon(insight.type)}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium leading-relaxed">
                  {insight.message}
                </p>
                <span className="inline-block mt-2 text-xs px-2 py-1 rounded-full bg-white dark:bg-gray-800 opacity-75">
                  {insight.category}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {insights.length === 0 && (
        <p className="text-gray-500 dark:text-gray-400 text-center py-8">
          No insights available yet. Add an expense entry to get AI-powered financial advice.
        </p>
      )}
    </motion.div>
  );
};

export default AIInsights;
