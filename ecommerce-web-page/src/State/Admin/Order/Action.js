
import { api } from "../../../config/apiConfig";
import {
  CANCELED_ORDER_FAILURE, CANCELED_ORDER_REQUEST, CANCELED_ORDER_SUCCESS,
  CONFIRMED_ORDER_FAILURE, CONFIRMED_ORDER_REQUEST, CONFIRMED_ORDER_SUCCESS,
  DELETE_ORDER_FAILURE, DELETE_ORDER_REQUEST, DELETE_ORDER_SUCCESS,
  DELIVERED_ORDER_FAILURE, DELIVERED_ORDER_REQUEST, DELIVERED_ORDER_SUCCESS,
  GET_ORDERS_FAILURE, GET_ORDERS_REQUEST, GET_ORDERS_SUCCESS,
  SHIP_ORDER_FAILURE, SHIP_ORDER_REQUEST, SHIP_ORDER_SUCCESS
} from "./ActionType";

export const getOrders = () => {
  return async (dispatch) => {
    dispatch({ type: GET_ORDERS_REQUEST });

    try {
      const response = await api.get(`/api/admin/orders/`);
      console.log("get all orders ", response.data);

      dispatch({
        type: GET_ORDERS_SUCCESS,
        payload: response.data,
      });

    } catch (error) {
      dispatch({
        type: GET_ORDERS_FAILURE,
        payload: error.message,
      });
    }
  };
};
export const confirmOrder = (orderId) => async (dispatch) => {
  dispatch({ type: CONFIRMED_ORDER_REQUEST });

  try {
    const response = await api.put(`/api/admin/orders/${orderId}/confirmed`);
    dispatch({
      type: CONFIRMED_ORDER_SUCCESS,
      payload: response.data,
    });

    // 🔥 refresh orders so status changes in UI
    dispatch(getOrders());

  } catch (error) {
    dispatch({
      type: CONFIRMED_ORDER_FAILURE,
      payload: error.message,
    });
  }
};


export const shipOrder = (orderId) => {
  return async (dispatch) => {
    dispatch({ type: SHIP_ORDER_REQUEST });

    try {
      const { data } = await api.put(`/api/admin/orders/${orderId}/ship`);
      dispatch({
        type: SHIP_ORDER_SUCCESS,
        payload: data,
      });

      // 🔥 refresh
      dispatch(getOrders());

    } catch (error) {
      dispatch({
        type: SHIP_ORDER_FAILURE,
        payload: error.message,
      });
    }
  };
};


export const deliveredOrder = (orderId) => async (dispatch) => {
  dispatch({ type: DELIVERED_ORDER_REQUEST });

  try {
    const response = await api.put(`/api/admin/orders/${orderId}/deliver`);
    dispatch({
      type: DELIVERED_ORDER_SUCCESS,
      payload: response.data,
    });

    // 🔥 refresh
    dispatch(getOrders());

  } catch (error) {
    dispatch({
      type: DELIVERED_ORDER_FAILURE,
      payload: error.message,
    });
  }
};


export const cancelOrder = (orderId) => async (dispatch) => {
  dispatch({ type: CANCELED_ORDER_REQUEST });

  try {
    const response = await api.put(`/api/admin/orders/${orderId}/cancel`);
    dispatch({
      type: CANCELED_ORDER_SUCCESS,
      payload: response.data,
    });

  } catch (error) {
    dispatch({
      type: CANCELED_ORDER_FAILURE,
      payload: error.message,
    });
  }
};

export const deleteOrder = (orderId) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_ORDER_REQUEST });

    try {
      await api.delete(`/api/admin/orders/${orderId}/delete`);
      dispatch({
        type: DELETE_ORDER_SUCCESS,
        payload: orderId,
      });

    } catch (error) {
      dispatch({
        type: DELETE_ORDER_FAILURE,
        payload: error.message,
      });
    }

  };
};
