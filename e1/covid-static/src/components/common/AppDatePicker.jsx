import { DayPicker } from 'react-day-picker'

import 'react-day-picker/dist/style.css'

const AppDatePicker = (props) => {
    const { selectedDay, handleDayClick } = props

    return (
        <DayPicker
            onDayClick={day => handleDayClick(day)}
            selectedDays={selectedDay}
            selected={selectedDay}
        />
    )
}
export default AppDatePicker