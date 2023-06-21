import { Request, Response } from 'express'
import { Credit } from '../entities/credit'

import connectDB from '../index'
import {monthlyPaymentInfoByIdClient} from  "../queries/creditQueries"
import {ProductByIdQuery,} from "../queries/productQueries"

//Method GET
//get all credits
export const getAllCredits = async (req: Request, res: Response) => {
  const data = await Credit.find()
  res.status(200).json({ status: '200ok', data })
}

//Method GET
//get one credit
export const getOneCredit = async (req: Request, res: Response) => {
  const { id } = req.params
  const data = await Credit.findOneBy({id: parseInt(id, 10)})
  res.status(200).json({ status: '200ok', data })
}

//Method POST
//Add a new credit
export const addNewCredit = async (req: Request, res: Response) => {
  const {
    client_id,
    product_id,
    deposit_amount,
    period,
    percent
  } = req.body
  try{
  const newCredit = Credit.create({
    client_id:client_id,
    product_id:product_id,
    deposit_amount:deposit_amount,
    period:period,
    percent:percent
  })
  await newCredit.save()
  res.status(201).json({ status: '201 ok', data: newCredit })
}catch(error){
  res.status(400).json({msg:error})
}

}


//Method DELETE
//Delete a credit
export const deleteOneCredit = async (req: Request, res: Response) => {
    const {id} = req.params
    try{
    const deleteCredit = Credit.delete(parseInt(id))
    res.status(200).json({ status: '200ok', msg:"Credit deleted succesfully" })
    }catch(error){
    res.status(400).json({msg:error});
    }
}


//Method PUT
//Update a credit
export const updateOneCredit = async (req:Request,res:Response) =>{
  const {id} = req.params
  const {client_id,product_id,deposit_amount,period,percent} = req.body
  try{
  const updatedCredit = Credit.update(parseInt(id),{
    client_id:client_id,
    product_id:product_id,
    deposit_amount:deposit_amount,
    period:period,
    percent:percent
  })

  res.status(201).json({status:'200 ok', msg:"Credit updates successfully"})
  }catch(error){
  res.status(400).json({msg:error})
  }
}

//Method Get
//Get all info about specific product and monthly payment of a user
export async function getMonthlyPayments(req: Request, res: Response): Promise<void>{
  const id = req.params.id
  const values = [id]
  try {
    const product = await connectDB.query(ProductByIdQuery,values);
    const credit = await connectDB.query(monthlyPaymentInfoByIdClient,values);
    await res.status(200).json({product,credit})
  }catch(error){
    res.status(400).json({msg:error})
  }
}
