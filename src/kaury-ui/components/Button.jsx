import React from 'react';
import { theme } from '../theme';

const variants = {
  primary: {
    bg: theme.colors.primary[500],
    bgHover: theme.colors.primary[600],
    text: 'white',
    border: 'transparent',
  },
  secondary: {
    bg: theme.colors.secondary[500],
    bgHover: theme.colors.secondary[600],
    text: 'white',
    border: 'transparent',
  },
  success: {
    bg: theme.colors.success[500],
    bgHover: theme.colors.success[600],
    text: 'white',
    border: 'transparent',
  },
  warning: {
    bg: theme.colors.warning[500],
    bgHover: theme.colors.warning[600],
    text: 'white',
    border: 'transparent',
  },
  error: {
    bg: theme.colors.error[500],
    bgHover: theme.colors.error[600],
    text: 'white',
    border: 'transparent',
  },
  outline: {
    bg: 'transparent',
    bgHover: theme.colors.gray[50],
    text: theme.colors.gray[700],
    border: theme.colors.gray[300],
  },
  ghost: {
    bg: 'transparent',
    bgHover: theme.colors.gray[100],
    text: theme.colors.gray[700],
    border: 'transparent',
  },
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  disabled = false,
  className = '',
  ...props 
}) => {
  const variantStyles = variants[variant];
  const sizeStyles = sizes[size];

  const baseStyles = `
    inline-flex items-center justify-center
    font-medium rounded-lg
    transition-all duration-200 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-opacity-50
    disabled:opacity-50 disabled:cursor-not-allowed
    hover:scale-[1.02] active:scale-[0.98]
    ${sizeStyles}
    ${className}
  `;

  const style = {
    backgroundColor: variantStyles.bg,
    color: variantStyles.text,
    borderColor: variantStyles.border,
    borderWidth: variantStyles.border !== 'transparent' ? '1px' : '0',
    boxShadow: theme.shadows.sm,
  };

  const hoverStyle = {
    backgroundColor: variantStyles.bgHover,
  };

  return (
    <button
      className={baseStyles}
      style={style}
      disabled={disabled}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.target.style.backgroundColor = variantStyles.bgHover;
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          e.target.style.backgroundColor = variantStyles.bg;
        }
      }}
      {...props}
    >
      {children}
    </button>
  );
};