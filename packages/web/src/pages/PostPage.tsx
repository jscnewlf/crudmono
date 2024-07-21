import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';
import { useParams, useNavigate } from 'react-router-dom';

interface Comment {
  id: number;
  user_id: number;
  content: string;
}

interface Post {
  id: number;
  user_id: number;
  title: string;
  content: string;
  comments: Comment[];
}

const PostPage: React.FC = () => {
  const { idDoPost } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [newComment, setNewComment] = useState<string>('');
  const [editCommentId, setEditCommentId] = useState<number | null>(null);
  const [editCommentContent, setEditCommentContent] = useState<string>('');
  const [userId, setUserId] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    
    const fetchUserIdFromCookie = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/auth/me', { withCredentials: true });
        setUserId(response.data.id);
      } catch (error) {
        console.error('Error fetching user ID:', error);
        navigate('/login');
      }
    };

    fetchUserIdFromCookie();
  }, [navigate]);

  useEffect(() => {
    if (idDoPost && userId !== null) {
      axios.get(`http://localhost:3001/api/post/${idDoPost}`, { withCredentials: true })
        .then(response => {
          if (response.data.user_id !== userId) {
            navigate('/feed'); 
          } else {
            setPost(response.data);
          }
        })
        .catch(error => {
          console.error('Error fetching post:', error);
          navigate('/feed'); 
        });
    }
  }, [idDoPost, userId, navigate]);

  const handleAddComment = () => {
    if (userId === null) return; 

    axios.post('http://localhost:3001/api/comment/create', {
      postId: post?.id,
      userId: userId,
      content: newComment,
    }, { withCredentials: true })
    .then(response => {
      setPost(prevPost => prevPost ? { ...prevPost, comments: [...prevPost.comments, response.data] } : null);
      setNewComment('');
    })
    .catch(error => console.error('Error adding comment:', error));
  };

  const handleUpdateComment = (commentId: number) => {
    if (!post) return;
    axios.put(`http://localhost:3001/api/comment/update/${post.id}/${commentId}`, {
      content: editCommentContent,
    }, { withCredentials: true })
    .then(() => {
      setPost(prevPost => prevPost ? {
        ...prevPost,
        comments: prevPost.comments.map(comment =>
          comment.id === commentId ? { ...comment, content: editCommentContent } : comment
        ),
      } : null);
      setEditCommentId(null);
      setEditCommentContent('');
    })
    .catch(error => console.error('Error updating comment:', error));
  };

  const handleRemoveComment = (commentId: number) => {
    if (!post) return; 

    axios.delete(`http://localhost:3001/api/comment/remove/${post.id}/${commentId}`, { withCredentials: true })
      .then(() => {
        setPost(prevPost => prevPost ? {
          ...prevPost,
          comments: prevPost.comments.filter(comment => comment.id !== commentId),
        } : null);
      })
      .catch(error => console.error('Error removing comment:', error));
  };

  return (
    <div>
      <div className='customized-bg before:h-6 before:top-16 before:shadow-md before:z-[2] small-animated'></div>
      <div className="flex items-center justify-center h-screen relative z-1 flex-col w-full  sm:w-11/12 ">
      {post ? (
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-3xl font-bold mb-4 text-darkblue-800">{post.title}</h2>
          <p className=" mb-6 text-grayish-800">{post.content}</p>

          <div className="mt-20 border-t-2 border-grayish-200 pt-4 max-w-md">
            <h2 className="text-sm font-semibold mb-2 text-darkblue-400">Comentários</h2>
            {post.comments.length === 0 && (
              <p className="text-darkblue-200">Não há comentários. Adicione um comentário abaixo.</p>
            )}
            {post.comments.map(comment => (
              <div key={comment.id} className="bg-gray-100 p-4 rounded-lg mb-4 shadow-sm flex flex-col">
                <div className="text-gray-800 mb-2">{comment.content}</div>
                <div className="flex gap-2 justify-end mt-4">
                  {comment.user_id === userId && (
                    <>
                      <button
                        className="bg-darkblue-200 text-white rounded hover:bg-opacity-80 px-4 py-1 text-xs"
                        onClick={() => { setEditCommentId(comment.id); setEditCommentContent(comment.content); }}
                      >
                        Editar
                      </button>
                      <button
                        className="bg-grayish-800 text-white rounded hover:bg-opacity-80 px-4 py-1 text-xs "
                        onClick={() => handleRemoveComment(comment.id)}
                      >
                        Excluir
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
            <div className="mt-6">
              {editCommentId === null ? (
                <div>
                  <textarea
                    className="border border-gray-300 rounded-lg p-2 w-full mb-2"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Escreva seu comentário"
                  />
                  <button
                    className="bg-darkblue-200 text-white px-4 py-2 rounded hover:bg-opacity-80"
                    onClick={handleAddComment}
                  >
                    Adicionar Comentário
                  </button>
                </div>
              ) : (
                <div>
                  <textarea
                    className="border border-gray-300 rounded-lg p-2 w-full mb-2"
                    value={editCommentContent}
                    onChange={(e) => setEditCommentContent(e.target.value)}
                    placeholder="Edite seu comentário"
                  />
                  <button
                    className="bg-darkblue-100 text-white px-4 py-2 rounded hover:bg-opacity-80"
                    onClick={() => handleUpdateComment(editCommentId)}
                  >
                    Atualizar Comentário
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-600">Carregando post...</p>
      )}
    </div>
    </div>
    
  );
};

export default PostPage;
