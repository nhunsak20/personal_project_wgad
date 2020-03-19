import axios from "axios";

const initialState = {
  carts: [],
  isLoading: false,
  isError: false,
  errorMessage: ""
};

const GET_CARTS = "GET_CARTS",
  ADD_CARTS = "ADD_CARTS",
  UPDATE_CART = "UPDATE_CART",
  REMOVE_ONE_CART = "REMOVE_ONE_CART",
  REMOVE_CARTS = "REMOVE_CARTS",
  CLEAR_CARTS = "CLEAR_CARTS";

export function getCarts() {
  return {
    type: GET_CARTS,
    payload: axios.get("/api/shop/carts")
  };
}

export function addCarts(id, product_id, quantity) {
  return {
    type: ADD_CARTS,
    payload: axios.post("/api/shop/carts", { id, product_id, quantity })
  };
}

export function updateCart(product_id, quantity) {
  return {
    type: UPDATE_CART,
    payload: axios.post(`/api/shop/carts/product/${product_id}`, { quantity })
  };
}

export function removeOneCart(product_id) {
  return {
    type: REMOVE_ONE_CART,
    payload: axios.post(`/api/shop/carts/products/${product_id}`)
  };
}

export function removeCarts() {
  return {
    type: REMOVE_CARTS,
    payload: axios.post(`/api/shop/carts/clear`)
  };
}

export function clearCarts() {
  return {
    type: CLEAR_CARTS,
    payload: []
  }
}

export default function cartReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_CARTS + "_PENDING":
      return { ...state, isLoading: true, isError: false };
    case GET_CARTS + "_FULFILLED":
      return {
        ...state,
        carts: payload.data,
        isLoading: false,
        isError: false,
        errorMessage: ""
      };
    case GET_CARTS + "_REJECTED":
      return {
        ...state,
        isLoading: false,
        isEorro: true,
        errorMessage: "cannot get all carts"
      };
    case ADD_CARTS + "_PENDING":
      return { ...state, isLoading: true, isError: false };
    case ADD_CARTS + "_FULFILLED":
      return {
        ...state,
        carts: payload.data,
        isLoading: false,
        isError: false,
        errorMessage: ""
      };
    case ADD_CARTS + "_REJECTED":
      return {
        ...state,
        isLoading: false,
        isEorro: true,
        errorMessage: "cannot add carts"
      };
    case UPDATE_CART + "_PENDING":
      return { ...state, isLoading: true, isError: false };
    case UPDATE_CART + "_FULFILLED":
      return {
        ...state,
        carts: payload.data,
        isLoading: false,
        isError: false,
        errorMessage: ""
      };
    case UPDATE_CART + "_REJECTED":
      return {
        ...state,
        isLoading: false,
        isEorro: true,
        errorMessage: "cannot update carts"
      };
    case REMOVE_ONE_CART + "_PENDING":
      return { ...state, isLoading: true, isError: false };
    case REMOVE_ONE_CART + "_FULFILLED":
      return {
        ...state,
        carts: payload.data,
        isLoading: false,
        isError: false,
        errorMessage: ""
      };
    case REMOVE_ONE_CART + "_REJECTED":
      return {
        ...state,
        isLoading: false,
        isEorror: true,
        errorMessage: "cannot remove cart"
      };
    case REMOVE_CARTS + "_PENDING":
      return { ...state, isLoading: true, isError: false };
    case REMOVE_CARTS + "_FULFILLED":
      return {
        ...state,
        ...initialState
      };
    case REMOVE_CARTS + "_REJECTED":
      return {
        ...state,
        isLoading: false,
        isEorror: true,
        errorMessage: "cannot all remove carts"
      };
    case CLEAR_CARTS: 
      return {...state}
    default:
      return state;
  }
}
