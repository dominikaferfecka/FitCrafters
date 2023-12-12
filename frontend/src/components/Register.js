function Register() {
  return (
    <div class="modal" id="RegisterModal" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Zarejestruj się</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form class="row  m-auto mb-5 g-3" novalidate>
              <div class="col-md-6">
                <label for="name" class="form-label">
                  Imię
                </label>
                <input type="text" class="form-control" id="name" />
              </div>
              <div class="col-md-6">
                <label for="surname" class="form-label">
                  Nazwisko
                </label>
                <input type="text" class="form-control" id="surname" />
              </div>
              <div class="col-md-6">
                <label for="phoneNumber" class="form-label">
                  Numer telefonu
                </label>
                <input type="text" class="form-control" id="phoneNumber" />
              </div>
              <div class="col-md-6">
                <label for="email" class="form-label">
                  Adres Email
                </label>
                <input type="text" class="form-control" id="email" />
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
                <input type="text" class="form-control" id="age" />
              </div>
              <div class="col-md-4">
                <label for="weight" class="form-label">
                  Waga
                </label>
                <div class="input-group mb-3">
                  <input type="text" class="form-control" id="weight" />
                  <span class="input-group-text">kg</span>
                </div>
              </div>
              <div class="col-md-4">
                <label for="heigh" class="form-label">
                  Wzrost
                </label>
                <div class="input-group mb-3">
                  <input type="text" class="form-control" id="height" />
                  <span class="input-group-text">cm</span>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Anuluj
            </button>
            <button type="button" class="btn btn-success">
              Zarejestruj się
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
