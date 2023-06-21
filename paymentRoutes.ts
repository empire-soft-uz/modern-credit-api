import { Router } from 'express'
import { Payments } from '../controller'

const paymentRouter = Router()

paymentRouter.get('/payments', Payments.getAllPayments)
paymentRouter.get('/payments/:id',Payments.getOnePayment)
paymentRouter.post('/payments', Payments.addNewPayment)
paymentRouter.put('/payments/:id', Payments.updateOnePayment)
paymentRouter.delete('/payments/:id', Payments.deleteOnePayment)

export {paymentRouter }