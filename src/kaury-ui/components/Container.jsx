import React from 'react';

const sizes = {
  sm: 'max-w-2xl',
  md: 'max-w-4xl',
  lg: 'max-w-6xl',
  xl: 'max-w-7xl',
  full: 'max-w-full',
};

export const Container = ({ 
  children, 
  size = 'lg', 
  className = '',
  ...props 
}) => {
  const baseStyles = `
    mx-auto px-4 sm:px-6 lg:px-8
    ${sizes[size]}
    ${className}
  `;

  return (
    <div className={baseStyles} {...props}>
      {children}
    </div>
  );
};