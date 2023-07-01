import {useMemo, useState} from "react";
import Invest from "@/components/Invest/Invest";
import MonthSelect from "@/components/MonthSelect/MonthSelect";
import ChangesList from "@/components/ChangesList/ChangesList";
import BalanceCalculator from "@/components/BalanceCalculator/BalanceCalculator";
import {MONTH_LIST} from "@/utils/Helper";

const Index = () => {
  const [allocation,setAllocation] = useState({});
  const [sip,setSip] = useState({});
  const [changesList,setChangesList] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [change,setChange] = useState({equity:0, debt:0, gold:0, month:'January'});

  const allocationHandler = (event) => {
    const {name,value} = event.target;
    setAllocation({
      ...allocation,
      [name] : parseInt(value)
    });
  }

  const sipHandler = (event) => {
    const {name,value} = event.target;
    setSip({
      ...sip,
      [name] : parseInt(value)
    });
  }

  const changeHandler = (event) => {
    const {name, value} = event.target;
    setChange({
      ...change,
      [name]: parseFloat(value) ? parseFloat(value) : value
    })
  }

  const updateMonthChangeHandler = (event) => {
    event.preventDefault();
    if(Object.keys(change).length > 0) {
      const prevMonthIndex = MONTH_LIST.findIndex(month => month === change.month);
      const prevMonth = prevMonthIndex > 0 ? MONTH_LIST[prevMonthIndex - 1] : '';
      if(changesList?.find(changeObj => changeObj.month === prevMonth) || prevMonth === '') {
        if(!changesList?.find(changeObj => changeObj.month === change.month)) {
          setChangesList([...changesList,change]);
        }
      } else {
        alert('Please specify change rates of previous months!');
      }
    }
  }

  const submitHandler = (event) => {
    event.preventDefault();
    if(changesList.length === 0) {
      alert('Please add change rates!');
    } else {
      setIsSubmitted(true);
    }
  }

  const memoizedChangesList = useMemo(() => changesList, [changesList]);

  return(
      <>
        <form className="container mt-5 mb-5 card card-body border-dark border-opacity-50" onSubmit={submitHandler}>
          <div className="row">
            <Invest label="Allocation" isSubmitted={isSubmitted} handlerFunction={allocationHandler}/>
          </div>
          <div className="row">
            <Invest label="SIP" isSubmitted={isSubmitted} handlerFunction={sipHandler}/>
          </div>
          <div className="row">
            <Invest label="Changes" isSubmitted={isSubmitted} handlerFunction={changeHandler}/>
            <div className="col-md-3">
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Month:</label>
                <div className="col-sm-9">
                  <MonthSelect handlerFunction={changeHandler} isSubmitted={isSubmitted} monthList={MONTH_LIST}/>
                  <button className="btn w-100 btn-light btn-outline-dark rounded-2 mt-2"
                          onClick={updateMonthChangeHandler} disabled={isSubmitted}>+</button>
                </div>
              </div>
            </div>
          </div>
          <ChangesList changesList={memoizedChangesList} />
          {
            !isSubmitted
                ?
                <button className="mt-4 btn btn-primary w-100">Submit</button>
                :
                <BalanceCalculator setIsSubmitted={setIsSubmitted} allocation={allocation} sip={sip} changesList={changesList}/>
          }
        </form>
      </>
  );
}
export default Index;