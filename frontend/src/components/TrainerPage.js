import Footer from "./Footer";
import List from "./List";
import SideBarTrainer from "./SideBarTrainer";
import UserHeader from "./UserHeader";
import ClientPlan from "./ClientPlan";
import React, { useEffect, useState } from "react";

function TrainerPage({ onLogout }) {
  const [clients_data, setClientsData] = useState([]);
  const [trainer_data, setTrainerData] = useState([]);
  const [token] = useState(localStorage.getItem("token"));
  useEffect(() => {
    fetch("http://127.0.0.1:8000/trainer-endpoint/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token,
      }),
    })
      .then((response) => response.json())
      .then((trainer_data) => {
        setTrainerData(trainer_data);
        console.log(trainer_data);
      })
      .catch((error) => {
        console.log(trainer_data);
        console.error("Błąd przy pobieraniu danych:", error);
      });
  }, [trainer_data, token]);

  useEffect(() => {
    fetch(
      "http://127.0.0.1:8000/trainer_clients/" + String(trainer_data.trainer_id)
    )
      .then((response) => response.json())
      .then((clients_data) => {
        setClientsData(clients_data);
        console.log(clients_data);
      })
      .catch((error) => {
        console.log(clients_data);
        console.error("Błąd przy pobieraniu danych:", error);
      });
  }, [clients_data, trainer_data]);

  const selectClients2 = clients_data.map((element) => ({
    clientId: element.client_id,
    name: element.name,
    surname: element.surname,
  }));

  console.log(selectClients2);
  return (
    <>
      <div style={{ width: "250px", float: "left" }}>
        <SideBarTrainer onLogout={onLogout} />
      </div>
      <div style={{ marginLeft: "230px" }}>
        <UserHeader roleTitle="trenera" name={trainer_data.name} />
        <List
          header="Klienci"
          selectItems={[]}
          scrollId="clientList"
          items={clients_data}
        />
        <ClientPlan
          selectItems={selectClients2}
          scrollId="clientPlan"
          trainer_id={trainer_data.trainer_id}
        />
        <Footer />
      </div>
    </>
  );
}
export default TrainerPage;
