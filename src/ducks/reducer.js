import axios from 'axios'

const initialState={
    user:{},
    posts:[{}]
}

const GET_USER_DATA = 'GET_USER_DATA';
const GET_POSTS_DATA = 'GET_POSTS_DATA';

export function getUser(){
    let userData = axios.get('/auth/user').then(res=>res.data);
    return {
        type: GET_USER_DATA,
        payload: userData
    }
}

export function getPosts(){
    let postsData = axios.get('/api/posts').then(res=>res.data);
    return {
        type: GET_POSTS_DATA,
        payload: postsData
    }
}

export default function reducer(state = initialState, action){
    switch (action.type) {
        case GET_USER_DATA + '_FULFILLED': 
            return Object.assign({}, state, {user: action.payload});
        case GET_POSTS_DATA + '_FULFILLED': 
            return Object.assign({}, state, {posts: action.payload});
        default:
            return state;
    }
}