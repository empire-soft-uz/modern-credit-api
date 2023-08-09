import { Router } from 'express'
import { Users } from '../controller'

const userRouter = Router()

userRouter.post('/signup', Users.registerNewUser)
userRouter.post('/login', Users.loginUser)
userRouter.get('/logout', Users.logOut)
userRouter.get('/users', Users.allUsers)

export { userRouter } 