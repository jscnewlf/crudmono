import React, { useState } from 'react';
import RegisterForm from '../components/authForm/RegisterForm';
import Modal from '../components/core/Modal';
import Loading from '../components/core/Loading';
const Register: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalType, setModalType] = useState<'success' | 'error'>('success');
  const [isLoading, setIsLoading] = useState(false);
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
  const handleLoading = (loading: boolean) => {
    setIsLoading(loading);
  };
  return (
    <div className='bg-triangle-pattern customized-bg'>
      <div className="flex items-center justify-center h-screen max-w-screen-lg mx-auto customized-bg2">
       {/* <Image className='drop-shadow-md' src={'/svg/human-creative.svg'} alt={'s'} width={'500'} height={'500'} /> */}
        <RegisterForm onSuccess={handleSuccess} onError={handleError} onLoading={handleLoading} />
        {isLoading && <Loading />}
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
