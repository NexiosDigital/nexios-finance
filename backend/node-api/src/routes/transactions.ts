import { Router } from 'express';
import { TransactionController } from '../controllers/transaction.controller';

const router = Router();
const transactionController = new TransactionController();

// Get all transactions
router.get('/', transactionController.getAllTransactions.bind(transactionController));

// Get transaction by ID
router.get('/:id', transactionController.getTransactionById.bind(transactionController));

// Create new transaction
router.post('/', transactionController.createTransaction.bind(transactionController));

// Update transaction
router.put('/:id', transactionController.updateTransaction.bind(transactionController));

// Delete transaction
router.delete('/:id', transactionController.deleteTransaction.bind(transactionController));

export const transactionRoutes = router;