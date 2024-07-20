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
                const response = await axios.get('http://localhost:3001/api/post/user/posts', { withCredentials: true });
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
            // Refetch posts after creating a new post
            const response = await axios.get('http://localhost:3001/api/post/user/posts', { withCredentials: true });
            setPosts(response.data);
        } catch (err) {
            setError('Erro ao criar post');
        }
    };

    const handleDeletePost = async (id: number) => {
        try {
            await axios.delete(`http://localhost:3001/api/post/remove/${id}`, { withCredentials: true });
            // Remove post from state after deletion
            setPosts(posts.filter(post => post.id !== id));
        } catch (err) {
            setError('Erro ao excluir post');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Feed de Posts</h1>
            {loading && <p>Carregando...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && posts.length === 0 && (
                <div>
                    <p>Nenhum post criado ainda.</p>
                    <button
                        className="mt-4 p-2 bg-blue-500 text-white rounded"
                        onClick={() => setShowCreateForm(true)}
                    >
                        Criar Novo Post
                    </button>
                </div>
            )}
            {posts.length > 0 && (
                <div>
                    <button
                        className="mb-4 p-2 bg-blue-500 text-white rounded"
                        onClick={() => setShowCreateForm(true)}
                    >
                        Criar Novo Post
                    </button>
                    {posts.map(post => (
                        <div key={post.id} className="mb-4 p-4 border border-gray-300 rounded">
                            <h2 className="text-xl font-semibold">{post.title}</h2>
                            <p>{post.content}</p>
                            <div className="mt-2">
                                <button
                                    className="mr-2 p-2 bg-yellow-500 text-white rounded"
                                    onClick={() => navigate(`/feed/post_${post.id}`)}
                                >
                                    Ver Detalhes
                                </button>
                                <button
                                    className="mr-2 p-2 bg-red-500 text-white rounded"
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
                <div className="mt-4 p-4 border border-gray-300 rounded">
                    <h2 className="text-xl font-semibold">Criar Novo Post</h2>
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
                        className="mr-2 p-2 bg-blue-500 text-white rounded"
                        onClick={handleCreatePost}
                    >
                        Criar Post
                    </button>
                    <button
                        className="p-2 bg-gray-500 text-white rounded"
                        onClick={() => setShowCreateForm(false)}
                    >
                        Cancelar
                    </button>
                </div>
            )}
        </div>
    );
};

export default Feed;
