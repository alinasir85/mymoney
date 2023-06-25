import {useMemo, useState} from "react";
import Invest from "@/components/Invest";
import MonthSelect from "@/components/MonthSelect";
import ChangesList from "@/components/ChangesList";
import Calculate from "@/components/Calculate";

const MyMoney = () => {
    const [allocation,setAllocation] = useState({});
    const [sip,setSip] = useState({});
    const [changesList,setChangesList] = useState([]);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [change,setChange] = useState({equity:0, debt:0, gold:0, month:'January'});

    const allocationHandler = (event) => {
        const {name,value} = event.target;
        setAllocation({
            ...allocation,
            [name] : value
        });
    }

    const sipHandler = (event) => {
        const {name,value} = event.target;
        setSip({
            ...sip,
            [name] : value
        });
    }

    const changeHandler = (event) => {
        const {name, value} = event.target;
        setChange({
            ...change,
            [name]:value
        })
    }

    const addMonthChangeHandler = (event) => {
        event.preventDefault();
        if(Object.keys(change).length > 0) {
            if(!changesList?.find(changeObj => changeObj.month === change.month)) {
                setChangesList([...changesList,change]);
            }
        }
    }

    const submitHandler = (event) => {
        event.preventDefault();
        setIsSubmitted(true);
        console.log(allocation,sip, changesList)
    }

    const memoizedChangesList = useMemo(() => changesList, [changesList]);

    return(
        <>
           <form className="container mt-5 card card-body border-dark border-opacity-50" onSubmit={submitHandler}>
               <div className="row">
                   <Invest label="Allocation" isSubmitted={isSubmitted} handlerFunction={sipHandler}/>
               </div>
               <div className="row">
                   <Invest label="SIP" isSubmitted={isSubmitted} handlerFunction={allocationHandler}/>
               </div>
               <div className="row">
                   <Invest label="Changes" isSubmitted={isSubmitted} handlerFunction={changeHandler}/>
                   <div className="col-md-3">
                       <div className="form-group row">
                           <label className="col-sm-3 col-form-label">Month:</label>
                           <div className="col-sm-9">
                               <MonthSelect handlerFunction={changeHandler} isSubmitted={isSubmitted}/>
                               <button className="btn w-100 btn-light btn-outline-dark rounded-2 mt-2"
                                       onClick={addMonthChangeHandler} disabled={isSubmitted}>+</button>
                           </div>
                       </div>
                   </div>
               </div>
               <ChangesList changesList={memoizedChangesList} />
               {
                   !isSubmitted
                       ? (
                       <button className="mt-4 btn btn-primary">Submit</button>
                       ) :
                       <Calculate setIsSubmitted={setIsSubmitted} handlerFunction={changeHandler}/>
               }
           </form>
        </>
    );
}
export default MyMoney;