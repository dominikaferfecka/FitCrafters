import { Container } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import List from "./List";
import BarChart from "./BarChart";

function ClientPlan(props) {
  const clientId = 1; // change later for real
  const trainerId = 1; // change later for real
  const [clients_plan_trainer, setClientsPlanTrainer] = useState(null);
  const [training_plans, setTrainingPlans] = useState(null);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const columns = ["#", "First", "Last", "Handle"];
  const plans = ["planA", "planB", "planC", "planD", "planE"];
  const exercises = [
    "ćwiczenieA",
    "ćwiczenieB",
    "ćwiczenieC",
    "ćwiczenieD",
    "ćwiczenieE",
  ];
  const selectStats = [
    "Spalone kalorie",
    "Długość treningów",
    "Ilość treningów z danej kategorii",
    "Ilość treningów z danego planu treningowego",
    "Ilość treningów z danym trenerem",
  ];

  const [selectedTrainingPlanId, setSelectedTrainingPlanId] = useState("");

  const listItems = columns.map((col, index) => (
    <th key={index} scope="col">
      {col}
    </th>
  ));

  const mappedSelectItems = props.selectItems.map((item, index) => (
    <option key={index} value={index + 1}>
      {item}
    </option>
  ));

  const mappedSelectPlans = (training_plans || []).map((item, index) => (
    <option key={index} value={item.training_plan_id}>
      {`${item.category} - ${item.name}`}
    </option>
  ));

  const mappedSelectExercises = exercises.map((item, index) => (
    <option key={index} value={index + 1}>
      {item}
    </option>
  ));

  const [clientIdTrainer, setClientIdTrainer] = useState("");

  const handleSelectChange = (event) => {
    setClientIdTrainer(event.target.value);
  };
  useEffect(() => {
    console.log("SELECTED clientIdTrainer: " + clientIdTrainer);
  }, [clientIdTrainer]);

  const handleDateChange = (event) => {
    console.log("New date value:", event.target.value);
    setDate(event.target.value);
  };

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };


  // useEffect(() => {
  //   fetch("http://127.0.0.1:8000/client_trainings_plans/" + String(clientIdTrainer))
  //     .then((response) => response.json())
  //     .then((clients_plan_trainer) => {
  //       setClientsPlanTrainer(clients_plan_trainer);
  //       console.log("CLIENTS PLAN AA: " + clients_plan_trainer);
  //     })
  //     .catch((error) => {
  //       console.log(clients_plan_trainer);
  //       console.error("Błąd przy pobieraniu danych:", error);
  //     });
  // }, []);


    useEffect(() => {
    fetch("http://127.0.0.1:8000/training-plans/")
      .then((response) => response.json())
      .then((training_plans) => {
        setTrainingPlans(training_plans);
        console.log("PLANY TRENINGOWE: " + training_plans);
      })
      .catch((error) => {
        console.log(training_plans);
        console.error("Błąd przy pobieraniu danych:", error);
      });
  }, []);

  const handleAddTrainingPlan = () => {
    // Make a POST request to update the training plan
    fetch("http://127.0.0.1:8000/update-client-training-plan/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        clientIdTrainer: clientIdTrainer,
        selectedTrainingPlanId,
        date: date,
        time: time + ":00",
        trainerId: trainerId,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        // Handle the result as needed
        console.log("Training plan updated successfully", result);
      })
      .catch((error) => {
        console.error("Error updating training plan:", error);
      });
  };




  return (
    <Container className="w-75 mb-5" id={props.scrollId}>
      <div id="tableClientPlan">
        <h1 className="text-center m-5">Plan ćwiczeń klienta</h1>
        {props.selectItems.length === 0 ? (
          <div></div>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <select className="form-select w-50" aria-label="Select" onChange={handleSelectChange}>
              <option value="0">Wybierz klienta</option>
              {mappedSelectItems}
            </select>
          </div>
        )}
        <List
          header="Plan treningów"
          selectItems={[]}
          scrollId="clientsPlanTrainer"
          items={clients_plan_trainer || []}
          clientIdTrainer={clientIdTrainer}
        />
      </div>

      <h5 className="text-center m-4">Dodaj plan treningowy</h5>
      <form>
        <div class="row flex-d justify-content-center" id="formClientPlan">
          <div class="mb-3 col-md-3">
            <label for="exampleInputEmail1" class="form-label">
              Data
            </label>
            <input
              type="date"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={date}
              onChange={handleDateChange}
            />
          </div>
          <div class="mb-3 col-md-6">
                <label for="time" class="form-label">
                  Godzina
                </label>
                <input type="time" class="form-control" id="time" value={time} onChange={handleTimeChange}/>
              </div>
          <div class="mb-3 col-md-5">
            <label for="exampleInputPassword1" class="form-label">
              Plan ćwiczeń
            </label>
            <select
              className="form-select"
              aria-label="Default select example"
              value={selectedTrainingPlanId}
              onChange={(e) => setSelectedTrainingPlanId(e.target.value)}
            >
              <option selected>Wybierz plan</option>
              {mappedSelectPlans}
            </select>
          </div>
          <div class="col-md-1 d-flex align-items-center">
          <button
            className="btn btn-success"
            type="button"
            onClick={handleAddTrainingPlan}
          >
              Dodaj
            </button>
          </div>
        </div>
      </form>
      <BarChart
          header="Statystyki treningów"
          firstSelectTitle=""
          firstSelect={[]}
          stats={selectStats}
          scrollId="statsTraining"
          clientId={clientIdTrainer}
        />
      {/* <h5 className="text-center m-4">Dodaj ćwiczenie</h5>
      <form>
        <div class="row flex-d justify-content-center" id="formClientPlan">
          <div class="row col-md-10 justify-content-center">
            <div class="mb-3 col-md-6">
              <label for="exampleInputEmail1" class="form-label">
                Data
              </label>
              <input
                type="date"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
            <div class="mb-3 col-md-6">
              <label for="exampleInputPassword1" class="form-label">
                Ćwiczenie
              </label>
              <select class="form-select" aria-label="Default select example">
                <option selected>Wybierz ćwiczenie</option>
                {mappedSelectExercises}
              </select>
            </div>
            <div class="row col-md-12">
              <div class="mb-3 col-md-4">
                <label for="reps" class="form-label">
                  Powtórzenia
                </label>
                <input type="text" class="form-control" id="reps" />
              </div>
              <div class="mb-3 col-md-4">
                <label for="time" class="form-label">
                  Czas
                </label>
                <input type="text" class="form-control" id="time" />
              </div>
              <div class="mb-3 col-md-4">
                <label for="load" class="form-label">
                  Obciążenie
                </label>
                <input type="text" class="form-control" id="load" />
              </div>
            </div>
          </div>
          <div class="col-md-1 d-flex align-items-center">
            <button class="btn btn-success" type="button">
              Dodaj
            </button>
          </div>
        </div>
      </form> */}
    </Container>
    
  );
}

export default ClientPlan;
