import express from 'express';
import {
  createExpense,
  getExpenses,
  getExpenseById,
  deleteExpense,
  getExpenseStats
} from '../controllers/expenseController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// All routes are protected
router.use(protect);

router.route('/')
  .get(getExpenses)
  .post(createExpense);

router.get('/stats', getExpenseStats);

router.route('/:id')
  .get(getExpenseById)
  .delete(deleteExpense);

export default router;
