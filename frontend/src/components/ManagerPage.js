import BarChart from "./BarChart";
import EquipmentForm from "./EquipmentForm";
import Footer from "./Footer";
import GymForm from "./GymForm";
import List from "./List";
import SideBarManager from "./SideBarManager";
import TrainerForm from "./TrainerForm";
import UserHeader from "./UserHeader";

function ManagerPage() {
  return (
    <>
      <div style={{ width: "250px", float: "left" }}>
        <SideBarManager />
      </div>
      <div style={{ marginLeft: "230px" }}>
        <UserHeader />
        <List header="Lista siłowni" scrollId="gymList" />
        <List
          header="Lista sprzętu"
          showSelect="true"
          scrollId="equipmentList"
        />
        <BarChart scrollId="gymStats" />
        <List header="Lista trenerów" scrollId="trainerList" />
        <EquipmentForm scrollId="equipForm" />
        <TrainerForm scrollId="trainerForm" />
        <GymForm scrollId="gymForm" />
        <Footer />
      </div>
    </>
  );
}
export default ManagerPage;
