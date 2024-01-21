import { useState, useEffect } from "react";


function TrainingPlanDetailModal({trainingPlanId, test}) {
    const [exercises_training_plans, setExercisesTrainingPlans] = useState([]);

    console.log("TrainingPlanDetailModal: " + trainingPlanId);

    //TO DO - change trainer_id to props.trainerId
    useEffect(() => {
        if(!test)
        {
          fetch("http://127.0.0.1:8000/get-training-plans-info/?training_plan_id=" + String(trainingPlanId))
          .then((response) => response.json())
          .then((exercises_training_plans) => {
          setExercisesTrainingPlans(exercises_training_plans);
          console.log(exercises_training_plans);
          })
          .catch((error) => {
          console.log(exercises_training_plans);
          console.error("Błąd przy pobieraniu danych:", error);
          });
        }
    }, [trainingPlanId]);

  
  return (
    <div class="modal" id="TrainingPlanDetailModal" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Szczegóły planu treningowego</h5>
            {/* <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button> */}
          </div>
          <div class="modal-body">

        <div className="table-responsive">
              <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                    <th>Ćwiczenie</th>
                    <th>Kategoria</th>
                    <th>Powtórzenia</th>
                    <th>Czas</th>
                    <th>Obciążenie</th>
                    <th>Sprzęt</th>
                    </tr>
                </thead>
                <tbody>
                    {  exercises_training_plans.map((exercise, index) => (
                    <tr key={index}>
                        <td>{exercise.exercise}</td>
                        <td>{exercise.category}</td>
                        <td>{exercise.repeats ? exercise.repeats : '-'}</td>
                        <td>{exercise.time ? exercise.time : '-'}</td>
                        <td>{exercise.load ? exercise.load : '-'}</td>
                        <td>{exercise.equipment}</td>
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
            >
              Zamknij
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrainingPlanDetailModal;
