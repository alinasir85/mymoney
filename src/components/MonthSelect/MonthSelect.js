const MonthSelect = ({monthList,handlerFunction,isSubmitted}) => {
    return (
        <select className="form-select" name="month" required onChange={handlerFunction} disabled={isSubmitted} data-testid="month-select">
            {
                monthList.map(month => (
                    <option value={month} key={month}>{month}</option>
                ))
            }
        </select>
    )
}
export default MonthSelect;