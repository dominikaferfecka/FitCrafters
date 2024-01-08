import { Container } from "react-bootstrap";

function GymForm(props) {
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
  return (
    <Container className="w-75" id={props.scrollId}>
      <h1 className="text-center m-5">Siłownie</h1>
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
          <label for="validationCustom03" class="form-label">
            Numer telefonu recepcji
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
          <label for="validationCustom03" class="form-label">
            Miasto
          </label>
          <input
            type="text"
            class="form-control"
            id="validationCustom03"
            required
          />
          <div class="invalid-feedback">Proszę podaj poprawne miasto</div>
        </div>
        <div class="col-md-3">
          <label for="validationCustom03" class="form-label">
            Ulica
          </label>
          <input
            type="text"
            class="form-control"
            id="validationCustom03"
            required
          />
          <div class="invalid-feedback">Proszę podaj poprawną ulicę</div>
        </div>
        <div class="col-md-3">
          <label for="validationCustom03" class="form-label">
            Numer ulicy
          </label>
          <input
            type="text"
            class="form-control"
            id="validationCustom03"
            required
          />
          <div class="invalid-feedback">Proszę podaj poprawny numer ulicy</div>
        </div>
        <div class="col-md-3">
          <label for="validationCustom03" class="form-label">
            Numer budynku
          </label>
          <input
            type="text"
            class="form-control"
            id="validationCustom03"
            required
          />
          <div class="invalid-feedback">Proszę podaj poprawny numer ulicy</div>
        </div>

        <div class="col-12 flex-d">
          <button class="btn btn-success m-2" type="submit">
            Dodaj siłownię
          </button>
          <button class="btn btn-success m-2" type="submit">
            Modyfikuj siłownię
          </button>
          <button class="btn btn-success m-2" type="submit">
            Usuń siłownię
          </button>
        </div>
      </form>
    </Container>
  );
}

export default GymForm;
