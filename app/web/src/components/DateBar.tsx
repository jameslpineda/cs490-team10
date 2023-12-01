import React from 'react';
import moment from 'moment';
import DateProp from '../interfaces/dateInterface';

import { ReactComponent as LButton } from '../assets/svgs/db-lbutton.svg';
import { ReactComponent as RButton } from '../assets/svgs/db-rbutton.svg';
import { ReactComponent as DropdownIcon } from '../assets/svgs/db-dropdown-icon.svg';

// import lbutton from '../assets/images/db-left-button.png';

const DateBar: React.FC<DateProp> = ({
  date,
  setDate,
  showMonth,
  setShowMonth,
  showDay,
  setShowDay,
  showYear,
  setShowYear,
}) => {
  const monthNames = [];
  for (let i = 0; i < 12; i++) {
    const monthName = moment().month(i).format('MMMM');
    monthNames.push(monthName);
  }

  const daysInMonth = date.daysInMonth();
  const daysArray = [];
  for (let i = 1; i <= daysInMonth; i++) {
    daysArray.push(i);
  }

  const allYears = [];
  for (let y = 2000; y <= 2050; y++) {
    allYears.push(y);
  }

  const updateDate = (newDate: moment.Moment) => {
    setDate(newDate);
  };

  const decrementMonth = () => {
    const currDate = date.clone();
    if (currDate.year() == 2000 && currDate.month() == 0) {
      return;
    } else {
      updateDate(date.clone().subtract(1, 'month'));
    }
  };

  const incrementMonth = () => {
    const currDate = date.clone();
    if (currDate.year() == 2500 && currDate.month() == 11) {
      return;
    } else {
      updateDate(date.clone().add(1, 'month'));
    }
  };

  const decrementDay = () => {
    const currDate = date.clone();
    if (
      currDate.year() == 2000 &&
      currDate.month() == 0 &&
      currDate.date() == 1
    ) {
      return;
    } else {
      updateDate(date.clone().subtract(1, 'day'));
    }
  };

  const incrementDay = () => {
    const currDate = date.clone();
    if (
      currDate.year() == 2050 &&
      currDate.month() == 11 &&
      currDate.date() == 31
    ) {
      return;
    } else {
      updateDate(date.clone().add(1, 'day'));
    }
  };

  const decrementYear = () => {
    if (date.clone().year() > 2000) {
      updateDate(date.clone().subtract(1, 'year'));
    }
  };

  const incrementYear = () => {
    if (date.clone().year() < 2050) {
      updateDate(date.clone().add(1, 'year'));
    }
  };

  return (
    <div className="flex justify-center space-x-4 p-2 m-4 bg-primary bg-opacity-15 rounded-2xl">
      <div className="flex space-x-1">
        <button
          data-testid="decrement-month-button"
          onClick={decrementMonth}
        >
          <LButton />
        </button>
        <button
          onClick={() => setShowMonth(!false)}
          data-testid="monthID"
          className={`relative border border-primary w-40 p-1.5 pl-3 rounded-md font-medium text-s text-left ${
            showMonth ? 'bg-white' : ''
          } `}
        >
          <span className="text-black font-bold flex justify-between items-center">
            <p>{date.format('MMMM')}</p>
            {showMonth ? (
              <div className="transform rotate-180">
                <DropdownIcon />
              </div>
            ) : (
              <DropdownIcon />
            )}
          </span>
          {showMonth && (
            <div className="absolute top-8 left-0 p-2 bg-white w-full rounded-b-md outline-none border-l border-b border-r border-primary">
              <select
                size={5}
                className=" text-black w-full outline-none myScroll"
                value={date.format('MMMM')}
                onChange={(e) => {
                  updateDate(date.clone().month(e.target.value));
                  setShowMonth(false);
                }}
              >
                {monthNames.map((month) => {
                  return (
                    <option
                      className="bg-white cursor-pointer py-1.5"
                      key={month}
                      value={month}
                    >
                      {month}
                    </option>
                  );
                })}
              </select>
            </div>
          )}
        </button>
        <button
          data-testid="increment-month-button"
          onClick={incrementMonth}
        >
          <RButton />
        </button>
      </div>
      <div className="flex space-x-1">
        <button
          data-testid="decrement-day-button"
          onClick={decrementDay}
        >
          <LButton />
        </button>
        <button
          onClick={() => setShowDay(!false)}
          data-testid="dayID"
          className={`relative border border-primary w-20 p-1.5 pl-4 rounded-md font-medium text-s text-left ${
            showDay ? 'bg-white' : ''
          }`}
        >
          <span className="text-black font-bold flex justify-between  items-center">
            <p>{date.format('D')}</p>
            {showDay ? (
              <div className="transform rotate-180">
                <DropdownIcon />
              </div>
            ) : (
              <DropdownIcon />
            )}
          </span>
          {showDay && (
            <div className="absolute top-8 left-0 p-2 bg-white w-full rounded-b-md outline-none border-l border-b border-r border-primary">
              <select
                size={5}
                className=" text-black w-full outline-none pr-2 myScroll"
                value={date.format('D')}
                onChange={(e) => {
                  updateDate(date.clone().date(parseInt(e.target.value)));
                  setShowDay(false);
                }}
              >
                {daysArray.map((day) => {
                  return (
                    <option
                      className="bg-white cursor-pointer py-1.5"
                      key={day}
                      value={day}
                    >
                      {day}
                    </option>
                  );
                })}
              </select>
            </div>
          )}
        </button>
        <button
          data-testid="increment-day-button"
          onClick={incrementDay}
        >
          <RButton />
        </button>
      </div>
      <div className="flex space-x-1">
        <button
          data-testid="decrement-year-button"
          onClick={decrementYear}
        >
          <LButton />
        </button>
        <button
          onClick={() => setShowYear(!false)}
          className={`relative border border-primary w-28 p-1.5 pl-3 rounded-md font-bold text-s text-left ${
            showYear ? 'bg-white' : ''
          }  `}
        >
          <span className="text-black font-bold flex justify-between  items-center">
            <p data-testid="yearID">{date.format('YYYY')}</p>
            {showYear ? (
              <div className="transform rotate-180">
                <DropdownIcon />
              </div>
            ) : (
              <DropdownIcon />
            )}
          </span>
          {showYear && (
            <div className="absolute top-8 left-0 p-2 bg-white w-full rounded-b-md outline-none border-l border-b border-r border-primary">
              <select
                size={5}
                className=" text-black w-full outline-none pr-2 myScroll"
                value={date.format('YYYY')}
                onChange={(e) => {
                  updateDate(date.clone().year(parseInt(e.target.value)));
                  setShowDay(false);
                }}
              >
                {allYears.map((year) => {
                  return (
                    <option
                      className="bg-white cursor-pointer p-1.5"
                      key={year}
                      value={year}
                    >
                      {year}
                    </option>
                  );
                })}
              </select>
            </div>
          )}
        </button>
        <button
          data-testid="increment-year-button"
          onClick={incrementYear}
        >
          <RButton />
        </button>
      </div>
    </div>
  );
};

export default DateBar;
