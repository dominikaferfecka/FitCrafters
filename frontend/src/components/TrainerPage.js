import Footer from "./Footer";
import List from "./List";
import SideBarTrainer from "./SideBarTrainer";
import UserHeader from "./UserHeader";
import ClientPlan from "./ClientPlan";
import React, { useEffect, useState } from "react";

function TrainerPage() {
  const trainerId = 1; // change later for real
  const selectClients = ["klient1", "klient2", "klient3", "klient4", "klient5"];
  const [clients_data, setClientsData] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/trainer_clients/" + String(trainerId))
      .then((response) => response.json())
      .then((clients_data) => {
        setClientsData(clients_data);
        console.log(clients_data);
      })
      .catch((error) => {
        console.log(clients_data);
        console.error("Błąd przy pobieraniu danych:", error);
      });
  }, [clients_data]);
  console.log(clients_data);

  const selectClients2 = clients_data.map(
    (element) => element.name + " " + element.surname
  );
  console.log(selectClients2);
  return (
    <>
      <div style={{ width: "250px", float: "left" }}>
        <SideBarTrainer />
      </div>
      <div style={{ marginLeft: "230px" }}>
        <UserHeader roleTitle="trenera" />
        <List
          header="Klienci"
          selectItems={[]}
          scrollId="clientList"
          items={clients_data}
        />
        <ClientPlan selectItems={selectClients2} scrollId="clientPlan" />
        <Footer />
      </div>
    </>
  );
}
export default TrainerPage;
