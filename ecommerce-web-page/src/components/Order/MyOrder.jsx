import { Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrderCard from "./OrderCard";
import { getUserOrders } from "../../State/Order/Action";

const MyOrders = () => {
  const dispatch = useDispatch();
  const { orders, loading } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getUserOrders());
  }, [dispatch]);

  return (
    <div className="px-4 md:px-8 lg:px-16 py-6">
      <Typography variant="h5" fontWeight="bold" mb={3}>
        My Orders
      </Typography>

      {loading ? (
        <Typography>Loading your orders...</Typography>
      ) : orders?.length === 0 ? (
        <Typography>You haven&apos;t placed any orders yet.</Typography>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <div className="flex flex-col gap-4">
              {orders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default MyOrders;
