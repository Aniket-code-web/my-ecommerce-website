import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import AddressCard from "../AddressCard/AddressCard";
import OrderTracker from "./OrderTracker";
import { Grid, Box, Typography } from "@mui/material";
import { Star } from "@mui/icons-material";
import { deepPurple } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { getOrderById, cancelOrder, returnOrder } from "../../State/Order/Action";

const statusToStep = {
  PENDING: 0,
  PLACED: 1,
  CONFIRMED: 1,
  SHIPPED: 2,
  DELIVERED: 4,
  CANCELLED: 3,
};

const OrderDetails = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const { order, loading } = useSelector((state) => state.order);

  useEffect(() => {
    if (orderId) dispatch(getOrderById(orderId));
  }, [dispatch, orderId]);

  if (loading || !order) {
    return (
      <div className="px-5 lg:px-20 my-3">
        <Typography>Loading order details...</Typography>
      </div>
    );
  }

  const activeStep = statusToStep[order.orderStatus] ?? 0;

  return (
    <div className="px-5 lg:px-20 my-3">

      {/* ================= Delivery Address ================= */}
      <h1 className="font-bold text-xl py-7">Delivery Address</h1>
      <AddressCard address={order.shippingAddress} />

      {/* ================= Order Tracker ================= */}
      <div className="py-10">
        <OrderTracker activeStep={activeStep} />
      </div>

      {/* ================= ACTION BUTTONS (Cancel / Return) ================= */}
      <div className="flex gap-4 mb-8">

        {/* Cancel Button - Visible only if Pending or Placed */}
        {(order.orderStatus === "PENDING" || order.orderStatus === "PLACED") && (
          <button
            onClick={() => dispatch(cancelOrder(order.id))}
            className="px-5 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Cancel Order
          </button>
        )}

        {/* Return Button - Visible only if Delivered */}
        {order.orderStatus === "DELIVERED" && (
          <button
            onClick={() => dispatch(returnOrder(order.id))}
            className="px-5 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
          >
            Return Order
          </button>
        )}
      </div>

      {/* ================= Order Items ================= */}
      <Grid container spacing={3}>
        {order.orderItems?.map((item) => (
          <Grid
            key={item.id}
            item
            container
            className="shadow-md rounded-md p-4 border w-full bg-white"
            sx={{
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {/* Item Left Section */}
            <Grid item xs={12} md={6}>
              <div className="flex items-start gap-3">
                <img
                  className="w-[5rem] h-[5rem] object-cover object-top rounded-md"
                  src={
                    item.product?.imageUrl ||
                    "https://via.placeholder.com/80x80.png?text=Product"
                  }
                  alt={item.product?.title}
                />

                <div className="space-y-1 ml-2">
                  <p className="font-semibold text-gray-800 text-sm md:text-base">
                    {item.product?.title}
                  </p>

                  <p className="text-xs md:text-sm text-gray-600">
                    Brand:{" "}
                    <span className="font-medium text-gray-800">
                      {item.product?.brand}
                    </span>
                  </p>

                  <p className="flex flex-wrap gap-3 text-xs md:text-sm text-gray-600">
                    Size:
                    <span className="font-medium text-gray-800">
                      {item.size}
                    </span>
                    Color:
                    <span className="font-medium text-gray-800">
                      {item.product?.color}
                    </span>
                  </p>

                  <p className="text-sm text-gray-600">
                    Qty:{" "}
                    <span className="font-medium text-gray-800">
                      {item.quantity}
                    </span>
                  </p>

                  <p className="text-base font-semibold text-green-700">
                    ₹{item.discountedPrice}
                  </p>
                </div>
              </div>
            </Grid>

            {/* Rate & Review */}
            <Grid item xs={12} md={3}>
              <Box sx={{ color: deepPurple[500], textAlign: { xs: "left", md: "right" } }}>
                <Star sx={{ fontSize: "2rem" }} className="px-1" />
                <span className="text-sm">Rate &amp; Review</span>
              </Box>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default OrderDetails;
