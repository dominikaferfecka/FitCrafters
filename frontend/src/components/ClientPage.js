import BarChart from "./BarChart";
import ClientInfo from "./ClientInfo";
import ClientPlan from "./ClientPlan";
import List from "./List";
import SideBarClient from "./SideBarClient";
import TrainerInfo from "./TrainerInfo";
import UserHeader from "./UserHeader";
import Footer from "./Footer";
import React, { useEffect, useState } from 'react';

function ClientPage() {
  const [userRole] = useState("user");
  const [trainings_data, setTrainingsData] = useState([]);
  const selectStats = [
    "statystyka1",
    "statystyka2",
    "statystyka3",
    "statystyka4",
    "statystyka5",
  ];

  const clientId = 1; // change later for real

  useEffect(() => {
    fetch('http://127.0.0.1:8000/client_trainings/' + String(clientId))
    .then(response => response.json())
    .then(trainings_data => {setTrainingsData(trainings_data); console.log(trainings_data)})
    .catch(error => {  console.log(trainings_data);console.error('Błąd przy pobieraniu danych:', error)});
  }, []);

  return (
    <>
      <div style={{ width: "250px", float: "left" }}>
        <SideBarClient />
      </div>
      <div style={{ marginLeft: "230px" }}>
        <UserHeader userRole={userRole} />
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
        <ClientPlan selectItems={[]} scrollId="clientsPlan" />
        <TrainerInfo scrollId="trainersInfo" />
        <ClientInfo scrollId="clientInfo" />
        <Footer />
      </div>
    </>
  );
}
export default ClientPage;
