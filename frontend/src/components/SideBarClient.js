import { useNavigate } from "react-router-dom";

function SideBarClient() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <>
      <div className="d-flex fixed-top" id="wrapper">
        <div className="border-end bg-white" id="sidebar-wrapper">
          <div
            className="sidebar-heading border-bottom bg-success"
            style={{ color: "white" }}
          >
            Panel klienta
          </div>
          <div className="list-group list-group-flush">
            <a
              className="list-group-item list-group-item-action list-group-item-success p-3"
              href="#trainingHistory"
            >
              Historia treningów
            </a>
            <a
              className="list-group-item list-group-item-action list-group-item-success p-3"
              href="#statsTraining"
            >
              Statystyki treningów
            </a>
            <a
              className="list-group-item list-group-item-action list-group-item-success p-3"
              href="#clientsPlan"
            >
              Plany ćwiczeń
            </a>
            <a
              className="list-group-item list-group-item-action list-group-item-success p-3 "
              href="#trainersInfo"
            >
              Trenerzy
            </a>

            <a
              className="list-group-item list-group-item-action list-group-item-success p-3"
              href="#clientInfo"
            >
              Modyfikuj swoje dane
            </a>
            <a
              className="list-group-item list-group-item-action list-group-item-success p-3"
              onClick={handleLogout}
            >
              Wyloguj się
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default SideBarClient;
