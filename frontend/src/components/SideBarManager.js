import { useNavigate } from "react-router-dom";

function SideBarManager() {
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
            Panel menadżera
          </div>
          <div className="list-group list-group-flush">
            <a
              className="list-group-item list-group-item-action list-group-item-success p-3"
              href="#gymList"
            >
              Sprawdź listę siłowni
            </a>
            <a
              className="list-group-item list-group-item-action list-group-item-success p-3"
              href="#equipmentList"
            >
              Sprawdź listę sprzętu
            </a>
            <a
              className="list-group-item list-group-item-action list-group-item-success p-3"
              href="#gymStats"
            >
              Sprawdź statystyki
            </a>
            <a
              className="list-group-item list-group-item-action list-group-item-success p-3"
              href="#trainerList"
            >
              Sprawdź listę trenerów
            </a>
            <a
              className="list-group-item list-group-item-action list-group-item-success p-3"
              href="#equipForm"
            >
              Modyfikuj sprzęt
            </a>
            <a
              className="list-group-item list-group-item-action list-group-item-success p-3"
              href="#trainerForm"
            >
              Modyfikuj trenerów
            </a>
            <a
              className="list-group-item list-group-item-action list-group-item-success p-3"
              href="#gymForm"
            >
              Modyfikuj siłownie
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

export default SideBarManager;
