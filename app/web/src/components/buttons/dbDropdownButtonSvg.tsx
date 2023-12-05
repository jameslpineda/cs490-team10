import * as React from 'react';
import { SVGProps } from 'react';
const DBDropdownButton = (props: SVGProps<SVGSVGElement>) => (
  <svg
    // width={20}
    // height={20}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M18.3334 10C18.3334 5.39767 14.6025 1.66671 10.0001 1.66671C5.39771 1.66671 1.66675 5.39767 1.66675 10C1.66675 14.6024 5.39771 18.3334 10.0001 18.3334C14.6025 18.3334 18.3334 14.6024 18.3334 10Z"
      stroke="#6284FF"
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12.9417 8.94997L10 11.8833L7.05835 8.94997"
      stroke="#6284FF"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default DBDropdownButton;
