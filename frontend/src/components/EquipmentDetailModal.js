import { useState, useEffect } from "react";

function EquipmentDetailModal(props) {
  // create state variables for all fields in form
  const [selectedGym, setSelectedGym] = useState("");
  const [equipmentId, setEquipmentId] = useState("");
  const [equipmentData, setEquipmentData] = useState(null);
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [serialNumbers, setSerialNumbers] = useState([]);
  const [selectedSerialNumber, setSelectedSerialNumber] = useState("");
  const [selectedAvailable, setSelectedAvailable] = useState(-1);
  const [refreshData, setRefreshData] = useState(true);

  useEffect(() => {
    if (props.selectedEquipment) {
      console.log(props.selectedEquipment);
      setEquipmentId(props.selectedEquipment.equipment_id || "");
    }
  }, [props.selectedEquipment]);

  useEffect(() => {
    if (props.selectedGym) {
      console.log(props.selectedGym);
      setSelectedGym(props.selectedGym || "");
    }
  }, [props.selectedGym]);

  useEffect(() => {
    if (equipmentData) {
      for (let i = 0; i < equipmentData.length; i++) {
        if (equipmentData[i].serial_number === selectedSerialNumber) {
          setSelectedEquipment(equipmentData[i]);
          setSelectedAvailable(equipmentData[i].available);
          setSelectedGym(props.selectedGym);
        }
      }
    }
    console.log(selectedEquipment);
  }, [selectedSerialNumber]);

  useEffect(() => {
    if (selectedEquipment) {
    }
    console.log(selectedEquipment);
  }, [selectedEquipment]);

  // handle changing fields in form methods
  const handleSelectGymChange = (event) => {
    setSelectedGym(event.target.value);
  };

  const handleAvailableChange = (event) => {
    setSelectedAvailable(event.target.value);
  };

  const handleSelectedSerialNumber = (event) => {
    setSelectedSerialNumber(event.target.value);
  };

  useEffect(() => {
    fetch(
      `http://127.0.0.1:8000/get_gyms_equipment/` +
        props.selectedGym +
        "/" +
        String(equipmentId)
    )
      .then((response) => response.json())
      .then((equipmentData) => {
        setEquipmentData(equipmentData);
        let serial_numbers = [];
        for (let i = 0; i < equipmentData.length; i++) {
          serial_numbers.push(equipmentData[i].serial_number);
        }
        setSerialNumbers(serial_numbers);
        setSelectedAvailable(1);
        console.log(equipmentData);
        console.log(selectedGym);
        console.log(serial_numbers);
      })
      .catch((error) => {
        console.log(equipmentData);
        console.error("Błąd przy pobieraniu danych:", error);
      })
      .finally(() => {
        setRefreshData(false);
      });
    console.log(selectedGym);
  }, [props.selectedGym, equipmentId, refreshData]);

  const handleDeleteEquipment = (e) => {
    e.preventDefault();
    if (!selectedSerialNumber) {
      alert("Wybierz konkretny numer seryjny do usunięcia");
    } else {
      const requestData = {
        equipmentSerialNumber: selectedSerialNumber,
      };
      if (
        window.confirm(
          "Czy jesteś pewny, że chcesz usunąć ten sprzęt? \n będzie to oznaczało usunięcie wszystkich powiązanych z nim obiektów"
        )
      ) {
        // send data as JSON
        fetch("http://127.0.0.1:8000/deleteEquipment/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestData),
        })
          .then((response) => response.json())
          .then((result) => {
            if (result.status === "success") {
              console.log(result);
              //   alert about successfull delete
              alert("Pomyślnie usunięto sprzęt");
              e.target.value = null;
            } else if (result.status === "equipmentDeleted") {
              alert("Ten sprzęt został usunięty, odśwież stronę!");
            } else {
              // alert about error while deleting
              alert("Nastąpił błąd przy usuwaniu, spróbuj ponownie.");
              console.log(result.message);
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    }
  };

  const handleModifyEquipment = (e) => {
    e.preventDefault();
    console.log(equipmentData);
    const requestData = {
      gymSelected: selectedGym,
      equipmentAvailable: selectedAvailable,
      equipmentSerialNumber: selectedSerialNumber,
    };
    fetch("http://127.0.0.1:8000/modifyEquipment/", {
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
          alert("Dokonano zmian w sprzęcie o numerze " + selectedSerialNumber);
          setRefreshData(true);
          // setSelectedAvailable(0);
          setSelectedSerialNumber("");
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
    // }
    // }
  };

  return (
    <div class="modal" id="EquipmentDetailModal" tabindex="-1" role="dialog">
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
                <label for="validationCustom02" class="form-label">
                  Wybierz konkretny sprzęt
                </label>
                <select
                  class="form-select"
                  id="validationCustom02"
                  aria-label="Default select example"
                  value={selectedSerialNumber}
                  onChange={handleSelectedSerialNumber}
                  required
                >
                  <option value="0">Wybierz sprzęt</option>
                  {serialNumbers.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
                <div class="valid-feedback">Wygląda dobrze!</div>
              </div>
              <div class="col-md-6">
                <label for="validationCustom01" class="form-label">
                  Siłownia
                </label>
                <select
                  class="form-select"
                  id="validationCustom01"
                  aria-label="Default select example"
                  value={selectedGym}
                  onChange={handleSelectGymChange}
                  required
                >
                  <option value="0">Wybierz siłownię</option>
                  {props.mappedGyms}
                </select>
                <div class="valid-feedback">Wygląda dobrze!</div>
              </div>
              <div class="col-md-6">
                <label for="validationCustom03" class="form-label">
                  Nazwa
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="validationCustom03"
                  value={
                    props.selectedEquipment ? props.selectedEquipment.name : ""
                  }
                  disabled
                  required
                />
              </div>
              <div class="col-md-6">
                <label for="validationCustom03" class="form-label">
                  Kategoria
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="validationCustom03"
                  value={
                    props.selectedEquipment
                      ? props.selectedEquipment.category
                      : ""
                  }
                  disabled
                  required
                />
              </div>
              <div class="col-md-3">
                <label for="validationCustom04" class="form-label">
                  Status
                </label>
                <select
                  class="form-select"
                  id="validationCustom04"
                  value={selectedAvailable}
                  onChange={handleAvailableChange}
                  required
                >
                  <option selected disabled value="">
                    Wybierz status
                  </option>
                  <option value="1">Dostępny</option>
                  <option value="0">Niedostępny</option>
                </select>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-success m-2"
              type="submit"
              data-bs-dismiss="modal"
              onClick={handleModifyEquipment}
            >
              Modyfikuj sprzęt
            </button>
            <button
              class="btn btn-success m-2"
              type="submit"
              data-bs-dismiss="modal"
              onClick={handleDeleteEquipment}
            >
              Usuń sprzęt
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

export default EquipmentDetailModal;
