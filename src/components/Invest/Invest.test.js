import { render, screen, fireEvent } from '@testing-library/react';
import Invest from './Invest';

describe('Invest', () => {
    it('should render the component with correct labels', () => {
        render(<Invest label="Investment" isSubmitted={false} handlerFunction={jest.fn()} />);
        expect(screen.getByTestId('equity-input')).toBeInTheDocument();
        expect(screen.getByTestId('debt-input')).toBeInTheDocument();
        expect(screen.getByTestId('gold-input')).toBeInTheDocument();
    });

    it('should call handlerFunction on input change', () => {
        const handlerFunction = jest.fn();
        render(<Invest label="Investment" isSubmitted={false} handlerFunction={handlerFunction} />);
        const equityInput = screen.getByTestId('equity-input');
        const debtInput = screen.getByTestId('debt-input');
        const goldInput = screen.getByTestId('gold-input');

        fireEvent.change(equityInput, { target: { value: '1000' } });
        fireEvent.change(debtInput, { target: { value: '500' } });
        fireEvent.change(goldInput, { target: { value: '200' } });

        expect(handlerFunction).toHaveBeenCalledTimes(3);
        expect(handlerFunction).toHaveBeenCalledWith(expect.any(Object));
    });

    it('should disable inputs when isSubmitted is true', () => {
        render(<Invest label="Investment" isSubmitted={true} handlerFunction={jest.fn()} />);
        const equityInput = screen.getByTestId('equity-input');
        const debtInput = screen.getByTestId('debt-input');
        const goldInput = screen.getByTestId('gold-input');

        expect(equityInput).toBeDisabled();
        expect(debtInput).toBeDisabled();
        expect(goldInput).toBeDisabled();
    });
});
