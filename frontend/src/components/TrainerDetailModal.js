import { useState, useEffect, useCallback, useRef } from "react";
import { Container } from "react-bootstrap";

function TrainerDetailModal(props) {
  // create state variables to keep current data
  const [gym, setGym] = useState(-1);
  const [trainerData, setTrainerData] = useState(null);
  const [trainerId, setTrainerId] = useState(0);
  const [trainerName, setTrainerName] = useState("hhh");
  const [trainerSurname, setTrainerSurname] = useState("");
  const [trainerPhone, setTrainerPhone] = useState("");
  const [trainerSalary, setTrainerSalary] = useState("");
  const [trainerEmail, setTrainerEmail] = useState("");
  const [trainerPass, setTrainerPass] = useState("");
  const [trainerRepeatPass, setTrainerRepeatPass] = useState("");
  const [trainerInfo, setTrainerInfo] = useState("");

  const handleGymChange = (event) => {
    setGym(event.target.value);
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

  const handleTrainerInfoChange = (event) => {
    setTrainerInfo(event.target.value);
  };

  useEffect(() => {
    // update data after opening a modal - set data to db data
    if (props.trainerDetails) {
      setTrainerData(props.trainerDetails || null);
      setGym(props.trainerDetails.gym || -1);
      setTrainerId(props.trainerDetails.trainer_id || -1);
      setTrainerName(props.trainerDetails.name || "");
      setTrainerSurname(props.trainerDetails.surname || "");
      setTrainerPhone(props.trainerDetails.phone_number || "");
      setTrainerSalary(props.trainerDetails.hour_salary || "");
      setTrainerEmail(props.trainerDetails.email || "");
      setTrainerInfo(props.trainerDetails.info || "");
    }
  }, [props.trainerDetails]);

  const handleDeleteTrainer = (e) => {
    console.log(trainerData);
    e.preventDefault();
    const requestData = {
      trainerId: trainerId,
    };
    if (
      window.confirm(
        "Czy jesteś pewny, że chcesz usunąć tego trenera? \n będzie to oznaczało usunięcie wszystkich powiązanych z nim obiektów"
      )
    ) {
      // send data as JSON
      fetch("http://127.0.0.1:8000/deleteTrainer/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.status === "success") {
            console.log(result);
            //   alert about successfull delete
            alert("Pomyślnie usunięto trenera");
            e.target.value = null;
          } else if (result.status === "trainerDeleted") {
            alert("Ten trener został usunięty, odśwież stronę!");
          } else {
            // alert about error while deleting
            alert("Nastąpił błąd przy usuwania, spróbuj ponownie.");
            console.log(result.message);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  return (
    <Container>
      <div class="modal" id="TrainerDetailModal" tabindex="-1" role="dialog">
        <div
          class="modal-dialog modal-lg modal-dialog-centered"
          role="document"
        >
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Szczegóły</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form class="row  m-auto mb-5 g-3 needs-validation" novalidate>
                <div class="col-md-12">
                  <label for="validationCustom01" class="form-label">
                    Siłownia
                  </label>
                  <select
                    className="form-select w-50"
                    aria-label="Select"
                    value={gym}
                    onChange={handleGymChange}
                  >
                    {props.mappedGyms}
                  </select>
                  <div class="valid-feedback">Wygląda dobrze!</div>
                </div>
                <div class="col-md-3">
                  <label for="trainerName" class="form-label">
                    Imię
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="trainerName"
                    value={trainerName}
                    // value="tekst"
                    onChange={handleTrainerNameChange}
                    required
                  />
                  <div class="invalid-feedback">Proszę podaj poprawne imię</div>
                </div>
                <div class="col-md-3">
                  <label for="trainerSurname" class="form-label">
                    Nazwisko {trainerName}
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="trainerSurname"
                    value={trainerSurname}
                    onChange={handleTrainerSurnameChange}
                    required
                  />
                  <div class="invalid-feedback">
                    Proszę podaj poprawne nazwisko
                  </div>
                </div>
                <div class="col-md-3">
                  <label for="trainerPhone" class="form-label">
                    Numer telefonu
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="trainerPhone"
                    value={trainerPhone}
                    onChange={handleTrainerPhoneChange}
                    required
                  />
                  <div class="invalid-feedback">
                    Proszę podaj poprawny numer telefonu
                  </div>
                </div>
                <div class="col-md-3">
                  <label for="trainerSalary" class="form-label">
                    Stawka godzinowa
                  </label>
                  <div class="input-group mb-3" id="trainerSalary">
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
                  <div class="invalid-feedback">
                    Proszę podaj poprawną stawkę
                  </div>
                </div>
                <div class="col-md-6">
                  <label for="trainerEmail1" class="form-label">
                    Adres Email
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="trainerEmail1"
                    value={trainerEmail}
                    onChange={handleTrainerEmailChange}
                    required
                  />
                  <div class="invalid-feedback">
                    Proszę podaj poprawny adres email
                  </div>
                </div>
                <div class="col-md-3">
                  <label for="trainerPass" class="form-label">
                    Zmień hasło
                  </label>
                  <input
                    type="password"
                    class="form-control"
                    id="trainerPass"
                    value={trainerPass}
                    onChange={handleTrainerPassChange}
                    required
                  />
                  <div class="invalid-feedback">
                    Proszę podaj poprawne hasło
                  </div>
                </div>
                <div class="col-md-3">
                  <label for="trainerRepeat" class="form-label">
                    Powtórz hasło
                  </label>
                  <input
                    type="password"
                    class="form-control"
                    id="trainerRepeat"
                    value={trainerRepeatPass}
                    onChange={handleTrainerRepeatPassChange}
                    required
                  />
                  <div class="invalid-feedback">
                    Proszę podaj poprawne hasło
                  </div>
                </div>
                <div class="col-md-12">
                  <label for="trainerInfo" class="form-label">
                    Opis trenera
                  </label>
                  <textarea
                    class="form-control"
                    rows="4"
                    id="trainerInfo"
                    value={trainerInfo}
                    onChange={handleTrainerInfoChange}
                  />
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button
                class="btn btn-success m-2"
                type="submit"
                // onClick={handleModifyGym}
              >
                Modyfikuj trenera
              </button>
              <button
                class="btn btn-success m-2"
                type="submit"
                onClick={handleDeleteTrainer}
              >
                Usuń trenera
              </button>
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Zamknij
              </button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default TrainerDetailModal;
