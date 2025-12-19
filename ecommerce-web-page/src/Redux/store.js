import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import customerProductReducer from "../State/Product/Reducer";
import cartReducer from "../State/Cart/Reducer";
import { orderReducer } from "../State/Order/Reducer";
import { authReducer } from "../State/Auth/Reducer";
import adminOrderReducer from "../State/Admin/Order/Reducer";
import { userOrderReducer } from "../State/UserOrder/Reducer";

const rootReducers = combineReducers({
  auth: authReducer,
  product: customerProductReducer,
  cart: cartReducer,
  order: orderReducer,
  adminOrder:adminOrderReducer,
  userOrders: userOrderReducer,
});

export const store = legacy_createStore(
  rootReducers,
  applyMiddleware(thunk)
);
