import { useNavigate } from "react-router-dom";

function SideBarClient({ onLogout }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    onLogout();
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
            <div
              className="list-group-item list-group-item-action list-group-item-success p-3"
              onClick={handleLogout}
            >
              Wyloguj się
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SideBarClient;
