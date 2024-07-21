import axios from '../axiosConfig';
import { Dispatch } from 'redux';
import { FETCH_POSTS_SUCCESS, FETCH_POSTS_FAILURE, CREATE_POST_SUCCESS, DELETE_POST_SUCCESS, UPDATE_POST_SUCCESS, PostActionTypes, Post } from './types';

export const fetchPosts = () => async (dispatch: Dispatch<PostActionTypes>) => {
    try {
        const response = await axios.get('/api/post/user/posts', { withCredentials: true });
        dispatch({
            type: FETCH_POSTS_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: FETCH_POSTS_FAILURE,
            payload: 'Erro ao carregar posts',
        });
    }
};

export const createPost = (newPost: Post) => async (dispatch: Dispatch<PostActionTypes>) => {
    try {
        const response = await axios.post('/api/post/create', newPost, { withCredentials: true });
        dispatch({
            type: CREATE_POST_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        // Handle error appropriately
    }
};

export const deletePost = (id: number) => async (dispatch: Dispatch<PostActionTypes>) => {
    try {
        await axios.delete(`/api/post/remove/${id}`, { withCredentials: true });
        dispatch({
            type: DELETE_POST_SUCCESS,
            payload: id,
        });
    } catch (error) {
        // Handle error appropriately
    }
};

export const updatePost = (updatedPost: Post) => async (dispatch: Dispatch<PostActionTypes>) => {
    try {
        const response = await axios.put(`/api/post/update/${updatedPost.id}`, updatedPost, { withCredentials: true });
        dispatch({
            type: UPDATE_POST_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        // Handle error appropriately
    }
};
