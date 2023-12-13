import { Container } from "react-bootstrap";

function List(props) {
  var columns = ["#", "First", "Last", "Handle"];
  if (props.scrollId==="gymList" ){ columns = ["#", "Nazwa", "Ulica", "Numer telefonu"]}
  if (props.scrollId==="equipmentList" ){ columns = ["#", "Kategoria", "Nazwa"]}
  if (props.scrollId==="trainerList" ){ columns = ["#", "Imię", "Nazwisko", "Numer telefonu"]}
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

  return (
    <Container className="w-75" id={props.scrollId}>
      <h1 className="text-center m-5">{props.header}</h1>
      {props.showSelect && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <select className="form-select w-50" aria-label="Select">
            <option value="0">{props.firstSelectTitle}</option>

            {mappedSelectItems}
          </select>
        </div>
      )}
      <table className="table table-bordered border-success m-5">
        <thead>
          <tr>{listItems}</tr>
        </thead>
        <tbody>
        {props.scrollId==="gymList" && props.items.map(element => 
          <tr>
            <th scope="row">{element.gym_id}</th>
            
            <><td>{element.city}</td><td>{element.street}</td><td>{element.phone_number}</td></>
            
          </tr>
        )}
        {props.scrollId==="equipmentList" && props.items.map(element => 
          <tr>
            <th scope="row">{element.equipment_id}</th>
            
            <><td>{element.category}</td><td>{element.name}</td></>
            
          </tr>
        )}
        {props.scrollId==="trainerList" && props.items.map(element => 
          <tr>
            <th scope="row">{element.trainer_id}</th>
            
            <><td>{element.name}</td><td>{element.surname}</td><td>{element.phone_number}</td></>
            
          </tr>
        )}
        </tbody>
      </table>
    </Container>
  );
}

export default List;
