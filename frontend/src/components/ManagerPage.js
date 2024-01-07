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


  const [gym_data, setgymData] = useState([]);

  const [manager_data, setManagerData] = useState({});

  useEffect(() => {
    fetch('http://127.0.0.1:8000/manager-name-endpoint/')
    .then(response => response.json())
    .then(manager_data => {setManagerData(manager_data); console.log(manager_data)})
    .catch(error => {  console.log(manager_data);console.error('Błąd przy pobieraniu danych:', error)});
  }, []);
  
  console.log(manager_data)
  useEffect(() => {
    fetch('http://127.0.0.1:8000/gyms-endpoint/?manager_id=' + String(manager_data.manager_id))
    .then(response => response.json())
    .then(gym_data => {setgymData(gym_data); console.log(gym_data)})
    .catch(error => {  console.log(gym_data);console.error('Błąd przy pobieraniu danych:', error)});
  }, [manager_data]);





  const selectGyms = gym_data.map(element => element.street);

  return (
    <>
      <div style={{ width: "250px", float: "left" }}>
        <SideBarManager />
      </div>
      <div style={{ marginLeft: "230px" }}>
        <UserHeader name={manager_data.name}/>
        <List header="Lista siłowni" selectItems={[]} scrollId="gymList" items={gym_data} />
        <List
          header="Lista sprzętu"
          showSelect="true"
          firstSelectTitle="Wybierz siłownie"
          selectItems={selectGyms}
          scrollId="equipmentList"
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
