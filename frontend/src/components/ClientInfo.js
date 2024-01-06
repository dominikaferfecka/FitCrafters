import { Container } from "react-bootstrap";

function ClientInfo(props) {
  return (
    <Container className="w-50" id={props.scrollId}>
      <h1 className="text-center m-5">Informacje</h1>
      <form class="row  m-auto mb-5 g-3" novalidate>
        <div class="col-md-6">
          <label for="name" class="form-label">
            Imię
          </label>
          <input
            type="text"
            class="form-control"
            id="name"
            defaultValue="Stanisław"
          />
        </div>
        <div class="col-md-6">
          <label for="surname" class="form-label">
            Nazwisko
          </label>
          <input
            type="text"
            class="form-control"
            id="surname"
            defaultValue="Stonoga"
          />
        </div>
        <div class="col-md-6">
          <label for="phoneNumber" class="form-label">
            Numer telefonu
          </label>
          <input
            type="text"
            class="form-control"
            id="phoneNumber"
            defaultValue="728952062"
          />
        </div>
        <div class="col-md-6">
          <label for="email" class="form-label">
            Adres Email
          </label>
          <input
            type="text"
            class="form-control"
            id="email"
            defaultValue="stas.stonoga@wp.pl"
          />
        </div>
        <div class="col-md-6">
          <label for="newPass" class="form-label">
            Podaj nowe hasło
          </label>
          <input type="password" class="form-control" id="newPass" />
        </div>
        <div class="col-md-6">
          <label for="repeatPass" class="form-label">
            Powtórz nowe hasło
          </label>
          <input type="password" class="form-control" id="repeatPass" />
        </div>
        <div class="col-md-4">
          <label for="age" class="form-label">
            Wiek
          </label>
          <input type="text" class="form-control" id="age" defaultValue="24" />
        </div>
        <div class="col-md-4">
          <label for="weight" class="form-label">
            Waga
          </label>
          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control"
              id="weight"
              defaultValue="87"
            />
            <span class="input-group-text">kg</span>
          </div>
        </div>
        <div class="col-md-4">
          <label for="heigh" class="form-label">
            Wzrost
          </label>
          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control"
              id="height"
              defaultValue="192"
            />
            <span class="input-group-text">cm</span>
          </div>
        </div>

        <div class="col-12">
          <button class="btn btn-success m-2" type="button">
            Modyfikuj dane
          </button>
        </div>
      </form>
    </Container>
  );
}

export default ClientInfo;
