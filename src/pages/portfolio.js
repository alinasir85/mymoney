import React, { useState } from 'react';

const App = () => {
    const [balances, setBalances] = useState([]);
    const [allocation, setAllocation] = useState({});
    const [sip, setSip] = useState({});
    const [changes, setChanges] = useState([]);

    const calculateBalance = (prevBalance, sipAmount, changeRate) => {
        const balance = prevBalance * (1 + changeRate / 100) + sipAmount;
        return Math.floor(balance);
    };

    const getChangeValue = (type, month) => {
        const change = changes.find((c) => c.month === month);
        return change ? change[type] : 0;
    };

    const getBalance = (month) => {
        const balance = balances.find((b) => b.month === month);
        if (balance) {
            return balance;
        } else {
            let prevBalance;
            if (balances.length > 0) {
                prevBalance = balances[balances.length - 1];
            } else {
                prevBalance = {
                    month: '',
                    equity: allocation.equity,
                    debt: allocation.debt,
                    gold: allocation.gold,
                };
            }
            const { equity, debt, gold } = prevBalance;
            const newBalance = {
                month,
                equity: calculateBalance(equity, sip.equity, getChangeValue('equity', month)),
                debt: calculateBalance(debt, sip.debt, getChangeValue('debt', month)),
                gold: calculateBalance(gold, sip.gold, getChangeValue('gold', month)),
            };
            setBalances([...balances, newBalance]);
            return newBalance;
        }
    };

    const handleAllocate = (e) => {
        e.preventDefault();
        const equity = parseInt(e.target.equity.value);
        const debt = parseInt(e.target.debt.value);
        const gold = parseInt(e.target.gold.value);
        setAllocation({ equity, debt, gold });
        e.target.reset();
    };

    const handleSip = (e) => {
        e.preventDefault();
        const equity = parseInt(e.target.equity.value);
        const debt = parseInt(e.target.debt.value);
        const gold = parseInt(e.target.gold.value);
        setSip({ equity, debt, gold });
        e.target.reset();
    };

    const handleChanges = (e) => {
        e.preventDefault();
        const month = e.target.month.value;
        const equityChange = parseFloat(e.target.equity.value);
        const debtChange = parseFloat(e.target.debt.value);
        const goldChange = parseFloat(e.target.gold.value);
        const newChange = { month, equity: equityChange, debt: debtChange, gold: goldChange };
        setChanges([...changes, newChange]);
        e.target.reset();
    };

    const handleBalance = (e) => {
        e.preventDefault();
        const month = e.target.month.value;
        const balance = getBalance(month);
        alert(`Balance for ${month}: Equity - ${balance.equity}, Debt - ${balance.debt}, Gold - ${balance.gold}`);
        e.target.reset();
    };

    const handleRebalance = (e) => {
        e.preventDefault();
        const lastRebalancedMonth = balances.findIndex((balance) => balance.rebalanced === true);
        if (lastRebalancedMonth === -1) {
            alert('CANNOT_REBALANCE');
            return;
        }
        const rebalanceMonth = balances.length;
        if ((rebalanceMonth - lastRebalancedMonth) % 6 === 0) {
            const lastBalance = balances[lastRebalancedMonth];
            const { equity, debt, gold } = lastBalance;
            const total = equity + debt + gold;
            const newAllocation = {
                equity: Math.floor((total * 60) / 100),
                debt: Math.floor((total * 30) / 100),
                gold: Math.floor((total * 10) / 100),
            };
            const newBalance = {
                month: rebalanceMonth,
                equity: newAllocation.equity,
                debt: newAllocation.debt,
                gold: newAllocation.gold,
                rebalanced: true,
            };
            setAllocation(newAllocation);
            setBalances([...balances, newBalance]);
            alert(
                `Rebalanced Amount: Equity - ${newAllocation.equity}, Debt - ${newAllocation.debt}, Gold - ${newAllocation.gold}`
            );
        } else {
            alert('CANNOT_REBALANCE');
        }
    };

    return (
        <div>
            <form onSubmit={handleAllocate}>
                <h3>Allocate</h3>
                <label>
                    Equity:
                    <input type="number" name="equity" required />
                </label>
                <label>
                    Debt:
                    <input type="number" name="debt" required />
                </label>
                <label>
                    Gold:
                    <input type="number" name="gold" required />
                </label>
                <button type="submit">Submit</button>
            </form>

            <form onSubmit={handleSip}>
                <h3>SIP</h3>
                <label>
                    Equity:
                    <input type="number" name="equity" required />
                </label>
                <label>
                    Debt:
                    <input type="number" name="debt" required />
                </label>
                <label>
                    Gold:
                    <input type="number" name="gold" required />
                </label>
                <button type="submit">Submit</button>
            </form>

            <form onSubmit={handleChanges}>
                <h3>Monthly Changes</h3>
                <label>
                    Month:
                    <input type="text" name="month" required />
                </label>
                <label>
                    Equity Change:
                    <input type="number" name="equity" step="0.01" required />
                </label>
                <label>
                    Debt Change:
                    <input type="number" name="debt" step="0.01" required />
                </label>
                <label>
                    Gold Change:
                    <input type="number" name="gold" step="0.01" required />
                </label>
                <button type="submit">Submit</button>
            </form>

            <form onSubmit={handleBalance}>
                <h3>Check Balance</h3>
                <label>
                    Month:
                    <input type="text" name="month" required />
                </label>
                <button type="submit">Check Balance</button>
            </form>

            <button onClick={handleRebalance}>Rebalance</button>

            <h2>Monthly Changes</h2>
            <ul>
                {changes.map((change) => (
                    <li key={change.month}>
                        Month: {change.month}, Equity: {change.equity}, Debt: {change.debt}, Gold: {change.gold}
                    </li>
                ))}
            </ul>

            <h2>Balances</h2>
            <ul>
                {balances.map((balance) => (
                    <li key={balance.month}>
                        Month: {balance.month}, Equity: {balance.equity}, Debt: {balance.debt}, Gold: {balance.gold}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;
