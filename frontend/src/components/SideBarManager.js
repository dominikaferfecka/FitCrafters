function SideBarManager() {
    return <><div className="d-flex" id="wrapper">
    <div className="border-end bg-white" id="sidebar-wrapper">
        <div className="sidebar-heading border-bottom bg-success" style={{color: "white"}}>Panel menadżera</div>
        <div className="list-group list-group-flush">
            <a className="list-group-item list-group-item-action list-group-item-success p-3" href="#!">Lista sprzętu</a>
            <a className="list-group-item list-group-item-action list-group-item-success p-3" href="#!">Statystyki siłowni</a>
            <a className="list-group-item list-group-item-action list-group-item-success p-3" href="#!">Lista siłowni</a>
            <a className="list-group-item list-group-item-action list-group-item-success p-3" href="#!">Lista trenerów</a>
            <a className="list-group-item list-group-item-action list-group-item-success p-3 dropdown-toggle" id="dropdownEquipment" data-bs-toggle="dropdown" data-bs-offset="10,10" href="#!">Sprzęt</a>
            <a className="list-group-item list-group-item-action list-group-item-success p-3 dropdown-toggle" id="dropdownTrainer" data-bs-toggle="dropdown" data-bs-offset="10,10" href="#!">Trenerzy</a>
            <a className="list-group-item list-group-item-action list-group-item-success p-3 dropdown-toggle" id="dropdownGym" data-bs-toggle="dropdown" data-bs-offset="10,10" href="#!">Siłownie</a>
            <ul className="dropdown-menu dropdown-menu-success" aria-labelledby="dropdownEquipment">
                <li><a className="dropdown-item" href="#">Dodaj sprzęt</a></li>
                <li><a className="dropdown-item" href="#">Modyfikuj sprzęt</a></li>
                <li><a className="dropdown-item" href="#">Usuń sprzęt</a></li>
            </ul>
            <ul className="dropdown-menu dropdown-menu-success" aria-labelledby="dropdownTrainer">
                <li><a className="dropdown-item" href="#">Dodaj trenera</a></li>
                <li><a className="dropdown-item" href="#">Modyfikuj trenerów</a></li>
                <li><a className="dropdown-item" href="#">Usuń trenera</a></li>
            </ul>
            <ul className="dropdown-menu dropdown-menu-success" aria-labelledby="dropdownGym">
                <li><a className="dropdown-item" href="#">Dodaj siłownię</a></li>
                <li><a className="dropdown-item" href="#">Modyfikuj siłownię</a></li>
                <li><a className="dropdown-item" href="#">Usuń siłownię</a></li>
            </ul>
        </div>
    </div>
</div>
    </>
}

export default SideBarManager