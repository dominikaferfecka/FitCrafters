function LogIn(props) {
    return <div class="modal fade" id="LogInModal" tabindex="-1" aria-labelledby="LogInModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Zaloguj się jako {props.accountType}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
        <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Adres email</label>
            <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="imie@przyklad.pl" />
        </div>
        <div class="mb-3">
            <label for="inputPassword5" class="form-label">Hasło</label>
            <input type="password" id="inputPassword5" class="form-control" aria-describedby="passwordHelpBlock" />
            <div id="passwordHelpBlock" class="form-text">
            Hasło musi mieć 8-20 znaków, musi zawierać litery i liczby, nie może zawierać spacji, znaków specjalnych i emotek.
            </div>
        </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Anuluj</button>
          <button type="button" class="btn btn-success">Zaloguj się</button>
        </div>
      </div>
    </div>
  </div>
}

export default LogIn