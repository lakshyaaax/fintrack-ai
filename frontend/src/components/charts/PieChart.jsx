import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

function PieChart({ categoryData }) {
    const data = {
        labels: Object.keys(categoryData),

        datasets: [
            {
                data: Object.values(categoryData),

                backgroundColor: [
                    "#3B82F6",
                    "#22C55E",
                    "#F59E0B",
                    "#EF4444",
                    "#8B5CF6",
                    "#06B6D4",
                ],

                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: "Expenses by Category",
            },
        },
    };

    return (
        <div style={{ height: "350px" }}>
            <Pie data={data} options={options} />
        </div>
    );
}

export default PieChart;