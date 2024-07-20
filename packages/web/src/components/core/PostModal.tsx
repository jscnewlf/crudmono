import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Post {
  id: number;
  title: string;
  content: string;
  authorId: number;
}

interface PostModalProps {
  post: Post | null;
  onClose: () => void;
  onPostUpdated: () => void;
}

const PostModal: React.FC<PostModalProps> = ({ post, onClose, onPostUpdated }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
    } else {
      setTitle('');
      setContent('');
    }
  }, [post]);

  const handleSave = async () => {
    try {
      if (post) {
        await axios.put(`http://localhost:3001/api/post/update/${post.id}`, { title, content }, { withCredentials: true });
      } else {
        await axios.post('http://localhost:3001/api/post/create', { title, content }, { withCredentials: true });
      }
      onPostUpdated();
      onClose();
    } catch (error) {
      console.error('Erro ao salvar post:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded w-1/2">
        <h2 className="text-xl font-bold mb-4">{post ? 'Edit Post' : 'Create Post'}</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        />
        <div className="flex justify-end">
          <button onClick={onClose} className="bg-gray-500 text-white py-2 px-4 rounded mr-2">
            Cancel
          </button>
          <button onClick={handleSave} className="bg-blue-500 text-white py-2 px-4 rounded">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostModal;
