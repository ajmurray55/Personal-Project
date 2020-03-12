import axios from 'axios';

let initialState = {
    user: {},
    loading: false,
    loggedIn: false,
    cart: ''
    
};

const SET_USER = 'SET_USER'
const GET_SESSION = 'GET_SESSION'
const LOGOUT = 'LOGOUT'
const CART = 'CART'

export function setUser(user){
    return {
        type: SET_USER,
        payload: user
    }
}
export function getSession(){
    // let user = axios.get('/auth/user_session')
    // .then(res => res)
    // console.log(user)
        return {
            type: GET_SESSION,
            payload: axios.get('/auth/user_session')
            .then(res => res.data)
    }
}

export function logout(){
    axios.get('/auth/logout')
        return {
            type: LOGOUT,

        }
}

export function myCart(cart){
    // console.log('reducer cart', cart)
    return {
        type: CART,
        payload: cart
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
            return {user: action.payload, loading: false, loggedIn: true}
        case GET_SESSION + '_REJECTED':
            return {...state, loading: false, loggedIn: false}
        case LOGOUT:
            return {...state, loggedIn: false}
        case CART:
            return {...state, cart: action.payload}
        default:
            return state
    }
}