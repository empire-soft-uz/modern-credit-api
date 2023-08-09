import { Request, Response } from 'express'
import { Payment } from '../entities/payment'

//Method GET
//get all payments
export const getAllPayments = async (req: Request, res: Response) => {
  const data = await Payment.find()
  res.status(200).json({ status: '200ok', data })
}

//Method GET
//get one payment
export const getOnePayment = async (req: Request, res: Response) => {
  const { id } = req.params
  const data = await Payment.findOneBy({ id: parseInt(id, 10) })
  res.status(200).json({ status: '200ok', data })
}

//Method POST
//Add a new payment
export const addNewPayment = async (req: Request, res: Response) => {
  const {
    credit_id,
    paid_amount,
    index: index
  } = req.body
  try {
    const newPayment = Payment.create({
      credit_id: credit_id,
      paid_amount: paid_amount,
      index: index
    })
    await newPayment.save()
    res.status(201).json({ status: '201 ok', data: newPayment })
  } catch (error) {
    res.status(400).json({ msg: error })
  }
}


//Method DELETE
//Delete a payment
export const deleteOnePayment = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const deletePayment = Payment.delete(parseInt(id))
    res.status(200).json({ status: '200ok', msg: "Payment deleted successfully!" })
  } catch (error) {
    res.status(400).json({ msg: error });
  }
}


//Method PUT
//Update a payment
export const updateOnePayment = async (req: Request, res: Response) => {
  const { id } = req.params
  const { credit_id, paid_amount, index } = req.body
  try {
    const updatedPayment = Payment.update(parseInt(id), {
      credit_id: credit_id,
      paid_amount: paid_amount,
      index: index
    })

    res.status(201).json({ status: '200 ok', msg: "Payment updates successfully" })
  } catch (error) {
    res.status(400).json({ msg: error })
  }
}