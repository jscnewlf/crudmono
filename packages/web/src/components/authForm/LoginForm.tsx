import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Button from '../core/Button';
import FormGroup from '../core/FormGroup';
import Input from '../core/Input';

interface LoginFormProps {
  onSuccess: (message: string) => void;
  onError: (error: string) => void;
  onLoading: (loading: boolean) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess, onError, onLoading }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);

  const validateUsername = (username: string): boolean =>
    /^[a-zA-Z0-9]+$/.test(username) && username.length >= 4 && username.length <= 10;

  const validatePassword = (password: string): boolean =>
    /^[a-zA-Z0-9]+$/.test(password) && password.length >= 4 && password.length <= 20;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      setValidationError('Todos os campos são obrigatórios.');
      return;
    }

    if (!validateUsername(username)) {
      setValidationError('Usuário inválido');
      return;
    }

    if (!validatePassword(password)) {
      setValidationError('Senha inválida');
      return;
    }

    setValidationError(null);
    onLoading(true);

    try {
      const response = await axios.post('http://localhost:3001/api/auth/login', {
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
    } finally {
      onLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm backdrop-blur-sm bg-white/100 p-8 rounded-2xl shadow-md sm:mx-2">
      <h2 className="text-4xl text-center text-darkblue-600 font-black mb-6">Login</h2>
      {validationError && <div className="text-red-500 mb-4 text-xs">{validationError}</div>}

      <FormGroup label="Username">
        <Input
          className="focus:border-grayish-800 text-darkblue-600"
          type="text"
          maxLength={10}
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </FormGroup>
      <FormGroup label="Password">
        <Input
          className="focus:border-grayish-800 text-darkblue-600"
          type="password"
          maxLength={20}
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormGroup>
      <Button className="w-full rounded-lg mx-auto py-2 bg-softblue-600 text-white font-sans font-semibold uppercase hover:opacity-80" type="submit">Login</Button>

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          <span>Dont have an account? </span>
          <Link to="/register" className="text-blue-500 hover:underline">Register</Link>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;
