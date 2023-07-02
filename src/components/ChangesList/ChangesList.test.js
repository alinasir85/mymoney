import { render, screen } from '@testing-library/react';
import ChangesList from './ChangesList';

describe('ChangesList', () => {

    it('should render the component with label', () => {
        const changesList = [
            { month: 'JANUARY', equity: 1000, debt: 2000, gold: 500 },
            { month: 'FEBRUARY', equity: 1500, debt: 1800, gold: 600 },
        ];
        const label = 'Changes';
        render(<ChangesList changesList={changesList} label={label} />);

        expect(screen.getByText('Changes:')).toBeInTheDocument();
        expect(screen.getByText('Equity: 1000')).toBeInTheDocument();
        expect(screen.getByText('Debt: 2000')).toBeInTheDocument();
        expect(screen.getByText('Gold: 500')).toBeInTheDocument();
        expect(screen.getByText('Month: JANUARY')).toBeInTheDocument();
        expect(screen.getByText('Equity: 1500')).toBeInTheDocument();
        expect(screen.getByText('Debt: 1800')).toBeInTheDocument();
        expect(screen.getByText('Gold: 600')).toBeInTheDocument();
        expect(screen.getByText('Month: FEBRUARY')).toBeInTheDocument();
    });

    it('should render the component without label', () => {
        const changesList = [
            { month: 'March', equity: 1200, debt: 2200, gold: 700 },
            { month: 'April', equity: 1800, debt: 2500, gold: 800 },
        ];
        render(<ChangesList changesList={changesList} />);

        expect(screen.queryByText('Changes:')).toBeNull();
        expect(screen.getByText('Equity: 1200')).toBeInTheDocument();
        expect(screen.getByText('Debt: 2200')).toBeInTheDocument();
        expect(screen.getByText('Gold: 700')).toBeInTheDocument();
        expect(screen.getByText('Month: March')).toBeInTheDocument();
        expect(screen.getByText('Equity: 1800')).toBeInTheDocument();
        expect(screen.getByText('Debt: 2500')).toBeInTheDocument();
        expect(screen.getByText('Gold: 800')).toBeInTheDocument();
        expect(screen.getByText('Month: April')).toBeInTheDocument();
    });

    it('should render the component with empty changesList', () => {
        render(<ChangesList changesList={[]} label="Changes" />);

        expect(screen.queryByText('Changes:')).toBeInTheDocument();
        expect(screen.queryByText('Equity:')).toBeNull();
        expect(screen.queryByText('Debt:')).toBeNull();
        expect(screen.queryByText('Gold:')).toBeNull();
        expect(screen.queryByText('Month:')).toBeNull();
    });
});
