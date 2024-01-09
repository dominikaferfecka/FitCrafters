import { Container } from "react-bootstrap";
import React, { useState } from "react";

function GymForm(props) {
  const [gymPhone, setGymPhone] = useState("");
  const [gymCity, setGymCity] = useState("");
  const [gymPostalCode, setGymPostalCode] = useState("");
  const [gymStreet, setGymStreet] = useState("");
  const [gymStreetNumber, setGymStreetNumber] = useState("");
  const [gymBuildingNumber, setGymBuildingNumber] = useState("");

  const handleGymPhoneChange = (event) => {
    setGymPhone(event.target.value);
  };

  const handleGymCityChange = (event) => {
    setGymCity(event.target.value);
  };

  const handleGymPostalCodeChange = (event) => {
    setGymPostalCode(event.target.value);
  };

  const handleGymStreetChange = (event) => {
    setGymStreet(event.target.value);
  };

  const handleGymStreetNumberChange = (event) => {
    setGymStreetNumber(event.target.value);
  };

  const handleGymBuildingNumberChange = (event) => {
    setGymBuildingNumber(event.target.value);
  };

  const handleAddGymOnSubmit = async (e) => {
    e.preventDefault();

    const requestData = {
      gymPhone: gymPhone,
      gymCity: gymCity,
      gymPostalCode: gymPostalCode,
      gymStreet: gymStreet,
      gymStreetNumber: gymStreetNumber,
      gymBuildingNumber: gymBuildingNumber,
    };

    console.log(requestData);

    fetch("http://127.0.0.1:8000/addGym/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestData),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result == { status: "success" }) {
          console.log(result);
          setGymPhone("");
          setGymCity("");
          setGymPostalCode("");
          setGymStreet("");
          setGymStreetNumber("");
          setGymBuildingNumber("");
          e.target.value = null;
        } else {
          console.log(result);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const selectGyms = [
    "siłownia1",
    "siłownia2",
    "siłownia3",
    "siłownia4",
    "siłownia5",
  ];
  const mappedSelectGyms = selectGyms.map((item, index) => (
    <option key={index} value={index + 1}>
      {item}
    </option>
  ));
  return (
    <Container className="w-75" id={props.scrollId}>
      <h1 className="text-center m-5">Siłownie</h1>
      <form
        class="row  m-auto mb-5 g-3 needs-validation"
        novalidate
        onSubmit={handleAddGymOnSubmit}
      >
        <div class="col-md-6">
          <label for="validationCustom03" class="form-label">
            Numer telefonu recepcji
          </label>
          <input
            type="text"
            class="form-control"
            id="validationCustom03"
            value={gymPhone}
            onChange={handleGymPhoneChange}
            required
          />
          <div class="invalid-feedback">
            Proszę podaj poprawny numer telefonu
          </div>
        </div>
        <div class="col-md-3">
          <label for="validationCustom03" class="form-label">
            Miasto
          </label>
          <input
            type="text"
            class="form-control"
            id="validationCustom03"
            value={gymCity}
            onChange={handleGymCityChange}
            required
          />
          <div class="invalid-feedback">Proszę podaj poprawne miasto</div>
        </div>
        <div class="col-md-3">
          <label for="validationPostalCode" class="form-label">
            Kod pocztowy
          </label>
          <input
            type="text"
            class="form-control"
            id="validationPostalCode"
            pattern="\d{2}-\d{3}"
            title="Kod typu 00-000"
            value={gymPostalCode}
            onChange={handleGymPostalCodeChange}
            required
          />
          <div class="invalid-feedback">Proszę podaj poprawny kod pocztowy</div>
        </div>
        <div class="col-md-3">
          <label for="validationCustom03" class="form-label">
            Ulica
          </label>
          <input
            type="text"
            class="form-control"
            id="validationCustom03"
            value={gymStreet}
            onChange={handleGymStreetChange}
            required
          />
          <div class="invalid-feedback">Proszę podaj poprawną ulicę</div>
        </div>
        <div class="col-md-3">
          <label for="validationCustom03" class="form-label">
            Numer ulicy
          </label>
          <input
            type="text"
            class="form-control"
            id="validationCustom03"
            value={gymStreetNumber}
            onChange={handleGymStreetNumberChange}
            required
          />
          <div class="invalid-feedback">Proszę podaj poprawny numer ulicy</div>
        </div>
        <div class="col-md-3">
          <label for="validationCustom03" class="form-label">
            Numer budynku
          </label>
          <input
            type="text"
            class="form-control"
            id="validationCustom03"
            value={gymBuildingNumber}
            onChange={handleGymBuildingNumberChange}
          />
        </div>

        <div class="col-12 flex-d">
          <button class="btn btn-success m-2" type="submit">
            Dodaj siłownię
          </button>
        </div>
      </form>
    </Container>
  );
}

export default GymForm;
