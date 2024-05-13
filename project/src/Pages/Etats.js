import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

export const Etats = () => {
  return (
    <div>
      <Calendar
        localizer={localizer}
        events={[]} // Add events data here
        startAccessor="start"
        endAccessor="end"
      />
    </div>
  );
};
