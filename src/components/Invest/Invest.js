const Invest = ({label,isSubmitted,handlerFunction}) => {
    return(
        <>
            <legend className="col-md-12 form-label mt-2 bg-light p-2">{label}:</legend>
            <div className="col-md-3">
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Equity:</label>
                    <div className="col-sm-9">
                        <input className="form-control" name="equity" type="text" required onChange={handlerFunction} disabled={isSubmitted}/>
                    </div>
                </div>
            </div>
            <div className="col-md-3">
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Debt:</label>
                    <div className="col-sm-9">
                        <input className="form-control" name="debt" type="text" required onChange={handlerFunction} disabled={isSubmitted}/>
                    </div>
                </div>
            </div>
            <div className="col-md-3">
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Gold:</label>
                    <div className="col-sm-9">
                        <input className="form-control" name="gold" type="text" required onChange={handlerFunction} disabled={isSubmitted}/>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Invest;