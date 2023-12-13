import BarChart from "./BarChart";
import EquipmentForm from "./EquipmentForm";
import Footer from "./Footer";
import GymForm from "./GymForm";
import List from "./List";
import SideBarManager from "./SideBarManager";
import TrainerForm from "./TrainerForm";
import UserHeader from "./UserHeader";
import React, { useEffect, useState } from 'react';

function ManagerPage() {
  const selectStats = [
    "statystyka1",
    "statystyka2",
    "statystyka3",
    "statystyka4",
    "statystyka5",
  ];

  const selectGyms = [
    "siłownia1",
    "siłownia2",
    "siłownia3",
    "siłownia4",
    "siłownia5",
  ];

  const [gym_data, setgymData] = useState([]);

  const [equipment_data, setEquipmentData] = useState([]);

  const [trainers_data, setgymTrainersData] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/gyms-endpoint/')
    .then(response => response.json())
    .then(gym_data => {setgymData(gym_data); console.log(gym_data)})
    .catch(error => {  console.log(gym_data);console.error('Błąd przy pobieraniu danych:', error)});
  }, []);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/equipment-endpoint/')
    .then(response => response.json())
    .then(equipment_data => {setEquipmentData(equipment_data); console.log(equipment_data)})
    .catch(error => {  console.log(equipment_data);console.error('Błąd przy pobieraniu danych:', error)});
  }, []);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/trainer-endpoint/')
    .then(response => response.json())
    .then(trainers_data => {setgymTrainersData(trainers_data); console.log(trainers_data)})
    .catch(error => {  console.log(trainers_data);console.error('Błąd przy pobieraniu danych:', error)});
  }, []);

  return (
    <>
      <div style={{ width: "250px", float: "left" }}>
        <SideBarManager />
      </div>
      <div style={{ marginLeft: "230px" }}>
        <UserHeader />
        <List header="Lista siłowni" selectItems={[]} scrollId="gymList" items={gym_data} />
        <List
          header="Lista sprzętu"
          showSelect="true"
          firstSelectTitle="Wybierz sprzęt"
          selectItems={selectGyms}
          scrollId="equipmentList"
          items={equipment_data}
        />
        <BarChart
          header="Statystyki siłowni"
          firstSelectTitle="Wybierz siłownię"
          firstSelect={selectGyms}
          stats={selectStats}
          scrollId="gymStats"
        />
        <List
          header="Lista trenerów"
          showSelect="true"
          firstSelectTitle="Wybierz siłownię"
          selectItems={selectGyms}
          scrollId="trainerList"
          items={trainers_data}
        />
        <EquipmentForm scrollId="equipForm" />
        <TrainerForm scrollId="trainerForm" />
        <GymForm scrollId="gymForm" />
        <Footer />
      </div>
      
    </>
  );
}
export default ManagerPage;
