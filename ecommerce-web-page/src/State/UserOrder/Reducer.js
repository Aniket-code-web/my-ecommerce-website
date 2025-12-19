import {
  GET_USER_ORDERS_REQUEST,
  GET_USER_ORDERS_SUCCESS,
  GET_USER_ORDERS_FAILURE,
} from "./ActionType";

const initialState = {
  loading: false,
  orders: [],
  error: null,
};

export const userOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_ORDERS_REQUEST:
      return { ...state, loading: true };

    case GET_USER_ORDERS_SUCCESS:
      return { ...state, loading: false, orders: action.payload };

    case GET_USER_ORDERS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
