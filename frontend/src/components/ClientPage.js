import BarChart from "./BarChart";
import ClientInfo from "./ClientInfo";
import ClientPlan from "./ClientPlan";
import List from "./List";
import SideBarClient from "./SideBarClient";
import TrainerInfo from "./TrainerInfo";
import UserHeader from "./UserHeader";
import Footer from "./Footer";
import React, { useEffect, useState } from "react";

function ClientPage() {
  const [clientData, setClientData] = useState(null);
  const [trainings_data, setTrainingsData] = useState([]);
  const [clients_plan, setClientsPlan] = useState(null);
  const selectStats = [
    "Spalone kalorie",
    "Długość treningów",
    "statystyka3",
    "statystyka4",
    "statystyka5",
  ];

  const clientId = 1; // change later for real

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/getClient/` + String(clientId))
      .then((response) => response.json())
      .then((clientData) => {
        setClientData(clientData);
        console.log(clientData);
      })
      .catch((error) => {
        console.log(clientData);
        console.error("Błąd przy pobieraniu danych:", error);
      });
  }, []);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/client_trainings/" + String(clientId))
      .then((response) => response.json())
      .then((trainings_data) => {
        setTrainingsData(trainings_data);
        console.log(trainings_data);
      })
      .catch((error) => {
        console.log(trainings_data);
        console.error("Błąd przy pobieraniu danych:", error);
      });
  }, []);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/client_trainings_plans/" + String(clientId))
      .then((response) => response.json())
      .then((clients_plan) => {
        setClientsPlan(clients_plan);
        console.log("CLIENTS PLAN: " + clients_plan);
      })
      .catch((error) => {
        console.log(clients_plan);
        console.error("Błąd przy pobieraniu danych:", error);
      });
  }, []);

  return (
    <>
      <div style={{ width: "250px", float: "left" }}>
        <SideBarClient />
      </div>
      <div style={{ marginLeft: "230px" }}>
        {clientData ? (
          <UserHeader roleTitle="użytkownika" name={clientData.name} />
        ) : (
          <UserHeader roleTitle="użytkownika" />
        )}

        <List
          header="Historia treningów"
          selectItems={[]}
          scrollId="trainingHistory"
          items={trainings_data}
        />
        <BarChart
          header="Statystyki treningów"
          firstSelectTitle=""
          firstSelect={[]}
          stats={selectStats}
          scrollId="statsTraining"
        />
        {/* <ClientPlan selectItems={[]} scrollId="clientsPlan" items={clients_plan}/> */}
        <List
          header="Plan treningów"
          selectItems={[]}
          scrollId="clientsPlan"
          items={clients_plan}
        />
        <TrainerInfo scrollId="trainersInfo" />
        <ClientInfo scrollId="clientInfo" clientData={clientData} />
        <Footer />
      </div>
    </>
  );
}
export default ClientPage;
