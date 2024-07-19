import React, { useState } from 'react';
import axios from 'axios';
import Button from '../components/core/Button';
import FormGroup from '../components/core/FormGroup';
import Input from '../components/core/Input';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/api/auth/register', {
        name,
        username,
        password
      });

      setMessage(response.data.message);
      setError(null);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data.error || 'Erro desconhecido');
      } else {
        setError('Erro desconhecido');
      }
      setMessage(null);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-bold mb-6">Register</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {message && <div className="text-green-500 mb-4">{message}</div>}
        <FormGroup label="Name">
          <Input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
        </FormGroup>
        <FormGroup label="Username">
          <Input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </FormGroup>
        <FormGroup label="Password">
          <Input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </FormGroup>
        <Button className="w-full" type="submit">Register</Button>
      </form>
    </div>
  );
};

export default Register;
