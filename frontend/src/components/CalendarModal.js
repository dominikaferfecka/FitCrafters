import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { useEffect, useState } from "react";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import 'moment/locale/pl'

moment.locale('pl');
const localizer = momentLocalizer(moment);

const CustomToolbar = (toolbar) => {
  const goToPrev = () => {
    const newDate = moment(toolbar.date).subtract(1, 'week').toDate();
    toolbar.onNavigate('prev', newDate);
  };

  const goToNext = () => {
    const newDate = moment(toolbar.date).add(1, 'week').toDate();
    toolbar.onNavigate('next', newDate);
  };
  return (
    <div className="rbc-toolbar">
      <span className="rbc-btn-group">
        {/* Przycisk tygodnia */}
        <button type="button" onClick={goToPrev}>
          Poprzedni
        </button>
        <button type="button" onClick={() => toolbar.onView('week')}>
          Tydzień
        </button>
        <button type="button" onClick={goToNext}>
          Następny
        </button>
      </span>
    </div>
  );
};

function CalendarModal({onClose, TrainerId}) {

  const closeModal = () => {
    onClose(); // Call the onClose prop function to update the state in the parent component
  };

  const [trainings_data, setTrainingsData] = useState([]);
  useEffect(() => {
      fetch(`http://127.0.0.1:8000/get-trainer_trainings/?trainer_id=${TrainerId}`)
        .then((response) => response.json())
        .then((trainings_data) => {
          setTrainingsData(trainings_data);
          console.log(trainings_data);
        })
        .catch((error) => {
          console.log(trainings_data);
          console.error("Błąd przy pobieraniu danych:", error);
        });
  }, []);
  

  const events = trainings_data.map((training) => ({
    start: moment.utc(training.start_time).toDate(),
    end: moment(training.end_time).toDate(),
    title: training.client_name + " " + training.client_surname,
  }));
  console.log(events);

  const now = new Date();
  const minTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 8, 0, 0); // Ustaw godzinę rozpoczęcia (np. 8:00 AM)
  const maxTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 21, 0, 0); // Ustaw godzinę zakończenia (np. 5:00 PM)

    return (
      <div class="modal fade bd-example-modal-lg" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true" >
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel"><b>Twój Kalendarz</b></h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
            <Calendar
              localizer={localizer}
              views={['week']} 
              defaultView={'week'}
              components={{
                toolbar: CustomToolbar, // Użyj niestandardowego komponentu Toolbar
              }}
              min={minTime}
              max={maxTime}
              events={events} 
              style={{ height: 550, width: 750 }}
              startAccessor="start"
              endAccessor="end"
              
            />
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={closeModal}>Zamknij</button>
              <button type="button" class="btn btn-successs">OK</button>
            </div>
          </div>
        </div>
      </div>

    );
}

export default CalendarModal;
