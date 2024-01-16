import CalendarModal from "./CalendarModal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SideBarTrainer() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

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
              onClick={() => handleOpenModal()}
              data-toggle="modal"
              data-target="#exampleModal"
            >
              Kalendarz
            </button>

            <a
              className="list-group-item list-group-item-action list-group-item-success p-3"
              onClick={handleLogout}
            >
              Wyloguj się
            </a>
          </div>
        </div>
      </div>
      <CalendarModal />
      {/* onClose={() => handleCloseModal()} */}
    </>
  );
}

export default SideBarTrainer;
