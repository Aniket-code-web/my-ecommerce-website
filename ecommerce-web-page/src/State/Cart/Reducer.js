import {
  ADD_ITEM_TO_CART_FAILURE,
  ADD_ITEM_TO_CART_REQUEST,
  ADD_ITEM_TO_CART_SUCCESS,
  REMOVE_CART_ITEM_FAILURE,
  REMOVE_CART_ITEM_REQUEST,
  REMOVE_CART_ITEM_SUCCESS,
  UPDATE_CART_ITEM_FAILURE,
  UPDATE_CART_ITEM_REQUEST,
  UPDATE_CART_ITEM_SUCCESS,
  GET_CART_FAILURE,
  GET_CART_REQUEST,
  GET_CART_SUCCESS,
} from "./ActionType";

const initialState = {
  cart: null,
  cartItems: [],
  loading: false,  // only used for GET_CART
  error: null,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {

    // ---------------------------
    // ADD ITEM (NO LOADING HERE)
    // ---------------------------
    case ADD_ITEM_TO_CART_REQUEST:
      return { ...state }; // no loading—keeps UI smooth

    case ADD_ITEM_TO_CART_SUCCESS:
      return { ...state };

    case ADD_ITEM_TO_CART_FAILURE:
      return { ...state, error: action.payload };

    // ---------------------------
    // UPDATE ITEM (OPTIMISTIC UI)
    // ---------------------------
    case UPDATE_CART_ITEM_REQUEST:
      return { ...state }; // keep UI smooth

    case UPDATE_CART_ITEM_SUCCESS:
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };

    case UPDATE_CART_ITEM_FAILURE:
      return { ...state, error: action.payload };

    // ---------------------------
    // REMOVE ITEM (NO LOADING)
    // ---------------------------
    case REMOVE_CART_ITEM_REQUEST:
      return { ...state };

    case REMOVE_CART_ITEM_SUCCESS:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.id !== action.payload
        ),
      };

    case REMOVE_CART_ITEM_FAILURE:
      return { ...state, error: action.payload };

    // ---------------------------
    // GET CART (ONLY REAL LOADING)
    // ---------------------------
    case GET_CART_REQUEST:
      return { ...state, loading: true, error: null };

    case GET_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        cart: action.payload,
        cartItems: action.payload.cartItems || [],
      };

    case GET_CART_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default cartReducer;
