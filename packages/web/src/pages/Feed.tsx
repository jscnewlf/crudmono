// Feed.tsx
import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';
import { useNavigate } from 'react-router-dom';

interface Post {
    id: number;
    title: string;
    content: string;
}

const Feed: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [newPost, setNewPost] = useState({ title: '', content: '' });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('/api/post/user/posts', { withCredentials: true });
                setPosts(response.data);
                setLoading(false);
            } catch (err) {
                setError('Erro ao carregar posts');
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    const handleCreatePost = async () => {
        try {
            await axios.post('/api/post/create', newPost, { withCredentials: true });
            setNewPost({ title: '', content: '' });
            setShowCreateForm(false);
            const response = await axios.get('/api/post/user/posts', { withCredentials: true });
            setPosts(response.data);
        } catch (err) {
            setError('Erro ao criar post');
        }
    };

    const handleDeletePost = async (id: number) => {
        try {
            await axios.delete(`/api/post/remove/${id}`, { withCredentials: true });
            setPosts(posts.filter(post => post.id !== id));
        } catch (err) {
            setError('Erro ao excluir post');
        }
    };

    return (
        <div>
            <div className='customized-bg before:h-6 before:top-16 before:shadow-md before:z-[2] small-animated'></div>
            <div className=' flex items-center justify-center h-screen relative z-1 flex-col '>
                {loading && <p>Carregando...</p>}
                {error && <p className="text-red-500">{error}</p>}
                {!loading && posts.length === 0 && (
                    <div className='flex flex-col items-center'>
                        <p className='text-darkblue-800'>Nenhum post criado ainda.</p>
                        <button
                            className="mt-4 p-2 bg-darkblue-600 text-white rounded"
                            onClick={() => setShowCreateForm(true)}
                        >
                            Criar Novo Post
                        </button>
                    </div>
                )}
                {posts.length > 0 && (
                    <div className='flex items-center justify-center h-screen relative z-1 flex-col w-full  sm:w-11/12 '>
                        <button
                            className="mb-6 p-2 bg-darkblue-600 text-white rounded"
                            onClick={() => setShowCreateForm(true)}
                        >
                            Criar Novo Post
                        </button>
                        {posts.map(post => (
                            <div key={post.id} className="mb-4 p-4 border-t-2 border-softblue-600 w-full max-w-md relative">
                                <h2 className="text-xl font-semibold text-darkblue-600">{post.title}</h2>
                                <p className='text-darkblue-400'>{post.content}</p>
                                <div className=" absolute right-0 top-2">
                                    <button
                                        className="mr-2 p-1 bg-darkblue-200 text-white rounded hover:bg-opacity-80 text-xs"
                                        onClick={() => navigate(`/feed/post/${post.id}`)}
                                    >
                                        Ver Detalhes
                                    </button>
                                    <button
                                        className="p-1 bg-grayish-800 text-white rounded hover:bg-opacity-80 text-xs"
                                        onClick={() => handleDeletePost(post.id)}
                                    >
                                        Excluir
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                {showCreateForm && (
                    <div className='fixed inset-0 flex items-center justify-center bg-[#0000002e]'>
                        <div className="mt-4 p-4 border border-gray-100 rounded shadow-2xl max-w-md bg-white">
                            <h2 className="text-xl font-semibold text-darkblue-800 mb-4">Novo Post</h2>
                            <input
                                type="text"
                                placeholder="Título"
                                className="w-full p-2 border border-gray-300 rounded mb-2"
                                value={newPost.title}
                                onChange={e => setNewPost({ ...newPost, title: e.target.value })}
                            />
                            <textarea
                                placeholder="Conteúdo"
                                className="w-full p-2 border border-gray-300 rounded mb-2"
                                rows={4}
                                value={newPost.content}
                                onChange={e => setNewPost({ ...newPost, content: e.target.value })}
                            />
                            <button
                                className="mr-2 p-2 bg-darkblue-200 text-white rounded hover:bg-opacity-80"
                                onClick={handleCreatePost}
                            >
                                Criar Post
                            </button>
                            <button
                                className="p-2 bg-grayish-800 text-white rounded hover:bg-opacity-80"
                                onClick={() => setShowCreateForm(false)}
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Feed;
