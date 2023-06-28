import MonthSelect from "../MonthSelect/MonthSelect";
import {useState} from "react";
import ChangesList from "../ChangesList/ChangesList";

const BalanceCalculator = ({setIsSubmitted, allocation, sip, changesList}) => {
    const [selectedMonth,setSelectedMonth] = useState('January');
    const [balances,setBalances] = useState([]);
    const [selectedMonthBalance, setSelectedMonthBalance] = useState({});
    const [showDetails,setShowDetails] = useState(false);

    const calculateBalance = (prevBalance, sipAmount, changeRate, month) => {
        if (month === 'January') {
            sipAmount = 0;
        }
        const currentBalance = prevBalance + sipAmount;
        const balance = currentBalance + (currentBalance * (changeRate/100));
        return Math.floor(balance);
    };

    const getBalance = (event) => {
        event.preventDefault();
        debugger
        const balance = balances.find((balance) => balance.month === selectedMonth);
        if (balance) {
            setShowDetails(false);
            setSelectedMonthBalance(balance);
        } else {
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
                if (change.month === selectedMonth) {
                    setSelectedMonthBalance(prevBalance);
                    break;
                }
            }
            setBalances(newBalances);
        }
    }

    const reBalance = () => {
        const isBalanceExist = balances.find(balance => (balance.month === "June" || balance.month === "December"));
    }

    return (
        <>
            <div className="row">
              <div className="col-md-3"/>
              <div className="col-md-6">
                  <div className="row mt-3">
                      <div className="col-md-8">
                          <MonthSelect handlerFunction={(event)=>setSelectedMonth(event.target.value)} isSubmitted={false}/>
                      </div>
                      <div className="col-md-4">
                          <button className="btn btn-primary" onClick={getBalance}>Calculate Balance</button>
                       </div>
                  </div>
                  <div className="row mt-3">
                      <div className="col-md-11">
                          <button className="btn btn-primary w-100">Re-balance</button>
                      </div>
                  </div>
                  <div className="row mt-3">
                      <div className="col-md-11">
                          <button className="btn btn-light btn-outline-dark w-100" onClick={()=>setIsSubmitted(false)}>Go Back</button>
                      </div>
                  </div>
              </div>
              <div className="col-md-3"/>
            </div>
            {
                Object.keys(selectedMonthBalance)?.length > 0 && (
                    <>
                        <ChangesList changesList={showDetails ? balances : [selectedMonthBalance]} label={showDetails ? "Balances" : "Balance"} />
                        {!showDetails && (
                            <div className="text-center mt-3">
                                <button className="btn btn-primary w-25" onClick={() => setShowDetails(true)}>
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