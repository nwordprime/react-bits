import React from 'react';
import { theme } from '../theme';

export const Select = ({ 
  label,
  value,
  onChange,
  options = [],
  placeholder = 'Sélectionner...',
  error,
  disabled = false,
  className = '',
  ...props 
}) => {
  const baseStyles = `
    w-full px-4 py-3 rounded-lg border
    transition-all duration-200 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-offset-1
    disabled:opacity-50 disabled:cursor-not-allowed
    appearance-none cursor-pointer
    ${error 
      ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
      : 'border-gray-200 focus:border-indigo-500 focus:ring-indigo-200'
    }
    ${className}
  `;

  const style = {
    background: 'linear-gradient(135deg, #ffffff 0%, #fafbff 100%)',
    boxShadow: theme.shadows.sm,
    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
    backgroundPosition: 'right 0.75rem center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '1.5em 1.5em',
  };

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <select
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={baseStyles}
        style={style}
        {...props}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};