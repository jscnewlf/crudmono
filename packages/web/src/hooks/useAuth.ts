// src/hooks/useAuth.ts
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:3001'; // URL da API

export function useAuth() {
    const [user, setUser] = useState<{ name: string; username: string } | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`${API_URL}/auth/user`, { withCredentials: true });
                setUser(response.data);
            } catch (error) {
                navigate('/login');
            }
        };

        fetchUser();
    }, [navigate]);

    const logout = async () => {
        try {
            await axios.post(`${API_URL}/auth/logout`, {}, { withCredentials: true });
            setUser(null);
            navigate('/login');
        } catch (error) {
            console.error('Erro ao fazer logout:', error);
        }
    };

    return { user, logout };
}
