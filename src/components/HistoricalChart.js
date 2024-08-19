import React, { useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

function HistoricalChart({ data }) {
    const chartRef = useRef(null);

    useEffect(()=>{
        const chartInstance = chartRef.current;

        return()=>{
            if(chartInstance){
                chartInstance.destroy();
            }
        };
    },[data]);

    const chartData = {
        labels: data.map(entry => entry.date),
        datasets: [
            {
                label: 'Balance',
                data: data.map(entry => entry.balance),
                fill: false,
                backgroundColor: 'blue',
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
            },
        ],
    };

    return (
        <div className="historical-chart-container">
            <Line ref={chartRef} data={chartData}/>
        </div>
    );
}

export default HistoricalChart;