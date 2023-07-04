import { Router } from 'express'
import { Mains } from '../controller'

const mainPageRouter = Router()

mainPageRouter.get('/main', (Mains.getTotals))
mainPageRouter.get('/main/payments',Mains.getPayments)
mainPageRouter.get('/main/payments/:yymm',Mains.getMonthlyPayments)

export { mainPageRouter }