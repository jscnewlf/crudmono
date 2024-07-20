import React, { useState } from 'react';
import RegisterForm from '../components/authForm/RegisterForm';
import Modal from '../components/core/Modal';
import Image from '../components/core/Image';
const Register: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalType, setModalType] = useState<'success' | 'error'>('success');

  const handleSuccess = (message: string) => {
    setModalMessage(message);
    setModalType('success');
    setIsModalOpen(true);
    setError(null);
  };

  const handleError = (error: string) => {
    setModalMessage(error);
    setModalType('error');
    setIsModalOpen(true);
    setMessage(null);
  };

  return (
    <div className='bg-triangle-pattern customized-bg'>
    {/* <Image src={'/svg/human-creative.svg'} alt={'s'} /> */}
      <div className="flex items-center justify-center h-screen max-w-screen-lg mx-auto customized-bg2">
       {/* <Image className='drop-shadow-md' src={'/svg/human-creative.svg'} alt={'s'} width={'500'} height={'500'} /> */}
        <RegisterForm onSuccess={handleSuccess} onError={handleError} />
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          message={modalMessage}
          type={modalType}
        />
      </div>
    </div>
  );
};

export default Register;
