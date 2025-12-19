import { api } from "../../config/apiConfig";
import {
  GET_USER_ORDERS_REQUEST,
  GET_USER_ORDERS_SUCCESS,
  GET_USER_ORDERS_FAILURE,
} from "./ActionType";

export const getUserOrders = () => async (dispatch) => {
  dispatch({ type: GET_USER_ORDERS_REQUEST });

  try {
    const { data } = await api.get("/api/orders/my");
    dispatch({ type: GET_USER_ORDERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_USER_ORDERS_FAILURE,
      payload: error?.response?.data?.message || "Failed to fetch orders",
    });
  }
};
