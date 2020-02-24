import axios from 'axios';

let initialState = {
    user: {},
    loading: false,
    loggedIn: false
};

const SET_USER = 'SET_USER'
const GET_SESSION = 'GET_SESSION'

export function setUser(user){
    return {
        type: SET_USER,
        payload: user
    }
}
export function getSession(){
    let user = axios.get('/auth/userSession')
    .then(res => res)
    console.log(user)
        return {
            type: GET_SESSION,
            payload: user.data
    }
}

export default function reducer( state = initialState, action){
    console.log("reducer",action)
    switch(action.type){
        case SET_USER:  
            return {user: action.payload, loggedIn: true}
        case GET_SESSION + '_PENDING':
            return {...state, loading: true}
        case GET_SESSION + '_FULLFILLED':
            return {user: action.payload, loading: false}
        case GET_SESSION + '_REJECTED':
            return {...state, loading: true}
        default:
            return state
    }
}