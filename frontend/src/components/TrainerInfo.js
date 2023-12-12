import { Container } from "react-bootstrap";
import TrainerSignUpModal from "./TrainerSignUpModal";

function TrainerInfo(props) {
  const trainers = ["trener1", "trener2", "trener3", "trener4", "trener5"];
  const mappedSelectTrainers = trainers.map((item, index) => (
    <option key={index} value={index + 1}>
      {item}
    </option>
  ));

  return (
    <Container id={props.scrollId}>
      <TrainerSignUpModal />
      <h1 className="text-center m-5">Informacja o trenerach</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <select className="form-select w-50 mb-5" aria-label="Select">
          <option value="0">Wybierz trenera</option>

          {mappedSelectTrainers}
        </select>
      </div>
      <div class="card w-50 m-auto mb-5">
        <div class="card-header">Trener</div>
        <div class="card-body">
          <h5 class="card-title">Jan Kowalski</h5>
          <p class="card-text">
            To doświadczony trener personalny, z pasją wspierający innych w
            osiąganiu celów zdrowotnych. Jego podejście opiera się na
            spersonalizowanych programach treningowych i dietetycznych,
            dostosowanych do indywidualnych potrzeb klientów. Zawsze pełen
            energii i motywacji, Jan inspiruje do zmiany stylu życia, dbając o
            zdrowie fizyczne i psychiczne podopiecznych. Jego profesjonalizm,
            empatia i skuteczność przyciągają osoby pragnące transformacji.
          </p>
          <a
            class="btn btn-success"
            data-bs-toggle="modal"
            data-bs-target="#trainerSignUp"
          >
            Zapisz się
          </a>
        </div>
      </div>
    </Container>
  );
}

export default TrainerInfo;
