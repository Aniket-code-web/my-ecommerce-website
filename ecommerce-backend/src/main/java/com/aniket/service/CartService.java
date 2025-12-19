package com.aniket.service;

import com.aniket.exception.ProductException;
import com.aniket.model.Cart;
import com.aniket.model.User;
import com.aniket.request.AddItemRequest;

public interface CartService {

    public Cart createCart(User user);

    public String addCartItem(Long userId, AddItemRequest req) throws ProductException;

    public Cart findUserCart(Long userId);

}
