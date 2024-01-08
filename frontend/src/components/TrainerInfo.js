import { Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import TrainerSignUpModal from "./TrainerSignUpModal";

function TrainerInfo(props) {
  const [trainers, setTrainers] = useState([]);
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  // const trainers = ["trener1", "trener2", "trener3", "trener4", "trener5"];
  // const mappedSelectTrainers = trainers.map((item, index) => (
  //   <option key={index} value={index + 1}>
  //     {item}
  //   </option>
  // ));
  useEffect(() => {
    const fetchTrainersData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/trainer-endpoint/");
        if (response.ok) {
          const data = await response.json();
          setTrainers(data);
        } else {
          console.error("Nie udało się pobrać danych trenerów");
        }
      } catch (error) {
        console.error("Błąd podczas pobierania danych:", error);
      }
    };

    fetchTrainersData();
  }, []);

  const handleTrainerSelect = (trainerId) => {
    const selected = trainers.find((trainer) => trainer.trainer_id === trainerId);
    setSelectedTrainer(selected);
  };
  

  return (
    <Container id={props.scrollId}>
      <h1 className="text-center m-5">Informacja o trenerach</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <select className="form-select w-50 mb-5" aria-label="Select" onChange={(e) => handleTrainerSelect(Number(e.target.value))}>
          <option value="0">Wybierz trenera</option>
          {trainers.map((trainer) => (
            <option key={trainer.trainer_id} value={trainer.trainer_id}>
              { trainer.id }{ trainer.name } { trainer.surname }
            </option>
          ))}
        </select>
      </div>

      <div class="card w-50 m-auto mb-5">
        <div class="card-header">Trener</div>
        <div class="card-body">
        <h5 class="card-title">{selectedTrainer ? `${selectedTrainer.name} ${selectedTrainer.surname}` : 'Jan Kowalski'}</h5>
          <p class="card-text">
            {selectedTrainer ? `${selectedTrainer.info}` :
            "To doświadczony trener personalny, z pasją wspierający innych w osiąganiu celów zdrowotnych. Jego podejście opiera się na spersonalizowanych programach treningowych i dietetycznych, dostosowanych do indywidualnych potrzeb klientów. Zawsze pełen energii i motywacji, Jan inspiruje do zmiany stylu życia, dbając o zdrowie fizyczne i psychiczne podopiecznych. Jego profesjonalizm, empatia i skuteczność przyciągają osoby pragnące transformacji."}
      
          
          </p>
          {/* <TrainerSignUpModal trainer={selectedTrainer ? `${selectedTrainer.name} ${selectedTrainer.surname}` : 'Jan Kowalski'}/> */}
          <TrainerSignUpModal   trainer={{ 
            name: selectedTrainer ? selectedTrainer.name : '', 
            surname: selectedTrainer ? selectedTrainer.surname : '', 
            trainer_id: selectedTrainer ? selectedTrainer.trainer_id : 0 
          }}/>
        

          <button
            class="btn btn-success"
            data-bs-toggle="modal"
            data-bs-target="#trainerSignUp"
          >
            Zapisz się
          </button>
        </div>
      </div>
    </Container>
  );
}

export default TrainerInfo;
