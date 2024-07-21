// store/commentsSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from '../axiosConfig';

interface Comment {
  id: number;
  user_id: number;
  content: string;
}

interface CommentsState {
  comments: Comment[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CommentsState = {
  comments: [],
  status: 'idle',
  error: null,
};

export const fetchComments = createAsyncThunk('comments/fetchComments', async (postId: number) => {
  const response = await axios.get(`/api/comment/${postId}`, { withCredentials: true });
  return response.data as Comment[];
});

export const addComment = createAsyncThunk('comments/addComment', async (comment: { postId: number; userId: number; content: string }) => {
  const response = await axios.post('/api/comment/create', comment, { withCredentials: true });
  return response.data as Comment;
});

export const updateComment = createAsyncThunk('comments/updateComment', async (update: { postId: number; commentId: number; content: string }) => {
  const response = await axios.put(`/api/comment/update/${update.postId}/${update.commentId}`, { content: update.content }, { withCredentials: true });
  return response.data as Comment;
});

export const deleteComment = createAsyncThunk('comments/deleteComment', async (deleteInfo: { postId: number; commentId: number }) => {
  await axios.delete(`/api/comment/remove/${deleteInfo.postId}/${deleteInfo.commentId}`, { withCredentials: true });
  return deleteInfo.commentId;
});

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchComments.fulfilled, (state, action: PayloadAction<Comment[]>) => {
        state.status = 'succeeded';
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch comments';
      })
      .addCase(addComment.fulfilled, (state, action: PayloadAction<Comment>) => {
        state.comments.push(action.payload);
      })
      .addCase(updateComment.fulfilled, (state, action: PayloadAction<Comment>) => {
        const index = state.comments.findIndex(comment => comment.id === action.payload.id);
        if (index !== -1) {
          state.comments[index] = action.payload;
        }
      })
      .addCase(deleteComment.fulfilled, (state, action: PayloadAction<number>) => {
        state.comments = state.comments.filter(comment => comment.id !== action.payload);
      });
  },
});

export default commentsSlice.reducer;
