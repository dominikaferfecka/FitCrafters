import { useNavigate } from "react-router-dom";

function LogIn(props) {
    const navigate = useNavigate();

    function handleLogInClick() {
      if (props.accountType==="klient") {
        navigate("/client")
      }
      else if (props.accountType==="trener") {
        navigate("/trainer")
      }
      else if (props.accountType==="menadżer") {
        navigate("/manager")
      }
      
    }

    return <div className='modal fade' id="LogInModal" tabIndex="-1" aria-labelledby="LogInModalLabel" aria-hidden="true">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Zaloguj się jako {props.accountType}</h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
        <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Adres email</label>
            <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="imie@przyklad.pl" />
        </div>
        <div className="mb-3">
            <label htmlFor="inputPassword5" className="form-label">Hasło</label>
            <input type="password" id="inputPassword5" className="form-control" aria-describedby="passwordHelpBlock" />
            <div id="passwordHelpBlock" className="form-text">
            Hasło musi mieć 8-20 znaków, musi zawierać litery i liczby, nie może zawierać spacji, znaków specjalnych i emotek.
            </div>
        </div>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Anuluj</button>
          <button type="button" data-bs-dismiss="modal" className="btn btn-success" onClick={()=>handleLogInClick()}>Zaloguj się</button>
        </div>
      </div>
    </div>
  </div>
}

export default LogIn