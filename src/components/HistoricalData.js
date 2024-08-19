import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { generateMockHistoricalData } from '../utils/mockData';
import { Chart } from 'chart.js';

function HistoricalData({ token }) {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [historicalData, setHistoricalData] = useState([]);
    const [chartInstance, setChartInstance] = useState(null);

    useEffect(() => {
        // Generate mock data when token or date range changes
        if (token) {
            const data = generateMockHistoricalData(token, startDate, endDate);
            setHistoricalData(data);
        }
    }, [token, startDate, endDate]);

    useEffect(() => {
        // Clean up the chart instance when the token changes or component unmounts
        return () => {
            if (chartInstance) {
                chartInstance.destroy();
            }
        };
    }, [token]);

    const fetchHistoricalData = () => {
        if (startDate && endDate) {
            const data = generateMockHistoricalData(token, startDate, endDate);
            setHistoricalData(data);
        }
    };

    const chartData = {
        labels: historicalData.map((data) => data.date),
        datasets: [
            {
                label: 'Token Balance',
                data: historicalData.map((data) => data.balance),
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
            },
        ],
    };

    return (
        <div>
            <h3>Historical Data for {token}</h3>
            <div className="date-picker-container">
                {startDate && endDate && (
                    <>
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                        />
                        <DatePicker
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                        />
                        <button onClick={fetchHistoricalData}>Fetch Data</button>
                    </>
                )}
            </div>
            {historicalData.length > 0 ? (
                <div className="chart-container">
                    {typeof window !== 'undefined' && (
                        <Line
                            data={chartData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                            }}
                            getDatasetAtEvent={(e) => {
                                if (chartInstance) {
                                    chartInstance.destroy();
                                }
                                setChartInstance(Chart.getChart(e.chart.canvas.id));
                            }}
                        />
                    )}
                </div>
            ) : (
                <p>No historical data available. Please select a date range and fetch data.</p>
            )}
        </div>
    );
}

export default HistoricalData;
