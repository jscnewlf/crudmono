export interface Post {
    id: number;
    title: string;
    content: string;
  }
  
  export interface PostState {
    posts: Post[];
    error?: string;
  }
  
  export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
  export const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE';
  export const CREATE_POST_SUCCESS = 'CREATE_POST_SUCCESS';
  export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS';
  export const UPDATE_POST_SUCCESS = 'UPDATE_POST_SUCCESS';
  
  interface FetchPostsSuccessAction {
    type: typeof FETCH_POSTS_SUCCESS;
    payload: Post[];
  }
  
  interface FetchPostsFailureAction {
    type: typeof FETCH_POSTS_FAILURE;
    payload: string;
  }
  
  interface CreatePostSuccessAction {
    type: typeof CREATE_POST_SUCCESS;
    payload: Post;
  }
  
  interface DeletePostSuccessAction {
    type: typeof DELETE_POST_SUCCESS;
    payload: number;
  }
  
  interface UpdatePostSuccessAction {
    type: typeof UPDATE_POST_SUCCESS;
    payload: Post;
  }
  
  export type PostActionTypes =
    | FetchPostsSuccessAction
    | FetchPostsFailureAction
    | CreatePostSuccessAction
    | DeletePostSuccessAction
    | UpdatePostSuccessAction;