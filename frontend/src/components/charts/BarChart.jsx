import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function BarChart({ income, expense }) {
    const data = {
        labels: ["Income", "Expense"],
        datasets: [
            {
                label: "Amount (₹)",
                data: [income, expense],
                backgroundColor: [
                    "#22c55e",
                    "#ef4444",
                ],
                borderRadius: 8,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: "Income vs Expense",
            },
        },
    };

    return (
        <div style={{ height: "350px" }}>
            <Bar data={data} options={options} />
        </div>
    );
}

export default BarChart;