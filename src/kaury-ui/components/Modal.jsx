import React, { useEffect } from 'react';
import { theme } from '../theme';

export const Modal = ({ 
  isOpen, 
  onClose, 
  children, 
  size = 'md',
  className = '',
  ...props 
}) => {
  const sizeMap = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        style={{ backdropFilter: 'blur(4px)' }}
      />
      
      {/* Modal */}
      <div 
        className={`
          relative bg-white rounded-2xl shadow-2xl
          transform transition-all duration-300 ease-out
          w-full ${sizeMap[size]} max-h-[90vh] overflow-hidden
          ${className}
        `}
        style={{
          background: 'linear-gradient(135deg, #ffffff 0%, #fafbff 100%)',
          boxShadow: theme.shadows.xl,
        }}
        {...props}
      >
        {children}
      </div>
    </div>
  );
};

export const ModalHeader = ({ children, onClose, className = '' }) => (
  <div className={`flex items-center justify-between p-6 border-b border-gray-100 ${className}`}>
    <div className="text-lg font-semibold text-gray-900">
      {children}
    </div>
    {onClose && (
      <button
        onClick={onClose}
        className="text-gray-400 hover:text-gray-600 transition-colors"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    )}
  </div>
);

export const ModalContent = ({ children, className = '' }) => (
  <div className={`p-6 overflow-y-auto max-h-[60vh] ${className}`}>
    {children}
  </div>
);

export const ModalFooter = ({ children, className = '' }) => (
  <div className={`flex items-center justify-end gap-3 p-6 border-t border-gray-100 bg-gray-50 ${className}`}>
    {children}
  </div>
);