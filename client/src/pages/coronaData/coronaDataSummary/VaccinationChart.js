import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

function VaccinationChart() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'מספר המתחסנים',
        data: [],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  });

  const [startDate, setStartDate] = useState(new Date('2021-01-01'));
  const [endDate, setEndDate] = useState(new Date());

  const fetchData = async (startDate, endDate) => {
    // פה תכתוב את הקוד להביא את הנתונים מהשרת או מקובץ
    // ודא שהנתונים מגיעים בפורמט של מערך אובייקטים
    // עם שדות 'date' ו-'vaccinatedCount'
    const response = await fetch(`/api/vaccination-data?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`);
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    const fetchDataAndUpdateChart = async () => {
      const data = await fetchData(startDate, endDate);
      setChartData({
        labels: data.map(item => item.date),
        datasets: [
          {
            label: 'מספר המתחסנים',
            data: data.map(item => item.vaccinatedCount),
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          }
        ]
      });
    };

    fetchDataAndUpdateChart();
  }, [startDate, endDate]);

  return (
    <div>
      <div>
        <label>תאריך התחלה:</label>
        <input type="date" value={startDate.toISOString().split('T')[0]} onChange={(e) => setStartDate(new Date(e.target.value))} />
      </div>
      <div>
        <label>תאריך סיום:</label>
        <input type="date" value={endDate.toISOString().split('T')[0]} onChange={(e) => setEndDate(new Date(e.target.value))} />
      </div>
      <h2>היסטוגרמה של מספר המתחסנים</h2>
      <Line data={chartData} />
    </div>
  );
}

export default VaccinationChart;
