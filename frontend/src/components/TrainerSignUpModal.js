function TrainerSignUpModal(props) {
  return (
    <div
      class="modal fade"
      id="trainerSignUp"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">
            Zapisz się do {props.trainer}
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form class="row">
              <div class="mb-3 col-md-6">
                <label for="date" class="form-label">
                  Data
                </label>
                <input type="date" class="form-control" id="date" />
              </div>
              <div class="mb-3 col-md-6">
                <label for="time" class="form-label">
                  Godzina
                </label>
                <input type="time" class="form-control" id="time" />
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
              Zapisz się
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrainerSignUpModal;
