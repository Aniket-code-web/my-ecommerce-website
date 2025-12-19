package com.aniket.service;

import com.aniket.exception.CartItemException;
import com.aniket.exception.UserException;
import com.aniket.model.Cart;
import com.aniket.model.CartItem;
import com.aniket.model.Product;
import com.aniket.model.User;
import com.aniket.repository.CartItemRepository;
import com.aniket.repository.CartRepository;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.Optional;

@Service
public class CartItemServiceImplementation implements CartItemService{

    private CartItemRepository cartItemRepository;
    private UserService userService;
    private CartRepository cartRepository;

    public CartItemServiceImplementation(CartItemRepository cartItemRepository,UserService userService,CartRepository cartRepository){
        this.cartRepository=cartRepository;
        this.userService=userService;
        this.cartItemRepository=cartItemRepository;
    }

    @Override
    public CartItem createCartItem(CartItem cartItem) {

        cartItem.setPrice(cartItem.getProduct().getPrice() * cartItem.getQuantity());
        cartItem.setDiscountedPrice(cartItem.getProduct().getDiscountedPrice() * cartItem.getQuantity());

        return cartItemRepository.save(cartItem);
    }


    @Override
    public CartItem updateCartItem(Long userId, Long id, CartItem cartItem) throws CartItemException, UserException {
        CartItem item = findCartyItemById(id);
        User user = userService.findUserById(item.getUserId());

        if(Objects.equals(user.getId(),userId)){
            item.setQuantity(cartItem.getQuantity());
            item.setPrice(item.getQuantity()*item.getProduct().getPrice());
            item.setDiscountedPrice(item.getProduct().getDiscountedPrice()* item.getQuantity());

        }
        return cartItemRepository.save(item);
    }

    @Override
    public CartItem isCartItemExist(Cart cart, Product product, String size, Long userId) {
        CartItem cartItem = cartItemRepository.isCartItemExist(cart,product,size,userId);

        return cartItem;
    }

    @Override
    public void removeCartItem(Long userId, Long cartItemId) throws CartItemException, UserException {
        CartItem cartItem = findCartyItemById(cartItemId);

        // If item does not exist, stop silently
        if(cartItem == null){
            return;  // <- SAFE DELETE: do not throw error
        }

        User user = userService.findUserById(cartItem.getUserId());
        User reqUser = userService.findUserById(userId);

        if(Objects.equals(reqUser.getId(), user.getId())){
            cartItemRepository.deleteById(cartItemId);
        } else {
            throw new UserException("you can't remove another users item");
        }
    }

    @Override
    public CartItem findCartyItemById(Long cartItemId) throws CartItemException {
        Optional<CartItem> opt = cartItemRepository.findById(cartItemId);

        if(opt.isPresent()){
            return opt.get();
        }

        // SAFE DELETE FIX
        return null;
    }

}
