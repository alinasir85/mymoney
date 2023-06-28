import {useEffect, useMemo, useState} from "react";
import Invest from "@/components/Invest/Invest";
import MonthSelect from "@/components/MonthSelect/MonthSelect";
import ChangesList from "@/components/ChangesList/ChangesList";
import BalanceCalculator from "@/components/BalanceCalculator/BalanceCalculator";
import {MONTH_LIST} from "@/utils/Helper";

const MyMoney = () => {
    const [allocation,setAllocation] = useState({});
    const [sip,setSip] = useState({});
    const [changesList,setChangesList] = useState([]);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [change,setChange] = useState({equity:0, debt:0, gold:0, month:'January'});
    
    const initializeChangesList = () => {
        const monthChanges = [];
        MONTH_LIST.map(month => {
            monthChanges.push({equity:0, debt:0, gold:0, month, isCustom: false})
        })
        setChangesList(monthChanges);
    }

    useEffect(() => {
        initializeChangesList();
    },[]);

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
            const updatedChangesList = changesList.map(changeObj => {
                if (changeObj.month === change.month) {
                    return { ...changeObj, ...change , isCustom: true};
                }
                return changeObj;
            });
            setChangesList(updatedChangesList);
        }
    }

    const submitHandler = (event) => {
        event.preventDefault();
        setIsSubmitted(true);
    }

    const memoizedChangesList = useMemo(() => changesList.filter(change => change.isCustom), [changesList]);

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
                               <MonthSelect handlerFunction={changeHandler} isSubmitted={isSubmitted}/>
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
export default MyMoney;