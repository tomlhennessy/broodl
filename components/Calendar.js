import { baseRating, demoData, gradients } from '@/app/utils';
import { Fugaz_One } from 'next/font/google';
import React from 'react';


const months = {
  'January': 'Jan', 'February': 'Feb', 'March': 'Mar', 'April': 'Apr',
  'May': 'May', 'June': 'Jun', 'July': 'Jul', 'August': 'Aug',
  'September': 'Sept', 'October': 'Oct', 'November': 'Nov', 'December': 'Dec',
};
const monthsArr = Object.keys(months);
const dayList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const fugaz = Fugaz_One({ subsets: ['latin'], weight: ['400'] });

export default function Calendar(props) {
  const { demo } = props

  const year = 2024;
  const month = 'July';
  const monthNow = new Date(year, monthsArr.indexOf(month), 1);
  const firstDayOfMonth = monthNow.getDay(); // Which day of the week the month starts
  const daysInMonth = new Date(year, monthsArr.indexOf(month) + 1, 0).getDate();

  const totalCells = firstDayOfMonth + daysInMonth; // Total cells needed
  const numRows = Math.ceil(totalCells / 7); // Number of rows in the calendar

  const today = {
    day: new Date().getDate(),
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  };

  return (
    <div className='flex flex-col gap-1 py-4 sm:py-6 md:py-10'>
      {/* Calendar Grid */}
      {[...Array(numRows).keys()].map((rowIndex) => (
        <div key={rowIndex} className='grid grid-cols-7 gap-1'>
          {dayList.map((dayOfWeek, dayOfWeekIndex) => {
            // Calculate the current day's index (1-based)
            const dayIndex = rowIndex * 7 + dayOfWeekIndex - firstDayOfMonth + 1;

            // Determine if this cell should display a valid day or be blank
            const isValidDay = dayIndex > 0 && dayIndex <= daysInMonth;

            // Check if this day is today
            const isToday =
              isValidDay &&
              dayIndex === today.day &&
              monthsArr.indexOf(month) === today.month &&
              year === today.year;

            // Render blank cell for invalid days
            if (!isValidDay) {
              return <div key={dayOfWeekIndex} className='h-12 bg-gray-100' />;
            }

            let color = demo ? gradients.indigo[baseRating[dayIndex]] : dayIndex in demoData ? gradients.indigo[demoData[dayIndex]] : 'white'

            // Render valid day cell
            return (
              <div
                style={{background: color}}
                key={dayOfWeekIndex}
                className={`h-12 flex items-center justify-between rounded-lg border border-solid text-xs sm:text-sm gap-2 ${
                  isToday ? 'bg-indigo-400' : 'border-indigo-100 bg-white'
                } ${color === 'white' ? 'text-indigo-400' : 'text-white'}`}
              >
                <p>{dayIndex}</p>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
