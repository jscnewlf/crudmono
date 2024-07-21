import { PostActionTypes, PostState, FETCH_POSTS_SUCCESS, FETCH_POSTS_FAILURE, CREATE_POST_SUCCESS, DELETE_POST_SUCCESS, UPDATE_POST_SUCCESS } from '../actions/types';

const initialState: PostState = {
  posts: [],
};

export default function postReducer(state = initialState, action: PostActionTypes): PostState {
  switch (action.type) {
    case FETCH_POSTS_SUCCESS:
      return {
        ...state,
        posts: action.payload,
      };
    case FETCH_POSTS_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case CREATE_POST_SUCCESS:
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };
    case DELETE_POST_SUCCESS:
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.payload),
      };
    case UPDATE_POST_SUCCESS:
      return {
        ...state,
        posts: state.posts.map((post) => post.id === action.payload.id ? action.payload : post),
      };
    default:
      return state;
  }
}
