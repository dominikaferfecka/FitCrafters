import React, { useEffect, useState, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DateRangeSelector from "./DateRangeSelector"; 
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import format from 'date-fns/format'
import { DateRangePicker } from 'react-date-range'
import { addDays } from 'date-fns'

function BarChart(props) {
  const [selectedStat, setSelectedStat] = useState(props.stats[0]);
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
    console.log('Start Date in BarChart:', startDate);
    console.log('End Date in BarChart:', endDate);

    // Tutaj możesz dokonać odpowiednich aktualizacji związków z datą w komponencie BarChart
  };

  // Załaduj wykres bazowy
  useEffect(() => {
    // Ładuj skrypt Chart.js
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/chart.js";
    script.async = true;
    document.body.appendChild(script);

    // Poczekaj na załadowanie skryptu Chart.js, a następnie utwórz wykres
    script.onload = () => {
      const ctx = document.getElementById("myChart");

      const chartInstance = new window.Chart(ctx, {
        type: "bar",
        data: {
          labels: [
            "Poniedziałek",
            "Wtorek",
            "Środa",
            "Czwartek",
            "Piątek",
            "Sobota",
            "Niedziela",
          ],
          datasets: [
            {
              label: "aaa",
              data: [2,2,2,2,2,2,2],
              borderWidth: 1,
              backgroundColor: "#198754",
            },
            {
              label: "bbb",
              data: [3,3,3,3,3,3,3],
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

    return () => {
      // Oczekaj na odmontowanie komponentu i usuń skrypt
      document.body.removeChild(script);
    };
  }, []);


  const client_datasets = [
    { 
      label: "",
      data: [],
      borderWidth: 1,
      backgroundColor: "#198754",
    },
    { 
      label: "Spalone kalorie",
      data: [12, 19, 3, 5, 10, 3, 8],
      borderWidth: 1,
      backgroundColor: "#198754",
    },
    {
      label: "Długość treningów",
      data: [20, 19, 3, 5, 10, 3, 20],
      borderWidth: 1,
      backgroundColor: "#198754",
    },
  ]

  // Aktualizuj wykres
  useEffect(() => {
    if (chartRef.current) {
      const chartInstance = chartRef.current;

      chartInstance.data.labels = ["aaaaPoniedziałek","Wtorek",
        "Środa",
        "Czwartek",
        "Piątek",
        "Sobota",
        "Niedziela",
      ]
      chartInstance.data.datasets[0].label = client_datasets[selectedStat].label;
      chartInstance.data.datasets[0].data = client_datasets[selectedStat].data;
      // chartInstance.data.datasets[1].label = client_datasets[selectedStat].label;
      // chartInstance.data.datasets[1].data = [20, 19, 3, 5, 10, 3, 20],
      
      chartInstance.update();
      console.log("Statystyka :" + selectedStat)
    }
  }, [selectedStat]);

  // const handleDateChange = (date) => {
  //   setSelectedDate(date);
  //   console.log(selectedDate)
  // };



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

        <select className="form-select col m-3" aria-label="Select" onChange={handleStatChange}>
          <option value="0">Wybierz statystykę</option>
          {mappedSelectStats}
        </select>
      </form>
      {/* <DateRangeSelector/> */}
      <canvas id="myChart"></canvas>
    </div>
  );
}

export default BarChart;
