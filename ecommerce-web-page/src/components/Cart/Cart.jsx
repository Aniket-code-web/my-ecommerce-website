import React, { useEffect } from "react";
import CartItem from "./CartItem";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../State/Cart/Action";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // cart slice from redux
  const { cart, cartItems, loading, error } = useSelector(
    (store) => store.cart
  );

  const handleCheckout = () => {
    navigate("/checkout?step=2");
  };

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  // ---------- states ----------
  if (loading) {
    return (
      <div className="text-center py-10 text-lg">
        Loading Cart…
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-600 text-lg">
        Failed to load cart: {error}
      </div>
    );
  }

  const items = cart?.cartItems || cartItems || [];

  if (!items.length) {
    return (
      <div className="text-center py-10 text-lg">
        Your cart is empty.
      </div>
    );
  }

  const totalPrice = cart?.totalPrice ?? 0;
  const totalDiscountedPrice = cart?.totalDiscountedPrice ?? 0;
  const discount = cart?.discount ?? totalPrice - totalDiscountedPrice;

  return (
    <div>
      <div className="lg:grid grid-cols-3 lg:px-16 relative border-transparent">
        {/* ------------- LEFT: ITEMS ------------- */}
        <div className="col-span-2 mb-5 border-transparent">
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        {/* ------------- RIGHT: SUMMARY ------------- */}
        <div className="px-5 sticky top-0 h-[100vh] mt-5 lg:mt-5">
          <div className="border-transparent">
            <p className="uppercase font-bold opacity-60 pb-4">
              Price details
            </p>
            <hr />
            <div className="space-y-3 font-semibold mb-10">
              <div className="flex justify-between pt-3 text-black">
                <span>Price</span>
                <span>₹{totalPrice}</span>
              </div>
              <div className="flex justify-between pt-3 ">
                <span>Discount</span>
                <span className="text-green-600">-₹{discount}</span>
              </div>
              <div className="flex justify-between pt-3 ">
                <span>Delivery Charge</span>
                <span className="text-green-600">Free</span>
              </div>

              <div className="flex justify-between pt-3 font-bold">
                <span>Total Amount</span>
                <span className="text-green-600">
                  ₹{totalDiscountedPrice}
                </span>
              </div>
            </div>
            <Button
              onClick={handleCheckout}
              variant="contained"
              className="w-full mt-5"
              sx={{ px: "2.5rem", py: "1rem", bgcolor: "#9155fd" }}
            >
              Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
