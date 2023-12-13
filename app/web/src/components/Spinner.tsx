import React from 'react';
import AddButtonSvg from '../components/buttons/addButtonSvg';

function Spinner() {
  return (
    <div className="flex flex-col text-3xl font-bold mt-4 items-center">
      <div className="flex flex-row space-x-3 content-center">
        <div className="w-[2.4375rem] h-[2.4375rem]">
          <AddButtonSvg />
        </div>
        <p>Crush It</p>
      </div>
    </div>
  );
}

export default Spinner;
