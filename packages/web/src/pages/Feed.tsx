import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { fetchPosts, addPost, deletePost, updatePost } from '../store/postsSlice';
import { useNavigate } from 'react-router-dom';
import { Post } from '../store/postsSlice'; // Certifique-se de importar o tipo correto

const Feed: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  
  const posts = useSelector((state: RootState) => state.posts.posts);
  const status = useSelector((state: RootState) => state.posts.status);
  const error = useSelector((state: RootState) => state.posts.error);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', content: '', user_id: 1, comments: [] });
  const [editPost, setEditPost] = useState<Post | null>(null);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPosts());
    }
  }, [dispatch, status]);

  const handleCreatePost = async () => {
    try {
      await dispatch(addPost(newPost)).unwrap();
      setNewPost({ title: '', content: '', user_id: 1, comments: [] });
      setShowCreateForm(false);
    } catch (err) {
      console.error('Failed to create post:', err);
    }
  };

  const handleDeletePost = async (id: number) => {
    try {
      await dispatch(deletePost(id)).unwrap();
    } catch (err) {
      console.error('Erro ao excluir post', err);
    }
  };

  const handleUpdatePost = async () => {
    try {
      if (editPost) {
        await dispatch(updatePost(editPost)).unwrap();
        setEditPost(null);
      }
    } catch (err) {
      console.error('Erro ao atualizar post', err);
    }
  };

  const handleEditPost = (post: Post) => {
    setEditPost(post);
  };

  return (
    <div>
      <div className='customized-bg before:h-6 before:top-16 before:shadow-md before:z-[2] small-animated'></div>
      <div className='flex items-center justify-center h-screen relative z-1 flex-col'>
        {status === 'loading' && <p>Carregando...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {status === 'succeeded' && posts.length === 0 && (
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
        {status === 'succeeded' && posts.length > 0 && (
          <div className='flex items-center justify-center h-screen relative z-1 flex-col w-full sm:w-11/12'>
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
                <div className="absolute right-0 top-2">
                  <button
                    className="mr-2 p-1 bg-darkblue-200 text-white rounded hover:bg-opacity-80 text-xs"
                    onClick={() => navigate(`/feed/post/${post.id}`)}
                  >
                    Ver Detalhes
                  </button>
                  <button
                    className="mr-2 p-1 bg-grayish-800 text-white rounded hover:bg-opacity-80 text-xs"
                    onClick={() => handleEditPost(post)}
                  >
                    Editar
                  </button>
                  <button
                    className="p-1 bg-red-600 text-white rounded hover:bg-opacity-80 text-xs"
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
                Criar
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
        {editPost && (
          <div className='fixed inset-0 flex items-center justify-center bg-[#0000002e]'>
            <div className="mt-4 p-4 border border-gray-100 rounded shadow-2xl max-w-md bg-white">
              <h2 className="text-xl font-semibold text-darkblue-800 mb-4">Editar Post</h2>
              <input
                type="text"
                placeholder="Título"
                className="w-full p-2 border border-gray-300 rounded mb-2"
                value={editPost.title}
                onChange={e => setEditPost({ ...editPost, title: e.target.value })}
              />
              <textarea
                placeholder="Conteúdo"
                className="w-full p-2 border border-gray-300 rounded mb-2"
                rows={4}
                value={editPost.content}
                onChange={e => setEditPost({ ...editPost, content: e.target.value })}
              />
              <button
                className="mr-2 p-2 bg-darkblue-200 text-white rounded hover:bg-opacity-80"
                onClick={handleUpdatePost}
              >
                Atualizar
              </button>
              <button
                className="p-2 bg-grayish-800 text-white rounded hover:bg-opacity-80"
                onClick={() => setEditPost(null)}
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
