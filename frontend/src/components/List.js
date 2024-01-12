import { Container } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import GymDetailModal from "./GymDetailModal";
import TrainerDetailModal from "./TrainerDetailModal";
import TrainingDetailModal from "./TrainingDetailModal";

function List(props) {
  const [equipment_data, setEquipmentData] = useState([]);

  const [trainers_data, setgymTrainersData] = useState([]);

  const [selectedGym, setSelectedGym] = useState("");

  const [selectedGymDetails, setSelectedGymDetails] = useState(null);

  const [selectedTrainer, setSelectedTrainer] = useState(0);

  const [selectedTrainingDetails, setSelectedTrainingDetails] = useState(null);

  useEffect(() => {
    props.scrollId === "equipmentList" &&
      fetch(`http://127.0.0.1:8000/equipment-endpoint/?gym=${selectedGym}`)
        .then((response) => response.json())
        .then((equipment_data) => {
          setEquipmentData(equipment_data);
          console.log(equipment_data);
        })
        .catch((error) => {
          console.log(equipment_data);
          console.error("Błąd przy pobieraniu danych:", error);
        });
    console.log(selectedGym);
  }, [selectedGym]);

  useEffect(() => {
    props.scrollId === "trainerList" &&
      fetch(`http://127.0.0.1:8000/trainer-endpoint/?gym=${selectedGym}`)
        .then((response) => response.json())
        .then((trainers_data) => {
          setgymTrainersData(trainers_data);
          console.log(trainers_data);
        })
        .catch((error) => {
          console.log(trainers_data);
          console.error("Błąd przy pobieraniu danych:", error);
        });
  }, [selectedGym]);

  var columns = ["#", "First", "Last", "Handle"];

  if (props.scrollId === "gymList") {
    columns = ["#", "Nazwa", "Ulica", "Numer telefonu", "Szczegóły"];
  }
  if (props.scrollId === "equipmentList") {
    columns = ["#", "Kategoria", "Nazwa", "Ilość"];
  }
  if (props.scrollId === "trainerList") {
    columns = ["#", "Imię", "Nazwisko", "Numer telefonu", "Szczegóły"];
  }

  console.log(columns);
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
    // console.log(gymDetails);
    setSelectedGymDetails(gymDetails);
  };

  const handleTrainerClick = (trainer) => {
    setSelectedTrainer(trainer);
  };
  const handleTrainingDetailsClick = (trainingDetails) => {
    console.log(trainingDetails);
    setSelectedTrainingDetails(trainingDetails);
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
          </tbody>
        </table>
      </Container>
    </>
  );
}

export default List;
