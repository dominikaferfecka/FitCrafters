import { Container } from "react-bootstrap";

function ClientPlan(props) {
  const columns = ["#", "First", "Last", "Handle"];
  const plans = ["planA", "planB", "planC", "planD", "planE"];
  const exercises = [
    "ćwiczenieA",
    "ćwiczenieB",
    "ćwiczenieC",
    "ćwiczenieD",
    "ćwiczenieE",
  ];
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

  const mappedSelectPlans = plans.map((item, index) => (
    <option key={index} value={index + 1}>
      {item}
    </option>
  ));

  const mappedSelectExercises = exercises.map((item, index) => (
    <option key={index} value={index + 1}>
      {item}
    </option>
  ));

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
            <select className="form-select w-50" aria-label="Select">
              <option value="0">Wybierz klienta</option>
              {mappedSelectItems}
            </select>
          </div>
        )}
        <table className="table table-bordered border-success m-5">
          <thead>
            <tr>{listItems}</tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
          </tbody>
        </table>
      </div>

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
            />
          </div>
          <div class="mb-3 col-md-5">
            <label for="exampleInputPassword1" class="form-label">
              Plan ćwiczeń
            </label>
            <select class="form-select" aria-label="Default select example">
              <option selected>Wybierz plan</option>
              {mappedSelectPlans}
            </select>
          </div>
          <div class="col-md-1 d-flex align-items-center">
            <button class="btn btn-success" type="button">
              Dodaj
            </button>
          </div>
        </div>
      </form>
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
      </form>
    </Container>
  );
}

export default ClientPlan;
