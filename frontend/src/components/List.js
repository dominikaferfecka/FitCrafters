import { Container } from "react-bootstrap";
import React, { useState, useEffect} from 'react';

function List(props) {
  const [equipment_data, setEquipmentData] = useState([]);

  const [trainers_data, setgymTrainersData] = useState([]);

  const [selectedGym, setSelectedGym] = useState("");

  useEffect(() => {
    props.scrollId==="equipmentList" &&
    fetch(`http://127.0.0.1:8000/equipment-endpoint/?gym=${selectedGym}`)
    .then(response => response.json())
    .then(equipment_data => {setEquipmentData(equipment_data); console.log(equipment_data)})
    .catch(error => {  console.log(equipment_data);console.error('Błąd przy pobieraniu danych:', error)});
    console.log(selectedGym);
  }, [selectedGym]);

  useEffect(() => {
    props.scrollId==="trainerList" &&
    fetch(`http://127.0.0.1:8000/trainer-endpoint/?gym=${selectedGym}`)
    .then(response => response.json())
    .then(trainers_data => {setgymTrainersData(trainers_data); console.log(trainers_data)})
    .catch(error => {  console.log(trainers_data);console.error('Błąd przy pobieraniu danych:', error)});
  }, [selectedGym]);

  var columns = ["#", "First", "Last", "Handle"];
  if (props.scrollId==="gymList" ){ columns = ["#", "Nazwa", "Ulica", "Numer telefonu"]}
  if (props.scrollId==="equipmentList" ){ columns = ["#", "Kategoria", "Nazwa", "Ilość"]}
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

  const handleSelectChange = (event) => {
    setSelectedGym(event.target.value);
  }

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
          <select className="form-select w-50" aria-label="Select" onChange={handleSelectChange} >
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
        {props.scrollId==="equipmentList" && equipment_data.map(element => 
          <tr>
            <th scope="row">{element.equipment_id}</th>
            
            <><td>{element.category}</td><td>{element.name}</td><td>{element.quantity}</td></>
            
          </tr>
        )}
        {props.scrollId==="trainerList" && trainers_data.map(element => 
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
