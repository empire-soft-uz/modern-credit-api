import { Request, Response } from 'express'
import connectDB from "../index";
const { totalCreditsSum, totalProfit, totalWithProfit, totalExpenses, creditsByMonthsQuery, totalAfterExpenses } = require("../queries/mainPageQueries")

//Totals for Main page
async function getTotals(req: Request, res: Response): Promise<void> {
  try {
    const deposits = await connectDB.query(totalCreditsSum)
    const totalProfits = await connectDB.query(totalProfit)
    const totalWithProfits = await connectDB.query(totalWithProfit)
    const totalExpense = await connectDB.query(totalExpenses)
    const currentDeposit = await connectDB.query(totalAfterExpenses)

    res.json({ deposits, totalProfits, totalExpense, totalWithProfits, currentDeposit });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}
async function getPayments(req: Request, res: Response): Promise<void> {
  try {
    const result = await connectDB.query(creditsByMonthsQuery)

    await res.status(200).json(result)
  } catch (e) {
    await res.status(500).json(e);
  }
}

async function getAllPayments(req: Request, res: Response): Promise<void> {
  const year = req.params
  const result = await connectDB.query(creditsByMonthsQuery);

  try {
    if (year) {
      const data = result.filter((item: any) => {
        const itemDate = new Date(item.date);
        return itemDate.getFullYear() == Number(year);
      });
      await res.status(200).json(data);
    } else {
      await res.status(404).json({ msg: "Not found" })
    }
  } catch (error) {
    await res.status(500).json(error)
  }

}

async function getMonthlyPayments(req: Request, res: Response): Promise<void> {
  const { yymm } = req.params
  const year = yymm.split('-')[0];
  const month = yymm.split('-')[1];
  const result = await connectDB.query(creditsByMonthsQuery);
  try {
    if (year && month) {
      const data = result.filter((item: any) => {
        const itemDate = new Date(item.date);
        return itemDate.getFullYear() == Number(year) && itemDate.getMonth() + 1 == Number(month);
      });
      await res.status(200).json(data);
    }
    else if (year) {
      const data = result.filter((item: any) => {
        const itemDate = new Date(item.date);
        console.log(itemDate)
        return itemDate.getFullYear() == Number(year);
      });
      await res.status(200).json(data);
    }
    else {
      await res.status(200).json(result)
    }
  } catch (error) {
    res.status(400).json({ msg: error })
  }
}

export { getTotals, getMonthlyPayments, getAllPayments, getPayments }


