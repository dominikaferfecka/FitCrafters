import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import 'moment/locale/pl'
import TrainingCalendarForm from "./TrainingCalendarForm";
import { useEffect, useState } from "react";


moment.locale("pl");
const localizer = momentLocalizer(moment);

const CustomToolbar = (toolbar) => {
  const goToPrev = () => {
    const newDate = moment(toolbar.date).subtract(1, "week").toDate();
    toolbar.onNavigate("prev", newDate);
  };

  const goToNext = () => {
    const newDate = moment(toolbar.date).add(1, "week").toDate();
    toolbar.onNavigate("next", newDate);
  };
  return (
    <div className="rbc-toolbar">
      <span className="rbc-btn-group">
        <button type="button" onClick={goToPrev}>
          Poprzedni
        </button>
        <button type="button" onClick={() => toolbar.onView("week")}>
          Tydzień
        </button>
        <button type="button" onClick={goToNext}>
          Następny
        </button>
      </span>
    </div>
  );
};

function CalendarModal({onClose, trainerId}) {

  const closeModal = () => {
    onClose(); // Call the onClose prop function to update the state in the parent component
  };
  console.log(trainerId);

  const [trainings_data, setTrainingsData] = useState([]);

  const [trainers_clients_data, setTrainersClientsData] = useState([]);

  useEffect(() => {
      fetch(`http://127.0.0.1:8000/get-trainer_trainings/?trainer_id=${trainerId}`)
        .then((response) => response.json())
        .then((trainings_data) => {
          setTrainingsData(trainings_data);
        })
        .catch((error) => {
          console.log(trainings_data);
          console.error("Błąd przy pobieraniu danych:", error);
        });
  }, [trainerId]);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/trainer_clients/${trainerId}/`)
      .then((response) => response.json())  
      .then((trainers_clients_data) => {  
        setTrainersClientsData(trainers_clients_data);
      })
      .catch((error) => {
        console.error("Błąd przy pobieraniu danych:", error);
      });
}, [trainerId]); 


  //prepare events
  const mappedEvents = trainings_data.map((training) => ({
    start: moment.utc(training.start_time).toDate(),
    end: moment.utc(training.end_time).toDate(),
    title: training.client_name + " " + training.client_surname,
  }));

  const mappedTrainings = trainings_data.map((training, index) => (
    <option key={training.training_id} value={training.training_id}>
      {training.client_name + " " + training.client_surname + " " + moment(training.start_time).format('MMM DD HH:mm') + "-" + moment(training.end_time).format('HH:mm')}
    </option>
    ));



  const now = new Date();
  const minTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 8, 0, 0); // Set the minimum time to 8:00 AM
  const maxTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 21, 0, 0); // Set the maximum time to 9:00 PM

    return (
      <div class="modal fade bd-example-modal-lg" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true" >
        <div class="modal-dialog modal-lg" style={{ height: 700, width: 900}}>
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel"><b>Twój Kalendarz</b></h5>
            </div>
            <div class="modal-body">
            <Calendar
              localizer={localizer}
              views={["week"]}
              defaultView={"week"}
              components={{
                toolbar: CustomToolbar, 
              }}
              min={minTime}
              max={maxTime}
              events={mappedEvents} 
              // style={{ height: 600, width: 800 }}
              startAccessor="start"
              endAccessor="end"
            />
            <TrainingCalendarForm title="Usuń trening z klientem" button_name="Usuń" mappedItems={mappedTrainings} />
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal" aria-label="Close" onClick={closeModal}>Zamknij</button>
            </div>
          </div>
        </div>
       </div>
    );
}

export default CalendarModal;
