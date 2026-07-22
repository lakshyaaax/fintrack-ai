import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

function LineChart({ monthlyData }) {

    const data = {

        labels: Object.keys(monthlyData),

        datasets: [

            {
                label: "Monthly Expenses",

                data: Object.values(monthlyData),

                borderColor: "#3B82F6",

                backgroundColor: "rgba(59,130,246,0.25)",

                tension: 0.4,

                fill: true,

            },

        ],

    };

    const options = {

        responsive: true,

        maintainAspectRatio: false,

        plugins: {

            title: {

                display: true,

                text: "Monthly Spending Trend",

            },

        },

    };

    return (

        <div style={{ height: "380px" }}>

            <Line
                data={data}
                options={options}
            />

        </div>

    );

}

export default LineChart;