import BarChart from "./BarChart";
import ClientInfo from "./ClientInfo";
import ClientPlan from "./ClientPlan";
import List from "./List";
import SideBarClient from "./SideBarClient";
import TrainerInfo from "./TrainerInfo";
import UserHeader from "./UserHeader";
import Footer from "./Footer";

function ClientPage() {
  const selectStats = [
    "statystyka1",
    "statystyka2",
    "statystyka3",
    "statystyka4",
    "statystyka5",
  ];

  return (
    <>
      <div style={{ width: "250px", float: "left" }}>
        <SideBarClient />
      </div>
      <div style={{ marginLeft: "230px" }}>
        <UserHeader />
        <List
          header="Historia treningów"
          selectItems={[]}
          scrollId="trainingHistory"
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
