// Layout.tsx
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from '../axiosConfig';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    
    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:3001/api/auth/logout', {}, { withCredentials: true });
            navigate('/login');
        } catch (error) {
            console.error('Erro ao fazer logout', error);
        }
    };

    // Determine if the header should be displayed
    const shouldShowHeader = !['/login', '/register'].includes(location.pathname);

    // Function to determine if the link is active
    const isActiveLink = (path: string) => location.pathname === path;

    return (
        <div className="min-h-screen flex flex-col">
            {shouldShowHeader && (
                <header className="z-10 fixed w-full bg-darkblue-800 text-white p-4 flex justify-between items-center">
                    <div className="flex space-x-4">
                        <Link
                            to="/me"
                            className={`p-2 rounded ${isActiveLink('/me') ? 'underline underline-offset-4' : 'hover:bg-darkblue-600'}`}
                        >
                            Meu Perfil
                        </Link>
                        <Link
                            to="/feed"
                            className={`p-2 rounded ${isActiveLink('/feed') ? 'underline underline-offset-4' : 'hover:bg-darkblue-600'}`}
                        >
                            Feed
                        </Link>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="bg-darkblue-600 hover:opacity-80 p-2 rounded"
                    >
                        Logout
                    </button>
                </header>
            )}
            <main className={`flex-1 ${shouldShowHeader && ('mt-32')}`}>
                {children}
            </main>
        </div>
    );
};

export default Layout;
