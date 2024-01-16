import React, { useState } from "react";

function TrainerSignUpModal(props) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  const handleSave = () => {
    const data = {
      date: date,
      time: time,
      trainer_id: props.trainer.trainer_id,
      client_id: props.client_id,
    };

    fetch("http://127.0.0.1:8000/signToTrainer/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "success") {
          alert("Zapisano się pomyślnie do trenera!");
          console.log(date, time);
        } else {
          alert("Nie udało się zapisać do trenera :( - " + result.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Nie udało się zapisać do trenera :(");
      });
  };

  return (
    <div
      class="modal fade"
      id="trainerSignUp"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">
              Zapisz się do {props.trainer.name} {props.trainer.surname}
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form class="row">
              <div class="mb-3 col-md-6">
                <label for="date" class="form-label">
                  Data
                </label>
                <input
                  type="date"
                  class="form-control"
                  id="date"
                  value={date}
                  onChange={handleDateChange}
                />
              </div>
              <div class="mb-3 col-md-6">
                <label for="time" class="form-label">
                  Godzina
                </label>
                <input
                  type="time"
                  class="form-control"
                  id="time"
                  value={time}
                  onChange={handleTimeChange}
                />
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
              onClick={handleSave}
            >
              Zapisz się
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrainerSignUpModal;
