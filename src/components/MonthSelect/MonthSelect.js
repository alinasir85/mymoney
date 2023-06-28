import {MONTH_LIST} from "../../utils/Helper";

const MonthSelect = ({handlerFunction,isSubmitted}) => {
    return (
        <select className="form-select" name="month" required onChange={handlerFunction} disabled={isSubmitted} data-testid="month-select">
            {
                MONTH_LIST.map(month => (
                    <option value={month} key={month}>{month}</option>
                ))
            }
        </select>
    )
}
export default MonthSelect;