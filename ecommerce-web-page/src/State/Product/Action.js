import { api } from "../../config/apiConfig";
import {
  CREATE_PRODUCT_FAILURE,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILURE,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  FIND_PRODUCT_BY_ID_FAILURE,
  FIND_PRODUCT_BY_ID_REQUEST,
  FIND_PRODUCT_BY_ID_SUCCESS,
  FIND_PRODUCTS_FAILURE,
  FIND_PRODUCTS_REQUEST,
  FIND_PRODUCTS_SUCCESS,
} from "./ActionType";

export const findProducts = (reqData = {}) => async (dispatch) => {
  dispatch({ type: FIND_PRODUCTS_REQUEST });

  const params = {};

  if (reqData.category) params.category = reqData.category;
  if (reqData.minPrice != null) params.minPrice = reqData.minPrice;
  if (reqData.maxPrice != null) params.maxPrice = reqData.maxPrice;
  if (reqData.minDiscount != null) params.minDiscount = reqData.minDiscount;
  if (reqData.sort) params.sort = reqData.sort;
  if (reqData.stock) params.stock = reqData.stock;
  if (reqData.pageNumber != null) params.pageNumber = reqData.pageNumber;
  if (reqData.pageSize != null) params.pageSize = reqData.pageSize;

  if (Array.isArray(reqData.color) && reqData.color.length > 0) {
    params.color = reqData.color;
  }

  if (Array.isArray(reqData.size) && reqData.size.length > 0) {
    params.size = reqData.size;
  }

  try {
    const { data } = await api.get("/api/products", { params });
    dispatch({ type: FIND_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FIND_PRODUCTS_FAILURE, payload: error.message });
  }
};
export const findProductsByID = ({ productId }) => async (dispatch) => {
  try {
    dispatch({ type: FIND_PRODUCT_BY_ID_REQUEST });

    const res = await api.get(`/api/products/${productId}`);

    dispatch({
      type: FIND_PRODUCT_BY_ID_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: FIND_PRODUCT_BY_ID_FAILURE,
      payload: error.message,
    });
  }
};


export const createProduct = (product) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_PRODUCT_REQUEST });

    const { data } = await api.post("/api/admin/products/", product);

    dispatch({
      type: CREATE_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_PRODUCT_FAILURE,
      payload: error.message,
    });
  }
};

export const deleteProduct = (productId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST });

    await api.delete(`/api/admin/products/${productId}/delete`);

    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: productId,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAILURE,
      payload: error.message,
    });
  }
};
