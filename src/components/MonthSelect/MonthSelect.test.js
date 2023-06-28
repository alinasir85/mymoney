import { render, screen, fireEvent } from '@testing-library/react';
import MonthSelect from '@/components/MonthSelect/MonthSelect';
import { MONTH_LIST } from '@/utils/Helper';

describe('MonthSelect', () => {
    it('should render month select component', () => {
        render(<MonthSelect monthList={MONTH_LIST} handlerFunction={() => {}} isSubmitted={false} />);
        const monthSelect = screen.getByTestId('month-select');
        expect(monthSelect).toBeInTheDocument();
    });

    it('should disable month select when isSubmitted is true', () => {
        render(<MonthSelect monthList={MONTH_LIST} handlerFunction={() => {}} isSubmitted={true} />);
        const monthSelect = screen.getByTestId('month-select');
        expect(monthSelect).toBeDisabled();
    });

    it('should call handlerFunction on month select change', () => {
        const handlerFunction = jest.fn();
        render(<MonthSelect monthList={MONTH_LIST} handlerFunction={handlerFunction} isSubmitted={false} />);
        const monthSelect = screen.getByTestId('month-select');
        fireEvent.change(monthSelect, { target: { value: 'March' } });
        expect(handlerFunction).toHaveBeenCalledTimes(1);
    });

    it('should display all months in the select options', () => {
        render(<MonthSelect monthList={MONTH_LIST} handlerFunction={() => {}} isSubmitted={false} />);
        const monthSelect = screen.getByTestId('month-select');
        MONTH_LIST.forEach((month) => {
            expect(screen.getByText(month)).toBeInTheDocument();
            expect(monthSelect.querySelector(`option[value="${month}"]`)).toBeInTheDocument();
        });
    });
});
