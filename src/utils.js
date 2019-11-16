const calculateCompoundInterest = (depositPerMonth, interestRate, months) => {
    const monthlyInterestRate = Math.pow(1+interestRate, 1/12);
    let total = 0
    for (let i = 0; i < months; i++) {
        total = (total+depositPerMonth)*(monthlyInterestRate)
    }
    return total
}

console.log(calculateCompoundInterest(12.99, 0.07, 60))