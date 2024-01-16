import { Container } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import GymDetailModal from "./GymDetailModal";
import TrainerDetailModal from "./TrainerDetailModal";
import TrainingDetailModal from "./TrainingDetailModal";
import EquipmentDetailModal from "./EquipmentDetailModal";
import TrainingPlanDetailModal from "./TrainingPlanDetailModal";

function List(props) {
  const [equipment_data, setEquipmentData] = useState([]);

  const [trainers_data, setgymTrainersData] = useState([]);

  const [selectedGym, setSelectedGym] = useState("");

  const [selectedGymDetails, setSelectedGymDetails] = useState(null);

  const [clients_plan, setClientsPlan] = useState(null);

  const [clients_plan_trainer, setClientsPlanTrainer] = useState(null);

  const [selectedTrainer, setSelectedTrainer] = useState(0);

  const [selectedTrainingDetails, setSelectedTrainingDetails] = useState(null);

  const [selectedEquipment, setSelectedEquipment] = useState(null);

  const [trainingPlanId, setTrainingPlanId] = useState(null);

  useEffect(() => {
    props.scrollId === "equipmentList" &&
      fetch(`http://127.0.0.1:8000/equipment-endpoint/?gym=${selectedGym}`)
        .then((response) => response.json())
        .then((equipment_data) => {
          setEquipmentData(equipment_data);
        })
        .catch((error) => {
          console.error("Błąd przy pobieraniu danych:", error);
        });
  }, [selectedGym]);

  useEffect(() => {
    props.scrollId === "trainerList" &&
      fetch(`http://127.0.0.1:8000/trainer-endpoint/?gym=${selectedGym}`)
        .then((response) => response.json())
        .then((trainers_data) => {
          setgymTrainersData(trainers_data);
        })
        .catch((error) => {
          console.error("Błąd przy pobieraniu danych:", error);
        });
  }, [selectedGym]);

  useEffect(() => {
    fetch(
      "http://127.0.0.1:8000/client_trainings_plans/" +
        String(props.clientIdTrainer) +
        "/?trainer_id=2"
    )
      .then((response) => response.json())
      .then((clients_plan_trainer) => {
        setClientsPlanTrainer(clients_plan_trainer);
      })
      .catch((error) => {
        console.error("Błąd przy pobieraniu danych:", error);
      });
  }, [props.clientIdTrainer]);


  var columns = ["#", "First", "Last", "Handle"];

  if (props.scrollId === "gymList") {
    columns = ["#", "Nazwa", "Ulica", "Numer telefonu", "Szczegóły"];
  }
  if (props.scrollId === "equipmentList") {
    columns = ["#", "Kategoria", "Nazwa", "Ilość"];
    if (selectedGym) {
      columns.push("Szczegóły");
    }
  }
  if (props.scrollId === "trainerList") {
    columns = ["#", "Imię", "Nazwisko", "Numer telefonu", "Szczegóły"];
  }

  if (props.scrollId === "clientList") {
    columns = [
      "#",
      "Imię",
      "Nazwisko",
      "Numer telefonu",
      "Email",
      "Wiek",
      "Waga",
      "Wzrost",
    ];
  }
  if (props.scrollId === "trainingHistory") {
    columns = [
      "#",
      "Nazwa treningu",
      "Kategoria",
      "Początek treningu",
      "Czas trwania (min)",
      "Trener",
      "Sprawdź ćwiczenia",
    ];
  }

  if (props.scrollId === "clientsPlan") {
    columns = [
      "#",
      "Nazwa treningu",
      "Kategoria",
      "Początek treningu",
      "Czas trwania (min)",
      "Trener",
      "Szczegóły",
    ];
  }
  if (props.scrollId === "clientsPlanTrainer") {
    columns = [
      "#",
      "Nazwa treningu",
      "Kategoria",
      "Początek treningu",
      "Czas trwania (min)",
      "Trener",
      "Szczegóły",
    ];
  }
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

  const handleSelectChange = (event) => {
    setSelectedGym(event.target.value);
  };

  const handleGymDetailsClick = (gymDetails) => {
    setSelectedGymDetails(gymDetails);
  };

  const handleTrainerClick = (trainer) => {
    setSelectedTrainer(trainer);
  };
  const handleTrainingDetailsClick = (trainingDetails) => {
    setSelectedTrainingDetails(trainingDetails);
  };

  const handleEquipmentClick = (equipmentDetails) => {
    setSelectedEquipment(equipmentDetails);
  };

  const handleClientPlanClick = (clientPlan) => {
    setClientsPlan(clientPlan);
    setTrainingPlanId(clientPlan.training_plan_id);
  };

  return (
    <>
      {props.scrollId === "gymList" && (
        <GymDetailModal gymDetails={selectedGymDetails} />
      )}
      {props.scrollId === "trainerList" && (
        <TrainerDetailModal
          trainerDetails={selectedTrainer}
          mappedGyms={mappedSelectItems}
        />
      )}
      {props.scrollId === "trainingHistory" && (
        <TrainingDetailModal trainingDetails={selectedTrainingDetails} />
      )}

      {props.scrollId === "clientsPlan" ||
      (props.scrollId === "clientsPlanTrainer" && clients_plan_trainer ) && (
        <TrainingPlanDetailModal trainingPlanId={trainingPlanId} />
      )}

      {props.scrollId === "equipmentList" && (
        <EquipmentDetailModal
          selectedGym={selectedGym}
          mappedGyms={mappedSelectItems}
          selectedEquipment={selectedEquipment}
        />
      )}
      <Container className="w-75" id={props.scrollId}>
        <h1 className="text-center m-5">{props.header}</h1>
        {props.showSelect && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <select
              className="form-select w-50"
              aria-label="Select"
              onChange={handleSelectChange}
            >
              <option value="0">{props.firstSelectTitle}</option>

              {mappedSelectItems}
            </select>
          </div>
        )}
        <table className="table table-bordered border-success m-5">
          <thead>
            <tr>{listItems}</tr>
          </thead>
          <tbody>
            {props.scrollId === "gymList" &&
              props.items.map((element) => (
                <tr>
                  <th scope="row">{element.gym_id}</th>

                  <>
                    <td>{element.city}</td>
                    <td>{element.street}</td>
                    <td>{element.phone_number}</td>
                    <td
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <button
                        className="btn btn-success btn-sm"
                        type="submit"
                        data-bs-toggle="modal"
                        data-bs-target="#GymDetailModal"
                        onClick={() => handleGymDetailsClick(element)}
                      >
                        +
                      </button>
                    </td>
                  </>
                </tr>
              ))}
            {props.scrollId === "equipmentList" &&
              equipment_data.map((element) => (
                <tr>
                  <th scope="row">{element.equipment_id}</th>

                  <>
                    <td>{element.category}</td>
                    <td>{element.name}</td>
                    <td>{element.quantity}</td>
                    {selectedGym && (
                      <td
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <button
                          class="btn btn-success btn-sm"
                          type="submit"
                          data-bs-toggle="modal"
                          data-bs-target="#EquipmentDetailModal"
                          onClick={() => handleEquipmentClick(element)}
                        >
                          +
                        </button>
                      </td>
                    )}
                  </>
                </tr>
              ))}
            {props.scrollId === "trainerList" &&
              trainers_data.map((element) => (
                <tr>
                  <th scope="row">{element.trainer_id}</th>

                  <>
                    <td>{element.name}</td>
                    <td>{element.surname}</td>
                    <td>{element.phone_number}</td>
                    <td
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <button
                        class="btn btn-success btn-sm"
                        type="submit"
                        data-bs-toggle="modal"
                        data-bs-target="#TrainerDetailModal"
                        onClick={() => handleTrainerClick(element)}
                      >
                        +
                      </button>
                    </td>
                  </>
                </tr>
              ))}
            {props.scrollId === "clientList" &&
              props.items.map((element) => (
                <tr>
                  <th scope="row">{element.client_id}</th>

                  <>
                    <td>{element.name}</td>
                    <td>{element.surname}</td>
                    <td>{element.phone_number}</td>
                    <td>{element.email}</td>
                    <td>{element.age}</td>
                    <td>{element.weight}</td>
                    <td>{element.height}</td>
                  </>
                </tr>
              ))}
            {props.scrollId === "trainingHistory" &&
              props.items &&
              props.items.map((element) => (
                <tr>
                  <th scope="row">{element.training_id}</th>
                  <>
                    <td>
                      {element.training_plan_name
                        ? element.training_plan_name
                        : "Custom training"}
                    </td>
                    <td>
                      {element.training_plan_category
                        ? element.training_plan_category
                        : "-"}
                    </td>
                    <td>{element.start_time}</td>
                    <td>
                      {element.training_plan_time
                        ? element.training_plan_time
                        : "-"}
                    </td>
                    <td>
                      {element.trainer_name} {element.trainer_surname}
                    </td>
                    <td
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <button
                        className="btn btn-success btn-sm"
                        type="submit"
                        data-bs-toggle="modal"
                        data-bs-target="#TrainingDetailModal"
                        onClick={() => handleTrainingDetailsClick(element)}
                      >
                        +
                      </button>
                    </td>
                  </>
                </tr>
              ))}
            {props.scrollId === "clientsPlan" &&
              props.items &&
              props.items.map((element) => (
                <tr>
                  <th scope="row">{element.training_id}</th>
                  <>
                    <td>
                      {element.training_plan_name
                        ? element.training_plan_name
                        : "Custom training"}
                    </td>
                    <td>
                      {element.training_plan_category
                        ? element.training_plan_category
                        : "-"}
                    </td>
                    <td>{element.start_time}</td>
                    <td>
                      {element.training_plan_time
                        ? element.training_plan_time
                        : "-"}
                    </td>
                    <td>
                      {element.trainer_name} {element.trainer_surname}
                    </td>
                    <td
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <button
                        class="btn btn-success btn-sm"
                        type="submit"
                        data-bs-toggle="modal"
                        data-bs-target="#TrainingPlanDetailModal"
                        onClick={() => handleClientPlanClick(element)}
                      >
                        +
                      </button>
                    </td>
                  </>
                </tr>
              ))}
            {props.scrollId === "clientsPlanTrainer" &&
              clients_plan_trainer &&
              clients_plan_trainer.map((element) => (
                <tr>
                  <th scope="row">{element.training_id}</th>
                  <>
                    <td>
                      {element.training_plan_name
                        ? element.training_plan_name
                        : "Custom training"}
                    </td>
                    <td>
                      {element.training_plan_category
                        ? element.training_plan_category
                        : "-"}
                    </td>
                    <td>{element.start_time}</td>
                    <td>
                      {element.training_plan_time
                        ? element.training_plan_time
                        : "-"}
                    </td>
                    <td>
                      {element.trainer_name} {element.trainer_surname}
                    </td>
                    <td>
                      {element.trainer_name} {element.trainer_surname}
                    </td>
                    <td
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <button
                        class="btn btn-success btn-sm"
                        type="submit"
                        data-bs-toggle="modal"
                        data-bs-target="#TrainingPlanDetailModal"
                        onClick={() => handleClientPlanClick(element)}
                      >
                        +
                      </button>
                    </td>
                  </>
                </tr>
              ))}
          </tbody>
        </table>
      </Container>
    </>
  );
}

export default List;
