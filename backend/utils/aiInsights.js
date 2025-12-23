/**
 * AI-based insights generator for salary and expenses
 * Rules:
 * - Rent > 40% of salary → warning
 * - EMI > 30% of salary → warning
 * - Savings < 30% of salary → suggestion
 * - No insurance → tip
 * - Good financial health → success message
 */

export const generateAIInsights = (salary, expenses, insurance) => {
  const insights = [];
  const totalExpenses = 
    expenses.rent + 
    expenses.emi + 
    expenses.groceries + 
    expenses.utilities + 
    expenses.transport + 
    expenses.entertainment + 
    expenses.others +
    (insurance.hasInsurance ? insurance.amount : 0);
  
  const savings = salary - totalExpenses;
  const savingsPercentage = (savings / salary) * 100;
  const rentPercentage = (expenses.rent / salary) * 100;
  const emiPercentage = (expenses.emi / salary) * 100;

  // Rule 1: Rent > 40% of salary
  if (rentPercentage > 40) {
    insights.push({
      type: 'warning',
      message: `Your rent (${rentPercentage.toFixed(1)}%) exceeds 40% of your salary. Consider finding more affordable housing to improve your financial health.`,
      category: 'rent'
    });
  } else if (rentPercentage > 30) {
    insights.push({
      type: 'suggestion',
      message: `Your rent is ${rentPercentage.toFixed(1)}% of your salary. While manageable, keeping it below 30% would give you more financial flexibility.`,
      category: 'rent'
    });
  }

  // Rule 2: EMI > 30% of salary
  if (emiPercentage > 30) {
    insights.push({
      type: 'warning',
      message: `Your EMI (${emiPercentage.toFixed(1)}%) exceeds 30% of your salary. This high debt burden may limit your financial flexibility. Consider debt consolidation.`,
      category: 'emi'
    });
  } else if (emiPercentage > 20 && emiPercentage <= 30) {
    insights.push({
      type: 'suggestion',
      message: `Your EMI is ${emiPercentage.toFixed(1)}% of your salary. Try to keep it below 20% for better financial stability.`,
      category: 'emi'
    });
  }

  // Rule 3: Savings < 30%
  if (savingsPercentage < 0) {
    insights.push({
      type: 'warning',
      message: `You're spending more than you earn! Your expenses exceed your salary by ₹${Math.abs(savings).toFixed(2)}. Immediate action needed to reduce expenses.`,
      category: 'savings'
    });
  } else if (savingsPercentage < 10) {
    insights.push({
      type: 'warning',
      message: `Your savings rate is only ${savingsPercentage.toFixed(1)}%. This is critically low. Aim for at least 20-30% savings to build financial security.`,
      category: 'savings'
    });
  } else if (savingsPercentage < 20) {
    insights.push({
      type: 'suggestion',
      message: `Your savings rate is ${savingsPercentage.toFixed(1)}%. Try to increase it to at least 20-30% for a healthy financial cushion.`,
      category: 'savings'
    });
  } else if (savingsPercentage < 30) {
    insights.push({
      type: 'tip',
      message: `Good job! You're saving ${savingsPercentage.toFixed(1)}% of your salary. Aim for 30% or more to accelerate wealth building.`,
      category: 'savings'
    });
  } else {
    insights.push({
      type: 'success',
      message: `Excellent! You're saving ${savingsPercentage.toFixed(1)}% of your salary. Keep up the great financial discipline!`,
      category: 'savings'
    });
  }

  // Rule 4: No insurance
  if (!insurance.hasInsurance) {
    insights.push({
      type: 'tip',
      message: `You don't have insurance coverage. Consider getting health and life insurance to protect yourself and your family from unexpected expenses.`,
      category: 'insurance'
    });
  } else {
    const insurancePercentage = (insurance.amount / salary) * 100;
    if (insurancePercentage < 5) {
      insights.push({
        type: 'tip',
        message: `Your insurance premium is ${insurancePercentage.toFixed(1)}% of salary. This is a good investment for your financial security.`,
        category: 'insurance'
      });
    }
  }

  // Additional insights based on expense categories
  const expenseCategories = [
    { name: 'groceries', value: expenses.groceries, threshold: 15 },
    { name: 'utilities', value: expenses.utilities, threshold: 10 },
    { name: 'transport', value: expenses.transport, threshold: 10 },
    { name: 'entertainment', value: expenses.entertainment, threshold: 5 }
  ];

  expenseCategories.forEach(category => {
    const percentage = (category.value / salary) * 100;
    if (percentage > category.threshold) {
      insights.push({
        type: 'suggestion',
        message: `Your ${category.name} expense (${percentage.toFixed(1)}%) is above the recommended ${category.threshold}%. Look for ways to optimize this category.`,
        category: category.name
      });
    }
  });

  // Overall financial health
  if (savingsPercentage >= 30 && rentPercentage <= 30 && emiPercentage <= 20 && insurance.hasInsurance) {
    insights.push({
      type: 'success',
      message: `Your overall financial health is excellent! You're managing expenses well, saving adequately, and have insurance coverage.`,
      category: 'overall'
    });
  }

  return insights;
};

export const calculateFinancialSummary = (salary, expenses, insurance) => {
  const totalExpenses = 
    expenses.rent + 
    expenses.emi + 
    expenses.groceries + 
    expenses.utilities + 
    expenses.transport + 
    expenses.entertainment + 
    expenses.others +
    (insurance.hasInsurance ? insurance.amount : 0);
  
  const savings = salary - totalExpenses;
  const savingsPercentage = (savings / salary) * 100;

  return {
    salary,
    totalExpenses,
    savings,
    savingsPercentage: savingsPercentage.toFixed(2),
    expenseBreakdown: {
      rent: expenses.rent,
      emi: expenses.emi,
      groceries: expenses.groceries,
      utilities: expenses.utilities,
      transport: expenses.transport,
      entertainment: expenses.entertainment,
      others: expenses.others,
      insurance: insurance.hasInsurance ? insurance.amount : 0
    }
  };
};
