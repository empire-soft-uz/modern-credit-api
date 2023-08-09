import { Request, Response } from 'express'
import { Credit } from '../entities/credit'
import { calcMonthlyPayments } from '../logics/monthly_installment'

import connectDB from '../index'
import { monthlyPaymentInfoByIdClient } from "../queries/creditQueries"
import { ProductByIdQuery, } from "../queries/productQueries"

//Method GET
//get all credits
export const getAllCredits = async (req: Request, res: Response) => {
  const data = await Credit.find()

  res.status(200).json({ status: '200ok', data: data })
}

//Method GET
//get one credit
export const getOneCredit = async (req: Request, res: Response) => {
  const { id } = req.params
  const data = await Credit.findOneBy({ id: parseInt(id, 10) })
  res.status(200).json({ status: '200ok', data })
}

//Method POST
//Add a new credit
export const addNewCredit = async (req: Request, res: Response) => {
  const {
    client_id,
    product_id,
    deposit_amount,
    client_deposit,
    period,
    percent
  } = req.body
  try {
    const newCredit = Credit.create({
      client_id: client_id,
      product_id: product_id,
      deposit_amount: deposit_amount,
      client_deposit: client_deposit,
      period: period,
      percent: percent
    })
    await newCredit.save()
    res.status(201).json({ status: '201 ok', data: newCredit })
  } catch (error) {
    res.status(400).json({ msg: error })
  }

}


//Method DELETE
//Delete a credit
export const deleteOneCredit = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const deleteCredit = Credit.delete(parseInt(id))
    res.status(200).json({ status: '200ok', msg: "Credit deleted succesfully" })
  } catch (error) {
    res.status(400).json({ msg: error });
  }
}


//Method PUT
//Update a credit
export const updateOneCredit = async (req: Request, res: Response) => {
  const { id } = req.params
  const { client_id, product_id, deposit_amount, client_deposit, period, percent } = req.body
  try {
    const updatedCredit = Credit.update(parseInt(id), {
      client_id: client_id,
      product_id: product_id,
      deposit_amount: deposit_amount,
      client_deposit: client_deposit,
      period: period,
      percent: percent
    })

    res.status(201).json({ status: '200 ok', msg: "Credit updates successfully" })
  } catch (error) {
    res.status(400).json({ msg: error })
  }
}

//Method Get
//Get all info about specific product and monthly payment of a user
export const getAllCreditsByMonth = async (req: Request, res: Response) => {
  const data = await Credit.find()

  const listItems = []

  for (let index = 0; index < data.length; index++) {
    const element = data[index];

    const depositAmount = element.deposit_amount
    const percent = element.percent
    const period = element.period
    const date = element.duedate
    const credit = element.id


    //Separate year,month,day from backend for the function below
    const originDate = new Date(date)
    const year = originDate.getFullYear()
    const month = originDate.getMonth() + 1
    const day = originDate.getDate()



    // console.log("data back", date)
    const res = calcMonthlyPayments(year, month, day, depositAmount, percent, period)

    listItems.push(credit, res)

  }

  res.status(200).json({ status: '200ok', data: listItems })
}