import { useState, useEffect } from "react";

function TrainingDetailModal(props) {
  const [exercisesDetails, setExercisesDetails] = useState([]);
  const [trainingId, setTrainingId] = useState("");

  useEffect(() => {
    if (props.trainingDetails) {
      console.log(props.trainingDetails);
      if (props.trainingDetails) {
        setTrainingId(props.trainingDetails.training_id || "");
      } else {
        setTrainingId("");
      }
    }
  }, [props.trainingDetails]);

  useEffect(() => {
    if (trainingId !== null && trainingId !== undefined) {
      fetch("http://127.0.0.1:8000/training_exercises/" + String(trainingId))
        .then((response) => response.json())
        .then((exercises_data) => {
          setExercisesDetails(exercises_data);
          console.log(exercises_data);
        })
        .catch((error) =>
          console.error("Błąd przy pobieraniu danych ćwiczeń:", error)
        );
      console.log(exercisesDetails);
    } else {
      setExercisesDetails([]);
    }
  }, [trainingId]);

  const handleCloseModal = () => {
    setExercisesDetails([]);
  };

  return (
    <div class="modal" id="TrainingDetailModal" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Szczegóły treningu</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            {/* <h5>Lista elementów:</h5>
            <ul>
            <li>{trainingId}</li>
            {exercisesDetails.map((exercise, index) => (
                                <li key={index}>
                                    <strong>Exercise:</strong> {exercise.exercise.name}, 
                                    <strong> Category:</strong> {exercise.exercise.category}, 
                                    <strong> Equipment:</strong> {exercise.exercise.equipment},
                                    <strong> Equipment:</strong> {exercise.equipment_name},
                                    <strong> Start Time:</strong> {exercise.start_time},
                                    <strong> End Time:</strong> {exercise.end_time},
                                    <strong> Repeats:</strong> {exercise.repeats},
                                    <strong> Time:</strong> {exercise.time},
                                    <strong> Load:</strong> {exercise.load},
                                    <strong> Calories:</strong> {exercise.calories}
                                </li>
                            ))}
        </ul> */}
            <div className="table-responsive">
              <table className="table table-bordered table-hover">
                <thead>
                  <tr>
                    <th>Ćwiczenie</th>
                    <th>Kategoria</th>
                    <th>Sprzęt</th>
                    <th>Start</th>
                    <th>Koniec</th>
                    <th>Powtórzenia</th>
                    <th>Obciążenie</th>
                    <th>Kalorie</th>
                  </tr>
                </thead>
                <tbody>
                  {exercisesDetails &&
                    exercisesDetails.map((exercise, index) => (
                      <tr key={index}>
                        <td>{exercise.exercise.name}</td>
                        <td>{exercise.exercise.category}</td>
                        <td>{exercise.equipment_name}</td>
                        <td>{exercise.start_time}</td>
                        <td>{exercise.end_time}</td>
                        <td>{exercise.repeats ? exercise.repeats : "-"}</td>
                        <td>{exercise.load ? exercise.load : "-"}</td>
                        <td>{exercise.calories}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={handleCloseModal}
            >
              Zamknij
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrainingDetailModal;
