function SideBarClient() {
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
              href="#trainingList"
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
              Informacje o trenerach
            </a>
            <a
              className="list-group-item list-group-item-action list-group-item-success p-3"
              href="#trainersSignUp"
            >
              Zapisz się do trenera
            </a>
            <a
              className="list-group-item list-group-item-action list-group-item-success p-3"
              href="#modifyInfo"
            >
              Modyfikuj swoje dane
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

export default SideBarClient;
