import background from "../img/userBackground.jpg";
import React, { useEffect, useState } from "react";

function UserHeader(props) {
  const [name, setName] = useState("");

  useEffect(() => {
    if (props.name) {
      setName(props.name || "");
    }
  }, [props.name]);

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
              {<h1 className="mb-3">Witaj {name}!</h1>}
              <h4 className="mb-3">Panel {props.roleTitle}</h4>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default UserHeader;
