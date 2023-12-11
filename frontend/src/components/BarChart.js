import React, { useEffect } from "react";

function BarChart(props) {
  const selectGyms = [
    "siłownia1",
    "siłownia2",
    "siłownia3",
    "siłownia4",
    "siłownia5",
  ];
  const mappedSelectGyms = selectGyms.map((item, index) => (
    <option key={index} value={index + 1}>
      {item}
    </option>
  ));

  const selectStats = [
    "statystyka1",
    "statystyka2",
    "statystyka3",
    "statystyka4",
    "statystyka5",
  ];
  const mappedSelectStats = selectStats.map((item, index) => (
    <option key={index} value={index + 1}>
      {item}
    </option>
  ));
  useEffect(() => {
    // Ładuj skrypt Chart.js
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/chart.js";
    script.async = true;
    document.body.appendChild(script);

    // Poczekaj na załadowanie skryptu Chart.js, a następnie utwórz wykres
    script.onload = () => {
      const ctx = document.getElementById("myChart");

      new window.Chart(ctx, {
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
              label: "Ilość klientów x100",
              data: [12, 19, 3, 5, 2, 3, 8],
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
    };

    return () => {
      // Oczekaj na odmontowanie komponentu i usuń skrypt
      document.body.removeChild(script);
    };
  }, []); // Pusta tablica oznacza, że ten efekt będzie wywołany tylko raz po zamontowaniu komponentu

  return (
    <div className="w-75 p-3 m-auto" id={props.scrollId}>
      <h1 className="text-center">Statystyki siłowni</h1>
      <form
        className="row"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <select className="form-select col m-3" aria-label="Select">
          <option value="0">Wybierz siłownię</option>
          {mappedSelectGyms}
        </select>
        <select className="form-select col m-3" aria-label="Select">
          <option value="0">Wybierz statystykę</option>
          {mappedSelectStats}
        </select>
      </form>
      <canvas id="myChart"></canvas>
    </div>
  );
}

export default BarChart;
