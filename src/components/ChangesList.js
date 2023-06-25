const ChangesList = ({changesList}) => {
  return (
      <div>
          {
              changesList?.map(change => (
                  <div key={change.month} className="row bg-light mt-2 p-2">
                      <div className="col-md-3">
                          Equity: {change.equity}
                      </div>
                      <div className="col-md-3">
                          Debt: {change.debt}
                      </div>
                      <div className="col-md-3">
                          Gold: {change.gold}
                      </div>
                      <div className="col-md-3">
                          Month: {change.month}
                      </div>
                  </div>
              ))
          }
      </div>
  )
}
export default ChangesList;