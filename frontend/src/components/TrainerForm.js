import { Container } from "react-bootstrap";

function TrainerForm(props) {
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
    "trener1",
    "trener2",
    "trener3",
    "trener4",
    "trener5",
  ];
  const mappedSelectEquipment = selectEquipment.map((item, index) => (
    <option key={index} value={index + 1}>
      {item}
    </option>
  ));

  return (
    <Container className="w-75" id={props.scrollId}>
      <h1 className="text-center m-5">Trenerzy</h1>
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
            Wybierz trenera
          </label>
          <select
            class="form-select"
            id="validationCustom02"
            aria-label="Default select example"
            required
          >
            <option value="0" selected disabled>
              Wybierz trenera
            </option>
            {mappedSelectEquipment}
          </select>
          <div class="valid-feedback">Wygląda dobrze!</div>
        </div>
        <div class="col-md-3">
          <label for="validationCustom03" class="form-label">
            Imię
          </label>
          <input
            type="text"
            class="form-control"
            id="validationCustom03"
            required
          />
          <div class="invalid-feedback">Proszę podaj poprawne imię</div>
        </div>
        <div class="col-md-3">
          <label for="validationCustom03" class="form-label">
            Nazwisko
          </label>
          <input
            type="text"
            class="form-control"
            id="validationCustom03"
            required
          />
          <div class="invalid-feedback">Proszę podaj poprawne nazwisko</div>
        </div>
        <div class="col-md-3">
          <label for="validationCustom03" class="form-label">
            Numer telefonu
          </label>
          <input
            type="text"
            class="form-control"
            id="validationCustom03"
            required
          />
          <div class="invalid-feedback">
            Proszę podaj poprawny numer telefonu
          </div>
        </div>
        <div class="col-md-3">
          <label for="validationCustom06" class="form-label">
            Stawka godzinowa
          </label>
          <div class="input-group mb-3">
            <span class="input-group-text">PLN</span>
            <input
              type="text"
              class="form-control"
              aria-label="Amount (to the nearest PLN)"
            />
            <span class="input-group-text">.00</span>
          </div>
          <div class="invalid-feedback">Proszę podaj poprawną stawkę</div>
        </div>
        <div class="col-md-6">
          <label for="validationCustom05" class="form-label">
            Adres Email
          </label>
          <input
            type="text"
            class="form-control"
            id="validationCustom05"
            required
          />
          <div class="invalid-feedback">Proszę podaj poprawny adres email</div>
        </div>
        <div class="col-md-3">
          <label for="validationCustom06" class="form-label">
            Podaj hasło
          </label>
          <input
            type="password"
            class="form-control"
            id="validationCustom06"
            required
          />
          <div class="invalid-feedback">Proszę podaj poprawne hasło</div>
        </div>
        <div class="col-md-3">
          <label for="validationCustom07" class="form-label">
            Powtórz hasło
          </label>
          <input
            type="password"
            class="form-control"
            id="validationCustom07"
            required
          />
          <div class="invalid-feedback">Proszę podaj poprawne hasło</div>
        </div>

        <div class="col-12 flex-d">
          <button class="btn btn-success m-2" type="submit">
            Dodaj trenera
          </button>
          <button class="btn btn-success m-2" type="submit">
            Modyfikuj trenera
          </button>
          <button class="btn btn-success m-2" type="submit">
            Usuń trenera
          </button>
        </div>
      </form>
    </Container>
  );
}
export default TrainerForm;
