import React from 'react';
import { theme } from '../theme';

export const Card = ({ 
  children, 
  className = '', 
  padding = 'lg',
  shadow = 'md',
  hover = false,
  ...props 
}) => {
  const paddingMap = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
    xl: 'p-8',
  };

  const shadowMap = {
    sm: theme.shadows.sm,
    md: theme.shadows.md,
    lg: theme.shadows.lg,
    xl: theme.shadows.xl,
  };

  const baseStyles = `
    bg-white rounded-xl border border-gray-100
    transition-all duration-200 ease-in-out
    ${paddingMap[padding]}
    ${hover ? 'hover:scale-[1.02] cursor-pointer' : ''}
    ${className}
  `;

  const style = {
    boxShadow: shadowMap[shadow],
    background: 'linear-gradient(135deg, #ffffff 0%, #fafbff 100%)',
  };

  return (
    <div className={baseStyles} style={style} {...props}>
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = '' }) => (
  <div className={`mb-4 ${className}`}>
    {children}
  </div>
);

export const CardContent = ({ children, className = '' }) => (
  <div className={className}>
    {children}
  </div>
);

export const CardFooter = ({ children, className = '' }) => (
  <div className={`mt-4 pt-4 border-t border-gray-100 ${className}`}>
    {children}
  </div>
);