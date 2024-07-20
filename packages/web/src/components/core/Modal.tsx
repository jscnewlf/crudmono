import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  type?: 'success' | 'error';
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, message, type = 'success' }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-slate-950 bg-opacity-75 z-50">
      <div className={`bg-white p-6 rounded shadow-lg w-full max-w-sm `}>
        <h2 className={`mt-2 text-xl font-bold ${type === 'error' ? 'text-red-500' : 'text-green-500'}`}>
          {type === 'error' ? 'Error' : 'Success'}
        </h2>
        <p className="mt-4 text-darkblue-800 text-md">{message}</p>
        <button
          onClick={onClose}
          className="w-full rounded-lg mx-auto mt-20 py-2 bg-softblue-600 text-white font-sans font-semibold uppercase hover:opacity-80"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
