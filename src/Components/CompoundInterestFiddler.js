import React, { useState } from 'react';
import { calculateCompoundInterest } from '../utils';

export default () => {
    const [deposit, setDeposit] = useState(12.99)
    const [interest, setInterest] = useState(5)
    const [years, setYears] = useState(5)
    parseFloat()
    return (
        <>
            <div>
                <label>
                    Monthly deposit (€)
            <input type="number" value={deposit} onChange={(event) => setDeposit(parseFloat(event.target.value))} />
                </label>
            </div>
            <div>
                <label>
                    Yearly interest rate (%)
            <input type="number" value={interest} onChange={(event) => setInterest(parseFloat(event.target.value))} />
                </label>
            </div>
            <div>
                <label>
                    Years
            <input type="number" value={years} onChange={(event) => setYears(parseFloat(event.target.value))} />
                </label>
            </div>
            <h1>{`${calculateCompoundInterest(deposit, interest/100, years * 12).toFixed(2)}€ over ${years} years`}</h1>
        </>
    )
}