import { Expenses } from '../controller'
import { Router } from 'express'

const expenseRouter = Router()

expenseRouter.get("/main/expenses", Expenses.getAllExpenses)
expenseRouter.get("/main/expenses/:id", Expenses.getOneExpense)
expenseRouter.post("/main/expenses", Expenses.addNewExpense)
expenseRouter.delete("/main/expenses/:id", Expenses.deleteExpense)
expenseRouter.put("/main/expenses/:id", Expenses.updateExpense)

export { expenseRouter }