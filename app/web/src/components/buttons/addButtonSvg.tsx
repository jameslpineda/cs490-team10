import * as React from 'react';
import { SVGProps } from 'react';
const AddButtonSvg = (props: SVGProps<SVGSVGElement>) => (
  <svg
    // width={39}
    // height={39}
    viewBox="0 0 39 39"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle
      cx={19.5}
      cy={19.5}
      r={19.5}
      fill="url(#paint0_linear_1521_35)"
    />
    <path
      d="M13 19.5H26"
      stroke="white"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M19.5 26V13"
      stroke="white"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <defs>
      <linearGradient
        id="paint0_linear_1521_35"
        x1={19.5}
        y1={0}
        x2={19.5}
        y2={39}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#5D8EFF" />
        <stop
          offset={1}
          stopColor="#3E6FE1"
        />
      </linearGradient>
    </defs>
  </svg>
);
export default AddButtonSvg;
