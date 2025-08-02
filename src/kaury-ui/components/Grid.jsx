import React from 'react';

export const Grid = ({ 
  children, 
  cols = 1,
  gap = 'md',
  className = '',
  ...props 
}) => {
  const colsMap = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    6: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6',
    12: 'grid-cols-12',
  };

  const gapMap = {
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
    xl: 'gap-8',
  };

  const baseStyles = `
    grid ${colsMap[cols]} ${gapMap[gap]} ${className}
  `;

  return (
    <div className={baseStyles} {...props}>
      {children}
    </div>
  );
};

export const GridItem = ({ 
  children, 
  span = 1,
  className = '',
  ...props 
}) => {
  const spanMap = {
    1: 'col-span-1',
    2: 'col-span-2',
    3: 'col-span-3',
    4: 'col-span-4',
    6: 'col-span-6',
    12: 'col-span-12',
  };

  const baseStyles = `
    ${spanMap[span]} ${className}
  `;

  return (
    <div className={baseStyles} {...props}>
      {children}
    </div>
  );
};