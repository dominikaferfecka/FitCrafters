import logo from '../img/icons8-fit-50.png';

function MenuBar() {
  return (
    <nav className="navbar fixed-top bg-body-tertiary">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        {/* Logo i nazwa po lewej */}
        <a className="navbar-brand d-flex align-items-center" href="#">
          <img src={logo} alt="Logo" width="30" height="24" className="d-inline-block align-text-top" />
          <span className="ms-2">FitCrafters</span>
        </a>

        {/* Przycisk "Zarejestruj się" i grupa przycisków po prawej */}
        <div className="d-flex">
          <a className="navbar-brand" href="#">Zaloguj jako</a>
          <div className="btn-group me-4" role="group" aria-label="Basic outlined example">
            <button type="button" className="btn btn-outline-success">Klient</button>
            <button type="button" className="btn btn-outline-success">Trener</button>
            <button type="button" className="btn btn-outline-success">Menadżer</button>
          </div>
          <button type="button" className="btn btn-success me-2">Zarejestruj się</button>
        </div>
      </div>
    </nav>
  );
}

export default MenuBar;
