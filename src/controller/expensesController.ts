import { Request, Response } from 'express'
import { Expenses } from '../entities/expenses'
const { totalProfit } = require("../queries/mainPageQueries")
import connectDB from '../index';

//Method GET
//get all expenses
export const getAllExpenses = async (req: Request, res: Response) => {
  try {
    const data = await Expenses.find()
    res.status(200).json({ status: '200ok', data })
  } catch (error) {
    res.status(400).send(error)
  }
}

//Method GET
//get one expense
export const getOneExpense = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const data = await Expenses.findOneBy({ id: parseInt(id, 10) })
    res.status(200).json({ status: '200ok', data })
  } catch (error) {
    res.status(400).send(error)
  }
}

//Method POST
//Add a new expense
export const addNewExpense = async (req: Request, res: Response) => {
  const {
    amount,
    description
  } = req.body
  try {
    const newExpense = Expenses.create({
      amount: amount,
      description: description
    })
    await newExpense.save()
    const total_profits = connectDB.query(totalProfit)
    // if(amount<=total_profits){
    //   const profit = getTotalProfit()
    //   connectDB.query(`${profit} - ${amount}`)
    // }
    res.status(201).json({ status: '201 ok', data: newExpense })
  } catch (error) {
    res.status(400).json({ msg: error })
  }
}


export const deleteExpense = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const deleteExpense = Expenses.delete(parseInt(id))
    res.status(200).json({ status: '200ok', msg: "Expense deleted successfully" })
  } catch (error) {
    res.status(400).json({ msg: error })
  }
}


export const updateExpense = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { amount, description } = req.body;
  try {
    const updateExpense = Expenses.update(parseInt(id), {
      amount: amount,
      description: description
    })
    res.status(200).json({ status: "200ok", msg: "Expense updated successfully" })
  } catch (error) {
    res.status(400).json({ msg: error })
  }
}