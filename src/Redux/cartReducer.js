import axios from 'axios'

const initialState = {
    carts: [],
    isLoading: false,
    isError: false,
    errorMessage: ''
}

const GET_CARTS = 'GET_CARTS'
const ADD_CARTS = 'ADD_CARTS'
const REMOVE_CARTS = 'REMOVE_CARTS'

export function getCarts() {
    return {
        type: GET_CARTS,
        payloads: axios.get('/api/carts/')
    }
}

export function addCarts(obj) {
    return {
        type: ADD_CARTS,
        payloads: [...obj]
    }
}

export function removeCarts(obj) {
    return {
        type: REMOVE_CARTS,
        payloads: axios.delete()
    }
}

export default function cartReducer(state = initialState, action) {
    const { type } = action
    switch(type) {
        case GET_CARTS + '_PENDING':
            return {...state, isLoading: true, isError: false}
        case GET_CARTS + '_FULFILLED':
            return {...state, carts: action.payloads, isLoading: false, isError: false, errorMessage: ''}
        case GET_CARTS + '_REJECTED': 
            return {...state, isLoading: false, isEorro: true, errorMessage: 'cannot save carts'}
        case GET_CARTS:
                return {...state, carts: action.payloads}
        case ADD_CARTS:
                return {...state, carts: action.payloads}
        default:
            return state
    }
}