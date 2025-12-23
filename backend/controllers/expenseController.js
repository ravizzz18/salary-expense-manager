import Expense from '../models/Expense.js';
import { generateAIInsights, calculateFinancialSummary } from '../utils/aiInsights.js';

// @desc    Create new expense entry
// @route   POST /api/expenses
// @access  Private
export const createExpense = async (req, res) => {
  try {
    const { salary, expenses, insurance } = req.body;

    // Validation
    if (!salary || salary <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid salary amount'
      });
    }

    if (!expenses) {
      return res.status(400).json({
        success: false,
        message: 'Please provide expense details'
      });
    }

    // Generate AI insights
    const aiInsights = generateAIInsights(salary, expenses, insurance || { hasInsurance: false, amount: 0 });

    // Create expense entry
    const expense = await Expense.create({
      user: req.user.id,
      salary,
      expenses: {
        rent: expenses.rent || 0,
        emi: expenses.emi || 0,
        groceries: expenses.groceries || 0,
        utilities: expenses.utilities || 0,
        transport: expenses.transport || 0,
        entertainment: expenses.entertainment || 0,
        others: expenses.others || 0
      },
      insurance: insurance || { hasInsurance: false, amount: 0 },
      aiInsights
    });

    const summary = calculateFinancialSummary(salary, expenses, insurance || { hasInsurance: false, amount: 0 });

    res.status(201).json({
      success: true,
      message: 'Expense entry created successfully',
      data: {
        expense,
        summary,
        insights: aiInsights
      }
    });
  } catch (error) {
    console.error('Create expense error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating expense entry',
      error: error.message
    });
  }
};

// @desc    Get all expenses for current user
// @route   GET /api/expenses
// @access  Private
export const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .limit(50);

    res.status(200).json({
      success: true,
      count: expenses.length,
      data: expenses
    });
  } catch (error) {
    console.error('Get expenses error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching expenses',
      error: error.message
    });
  }
};

// @desc    Get single expense by ID
// @route   GET /api/expenses/:id
// @access  Private
export const getExpenseById = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: 'Expense not found'
      });
    }

    // Check if expense belongs to user
    if (expense.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this expense'
      });
    }

    res.status(200).json({
      success: true,
      data: expense
    });
  } catch (error) {
    console.error('Get expense error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching expense',
      error: error.message
    });
  }
};

// @desc    Delete expense
// @route   DELETE /api/expenses/:id
// @access  Private
export const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: 'Expense not found'
      });
    }

    // Check if expense belongs to user
    if (expense.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this expense'
      });
    }

    await expense.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Expense deleted successfully'
    });
  } catch (error) {
    console.error('Delete expense error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting expense',
      error: error.message
    });
  }
};

// @desc    Get expense statistics
// @route   GET /api/expenses/stats
// @access  Private
export const getExpenseStats = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id });

    if (expenses.length === 0) {
      return res.status(200).json({
        success: true,
        data: {
          totalEntries: 0,
          averageSalary: 0,
          averageSavings: 0,
          averageSavingsPercentage: 0
        }
      });
    }

    const totalSalary = expenses.reduce((sum, exp) => sum + exp.salary, 0);
    const totalSavings = expenses.reduce((sum, exp) => sum + exp.savings, 0);
    const averageSalary = totalSalary / expenses.length;
    const averageSavings = totalSavings / expenses.length;
    const averageSavingsPercentage = (averageSavings / averageSalary) * 100;

    res.status(200).json({
      success: true,
      data: {
        totalEntries: expenses.length,
        averageSalary: averageSalary.toFixed(2),
        averageSavings: averageSavings.toFixed(2),
        averageSavingsPercentage: averageSavingsPercentage.toFixed(2)
      }
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching statistics',
      error: error.message
    });
  }
};
