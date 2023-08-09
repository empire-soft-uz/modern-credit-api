
const monthNames = [
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
];
const date = new Date();
let getDay = date.getDate() + 1
let getYear = date.getFullYear();
let getMonth = date.getMonth() + 1


export const calcMonthlyPayments = (depositAmount: number, percent: number, period: number, date: any) => {
    let values = []


    const total = ((depositAmount + (depositAmount * (percent % 100)) / 100) / period).toFixed(2);

    for (let i = getMonth; i <= getMonth + period - 1; i++) {
        const monthIndex = i % 12; // Handle looping back to January after December
        const yearOffset = Math.floor(i / 12); // Adjust year if looping back

        values.push({
            amount: total,
            month: monthNames[monthIndex],
            date: new Date(getYear + yearOffset, monthIndex, getDay)
        });

    }



    console.log(values)
    return values;
}

// calcMonthlyPayments(1200, 30, 11, date)