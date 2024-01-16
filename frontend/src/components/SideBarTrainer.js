import CalendarModal from "./CalendarModal";
import { useNavigate } from "react-router-dom";

function SideBarTrainer({ onLogout, trainerId }) {
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
            Panel trenera
          </div>
          <div className="list-group list-group-flush">
            <a
              className="list-group-item list-group-item-action list-group-item-success p-3"
              href="#clientList"
            >
              Lista klientów
            </a>
            <a
              className="list-group-item list-group-item-action list-group-item-success p-3"
              href="#statsClient"
            >
              Statystyki klientów
            </a>
            <a
              className="list-group-item list-group-item-action list-group-item-success p-3"
              href="#clientsPlan"
            >
              Plany ćwiczeń klienta
            </a>

            <button
              type="button"
              className="list-group-item list-group-item-action list-group-item-success p-3"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Kalendarz
            </button>

            <div
              className="list-group-item list-group-item-action list-group-item-success p-3"
              onClick={handleLogout}
            >
              Wyloguj się
            </div>
          </div>
        </div>
      </div>
      <CalendarModal onClose={handleCloseModal} trainerId={trainerId} />
    </>
  );
}

export default SideBarTrainer;
