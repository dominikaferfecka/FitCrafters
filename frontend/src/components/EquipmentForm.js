import { Container } from "react-bootstrap";

function EquipmentForm(props) {
  const selectGyms = [
    "siłownia1",
    "siłownia2",
    "siłownia3",
    "siłownia4",
    "siłownia5",
  ];
  const mappedSelectGyms = selectGyms.map((item, index) => (
    <option key={index} value={index + 1}>
      {item}
    </option>
  ));

  const selectEquipment = [
    "sprzęt1",
    "sprzęt2",
    "sprzęt3",
    "sprzęt4",
    "sprzęt5",
  ];
  const mappedSelectEquipment = selectEquipment.map((item, index) => (
    <option key={index} value={index + 1}>
      {item}
    </option>
  ));

  return (
    <Container className="w-75" id={props.scrollId}>
      <h1 className="text-center m-5">Sprzęt</h1>
      <form class="row  m-auto mb-5 g-3 needs-validation" novalidate>
        <div class="col-md-6">
          <label for="validationCustom01" class="form-label">
            Wybierz siłownię
          </label>
          <select
            class="form-select"
            id="validationCustom01"
            aria-label="Default select example"
            required
          >
            <option value="0" selected disabled>
              Wybierz siłownię
            </option>
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
            required
          >
            <option value="0" selected disabled>
              Wybierz sprzęt
            </option>
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
            required
          />
          <div class="invalid-feedback">
            Proszę podaj poprawny numer seryjny
          </div>
        </div>
        <div class="col-md-3">
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
        </div>
        <div class="col-12 flex-d">
          <button class="btn btn-success m-2" type="submit">
            Dodaj sprzęt
          </button>
          <button class="btn btn-success m-2" type="submit">
            Modyfikuj sprzęt
          </button>
          <button class="btn btn-success m-2" type="submit">
            Usuń sprzęt
          </button>
        </div>
      </form>
    </Container>
  );
}

export default EquipmentForm;
