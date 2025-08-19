
import React from 'react';

export const SortAscendingIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    {...props}
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M3 18h6"/>
    <path d="M3 12h9"/>
    <path d="M3 6h12"/>
    <path d="m21 15-3-3-3 3"/>
    <path d="M18 12v9"/>
  </svg>
);
