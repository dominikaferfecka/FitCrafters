import { Container } from "react-bootstrap";
import React, { useEffect, useState } from "react";

function ClientInfo(props) {
  const [clientId, setClientId] = useState(-1);
  const [clientName, setClientName] = useState("");
  const [clientSurname, setClientSurname] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientPass, setClientPass] = useState("");
  const [clientRepeatPass, setClientRepeatPass] = useState("");
  const [clientAge, setClientAge] = useState(-1);
  const [clientWeight, setClientWeight] = useState(-1);
  const [clientHeight, setClientHeight] = useState(-1);

  useEffect(() => {
    // update data after opening a modal - set data to db data
    if (props.clientData) {
      setClientId(props.clientData.client_id || -1);
      setClientName(props.clientData.name || "");
      setClientSurname(props.clientData.surname || "");
      setClientPhone(props.clientData.phone_number || "");
      setClientEmail(props.clientData.email || "");
      setClientAge(props.clientData.age || -1);
      setClientWeight(props.clientData.weight || -1);
      setClientHeight(props.clientData.height || -1);
    }
  }, [props.clientData]);

  const handleClientIdChange = (event) => {
    setClientId(event.target.value);
  };

  const handleClientNameChange = (event) => {
    setClientName(event.target.value);
  };

  const handleClientSurnameChange = (event) => {
    setClientSurname(event.target.value);
  };

  const handleClientEmailChange = (event) => {
    setClientEmail(event.target.value);
  };

  const handleClientPhoneChange = (event) => {
    setClientPhone(event.target.value);
  };

  const handleClientPassChange = (event) => {
    setClientPass(event.target.value);
  };

  const handleClientRepeatPassChange = (event) => {
    setClientRepeatPass(event.target.value);
  };

  const handleClientAgeChange = (event) => {
    setClientAge(event.target.value);
  };

  const handleClientWeightChange = (event) => {
    setClientWeight(event.target.value);
  };

  const handleClientHeightChange = (event) => {
    setClientHeight(event.target.value);
  };

  const handleModifyInfo = (e) => {
    e.preventDefault();

    // prepare data to send - it might be the same
    const requestData = {
      clientId: clientId,
      clientName: clientName,
      clientSurname: clientSurname,
      clientEmail: clientEmail,
      clientPhone: clientPhone,
      clientPass: clientPass,
      clientAge: clientAge,
      clientWeight: clientWeight,
      clientHeight: clientHeight,
    };
    // prepare data to check changes
    const oldData = [
      props.clientData.name,
      props.clientData.surname,
      props.clientData.phone_number,
      props.clientData.email,
      props.clientData.age,
      props.clientData.weight,
      props.clientData.height,
    ];
    const newData = [
      clientName,
      clientSurname,
      clientPhone,
      clientEmail,
      clientAge,
      clientWeight,
      clientHeight,
    ];
    // prepare changes variable
    let clientChanges = "";
    // check for changes
    for (let i = 0; i < oldData.length; i++) {
      if (oldData[i] !== newData[i]) {
        clientChanges += oldData[i] + " -> " + newData[i] + "\n";
      }
    }
    if (clientPass) {
      if (clientPass !== clientRepeatPass) {
        alert("Hasło i powtórzone hasło nie są identyczne!");
      } else {
        clientChanges += "Stare hasło -> " + clientPass + "\n";
      }
    }
    // if changes don't exist alert user and do nothing
    if (clientChanges === "") {
      alert("Nie wprowadzono żadnych zmian w Twoich danych");
    } else {
      // get confirmation from user about modifying data
      if (window.confirm("Czy chcesz dokonać tych zmian? \n" + clientChanges)) {
        // send data as JSON
        fetch("http://127.0.0.1:8000/modifyClient/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestData),
        })
          .then((response) => response.json())
          .then((result) => {
            // if status is success clear form
            if (result.status === "success") {
              console.log(result);
              //   alert about successfull changes
              alert(
                "Dokonano następujących zmian w wybranym trenerze:\n" +
                  clientChanges
              );
              e.target.value = null;
            } else {
              // alert about error while modifying
              alert(
                "Nastąpił błąd przy modyfikacji, spróbuj ponownie z uwagą na rodzaj wprowadzanych danych."
              );
              if (result.message) {
                console.log(result.message);
              }
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    }
  };

  return (
    <Container className="w-50" id={props.scrollId}>
      <h1 className="text-center m-5">Informacje</h1>
      <form class="row  m-auto mb-5 g-3" novalidate>
        <div class="col-md-6">
          <label for="name" class="form-label">
            Imię
          </label>
          <input
            type="text"
            class="form-control"
            id="name"
            value={clientName}
            onChange={handleClientNameChange}
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
            value={clientSurname}
            onChange={handleClientSurnameChange}
          />
        </div>
        <div class="col-md-6">
          <label for="phoneNumber" class="form-label">
            Numer telefonu
          </label>
          <input
            type="text"
            class="form-control"
            id="phoneNumber"
            value={clientPhone}
            onChange={handleClientPhoneChange}
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
            value={clientEmail}
            onChange={handleClientEmailChange}
          />
        </div>
        <div class="col-md-6">
          <label for="newPass" class="form-label">
            Podaj nowe hasło
          </label>
          <input
            type="password"
            class="form-control"
            id="newPass"
            onChange={handleClientPassChange}
          />
        </div>
        <div class="col-md-6">
          <label for="repeatPass" class="form-label">
            Powtórz nowe hasło
          </label>
          <input
            type="password"
            class="form-control"
            id="repeatPass"
            onChange={handleClientRepeatPassChange}
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
            value={clientAge}
            onChange={handleClientAgeChange}
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
              value={clientWeight}
              onChange={handleClientWeightChange}
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
              value={clientHeight}
              onChange={handleClientHeightChange}
            />
            <span class="input-group-text">cm</span>
          </div>
        </div>

        <div class="col-12">
          <button
            class="btn btn-success m-2"
            type="button"
            onClick={handleModifyInfo}
          >
            Modyfikuj dane
          </button>
        </div>
      </form>
    </Container>
  );
}

export default ClientInfo;
