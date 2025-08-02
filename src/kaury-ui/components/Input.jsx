import React from 'react';
import { theme } from '../theme';

export const Input = ({ 
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  disabled = false,
  size = 'md',
  className = '',
  icon: Icon,
  ...props 
}) => {
  const sizeMap = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-5 py-4 text-lg',
  };

  const baseInputStyles = `
    w-full rounded-lg border transition-all duration-200 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-offset-1
    disabled:opacity-50 disabled:cursor-not-allowed
    ${sizeMap[size]}
    ${Icon ? 'pl-10' : ''}
    ${error 
      ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
      : 'border-gray-200 focus:border-indigo-500 focus:ring-indigo-200'
    }
    ${className}
  `;

  const style = {
    background: 'linear-gradient(135deg, #ffffff 0%, #fafbff 100%)',
    boxShadow: theme.shadows.sm,
  };

  return (
    <div className="relative">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-gray-400" />
          </div>
        )}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={baseInputStyles}
          style={style}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};