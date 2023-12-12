import BarChart from "./BarChart";
import EquipmentForm from "./EquipmentForm";
import Footer from "./Footer";
import GymForm from "./GymForm";
import List from "./List";
import SideBarManager from "./SideBarManager";
import TrainerForm from "./TrainerForm";
import UserHeader from "./UserHeader";

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

  return (
    <>
      <div style={{ width: "250px", float: "left" }}>
        <SideBarManager />
      </div>
      <div style={{ marginLeft: "230px" }}>
        <UserHeader />
        <List header="Lista siłowni" selectItems={[]} scrollId="gymList" />
        <List
          header="Lista sprzętu"
          showSelect="true"
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
