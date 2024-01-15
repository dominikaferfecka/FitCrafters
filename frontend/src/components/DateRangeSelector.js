import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import format from 'date-fns/format'
import { useEffect, useRef, useState } from 'react'
import { DateRangePicker } from 'react-date-range'
import { addDays } from 'date-fns'

const DateRangeSelector = ({ onDateChange }) => {

  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection'
    }
  ])

  const handleDateChange = (item) => {
    const { startDate, endDate } = item.selection;
    // console.log("Start Date:", startDate);
    // console.log("End Date:", endDate);
    setRange([item.selection]);

    onDateChange && onDateChange({ startDate, endDate });
  };


  const [open, setOpen] = useState(false)
  const refOne = useRef(null)

  // hide window when clicked outside
  const hideOnClickOutside = (e) => {
    if( refOne.current && !refOne.current.contains(e.target) ) {
      setOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener("click", hideOnClickOutside, true)
  }, [])


  return (
    <div className="calendarWrap">

      <input
        value={`${format(range[0].startDate, "MM/dd/yyyy")} to ${format(range[0].endDate, "MM/dd/yyyy")}`}
        readOnly
        className="inputBox"
        onClick={ () => setOpen(open => !open) }
      />

      <div ref={refOne}>
        {open && 
          <DateRangePicker
            onChange={handleDateChange}
            editableDateInputs={true}
            moveRangeOnFirstSelection={false}
            ranges={range}
            months={2}
            direction="horizontal"
            className="calendarElement"
          />
        }
      </div>
    </div>
  )
}

export default DateRangeSelector