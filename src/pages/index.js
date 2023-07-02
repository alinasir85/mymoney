import React, {useCallback, useMemo, useState} from "react";
import Invest from "@/components/Invest/Invest";
import MonthSelect from "@/components/MonthSelect/MonthSelect";
import ChangesList from "@/components/ChangesList/ChangesList";
import BalanceCalculator from "@/components/BalanceCalculator/BalanceCalculator";
import {MONTH_LIST} from "@/utils/Helper";

const MyMoney = () => {
  const [allocation, setAllocation] = useState({ equity: 0, debt: 0, gold: 0 });
  const [sip, setSip] = useState({ equity: 0, debt: 0, gold: 0 });
  const [changesList, setChangesList] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [change, setChange] = useState({ equity: 0, debt: 0, gold: 0, month: "JANUARY" });

  const allocationHandler = useCallback((event) => {
    const { name, value } = event.target || {};
    if (name) {
      setAllocation((prevAllocation) => ({
        ...prevAllocation,
        [name]: parseInt(value),
      }));
    }
  }, []);

  const sipHandler = useCallback((event) => {
    const { name, value } = event.target || {};
    if(name) {
      setSip((prevSip) => ({
        ...prevSip,
        [name]: parseInt(value),
      }));
    }
  }, []);

  const changeHandler = useCallback((event) => {
    const { name, value } = event.target || {};
    if(name) {
      setChange((prevChange) => ({
        ...prevChange,
        [name]: parseFloat(value) ? parseFloat(value) : value.trim(),
      }));
    }
  }, []);

  const updateMonthChangeHandler = useCallback((event) => {
    event.preventDefault();
    if (Object.keys(change).length > 0) {
      const prevMonthIndex = MONTH_LIST.findIndex((month) => month === change.month);
      const prevMonth = prevMonthIndex > 0 ? MONTH_LIST[prevMonthIndex - 1] : "";
      if (changesList?.find((changeObj) => changeObj.month === prevMonth) || prevMonth === "") {
        if (!changesList?.find((changeObj) => changeObj.month === change.month)) {
          setChangesList((prevChangesList) => [...prevChangesList, change]);
        }
      } else {
        alert("Please specify change rates of previous months!");
      }
    }
  }, [change, changesList]);

  const submitHandler = useCallback((event) => {
    event.preventDefault();
    if (changesList.length === 0) {
      alert("Please add change rates!");
    } else {
      setIsSubmitted(true);
    }
  }, [changesList]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = handleFileRead;
    reader.readAsText(file);
  };

  const handleFileRead = (event) => {
    const content = event.target.result;
    parseFileContent(content);
    setIsSubmitted(true);
  };

  const parseFileContent = (content) => {
    const lines = content.split("\n");
    const allocationLine = lines[0].split(" ").slice(1).map(Number);
    const sipLine = lines[1].split(" ").slice(1).map(Number);
    const changesLines = lines.slice(2).filter((line) => line.startsWith("CHANGE"));
    const parsedChangesList = changesLines.map((line) => {
      const values = line.split(" ");
      return {
        equity: parseFloat(values[1]),
        debt: parseFloat(values[2]),
        gold: parseFloat(values[3]),
        month: values[4].trim(),
      };
    });
    setAllocation({
      equity: allocationLine[0],
      debt: allocationLine[1],
      gold: allocationLine[2],
    });
    setSip({
      equity: sipLine[0],
      debt: sipLine[1],
      gold: sipLine[2],
    });
    setChangesList(parsedChangesList);
  };

  const memoizedChangesList = useMemo(() => changesList, [changesList]);

  return (
      <>
        <legend className="text-center mt-2 p-2 h2">My Money</legend>
        <form className="container mt-5 mb-5 card card-body border-dark border-opacity-50" onSubmit={submitHandler}>
          <div className="row">
            <Invest label="Allocation" isSubmitted={isSubmitted} handlerFunction={allocationHandler} values={allocation}/>
          </div>
          <div className="row">
            <Invest label="SIP" isSubmitted={isSubmitted} handlerFunction={sipHandler} values={sip}/>
          </div>
          <div className="row">
            <Invest label="Changes" isSubmitted={isSubmitted} handlerFunction={changeHandler} values={change}/>
            <div className="col-md-3">
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Month:</label>
                <div className="col-sm-9">
                  <MonthSelect handlerFunction={changeHandler} isSubmitted={isSubmitted} monthList={MONTH_LIST} />
                  <button
                      className="btn w-100 btn-light btn-outline-dark rounded-2 mt-2"
                      onClick={updateMonthChangeHandler}
                      disabled={isSubmitted}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
          <ChangesList changesList={memoizedChangesList} />
          {!isSubmitted ? (
              <>
                <div className="mt-5 w-100">
                  <label className="w-100 btn btn-light btn-outline-dark">
                    Upload File
                    <input type="file" accept=".txt" onChange={handleFileUpload} style={{ display: 'none' }} />
                  </label>
                </div>
                <button className="mt-4 btn btn-primary w-100">Submit</button>
              </>
          ) : (
              <BalanceCalculator setIsSubmitted={setIsSubmitted} allocation={allocation} sip={sip} changesList={changesList} />
          )}
        </form>
      </>
  );
};

export default MyMoney;
