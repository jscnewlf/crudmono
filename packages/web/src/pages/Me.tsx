import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axiosConfig';
import Button from '../components/core/Button';

const Me: React.FC = () => {
    const [user, setUser] = useState<{ name: string; username: string } | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        
        const checkAuth = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/auth/me', { withCredentials: true });
                setUser(response.data);
            } catch (error) {
              
                navigate('/login');
            }
        };

        checkAuth();
    }, [navigate]);

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:3001/api/auth/logout', {}, { withCredentials: true });
            navigate('/login');
        } catch (error) {
            console.error('Erro ao fazer logout', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Meu Perfil</h1>
            {user ? (
                <div>
                    <p><strong>Nome:</strong> {user.name}</p>
                    <p><strong>Nome de Usuário:</strong> {user.username}</p>
                    <Button
                        onClick={handleLogout}
                        className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
                    >
                        Logout
                    </Button>
                </div>
            ) : (
                <p>Carregando...</p>
            )}
        </div>
    );
};

export default Me;
