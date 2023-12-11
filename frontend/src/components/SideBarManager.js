function SideBarManager() {
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
              Lista siłowni
            </a>
            <a
              className="list-group-item list-group-item-action list-group-item-success p-3"
              href="#equipmentList"
            >
              Lista sprzętu
            </a>
            <a
              className="list-group-item list-group-item-action list-group-item-success p-3"
              href="#gymStats"
            >
              Statystyki siłowni
            </a>
            <a
              className="list-group-item list-group-item-action list-group-item-success p-3"
              href="#trainerList"
            >
              Lista trenerów
            </a>
            <a
              className="list-group-item list-group-item-action list-group-item-success p-3"
              href="#equipForm"
            >
              Sprzęt
            </a>
            <a
              className="list-group-item list-group-item-action list-group-item-success p-3"
              href="#trainerForm"
            >
              Trenerzy
            </a>
            <a
              className="list-group-item list-group-item-action list-group-item-success p-3"
              href="#gymForm"
            >
              Siłownie
            </a>
            <a
              className="list-group-item list-group-item-action list-group-item-success p-3"
              href="/"
            >
              Wyloguj się
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default SideBarManager;
