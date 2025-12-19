import React from "react";
import { Button, IconButton } from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { removeCartItem, updateCartItem } from "../../State/Cart/Action";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  // ----------------------------
  //  REMOVE ITEM
  // ----------------------------
  const handleRemove = () => {
    dispatch(removeCartItem(item?.id));
  };

  // ----------------------------
  //  INCREASE QUANTITY
  // ----------------------------
  const increaseQty = () => {
    if (!item) return;
    dispatch(updateCartItem(item.id, { quantity: item.quantity + 1 }));
  };

  // ----------------------------
  //  DECREASE QUANTITY
  // ----------------------------
  const decreaseQty = () => {
    if (!item || item.quantity === 1) return;

    dispatch(updateCartItem(item.id, { quantity: item.quantity - 1 }));
  };

  if (!item) return null; // Prevent crash on first render

  return (
    <div className="p-5 shadow-lg border rounded-md mt-5">
      <div className="flex items-center">
        <div className="w-[5rem] h-[5rem] lg:w-[9rem] lg:h-[9rem]">
          <img
            className="w-full h-full object-cover object-top"
            src={item?.product?.imageUrl}
            alt={item?.product?.title}
          />
        </div>

        <div className="ml-5 space-y-1">
          <p className="font-semibold">{item?.product?.title}</p>

          <p className="opacity-70">Size: {item?.size}</p>

          <p className="opacity-70 mt-2">Seller: Your Store</p>

          <div className="flex space-x-5 items-center text-gray-900 mt-6">
            <p className="font-semibold">₹{item?.discountedPrice}</p>
            <p className="opacity-50 line-through">₹{item?.price}</p>
            <p className="text-green-600 font-semibold">
              {item?.price
                ? Math.round(
                    ((item.price - item.discountedPrice) / item.price) * 100
                  )
                : 0}
              % Off
            </p>
          </div>
        </div>
      </div>

      <div className="lg:flex items-center lg:space-x-10 pt-4">
        {/* Quantity Buttons */}
        <div className="flex items-center space-x-2">
          <IconButton onClick={decreaseQty}>
            <RemoveCircleOutlineIcon />
          </IconButton>

          <span className="py-1 px-7 border rounded-sm">{item?.quantity}</span>

          <IconButton onClick={increaseQty}>
            <AddCircleOutlineIcon />
          </IconButton>
        </div>

        {/* Remove Button */}
        <div>
          <Button color="error" startIcon={<DeleteIcon />} onClick={handleRemove}>
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
