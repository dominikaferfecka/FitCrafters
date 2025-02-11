import logo from "../img/icons8-fit-50.png";
import { useState } from "react";
import LogIn from "./LogIn";
import Register from "./Register";

function MenuBar({ setIsLoggedIn }) {
  const [accountType, setAccountType] = useState("");

  const handleAccountType = (type) => {
    setAccountType(type);
  };

  return (
    <>
      <LogIn accountType={accountType} setIsLoggedIn={setIsLoggedIn} />
      <Register setIsLoggedIn={setIsLoggedIn} />
      <nav className="navbar fixed-top bg-body-tertiary">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          {/* Logo i nazwa po lewej */}
          <a className="navbar-brand d-flex align-items-center" href="/">
            <img
              src={logo}
              alt="Logo"
              width="30"
              height="24"
              className="d-inline-block align-text-top"
            />
            <span className="ms-2">FitCrafters</span>
          </a>

          {/* Przycisk "Zarejestruj się" i grupa przycisków po prawej */}
          <div className="d-flex">
            <div className="navbar-brand">Zaloguj jako</div>
            <div
              className="btn-group me-4"
              role="group"
              aria-label="Basic outlined example"
            >
              <button
                type="button"
                onClick={() => handleAccountType("klient")}
                className="btn btn-outline-success"
                data-bs-toggle="modal"
                data-bs-target="#LogInModal"
              >
                Klient
              </button>
              <button
                type="button"
                onClick={() => handleAccountType("trener")}
                className="btn btn-outline-success"
                data-bs-toggle="modal"
                data-bs-target="#LogInModal"
              >
                Trener
              </button>
              <button
                type="button"
                onClick={() => handleAccountType("menadżer")}
                className="btn btn-outline-success"
                data-bs-toggle="modal"
                data-bs-target="#LogInModal"
              >
                Menadżer
              </button>
            </div>
            <button
              type="button"
              onClick={() => handleAccountType("klient")}
              className="btn btn-success me-2"
              data-bs-toggle="modal"
              data-bs-target="#RegisterModal"
            >
              Zarejestruj się
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}

export default MenuBar;
