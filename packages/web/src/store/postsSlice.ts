import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from '../axiosConfig';

interface Comment {
    postId: number;
    id: number;
    user_id: number;
    content: string;
  }
  
  export interface Post {
    id: number;
    user_id: number;
    title: string;
    content: string;
    comments: Comment[];
  }

interface PostsState {
  posts: Post[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: PostsState = {
  posts: [],
  status: 'idle',
  error: null,
};

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await axios.get('/api/post/user/posts', { withCredentials: true });
  return response.data as Post[];
});

export const addPost = createAsyncThunk('posts/addPost', async (newPost: Omit<Post, 'id'>) => {
  const response = await axios.post('/api/post/create', newPost, { withCredentials: true });
  return response.data as Post;
});

export const deletePost = createAsyncThunk('posts/deletePost', async (id: number) => {
  await axios.delete(`/api/post/remove/${id}`, { withCredentials: true });
  return id;
});

export const updatePost = createAsyncThunk('posts/updatePost', async (post: Post) => {
  const response = await axios.put(`/api/post/update/${post.id}`, post, { withCredentials: true });
  return response.data as Post;
});

export const addComment = createAsyncThunk('posts/addComment', async (payload: { postId: number; userId: number; content: string }) => {
    const response = await axios.post('/api/comment/create', payload, { withCredentials: true });
    return response.data as Comment;
  });

  const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchPosts.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
          state.status = 'succeeded';
          state.posts = action.payload;
        })
        .addCase(fetchPosts.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message || 'Failed to fetch posts';
        })
        .addCase(addPost.fulfilled, (state, action: PayloadAction<Post>) => {
          state.posts.push(action.payload);
        })
        .addCase(deletePost.fulfilled, (state, action: PayloadAction<number>) => {
          state.posts = state.posts.filter(post => post.id !== action.payload);
        })
        .addCase(updatePost.fulfilled, (state, action: PayloadAction<Post>) => {
          const index = state.posts.findIndex(post => post.id === action.payload.id);
          if (index !== -1) {
            state.posts[index] = action.payload;
          }
        })
        .addCase(addComment.fulfilled, (state, action: PayloadAction<Comment>) => {
          const post = state.posts.find(p => p.id === action.payload.postId);
          if (post) {
            post.comments.push(action.payload);
          }
        });
    },
  });
  
  export default postsSlice.reducer;