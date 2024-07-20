import React from 'react';

interface FormGroupProps {
  label: string;
  children: React.ReactNode;
  className?: string;
}

const FormGroup: React.FC<FormGroupProps> = ({ label, children, className }) => {
  return (
    <div className={`mb-6 ${className}`}>
      <label className="block text-xs font-bold font-sans text-darkblue-600">{label}</label>
      {children}
    </div>
  );
};

export default FormGroup;
