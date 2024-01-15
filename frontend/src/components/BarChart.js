import React, { useEffect, useState, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function BarChart(props) {
  const [selectedStat, setSelectedStat] = useState(props.stats[0]);
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

      chartInstance.data.datasets[0].label = client_datasets[selectedStat].label;
      chartInstance.data.datasets[0].data = client_datasets[selectedStat].data;
      
      chartInstance.update();
      console.log("Statystyka :" + selectedStat)
    }
  }, [selectedStat]);



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
      <canvas id="myChart"></canvas>
    </div>
  );
}

export default BarChart;
