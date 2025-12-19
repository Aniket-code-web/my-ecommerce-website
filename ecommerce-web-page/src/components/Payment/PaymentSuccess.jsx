import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Alert, AlertTitle, Grid } from "@mui/material";
import OrderTracker from "../Order/OrderTracker";
import { updatePayment } from "../../State/Payment/Action";
import { getOrderById } from "../../State/Order/Action";
import AddressCard from "../AddressCard/AddressCard";

const PaymentSuccess = () => {
    const [paymentId, setPaymentId] = useState();
    const [referenceId, setReferenceId] = useState();
    const [paymentStatus, setPaymentStatus] = useState();
    const { id } = useParams();
    const orderId = id;


    const dispatch = useDispatch();
    const { order } = useSelector(state => state.order);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);

    setPaymentId(query.get("razorpay_payment_id"));      // correct
    setReferenceId(query.get("razorpay_payment_link_id"));
    setPaymentStatus(query.get("razorpay_payment_link_status"));
}, []);

  useEffect(() => {
    if (!orderId || !paymentId) return;

    const data = { orderId, paymentId };
    dispatch(updatePayment(data));
    dispatch(getOrderById(orderId));

}, [orderId, paymentId]);

    return (
        <div className="px-2 lg:px-36 mt-5">

            <div className="flex flex-col justify-center items-center">
                <Alert variant="filled" severity="success" sx={{ mb: 6 }}>
                    <AlertTitle>Payment Success</AlertTitle>
                    🎉 Congratulations! Your order has been placed.
                </Alert>
            </div>

            <OrderTracker activeStep={2} />

            {order?.orderItems?.map((item, i) => (
                <Grid item xs={12} key={i} className="mt-10">
                    <div className="shadow-xl rounded-md p-5 flex justify-between">

                        <div className="flex gap-4">
                            <img
                                className="w-[6rem] h-[6rem] object-cover"
                                src={item.product.imageUrl}
                                alt=""
                            />
                            <div className="space-y-2">
                                <p className="font-semibold">{item.product.title}</p>
                                <p className="opacity-60 text-xs">
                                    Color: {item.color} | Size: {item.size}
                                </p>
                                <p>Seller: {item.product.brand}</p>
                                <p className="font-bold">₹ {item.discountedPrice}</p>
                            </div>
                        </div>

                        <div className="w-[250px]">
                            <AddressCard address={order?.shippingAddress} />
                        </div>

                    </div>
                </Grid>
            ))}

        </div>
    );

}

export default PaymentSuccess
