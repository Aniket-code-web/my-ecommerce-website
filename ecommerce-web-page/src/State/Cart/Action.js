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
import { api } from "../../config/apiConfig";

// ---------- GET CART ----------
export const getCart = () => async (dispatch) => {
  dispatch({ type: GET_CART_REQUEST });

  try {
    const { data } = await api.get("/api/cart/");   // backend: @GetMapping("/")
    console.log("CART FROM API:", data);
    dispatch({ type: GET_CART_SUCCESS, payload: data });
  } catch (error) {
    console.error("GET CART ERROR:", error);
    dispatch({
      type: GET_CART_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// ---------- ADD ITEM TO CART ----------
export const addItemToCart = (reqData) => async (dispatch) => {
  dispatch({ type: ADD_ITEM_TO_CART_REQUEST });

  try {
    const { data } = await api.put("/api/cart/add", reqData);
    console.log("ADD ITEM TO CART:", data);
    dispatch({ type: ADD_ITEM_TO_CART_SUCCESS, payload: data });

    // after adding, reload the cart so UI is fresh
    dispatch(getCart());
  } catch (error) {
    console.error("ADD ITEM ERROR:", error);
    dispatch({
      type: ADD_ITEM_TO_CART_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// ---------- REMOVE CART ITEM ----------
export const removeCartItem = (cartItemId) => async (dispatch) => {

  // remove instantly
  dispatch({ type: REMOVE_CART_ITEM_SUCCESS, payload: cartItemId });

  try {
    await api.delete(`/api/cart_items/${cartItemId}`);
    dispatch(getCart()); // optional
  } catch (error) {
    console.log("REMOVE ERROR:", error);
  }
};


// ---------- UPDATE CART ITEM (quantity, etc.) ----------
export const updateCartItem = (cartItemId, body) => async (dispatch, getState) => {
  // Instant UI update (Optimistic Update)
  dispatch({
    type: UPDATE_CART_ITEM_SUCCESS,
    payload: { id: cartItemId, ...body }
  });

  // Now sync with backend (without blocking UI)
  try {
    await api.put(`/api/cart_items/${cartItemId}`, body);
    dispatch(getCart());   // optional: refresh but UI already updated
  } catch (error) {
    console.log("UPDATE ERROR:", error);

    // (Optional) rollback if backend fails
    // dispatch(getCart());
  }
};

