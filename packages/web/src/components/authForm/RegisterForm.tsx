import React, { useState } from 'react';
import axios from 'axios';
import Button from '../core/Button';
import FormGroup from '../core/FormGroup';
import Input from '../core/Input';

interface RegisterFormProps {
  onSuccess: (message: string) => void;
  onError: (error: string) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess, onError }) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/api/auth/register', {
        name,
        username,
        password
      });

      onSuccess(response.data.message);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        onError(err.response?.data.error || 'Erro desconhecido');
      } else {
        onError('Erro desconhecido');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm backdrop-blur-sm bg-white/100 p-8 rounded-2xl shadow-md">
      <h2 className="text-4xl text-center text-darkblue-600 font-black mb-6">Signup</h2>
      <FormGroup label="Name">
        <Input className='focus:border-grayish-800 text-darkblue-600' type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
      </FormGroup>
      <FormGroup label="Username">
        <Input className='focus:border-grayish-800 text-darkblue-600' type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
      </FormGroup>
      <FormGroup label="Password">
        <Input className='focus:border-grayish-800 text-darkblue-600' type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </FormGroup>
      <Button className="w-full rounded-lg mx-auto py-2 bg-softblue-600 text-white font-sans font-semibold uppercase hover:opacity-80" type="submit">Register</Button>
    </form>
  );
};

export default RegisterForm;
