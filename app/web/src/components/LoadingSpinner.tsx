import React from 'react';
import AddButtonSvg from './buttons/addButtonSvg';
import Spinner from '@atlaskit/spinner';

function LoadingSpinner() {
  return (
    <div className="flex flex-col text-3xl font-bold mt-16 items-center">
      <div className="flex flex-row space-x-3 content-center">
        <div className="w-[2.4375rem] h-[2.4375rem]">
          <AddButtonSvg />
        </div>
        <div>Crush It</div>
      </div>
      <div className="mt-3">
        <Spinner size="large" />
      </div>
    </div>
  );
}

export default LoadingSpinner;
