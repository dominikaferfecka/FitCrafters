import React, { useEffect, useState, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DateRangeSelector from "./DateRangeSelector";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRangePicker } from "react-date-range";
import { addDays } from "date-fns";

function BarChart(props) {
  const [selectedStat, setSelectedStat] = useState(props.stats[0]);
  const [caloriesData, setCaloriesData] = useState([]);
  const [selectedDate, setSelectedDate] = useState({
    startDate: new Date(),
    endDate: addDays(new Date(), 7),
  });
  const chartRef = useRef(null);

  const mappedSelectGyms = props.firstSelect.map((item, index) => (
    <option key={index} value={index + 1}>
      {item}
    </option>
  ));

  const mappedSelectStats = props.stats.map((item, index) => (
    <option key={index} value={index + 1}>
      {item}
    </option>
  ));

  const handleStatChange = (event) => {
    setSelectedStat(event.target.value);
  };

  const handleDateChange = ({ startDate, endDate }) => {
    setSelectedDate({ startDate, endDate });
    console.log("Start Date in BarChart:", startDate);
    console.log("End Date in BarChart:", endDate);
  };

  useEffect(() => {
    // Ładuj skrypt Chart.js
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/chart.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      // Poczekaj na załadowanie skryptu Chart.js, a następnie utwórz wykres
      const ctx = document.getElementById("myChart");
      const chartInstance = new window.Chart(ctx, {
        type: "bar",
        data: {
          labels: [],
          datasets: [
            {
              label: "",
              data: [],
              borderWidth: 1,
              backgroundColor: "#198754",
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
      chartRef.current = chartInstance;
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const url = `http://127.0.0.1:8000/training-stats-calories/1/?startDate=${selectedDate.startDate.toISOString()}&endDate=${selectedDate.endDate.toISOString()}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        setCaloriesData({
          data: data.data,
          labels: data.labels,
        });
      } catch (error) {
        console.error("Błąd przy pobieraniu danych:", error);
      }
    };

    fetchData();
  }, [selectedStat, selectedDate]);

  useEffect(() => {
    if (chartRef.current && caloriesData.data.length > 0) {
      const chartInstance = chartRef.current;
      const selectedDataset = client_datasets[selectedStat];

      if (selectedDataset && selectedDataset.label) {
        chartInstance.data.labels = selectedDataset.labels;
        chartInstance.data.datasets[0].label = selectedDataset.label;
        chartInstance.data.datasets[0].data = selectedDataset.data;

        chartInstance.update();
        console.log("Statystyka :" + selectedStat);
      }
    }
  }, [selectedStat, caloriesData]);

  const client_datasets = [
    {
      label: "Wybierz statystyke",
      data: [0],
      labels: [""],
      borderWidth: 1,
      backgroundColor: "#198754",
    },
    {
      label: "Spalone kalorie",
      data: caloriesData.data,
      labels: caloriesData.labels,
      borderWidth: 1,
      backgroundColor: "#198754",
    },
    {
      label: "Długość treningów",
      data: [20, 19, 3, 5, 10, 3, 20],
      borderWidth: 1,
      backgroundColor: "#198754",
    },
  ];

  return (
    <div className="w-75 p-3 m-auto" id={props.scrollId}>
      <h1 className="text-center">{props.header}</h1>
      <form
        className="row"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <DateRangeSelector onDateChange={handleDateChange} />
        {props.firstSelectTitle && (
          <select className="form-select col m-3" aria-label="Select">
            <option value="0">{props.firstSelectTitle}</option>
            {mappedSelectGyms}
          </select>
        )}

        <select
          className="form-select col m-3"
          aria-label="Select"
          onChange={handleStatChange}
        >
          <option value="0">Wybierz statystykę</option>
          {mappedSelectStats}
        </select>
      </form>
      <canvas id="myChart"></canvas>
    </div>
  );
}

export default BarChart;
