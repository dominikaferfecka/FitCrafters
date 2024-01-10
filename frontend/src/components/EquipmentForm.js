import { Container } from "react-bootstrap";
import React, { useState } from "react";

function EquipmentForm(props) {
  // create state variables for all fields in form
  const [selectedGym, setSelectedGym] = useState("");
  const [equipmentId, setequipmentId] = useState("");
  const [equipmentSerialNo, setEquipmentSerialNo] = useState("");

  // handle changing fields in form methods
  const handleSelectGymChange = (event) => {
    setSelectedGym(event.target.value);
  };

  const handleequipmentIdChange = (event) => {
    setequipmentId(event.target.value);
  };

  const handleEquipmentSerialNoChange = (event) => {
    setEquipmentSerialNo(event.target.value);
  };

  // method to handle post
  const handleAddEquipmentOnSubmit = async (e) => {
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
      equipmentId: equipmentId,
      equipmentSerialNo: equipmentSerialNo,
    };

    // send data as JSON
    fetch("http://127.0.0.1:8000/addEquipment/", {
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
          setequipmentId("");
          setEquipmentSerialNo("");
          e.target.value = null;
        } else {
          // print message from django server
          console.log(result);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const selectGyms = props.selectGyms.map(
    (element) => element.city + ", " + element.street
  );

  // map gyms to select to which add trainer
  const mappedSelectGyms = selectGyms.map((item, index) => (
    <option key={index} value={index + 1}>
      {item}
    </option>
  ));

  const mappedSelectEquipment = props.selectEquipment.map((item, index) => (
    <option key={index} value={index + 1}>
      {item}
    </option>
  ));

  return (
    <Container className="w-75" id={props.scrollId}>
      <h1 className="text-center m-5">Sprzęt</h1>
      <form
        class="row  m-auto mb-5 g-3 needs-validation"
        onSubmit={handleAddEquipmentOnSubmit}
        novalidate
      >
        <div class="col-md-6">
          <label for="validationCustom01" class="form-label">
            Wybierz siłownię
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
            {mappedSelectGyms}
          </select>
          <div class="valid-feedback">Wygląda dobrze!</div>
        </div>
        <div class="col-md-6">
          <label for="validationCustom02" class="form-label">
            Wybierz sprzęt
          </label>
          <select
            class="form-select"
            id="validationCustom02"
            aria-label="Default select example"
            value={equipmentId}
            onChange={handleequipmentIdChange}
            required
          >
            <option value="0">Wybierz sprzęt</option>
            {mappedSelectEquipment}
          </select>
          <div class="valid-feedback">Wygląda dobrze!</div>
        </div>
        <div class="col-md-6">
          <label for="validationCustom03" class="form-label">
            Numer seryjny
          </label>
          <input
            type="text"
            class="form-control"
            id="validationCustom03"
            value={equipmentSerialNo}
            onChange={handleEquipmentSerialNoChange}
            required
          />
          <div class="invalid-feedback">
            Proszę podaj poprawny numer seryjny
          </div>
        </div>
        {/* <div class="col-md-3">
          <label for="validationCustom04" class="form-label">
            Status
          </label>
          <select class="form-select" id="validationCustom04" required>
            <option selected disabled value="">
              Wybierz status
            </option>
            <option>Dostępny</option>
            <option>W naprawie</option>
            <option>Zepsuty</option>
          </select>
          <div class="invalid-feedback">Proszę wybierz poprawny status</div>
        </div> */}
        <div class="col-12 flex-d">
          <button class="btn btn-success m-2" type="submit">
            Dodaj sprzęt
          </button>
        </div>
      </form>
    </Container>
  );
}

export default EquipmentForm;
