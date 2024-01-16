import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    phone_number: "",
    email: "",
    hash_pass: "",
    repeat_hash_pass: "",
    age: "",
    weight: "",
    height: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleRegisterClick = () => {
    if (formData.hash_pass !== formData.repeat_hash_pass) {
      alert("Powtórzone hasło musi być takie samo!");
    } else {
      // Przygotowanie obiektu z danymi do wysłania na backend
      const requestData = {
        client_id: 0,
        name: formData.name,
        surname: formData.surname,
        phone_number: formData.phone_number,
        email: formData.email,
        hash_pass: formData.hash_pass,
        age: formData.age,
        weight: formData.weight,
        height: formData.height,
      };

      // Wysłanie zapytania do backendu
      fetch("http://127.0.0.1:8000/signup/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message) {
            console.log(data.message);
          } else {
            console.log("Rejestracja udana");
            console.log(data);
            navigate("/client");
          }
        })
        .catch((error) => {
          console.error("Błąd podczas rejestracji", error);
        });
    }
  };

  return (
    <div class="modal" id="RegisterModal" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Zarejestruj się</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form class="row  m-auto mb-5 g-3" novalidate>
              <div class="col-md-6">
                <label for="name" class="form-label">
                  Imię
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  onChange={handleInputChange}
                  value={formData.name}
                />
              </div>
              <div class="col-md-6">
                <label for="surname" class="form-label">
                  Nazwisko
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="surname"
                  onChange={handleInputChange}
                  value={formData.surname}
                />
              </div>
              <div class="col-md-6">
                <label for="phone_number" class="form-label">
                  Numer telefonu
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="phone_number"
                  onChange={handleInputChange}
                  value={formData.phone_number}
                />
              </div>
              <div class="col-md-6">
                <label for="email" class="form-label">
                  Adres Email
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="email"
                  onChange={handleInputChange}
                  value={formData.email}
                />
              </div>
              <div class="col-md-6">
                <label for="hash_pass" class="form-label">
                  Podaj nowe hasło
                </label>
                <input
                  type="password"
                  class="form-control"
                  id="hash_pass"
                  onChange={handleInputChange}
                  value={formData.hash_pass}
                />
              </div>
              <div class="col-md-6">
                <label for="repeat_hash_pass" class="form-label">
                  Powtórz nowe hasło
                </label>
                <input
                  type="password"
                  class="form-control"
                  id="repeat_hash_pass"
                  onChange={handleInputChange}
                  value={formData.repeat_hash_pass}
                />
              </div>
              <div class="col-md-4">
                <label for="age" class="form-label">
                  Wiek
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="age"
                  onChange={handleInputChange}
                  value={formData.age}
                />
              </div>
              <div class="col-md-4">
                <label for="weight" class="form-label">
                  Waga
                </label>
                <div class="input-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    id="weight"
                    onChange={handleInputChange}
                    value={formData.weight}
                  />
                  <span class="input-group-text">kg</span>
                </div>
              </div>
              <div class="col-md-4">
                <label for="heigh" class="form-label">
                  Wzrost
                </label>
                <div class="input-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    id="height"
                    onChange={handleInputChange}
                    value={formData.height}
                  />
                  <span class="input-group-text">cm</span>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Anuluj
            </button>
            <button
              type="button"
              class="btn btn-success"
              data-bs-dismiss="modal"
              onClick={() => handleRegisterClick()}
            >
              Zarejestruj się
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
