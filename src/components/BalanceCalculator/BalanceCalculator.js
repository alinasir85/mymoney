import MonthSelect from "../MonthSelect/MonthSelect";
import {useEffect, useState} from "react";
import ChangesList from "../ChangesList/ChangesList";
import {MONTH_LIST, sortMonthsDesc} from "@/utils/Helper";

const BalanceCalculator = ({setIsSubmitted, allocation, sip, changesList}) => {
    const [selectedMonth,setSelectedMonth] = useState('January');
    const [balances,setBalances] = useState([]);
    const [selectedMonthBalance, setSelectedMonthBalance] = useState({});
    const [isRebalanceClicked, setIsRebalanceClicked] = useState(false);
    const [showDetails,setShowDetails] = useState(false);
    const [filteredMonths,setFilteredMonths] = useState([]);

    useEffect(() => {
        if (changesList && changesList.length > 0) {
            const lastMonth = changesList[changesList.length - 1].month;
            const lastMonthIndex = MONTH_LIST.findIndex(month => month === lastMonth);
            setFilteredMonths(MONTH_LIST.slice(0, lastMonthIndex + 1));
        }
    }, [changesList]);

    const calculateBalance = (prevBalance, sipAmount, changeRate, month) => {
        if (month === 'January') {
            sipAmount = 0;
        }
        const currentBalance = prevBalance + sipAmount;
        const balance = currentBalance + (currentBalance * (changeRate/100));
        return Math.floor(balance);
    };

    const populateBalances = (selectedMonth) => {
        let prevBalance = {
            month: 'January',
            equity: allocation.equity,
            debt: allocation.debt,
            gold: allocation.gold,
        };
        if (balances.length > 0) {
            prevBalance = balances[balances.length - 1];
        }
        const newBalances = [...balances];
        let startIndex = balances.findIndex(balance => balance.month === prevBalance.month);
        for (let i = startIndex + 1; i < changesList.length; i++) {
            const change = changesList[i];
            prevBalance = {
                month: change.month,
                equity: calculateBalance(prevBalance.equity, sip.equity, change.equity, change.month),
                debt: calculateBalance(prevBalance.debt, sip.debt, change.debt, change.month),
                gold: calculateBalance(prevBalance.gold, sip.gold, change.gold, change.month),
            };
            newBalances.push(prevBalance);
            if(change.month === 'June' || change.month === 'December') {
                calculateRebalance(newBalances,change.month);
            } else if (change.month === selectedMonth) {
                setSelectedMonthBalance(prevBalance);
                break;
            }
        }
        setBalances(newBalances);
    }

    const getBalance = (event) => {
        event.preventDefault();
        setIsRebalanceClicked(false);
        const balance = balances.find((balance) => balance.month === selectedMonth);
        if (balance) {
            setShowDetails(false);
            setSelectedMonthBalance(balance);
        } else {
            populateBalances(selectedMonth);
        }
    }

    const calculateRebalance = (balances,selectedMonth) => {
        const existingBalance = balances.find(balance => balance.month === selectedMonth);
        const totalAllocatedAmount = allocation.equity + allocation.debt + allocation.gold;
        const totalExistingBalance = existingBalance.equity + existingBalance.debt + existingBalance.gold;
        existingBalance.equity = Math.floor(totalExistingBalance * (allocation.equity / totalAllocatedAmount));
        existingBalance.debt = Math.floor(totalExistingBalance * (allocation.debt / totalAllocatedAmount));
        existingBalance.gold = Math.floor(totalExistingBalance * (allocation.gold / totalAllocatedAmount));
        setSelectedMonthBalance(existingBalance);
    }

    const reBalance = (event) => {
        event.preventDefault();
        const reBalanceMonth = sortMonthsDesc([...changesList]).find(change => (change.month === "December" || change.month === "June"));
        if(!reBalanceMonth) {
            alert('CANNOT RE-BALANCE!');
        } else {
            setIsRebalanceClicked(true);
            setShowDetails(false);
            const rebalancedAmount = balances.find(balance => (balance.month === reBalanceMonth.month));
            if(rebalancedAmount) {
                setSelectedMonthBalance(rebalancedAmount);
            } else {
                populateBalances(reBalanceMonth);
            }
        }
    }

    const showDetailsHandler = () => {
        setShowDetails(true);
        setIsRebalanceClicked(false);
    }

    return (
        <>
            <div className="row">
              <div className="col-md-3"/>
              <div className="col-md-6">
                  <div className="row mt-3">
                      <div className="col-md-8">
                          <MonthSelect handlerFunction={(event)=>setSelectedMonth(event.target.value)} isSubmitted={false} monthList={filteredMonths}/>
                      </div>
                      <div className="col-md-4">
                          <button className="btn btn-primary" onClick={getBalance} data-testid="calculate-balance-btn">Calculate Balance</button>
                       </div>
                  </div>
                  <div className="row mt-3">
                      <div className="col-md-11">
                          <button className="btn btn-primary w-100" data-testid="rebalance-btn" onClick={reBalance}>Re-balance</button>
                      </div>
                  </div>
                  <div className="row mt-3">
                      <div className="col-md-11">
                          <button className="btn btn-light btn-outline-dark w-100" onClick={()=>setIsSubmitted(false)} data-testid="goBack-btn">Go Back</button>
                      </div>
                  </div>
              </div>
              <div className="col-md-3"/>
            </div>
            {
                (Object.keys(selectedMonthBalance)?.length > 0 || isRebalanceClicked) && (
                    <>
                        <ChangesList
                            changesList={showDetails ? balances : [selectedMonthBalance]}
                            label={isRebalanceClicked ? "Re-balance Amount" : showDetails ? "Balances" : "Balance"}
                        />
                        {!showDetails && (
                            <div className="text-center mt-3">
                                <button className="btn btn-primary w-25" onClick={showDetailsHandler}>
                                    Show Details
                                </button>
                            </div>
                        )}
                    </>
                )
            }
        </>
    )
}
export default BalanceCalculator;