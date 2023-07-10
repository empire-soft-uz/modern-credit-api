//IN USE
//Only paid sum by owner
const totalCreditsSum = "SELECT SUM(credit.deposit_amount) AS total FROM credit";
//Total sum with profit
const totalWithProfit = "SELECT SUM(credit.deposit_amount) + SUM(deposit_amount*(percent%100) / 100) AS total_with_profit FROM credit"
//Total profits from credits
const totalProfit = "SELECT SUM(deposit_amount*(percent%100) / 100) AS total_profit FROM credit WHERE credit.status = 'pending'";

//Total expenses
const totalExpenses = "SELECT SUM(amount) FROM expenses";


const totalAfterExpenses = "SELECT (SELECT SUM(credit.deposit_amount) + SUM(deposit_amount*(percent%100) / 100) AS total_with_profit FROM credit) - (SELECT SUM(amount) FROM expenses) AS result"

const creditsByMonthsQuery = "SELECT c.name AS client, p.name AS product, p.price AS price,ROUND((cr.deposit_amount +(cr.deposit_amount * (cr.percent::numeric % 100))/100) / cr.period,2) AS monthly_payment, generate_series(cr.duedate + 30, cr.duedate + ((cr.period) * '1 month'::interval), '1 month'::interval) AS date,cr.status as status FROM credit cr JOIN client c ON cr.client_id = c.id JOIN product p ON cr.product_id = p.id";



module.exports = { totalCreditsSum, totalProfit, totalWithProfit, totalExpenses, creditsByMonthsQuery, totalAfterExpenses }