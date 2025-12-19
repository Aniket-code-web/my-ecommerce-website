import axios from "axios";
import { api ,API_BASE_URL} from "../../config/apiConfig";
import { CREATE_ORDER_FAILURE, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, GET_ORDER_BY_ID_FAILURE, GET_ORDER_BY_ID_REQUEST, GET_ORDER_BY_ID_SUCCESS, GET_USER_ORDERS_REQUEST,
  GET_USER_ORDERS_SUCCESS,
  GET_USER_ORDERS_FAILURE, } from "./ActionType";

export const createOrder = (reqData) => async (dispatch) => {
  dispatch({ type: CREATE_ORDER_REQUEST });

  try {
 
    const { data } = await api.post(
      `/api/orders/`,
      reqData.address,  
    );

    if(data.id){
        reqData.navigate({search:`step=3&order_id=${data.id}`});
    }

    dispatch({
      type: CREATE_ORDER_SUCCESS,
      payload: data,
    });

    console.log("Order created successfully: ", data);

  } catch (error) {
    console.log("Order creation error: ", error);

    dispatch({
      type: CREATE_ORDER_FAILURE,
      payload: error.message,
    });
  }
};

export const getOrderById = (orderId) => async (dispatch) => {
  dispatch({ type: GET_ORDER_BY_ID_REQUEST });

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  };

  try {
    const { data } = await api.get(`/api/orders/${orderId}`, config);

    dispatch({
      type: GET_ORDER_BY_ID_SUCCESS,
      payload: data,
    });

    console.log("Order fetched successfully:", data);

  } catch (error) {
    console.log("Get order error:", error);

    dispatch({
      type: GET_ORDER_BY_ID_FAILURE,
      payload: error.message,
    });
  }
};
export const getUserOrders = () => async (dispatch) => {
  dispatch({ type: GET_USER_ORDERS_REQUEST });

  try {
    // api instance already sends Authorization header
    const { data } = await api.get(`/api/orders/my`);

    dispatch({
      type: GET_USER_ORDERS_SUCCESS,
      payload: data,
    });

    console.log("User orders fetched successfully:", data);
  } catch (error) {
    console.log("Error fetching user orders:", error);

    dispatch({
      type: GET_USER_ORDERS_FAILURE,
      payload: error?.response?.data?.message || error.message,
    });
  }
};
export const cancelOrder = (orderId) => async (dispatch) => {
  try {
    await api.put(`/api/orders/${orderId}/cancel`);
    dispatch(getUserOrders());
  } catch (error) {
    console.log("Cancel order error:", error);
  }
};


export const returnOrder = (orderId) => async (dispatch) => {
  try {
    await api.put(`/api/orders/${orderId}/return`);
    dispatch(getUserOrders());
  } catch (error) {
    console.log("Return order error:", error);
  }
};

