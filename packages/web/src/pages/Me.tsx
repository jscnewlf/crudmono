import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axiosConfig';

const Me: React.FC = () => {
    const [user, setUser] = useState<{ name: string; username: string } | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get('/api/auth/me', { withCredentials: true });
                setUser(response.data);
            } catch (error) {
                navigate('/login');
            }
        };

        checkAuth();
    }, [navigate]);

    return (
        <div>
            <div className='customized-bg h-3 before:h-6 before:top-16 before:shadow-md small-animated'></div>
            <div className=' flex items-center justify-center h-screen relative z-1 '>
                <div>
                    <h1 className="text-2xl font-bold mb-4">Meu Perfil</h1>
                    {user ? (
                        <div>
                            <p><strong>Nome:</strong> {user.name}</p>
                            <p><strong>Nome de Usuário:</strong> {user.username}</p>
                        </div>
                    ) : (
                        <p>Carregando...</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Me;
