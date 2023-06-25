import MonthSelect from "@/components/MonthSelect";

const Calculate = ({setIsSubmitted,handlerFunction}) => {
  return (
      <div className="row">
          <div className="col-md-3"/>
          <div className="col-md-6">
              <div className="row mt-3">
                  <div className="col-md-8">
                      <MonthSelect handlerFunction={handlerFunction} isSubmitted={false}/>
                  </div>
                  <div className="col-md-4">
                      <button className="btn btn-primary">Calculate Balance</button>
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
  )
}
export default Calculate;