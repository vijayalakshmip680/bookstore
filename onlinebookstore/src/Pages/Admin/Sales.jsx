import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import './saleschart.css'
import { useEffect } from "react";

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const Sales = ({ orders }) => {
    console.log(orders)
    // Calculate total sales and order count per month
    const salesData = orders.reduce((acc, order) => {
        const date = new Date(order.orderdate);
        const month = date.toLocaleString('default', { month: 'long' }); // Get month name
        const year = date.getFullYear(); // Get year
        const monthYear = `${month} ${year}`; // Create a month-year string

        // Initialize the month if it doesn't exist
        if (!acc[monthYear]) {
            acc[monthYear] = { total: 0, count: 0 };
        }

        // Update total sales and order count
        acc[monthYear].total += order.total;
        acc[monthYear].count += 1;
        return acc;
    }, {});

    const chartData = {
        labels: Object.keys(salesData), // Month-Year
        datasets: [
            {
                label: 'Total Sales',
                data: Object.values(salesData).map(data => data.total), // Total sales for each month
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                    '#FF9F40',
                    '#FF5733',
                    '#C70039',
                    '#900C3F',
                    '#581845',
                    '#FFC300',
                    '#DAF7A6',
                ],
            },
        ],
    };

    const barChartData = {
        labels: Object.keys(salesData), // Month-Year
        datasets: [
            {
                label: 'Order Count',
                data: Object.values(salesData).map(data => data.count), // Order count for each month
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                    '#FF9F40',
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#581845',
                    '#9966FF',
                    '#FF9F40',
                ],
            },
        ],
    };

    // Options for the Bar chart to display integer values on the Y-axis
    const options = {
        scales: {
            y: {
                ticks: {
                    callback: function (value) {
                        return Number.isInteger(value) ? value : null; // Only display integer values
                    },
                },
            },
        },
    };
    return (
        <div className="chart-cover">
            <h2>Sales Statistics</h2>
            <div className="chart-wrapper">
                <h4>Order Amount per Month</h4>
                <Pie data={chartData} />
            </div>
            <div  className="chart-wrapper">
                <h4>Order Count per Month</h4>
                <Bar data={barChartData} options={options} />
            </div>
        </div>
    );
}

export default Sales;


