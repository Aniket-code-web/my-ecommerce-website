import { api } from "../../config/apiConfig";
import {
  CREATE_PAYMENT_REQUEST,
  CREATE_PAYMENT_FAILURE,
  UPDATE_PAYMENT_REQUEST,
  UPDATE_PAYMENT_FAILURE,
} from "./ActionType";

export const createPayment = (orderId) => async (dispatch) => {
  dispatch({ type: CREATE_PAYMENT_REQUEST });

  try {
    const jwt = localStorage.getItem("jwt");

    const res = await api.post(
      `/api/payments/${orderId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    const paymentUrl = res.data.payment_link_url;

    if (!paymentUrl) {
      throw new Error("Payment link not received");
    }

    // ✅ Redirect to Razorpay
    window.location.href = paymentUrl;

  } catch (error) {
    console.error("Payment error:", error);
    dispatch({
      type: CREATE_PAYMENT_FAILURE,
      payload: error?.response?.data?.message || error.message,
    });

    alert("Payment failed. Please try again.");
  }
};

export const updatePayment = (reqData) => async (dispatch) => {
  dispatch({ type: UPDATE_PAYMENT_REQUEST });

  try {
    await api.get(
      `/api/payments?razorpay_payment_id=${reqData.paymentId}&order_id=${reqData.orderId}`
    );
  } catch (error) {
    dispatch({
      type: UPDATE_PAYMENT_FAILURE,
      payload: error?.response?.data?.message || error.message,
    });
  }
};
