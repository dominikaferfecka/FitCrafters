import { Container } from "react-bootstrap";
import React, { useState } from "react";

function TrainerForm(props) {
  // create state variables for all fields in form
  const [selectedGym, setSelectedGym] = useState("");
  // const [gym_data, setgymData] = useState([]);
  const [trainerName, setTrainerName] = useState("");
  const [trainerSurname, setTrainerSurname] = useState("");
  const [trainerPhone, setTrainerPhone] = useState("");
  const [trainerSalary, setTrainerSalary] = useState("");
  const [trainerEmail, setTrainerEmail] = useState("");
  const [trainerPass, setTrainerPass] = useState("");
  const [trainerRepeatPass, setTrainerRepeatPass] = useState("");

  // handle changing fields in form methods
  const handleSelectGymChange = (event) => {
    setSelectedGym(event.target.value);
    console.log(selectedGym);
  };

  const handleTrainerNameChange = (event) => {
    setTrainerName(event.target.value);
  };

  const handleTrainerSurnameChange = (event) => {
    setTrainerSurname(event.target.value);
  };

  const handleTrainerPhoneChange = (event) => {
    setTrainerPhone(event.target.value);
  };

  const handleTrainerSalaryChange = (event) => {
    setTrainerSalary(event.target.value);
  };

  const handleTrainerEmailChange = (event) => {
    setTrainerEmail(event.target.value);
  };

  const handleTrainerPassChange = (event) => {
    setTrainerPass(event.target.value);
  };

  const handleTrainerRepeatPassChange = (event) => {
    setTrainerRepeatPass(event.target.value);
  };

  // method to handle post
  const handleAddGymOnSubmit = async (e) => {
    /*
    params: e [event]
    method prepares data to send to django server
    clears form after success save to db
    prints in console status of operation or returned error
    */

    e.preventDefault();

    // prepare data to send
    const requestData = {
      gymSelected: selectedGym,
      trainerName: trainerName,
      trainerSurname: trainerSurname,
      trainerPhone: trainerPhone,
      trainerSalary: trainerSalary,
      trainerEmail: trainerEmail,
      trainerPass: trainerPass,
    };

    console.log(requestData);
    // if password and repeated password are not the same show alert and don't submit
    if (trainerPass !== trainerRepeatPass) {
      alert("Hasło i powtórzone hasło muszą być takie same!");
    } else {
      // send data as JSON
      fetch("http://127.0.0.1:8000/addTrainer/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      })
        .then((response) => response.json())
        .then((result) => {
          // if status is success clear form
          if (result.status === "success") {
            console.log(result);
            setSelectedGym("");
            setTrainerName("");
            setTrainerSurname("");
            setTrainerPhone("");
            setTrainerSalary("");
            setTrainerEmail("");
            setTrainerPass("");
            setTrainerRepeatPass("");
            e.target.value = null;
          } else {
            // print message from django server
            console.log(result);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  // map gyms to select to which add trainer
  const mappedSelectItems = props.selectItems.map((item, index) => (
    <option key={index} value={index + 1}>
      {item}
    </option>
  ));

  return (
    <Container className="w-75" id={props.scrollId}>
      <h1 className="text-center m-5">Trenerzy</h1>
      <form
        class="row  m-auto mb-5 g-3 needs-validation"
        novalidate
        onSubmit={handleAddGymOnSubmit}
      >
        <div class="col-md-12">
          <label for="validationCustom01" class="form-label">
            Wybierz siłownię
          </label>
          <select
            className="form-select w-50"
            aria-label="Select"
            value={selectedGym}
            onChange={handleSelectGymChange}
          >
            <option value="0">{props.firstSelectTitle}</option>

            {mappedSelectItems}
          </select>
          <div class="valid-feedback">Wygląda dobrze!</div>
        </div>
        <div class="col-md-3">
          <label for="validationCustom03" class="form-label">
            Imię
          </label>
          <input
            type="text"
            class="form-control"
            id="validationCustom03"
            value={trainerName}
            onChange={handleTrainerNameChange}
            required
          />
          <div class="invalid-feedback">Proszę podaj poprawne imię</div>
        </div>
        <div class="col-md-3">
          <label for="validationCustom03" class="form-label">
            Nazwisko
          </label>
          <input
            type="text"
            class="form-control"
            id="validationCustom03"
            value={trainerSurname}
            onChange={handleTrainerSurnameChange}
            required
          />
          <div class="invalid-feedback">Proszę podaj poprawne nazwisko</div>
        </div>
        <div class="col-md-3">
          <label for="validationCustom03" class="form-label">
            Numer telefonu
          </label>
          <input
            type="text"
            class="form-control"
            id="validationCustom03"
            value={trainerPhone}
            onChange={handleTrainerPhoneChange}
            required
          />
          <div class="invalid-feedback">
            Proszę podaj poprawny numer telefonu
          </div>
        </div>
        <div class="col-md-3">
          <label for="validationCustom06" class="form-label">
            Stawka godzinowa
          </label>
          <div class="input-group mb-3">
            <span class="input-group-text">PLN</span>
            <input
              type="text"
              class="form-control"
              aria-label="Amount (to the nearest PLN)"
              value={trainerSalary}
              onChange={handleTrainerSalaryChange}
            />
            <span class="input-group-text">.00</span>
          </div>
          <div class="invalid-feedback">Proszę podaj poprawną stawkę</div>
        </div>
        <div class="col-md-6">
          <label for="validationCustom05" class="form-label">
            Adres Email
          </label>
          <input
            type="text"
            class="form-control"
            id="validationCustom05"
            value={trainerEmail}
            onChange={handleTrainerEmailChange}
            required
          />
          <div class="invalid-feedback">Proszę podaj poprawny adres email</div>
        </div>
        <div class="col-md-3">
          <label for="validationCustom06" class="form-label">
            Podaj hasło
          </label>
          <input
            type="password"
            class="form-control"
            id="validationCustom06"
            value={trainerPass}
            onChange={handleTrainerPassChange}
            required
          />
          <div class="invalid-feedback">Proszę podaj poprawne hasło</div>
        </div>
        <div class="col-md-3">
          <label for="validationCustom07" class="form-label">
            Powtórz hasło
          </label>
          <input
            type="password"
            class="form-control"
            id="validationCustom07"
            value={trainerRepeatPass}
            onChange={handleTrainerRepeatPassChange}
            required
          />
          <div class="invalid-feedback">Proszę podaj poprawne hasło</div>
        </div>

        <div class="col-12 flex-d">
          <button class="btn btn-success m-2" type="submit">
            Dodaj trenera
          </button>
        </div>
      </form>
    </Container>
  );
}
export default TrainerForm;
