import { Router } from "express";
import { clientRouter } from "./clientRoutes";
import { productRouter } from "./productsRoutes";
import { creditRouter } from "./creditRoutes";
import { userRouter } from "./userRoutes";
import {mainPageRouter} from "./mainPageRoutes"
import {paymentRouter} from "./paymentRoutes"
import {expenseRouter} from "./expenseRoutes"


const router = Router();

//api for clients
router.use('/api', clientRouter)

//api for products
router.use('/api', productRouter)

//api for credits
router.use('/api', creditRouter)

//api for calculations
router.use('/api', mainPageRouter)

//api for payments
router.use('/api',paymentRouter)

//api for expenses
router.use('/api',expenseRouter)


//api for users
router.use('/api/auth', userRouter)


export {router}