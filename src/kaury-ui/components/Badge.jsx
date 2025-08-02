import React from 'react';
import { theme } from '../theme';

const variants = {
  success: {
    bg: theme.colors.success[100],
    text: theme.colors.success[800],
    border: theme.colors.success[200],
  },
  error: {
    bg: theme.colors.error[100],
    text: theme.colors.error[800],
    border: theme.colors.error[200],
  },
  warning: {
    bg: theme.colors.warning[100],
    text: theme.colors.warning[800],
    border: theme.colors.warning[200],
  },
  primary: {
    bg: theme.colors.primary[100],
    text: theme.colors.primary[800],
    border: theme.colors.primary[200],
  },
  secondary: {
    bg: theme.colors.secondary[100],
    text: theme.colors.secondary[800],
    border: theme.colors.secondary[200],
  },
  gray: {
    bg: theme.colors.gray[100],
    text: theme.colors.gray[800],
    border: theme.colors.gray[200],
  },
};

export const Badge = ({ 
  children, 
  variant = 'gray', 
  size = 'md',
  className = '',
  ...props 
}) => {
  const variantStyles = variants[variant];
  
  const sizeMap = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base',
  };

  const baseStyles = `
    inline-flex items-center font-medium rounded-full border
    ${sizeMap[size]}
    ${className}
  `;

  const style = {
    backgroundColor: variantStyles.bg,
    color: variantStyles.text,
    borderColor: variantStyles.border,
  };

  return (
    <span className={baseStyles} style={style} {...props}>
      {children}
    </span>
  );
};