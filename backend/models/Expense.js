import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  salary: {
    type: Number,
    required: [true, 'Salary is required'],
    min: [0, 'Salary cannot be negative']
  },
  expenses: {
    rent: {
      type: Number,
      required: true,
      default: 0,
      min: [0, 'Rent cannot be negative']
    },
    emi: {
      type: Number,
      required: true,
      default: 0,
      min: [0, 'EMI cannot be negative']
    },
    groceries: {
      type: Number,
      required: true,
      default: 0,
      min: [0, 'Groceries cannot be negative']
    },
    utilities: {
      type: Number,
      required: true,
      default: 0,
      min: [0, 'Utilities cannot be negative']
    },
    transport: {
      type: Number,
      required: true,
      default: 0,
      min: [0, 'Transport cannot be negative']
    },
    entertainment: {
      type: Number,
      required: true,
      default: 0,
      min: [0, 'Entertainment cannot be negative']
    },
    others: {
      type: Number,
      required: true,
      default: 0,
      min: [0, 'Others cannot be negative']
    }
  },
  insurance: {
    hasInsurance: {
      type: Boolean,
      default: false
    },
    amount: {
      type: Number,
      default: 0,
      min: [0, 'Insurance amount cannot be negative']
    }
  },
  totalExpenses: {
    type: Number,
    default: 0
  },
  savings: {
    type: Number,
    default: 0
  },
  aiInsights: [{
    type: {
      type: String,
      enum: ['warning', 'suggestion', 'tip', 'success'],
      required: true
    },
    message: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Calculate totals before saving
expenseSchema.pre('save', function(next) {
  const expenses = this.expenses;
  this.totalExpenses = 
    expenses.rent + 
    expenses.emi + 
    expenses.groceries + 
    expenses.utilities + 
    expenses.transport + 
    expenses.entertainment + 
    expenses.others +
    (this.insurance.hasInsurance ? this.insurance.amount : 0);
  
  this.savings = this.salary - this.totalExpenses;
  next();
});

const Expense = mongoose.model('Expense', expenseSchema);

export default Expense;
