import { render, screen, fireEvent } from "@testing-library/react";
import BalanceCalculator from "./BalanceCalculator";

describe("BalanceCalculator", () => {
    it("should render calculate balance button", () => {
        render(<BalanceCalculator />);
        const calculateButton = screen.getByText("Calculate Balance");
        expect(calculateButton).toBeInTheDocument();
    });

    it("should render rebalance button", () => {
        render(<BalanceCalculator />);
        const rebalanceButton = screen.getByText("Re-balance");
        expect(rebalanceButton).toBeInTheDocument();
    });

    it("should render go back button", () => {
        render(<BalanceCalculator />);
        const goBackButton = screen.getByText("Go Back");
        expect(goBackButton).toBeInTheDocument();
    });

    it("should calculate balance correctly when calling getBalance", () => {
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
            { month: "January", equity: 4, debt: 10, gold: 2 },
            { month: "February", equity: -10, debt: 40, gold: 0 },
            { month: "March", equity: 12.50, debt: 12.50, gold: 12.50 },
        ];
        const setIsSubmitted = jest.fn();

        render(
            <BalanceCalculator
                setIsSubmitted={setIsSubmitted}
                allocation={allocation}
                sip={sip}
                changesList={changesList}
            />
        );
        fireEvent.change(screen.getByTestId("month-select"), {
            target: { value: "March" },
        });
        fireEvent.click(screen.getByText("Calculate Balance"));

        expect(screen.getByText("Equity: 10593")).toBeInTheDocument();
        expect(screen.getByText("Debt: 7897")).toBeInTheDocument();
        expect(screen.getByText("Gold: 2272")).toBeInTheDocument();
    });
})