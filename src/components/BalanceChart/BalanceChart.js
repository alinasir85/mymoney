import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const BalanceChart = ({ balances }) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const data = balances.map(({ month, equity, debt, gold }) => ({
            month,
            equity,
            debt,
            gold,
        }));

        setChartData(data);
    }, [balances]);

    return (
        <div className="row mt-5 d-flex justify-content-center">
            <BarChart width={700} height={450} data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="equity" fill="#8884d8" />
                <Bar dataKey="debt" fill="#82ca9d" />
                <Bar dataKey="gold" fill="#ffc658" />
            </BarChart>
        </div>
    );
};

export default BalanceChart;
