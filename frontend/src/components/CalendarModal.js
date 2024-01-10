import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
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

function CalendarModal({onClose}) {
  const closeModal = () => {
    onClose(); // Call the onClose prop function to update the state in the parent component
  };
  const now = new Date();
  const minTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 8, 0, 0); // Ustaw godzinę rozpoczęcia (np. 8:00 AM)
  const maxTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 21, 0, 0); // Ustaw godzinę zakończenia (np. 5:00 PM)

    return (
      <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Twój Kalendarz</h5>
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
              // events={this.props.events} 
              startAccessor="start"
              endAccessor="end"
            />
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Zamknij</button>
              <button type="button" class="btn btn-primary">OK</button>
            </div>
          </div>
        </div>
      </div>

    );
}

export default CalendarModal;
