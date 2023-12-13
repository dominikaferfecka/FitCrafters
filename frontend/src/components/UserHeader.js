import background from "../img/userBackground.jpg";


function UserHeader(props) {

  return (
    <header>
      <div
        className="p-5 text-center bg-image mask-parent"
        style={{
          backgroundImage: "url(" + background + ")",
        }}
      >
        <div className="mask">
          <div className="d-flex justify-content-center align-items-center h-100">
            <div className="text-white">

            {
                <h1 className="mb-3">Witaj {props.name}!</h1>
            }
              <h4 className="mb-3">Panel menadżera</h4>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default UserHeader;
