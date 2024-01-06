import BarChart from "./BarChart";
import Footer from "./Footer";
import List from "./List";
import SideBarTrainer from "./SideBarTrainer";
import UserHeader from "./UserHeader";
import ClientPlan from "./ClientPlan";

function TrainerPage() {
  const selectStats = [
    "statystyka1",
    "statystyka2",
    "statystyka3",
    "statystyka4",
    "statystyka5",
  ];

  const selectClients = ["klient1", "klient2", "klient3", "klient4", "klient5"];
  return (
    <>
      <div style={{ width: "250px", float: "left" }}>
        <SideBarTrainer />
      </div>
      <div style={{ marginLeft: "230px" }}>
        <UserHeader />
        <List header="Klienci" selectItems={[]} scrollId="clientList" />
        <BarChart
          header="Statystyki klientów"
          firstSelectTitle="Wybierz klienta"
          firstSelect={selectClients}
          stats={selectStats}
          scrollId="statsClient"
        />
        <ClientPlan selectItems={selectClients} scrollId="clientPlan" />
        <Footer />
      </div>
    </>
  );
}
export default TrainerPage;
