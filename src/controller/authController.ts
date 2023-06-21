import * as dotenv from "dotenv";
dotenv.config();

import { Request, Response } from 'express'
import { User } from '../entities/users'
import jwt from 'jsonwebtoken'
import bcrypt from "bcryptjs"; 

const SECRET_KEY = process.env.SECRET_KEY;


//Method GET
//Get all users
export const allUsers = async (req:Request,res:Response) =>{
    try{
        const users = await User.find()
        res.status(200).json({status: '200ok', users})    
    }catch ({message}){
        res.status(500).json({msg:message})
    }
}


//Method POST
//Register new user
export const registerNewUser = async (req: Request, res: Response) => {

    const {
    email,
    firstName,
    lastName,
    password
    } = req.body
    try{
    const user = await User.findOneBy({email})
        if(user)
        res.status(400).json({msg:"Email already exists"})
    
    const hashPassword = bcrypt.hashSync(password,10)
  
    const newUser = User.create({
        email,
        firstName,
        lastName,
        password:hashPassword
    })
    await newUser.save()
    console.log(SECRET_KEY)
    const token = jwt.sign({email},`${SECRET_KEY}`,
        {expiresIn:3600000})
    res.status(201).json({ status: '201 ok', data:{ newUser,token} })

  }catch({message}){
    res.status(500).json({msg:message})
  }
}

//Method POST
// Login User
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body
  console.log(req.body)  
  try {
      const user: any = await User.findOneBy({ email })
  
      if (!user) 
      res.status(400).json({ msg: 'User does not exists' })
  
      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch)
      res.status(400).json({ msg: 'Incorrect password' })

      if(user){
        const token = jwt.sign({email},
          `${SECRET_KEY}`,
            {expiresIn:3600000})
        res.status(201).json({ status: '201 ok', data:{ user,token} })
      }

    } catch ({ message }) {
      res.status(500).json({ accessToken: null })
    }
  }


//Method GET
// Log Out user
export const logOut = async (req: Request, res: Response) => {
  res.clearCookie('refreshtoken', { path: '/user/refresh_token' })
  const {email} = req.body
  try {
        const user: any = await User.findOneBy({ email })
        if(user){
            const token = jwt.sign({email},
              `${SECRET_KEY}`,
                {expiresIn:3600000})
            res.status(201).json({ msg:"Logged out",status: '201 ok', data:{ user,token} })
        }
    } catch ({ message }) {
         res.status(500).json({ message })
    }
  }