import background from "../img/userBackground.jpg";
import React, { useEffect, useState } from 'react';


function UserHeader(props) {
  const [fetched_data, setData] = useState({});

  useEffect(() => {
    fetch('http://127.0.0.1:8000/manager-name-endpoint/')
    .then(response => response.json())
    .then(fetched_data => {setData(fetched_data); console.log(fetched_data)})
    .catch(error => {  console.log(fetched_data);console.error('Błąd przy pobieraniu danych:', error)});
  }, [fetched_data]);


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
              <h4 className="mb-3">Panel {props.userRole === "user" ? "użytkownika" : "menadżera"}</h4>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default UserHeader;
