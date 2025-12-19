package com.aniket.service;

import com.aniket.exception.CartItemException;
import com.aniket.exception.UserException;
import com.aniket.model.Cart;
import com.aniket.model.CartItem;
import com.aniket.model.Product;

public interface CartItemService {
    public CartItem createCartItem(CartItem cartItem);

    public CartItem updateCartItem(Long userId,Long id,CartItem cartItem) throws CartItemException, UserException;

    public CartItem isCartItemExist(Cart cart, Product product, String size, Long userId);

    public void removeCartItem(Long userId,Long cartItemId)throws CartItemException,UserException;

    public CartItem findCartyItemById(Long cartItemId)throws CartItemException;
}
