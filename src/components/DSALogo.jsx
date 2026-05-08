import React from 'react';

const DSALogo = ({ size = 32, className = '' }) => {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 256 256" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ flexShrink: 0 }}
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={isDark ? '#818CF8' : '#6366F1'} />
          <stop offset="100%" stopColor={isDark ? '#22D3EE' : '#06B6D4'} />
        </linearGradient>
      </defs>
      <circle cx="128" cy="128" r="120" fill="url(#logoGradient)" />
      <polygon 
        points="128,52 168,100 168,156 128,180 88,156 88,100" 
        fill="none" 
        stroke="white" 
        strokeWidth="14" 
        strokeLinejoin="round" 
      />
      <circle cx="128" cy="128" r="20" fill="white" />
    </svg>
  );
};

export default DSALogo;
