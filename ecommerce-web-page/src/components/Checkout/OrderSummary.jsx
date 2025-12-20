import React, { useEffect } from "react";
import AddressCard from "../AddressCard/AddressCard";
import { Button } from "@mui/material";
import CartItem from "../Cart/CartItem";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getOrderById } from "../../State/Order/Action";
import { createPayment } from "../../State/Payment/Action";

const OrdersSummary = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  // ACCESS THE REDUX STATE SAFELY
  const orderState = useSelector((state) => state.order);
  const order = orderState?.order; // FIXED

  // Extract order_id from URL
  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get("order_id");

  // Fetch order by ID
  useEffect(() => {
    if (orderId) {
      dispatch(getOrderById(orderId));
    }
  }, [orderId, dispatch]);

  // Handle checkout
 const handleCheckout = () => {
  dispatch(createPayment(orderId));
};


  // Show loading state
  if (!order) {
    return (
      <h2 className="text-center mt-10 text-xl">Loading your order...</h2>
    );
  }

  return (
    <div>
      <div className="p-5 shadow-lg rounded-s-md border">
        <AddressCard address={order.shippingAddress} />
      </div>

      <div>
        <div className="lg:grid grid-cols-3 lg:px-16 relative border-transparent mt-5">
          {/* LEFT */}
          <div className="col-span-2 mb-5 border-transparent">
            {order.orderItems?.map((item, index) => (
              <CartItem key={index} item={item} />
            ))}
          </div>

          {/* RIGHT */}
          <div className="px-5 sticky top-0 h-[100vh] mt-5 lg:mt-3">
            <div className="border-transparent">
              <p className="uppercase font-bold opacity-60 pb-4">
                Price details
              </p>
              <hr />

              <div className="space-y-3 font-semibold mb-10">
                <div className="flex justify-between pt-3 text-black">
                  <span>Price</span>
                  <span>₹{order.totalPrice}</span>
                </div>
                <div className="flex justify-between pt-3">
                  <span>Discount</span>
                  <span className="text-green-600">-₹{order.discount}</span>
                </div>
                <div className="flex justify-between pt-3">
                  <span>Delivery Charge</span>
                  <span className="text-green-600">Free</span>
                </div>

                <div className="flex justify-between pt-3 font-bold">
                  <span>Total Amount</span>
                  <span className="text-green-600">
                    ₹{order.totalDiscountedPrice}
                  </span>
                </div>
              </div>

              <Button
                variant="contained"
                className="w-full mt-5"
                sx={{ px: "2.5rem", py: "1rem", bgcolor: "#9155fd" }}
                onClick={handleCheckout}
              >
                Checkout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersSummary;
