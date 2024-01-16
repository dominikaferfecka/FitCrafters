import React from 'react';
import { useEffect, useState } from "react";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/pl'

function TrainingCalendarForm({trainerId, title, button_name, mappedItems}){

    const [selectedValue, setSelectedValue] = useState(null);

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
      };
    
    console.log(selectedValue);
    const deleteTraining = () => {
        if(selectedValue){
            try{
                fetch(
                    `http://127.0.0.1:8000/delete_training/?training_id=${selectedValue}`
                )
                .then((response) => response.json())
                .then((result) => {
                    if (result.status === "success") {
                        alert("Usunięto trening");
                        setSelectedValue(null);
                    }
                })
            } catch (error) {
                console.error("Cannot delete training", error);
            }
        }  
    };
    return (
        <><h5 className="text-center m-4">{title}</h5><form>
            <div class="row flex-d justify-content-center" id="formClientPlan">
                <div class="mb-3 col-md-5">
                    <label for="exampleInputPassword1" class="form-label">
                    Trening
                    </label>
                    <select class="form-select" aria-label="Default select example" onChange={(e) => setSelectedValue(e.target.value)}
                        value={selectedValue}>
                        <option selected onChange={handleChange}>Wybierz trening </option>
                        {mappedItems}
                    </select>
                </div>
                <div class="col-md-1 d-flex align-items-center">
                    <button class="btn btn-success" type="button" onClick={deleteTraining}>
                        {button_name}
                    </button>
                </div>
            </div>
        </form></>
    );
}


export default TrainingCalendarForm;