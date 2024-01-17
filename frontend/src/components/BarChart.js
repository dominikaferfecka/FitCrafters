import React, { useEffect, useState, useRef } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DateRangeSelector from "./DateRangeSelector";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { addDays } from "date-fns";

function BarChart(props) {
  const clientId = props.clientId;
  const [selectedStat, setSelectedStat] = useState(props.stats[0]);
  const [statistics, setStatistics] = useState("");
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

  // select statistics
  const handleStatChange = (event) => {
    setSelectedStat(event.target.value);
    let stat;
    switch (event.target.value) {
      case "1":
        stat = "calories";
        break;
      case "2":
        stat = "duration";
        break;
      case "3":
        stat = "category";
        break;
      case "4":
        stat = "name";
        break;
      case "5":
        stat = "trainer";
        break;
      default:
        stat = "";
    }
    setStatistics(stat);
  };

  const handleDateChange = ({ startDate, endDate }) => {
    setSelectedDate({ startDate, endDate });
    console.log("Start Date in BarChart:", startDate);
    console.log("End Date in BarChart:", endDate);
  };

  useEffect(() => {
    // Load script Chart.js
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/chart.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      // wait for loading Chart.js, and next create base chart
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
      const url = `http://127.0.0.1:8000/training-stats-${statistics}/${clientId}/?startDate=${selectedDate.startDate.toISOString()}&endDate=${selectedDate.endDate.toISOString()}`;

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
    if (chartRef.current && caloriesData.data && caloriesData.data.length > 0) {
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
      // borderWidth: 1,
      // backgroundColor: "#198754",
    },
    {
      label: "Spalone kalorie",
      data: caloriesData.data,
      labels: caloriesData.labels,
    },
    {
      label: "Długość treningów",
      data: caloriesData.data,
      labels: caloriesData.labels,
    },
    {
      label: "Ilość treningów z danej kategorii",
      data: caloriesData.data,
      labels: caloriesData.labels,
    },
    {
      label: "Ilość treningów z danego planu treningowego",
      data: caloriesData.data,
      labels: caloriesData.labels,
    },
    {
      label: "Ilość treningów z danym trenerem",
      data: caloriesData.data,
      labels: caloriesData.labels,
    },
  ];

  return (
    <div className="w-75 p-3 m-auto" id={props.scrollId}>
      <h1 className="text-center m-4">{props.header}</h1>
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
