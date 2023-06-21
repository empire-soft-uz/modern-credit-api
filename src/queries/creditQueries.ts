//QUERY to get each monthly info about credit of specific client
export const monthlyPaymentInfoByIdClient = "SELECT generate_series(credit.duedate + 30, credit.duedate + ((credit.period) * '1 month'::interval), '1 month'::interval) AS date,  ROUND((deposit_amount +(deposit_amount * (percent::numeric % 100))/100) / period,2) AS monthly_payment,credit.deposit_amount, credit.status AS status FROM credit  WHERE id=$1"; 


module.exports = {monthlyPaymentInfoByIdClient} 