import { useState, useEffect } from "react";

function GymDetailModal(props) {
  // create state variables to keep current data
  const [gymId, setGymId] = useState("");
  const [gymPhone, setGymPhone] = useState("");
  const [gymCity, setGymCity] = useState("");
  const [gymPostalCode, setGymPostalCode] = useState("");
  const [gymStreet, setGymStreet] = useState("");
  const [gymStreetNumber, setGymStreetNumber] = useState("");
  const [gymBuildingNumber, setGymBuildingNumber] = useState("");

  useEffect(() => {
    // update data after opening a modal - set data to db data
    if (props.gymDetails) {
      console.log(props.gymDetails);
      setGymId(props.gymDetails.gym_id || "");
      setGymPhone(props.gymDetails.phone_number || "");
      setGymCity(props.gymDetails.city || "");
      setGymPostalCode(props.gymDetails.postal_code || "");
      setGymStreet(props.gymDetails.street || "");
      setGymStreetNumber(props.gymDetails.street_number || "");
      setGymBuildingNumber(props.gymDetails.building_number || "");
    }
  }, [props.gymDetails]);

  // handle changing fields in form methods
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

  // handle modifying data after clicking modify button
  const handleModifyGym = (e) => {
    e.preventDefault();

    // prepare data to send - it might be the same
    const requestData = {
      gymId: gymId,
      gymPhone: gymPhone,
      gymCity: gymCity,
      gymPostalCode: gymPostalCode,
      gymStreet: gymStreet,
      gymStreetNumber: gymStreetNumber,
      gymBuildingNumber: gymBuildingNumber,
    };
    // prepare data to check changes
    const oldData = [
      props.gymDetails.phone_number,
      props.gymDetails.city,
      props.gymDetails.postal_code,
      props.gymDetails.street,
      props.gymDetails.street_number,
      props.gymDetails.building_number === null
        ? ""
        : props.gymDetails.building_number,
    ];
    const newData = [
      gymPhone,
      gymCity,
      gymPostalCode,
      gymStreet,
      gymStreetNumber,
      gymBuildingNumber,
    ];
    // prepare changes variable
    let gymChanges = "";
    // check for changes
    for (let i = 0; i < oldData.length; i++) {
      if (oldData[i] !== newData[i]) {
        gymChanges += oldData[i] + " -> " + newData[i] + "\n";
      }
    }
    // if changes don't exist alert user and do nothing
    if (gymChanges === "") {
      alert("Nie wprowadzono żadnych zmian w siłowni");
    } else {
      // get confirmation from user about modifying data
      if (window.confirm("Czy chcesz dokonać tych zmian? \n" + gymChanges)) {
        // send data as JSON
        fetch("http://127.0.0.1:8000/modifyGym/", {
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
                "Dokonano następujących zmian w wybranej siłowni:\n" +
                  gymChanges
              );
              e.target.value = null;
            } else {
              // alert about error while modifying
              alert(
                "Nastąpił błąd przy modyfikacji, spróbuj ponownie z uwagą na rodzaj wprowadzanych danych."
              );
              console.log(result);
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    }
  };

  const handleDeleteGym = (e) => {
    e.preventDefault();
    const requestData = {
      gymId: gymId,
    };
    if (
      window.confirm(
        "Czy jesteś pewny, że chcesz usunąć tę siłownię? \n będzie to oznaczało usunięcie wszystkich powiązanych z nią obiektów"
      )
    ) {
      // send data as JSON
      fetch("http://127.0.0.1:8000/deleteGym/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.status === "success") {
            console.log(result);
            //   alert about successfull delete
            alert("Pomyślnie usunięto siłownię");
            e.target.value = null;
          } else if (result.status === "gymDeleted") {
            alert("Ta siłownia została usunięta, odśwież stronę!");
          } else {
            // alert about error while deleting
            alert("Nastąpił błąd przy usuwania, spróbuj ponownie.");
            console.log(result);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };
  return (
    <div class="modal" id="GymDetailModal" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
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
                <div class="invalid-feedback">
                  Proszę podaj poprawny kod pocztowy
                </div>
              </div>
              <div class="col-md-6">
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
                <div class="invalid-feedback">
                  Proszę podaj poprawny numer ulicy
                </div>
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
            </form>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-success m-2"
              type="submit"
              onClick={handleModifyGym}
            >
              Modyfikuj siłownię
            </button>
            <button
              class="btn btn-success m-2"
              type="submit"
              onClick={handleDeleteGym}
            >
              Usuń siłownię
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
  );
}

export default GymDetailModal;
