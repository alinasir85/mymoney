import { render, screen, fireEvent } from '@testing-library/react';
import BalanceCalculator from './BalanceCalculator';

describe('BalanceCalculator', () => {
    it('should render calculate balance button', () => {
        render(<BalanceCalculator setIsSubmitted={() => {}} allocation={{}} sip={{}} changesList={[]} />);
        const calculateButton = screen.getByTestId('calculate-balance-btn');
        expect(calculateButton).toBeInTheDocument();
    });

    it('should render rebalance button', () => {
        render(<BalanceCalculator setIsSubmitted={() => {}} allocation={{}} sip={{}} changesList={[]} />);
        const rebalanceButton = screen.getByTestId('rebalance-btn');
        expect(rebalanceButton).toBeInTheDocument();
    });

    it('should render go back button', () => {
        render(<BalanceCalculator setIsSubmitted={() => {}} allocation={{}} sip={{}} changesList={[]} />);
        const goBackButton = screen.getByTestId('goBack-btn');
        expect(goBackButton).toBeInTheDocument();
    });

    it("should update filteredMonths when changesList is not empty", () => {
        const changesList = [
            { month: "January", equity: 4, debt: 10, gold: 2 },
            { month: "February", equity: -10, debt: 40, gold: 0 },
            { month: "March", equity: 12.5, debt: 12.5, gold: 12.5 },
        ];
        render(<BalanceCalculator changesList={changesList} />);

        expect(screen.getByText("January")).toBeInTheDocument();
        expect(screen.getByText("February")).toBeInTheDocument();
        expect(screen.getByText("March")).toBeInTheDocument();
    });

    it("should not update filteredMonths when changesList is empty", () => {
        const changesList = [];
        render(<BalanceCalculator changesList={changesList} />);

        expect(screen.queryByText("January")).not.toBeInTheDocument();
        expect(screen.queryByText("February")).not.toBeInTheDocument();
        expect(screen.queryByText("March")).not.toBeInTheDocument();
    });

    it('should calculate balance correctly when calling getBalance', () => {
        const allocation = {
            equity: 6000,
            debt: 3000,
            gold: 1000,
        };
        const sip = {
            equity: 2000,
            debt: 1000,
            gold: 500,
        };
        const changesList = [
            { month: 'January', equity: 4, debt: 10, gold: 2 },
            { month: 'February', equity: -10, debt: 40, gold: 0 },
            { month: 'March', equity: 12.50, debt: 12.50, gold: 12.50 },
        ];
        const setIsSubmitted = jest.fn();

        render(<BalanceCalculator setIsSubmitted={setIsSubmitted} allocation={allocation} sip={sip} changesList={changesList} />);

        fireEvent.change(screen.getByTestId('month-select'), { target: { value: 'March' } });
        fireEvent.click(screen.getByTestId('calculate-balance-btn'));

        expect(screen.getByText('Equity: 10593')).toBeInTheDocument();
        expect(screen.getByText('Debt: 7897')).toBeInTheDocument();
        expect(screen.getByText('Gold: 2272')).toBeInTheDocument();
    });

    it('should display alert message when no re-balance month exists', () => {
        window.alert = jest.fn();
        render(<BalanceCalculator setIsSubmitted={false} allocation={{}} sip={{}} changesList={[]} />);
        fireEvent.click(screen.getByTestId('rebalance-btn'));
        expect(window.alert).toHaveBeenCalledWith('CANNOT RE-BALANCE!');
    });

    it('should re-balance correctly when JUNE or DECEMBER change exists and calling rebalance', () => {
        const allocation = {
            equity: 6000,
            debt: 3000,
            gold: 1000,
        };
        const sip = {
            equity: 2000,
            debt: 1000,
            gold: 500,
        };
        const changesList = [
            { month: 'January', equity: 4, debt: 10, gold: 2 },
            { month: 'February', equity: -10, debt: 40, gold: 0 },
            { month: 'March', equity: 12.50, debt: 12.50, gold: 12.50 },
            { month: 'April', equity: 8, debt: -3, gold: 7 },
            { month: 'May', equity: 13, debt: 21, gold: 10.50 },
            { month: 'June', equity: 10, debt: 8, gold: -5 },
        ];
        const setIsSubmitted = jest.fn();

        render(<BalanceCalculator setIsSubmitted={setIsSubmitted} allocation={allocation} sip={sip} changesList={changesList} />);

        fireEvent.click(screen.getByTestId('rebalance-btn'));

        expect(screen.getByText('Equity: 23619')).toBeInTheDocument();
        expect(screen.getByText('Debt: 11809')).toBeInTheDocument();
        expect(screen.getByText('Gold: 3936')).toBeInTheDocument();
    });

});
