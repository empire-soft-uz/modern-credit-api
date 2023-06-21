import { Router } from 'express'
import { Credits } from '../controller'

const creditRouter = Router()

creditRouter.get('/credits', Credits.getAllCredits)
creditRouter.get('/credits/:id', Credits.getOneCredit)
creditRouter.post('/credits', Credits.addNewCredit)
creditRouter.delete('/credits/:id', Credits.deleteOneCredit)
creditRouter.put('/credits/:id', Credits.updateOneCredit)
creditRouter.get('/credits/:id/client', Credits.getMonthlyPayments)

export { creditRouter }