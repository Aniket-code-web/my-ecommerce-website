package com.aniket.service;

import com.aniket.exception.ProductException;
import com.aniket.model.Cart;
import com.aniket.model.CartItem;
import com.aniket.model.Product;
import com.aniket.model.User;
import com.aniket.repository.CartRepository;
import com.aniket.request.AddItemRequest;
import org.springframework.stereotype.Service;

@Service
public class CartServiceImplementation implements CartService {

    private CartRepository cartRepository;
    private CartItemService cartItemService;
    private ProductService productService;

    public CartServiceImplementation(CartRepository cartRepository,CartItemService cartItemService,ProductService productService){
        this.cartRepository=cartRepository;
        this.cartItemService=cartItemService;
        this.productService=productService;
    }


    @Override
    public Cart createCart(User user) {

        Cart cart = new Cart();
        cart.setUser(user);

        return cartRepository.save(cart);
    }

    @Override
    public String addCartItem(Long userId, AddItemRequest req) throws ProductException {

        Cart cart = cartRepository.findByUserId(userId);
        Product product = productService.findProductById(req.getProductId());

        // 🔥 Check if same product with same size already exists
        CartItem isPresent = cartItemService.isCartItemExist(cart, product, req.getSize(), userId);

        if (isPresent == null) {

            CartItem cartItem = new CartItem();
            cartItem.setProduct(product);
            cartItem.setCart(cart);
            cartItem.setUserId(userId);

            // 🔥 save SIZE CORRECTLY
            cartItem.setSize(req.getSize());

            // 🔥 use correct quantity
            cartItem.setQuantity(req.getQuantity());

            // 🔥 correct price calculations
            cartItem.setPrice(product.getPrice() * req.getQuantity());
            cartItem.setDiscountedPrice(product.getDiscountedPrice() * req.getQuantity());

            CartItem created = cartItemService.createCartItem(cartItem);

            cart.getCartItems().add(created);
        } else {
            // 🔥 update existing item quantity instead of ignoring
            isPresent.setQuantity(isPresent.getQuantity() + req.getQuantity());
            isPresent.setPrice(product.getPrice() * isPresent.getQuantity());
            isPresent.setDiscountedPrice(product.getDiscountedPrice() * isPresent.getQuantity());
            cartItemService.createCartItem(isPresent);
        }

        return "Item Add To Cart";
    }


    @Override
    public Cart findUserCart(Long userId) {
        Cart cart = cartRepository.findByUserId(userId);
        int totalPrice=0;
        int totalDiscountedPrice=0;
        int totalItem=0;

        for(CartItem cartItem : cart.getCartItems()){
            totalPrice=totalPrice+cartItem.getPrice();
            totalDiscountedPrice=totalDiscountedPrice+cartItem.getDiscountedPrice();
            totalItem=totalItem+cartItem.getQuantity();
        }

        cart.setTotalDiscountedPrice(totalDiscountedPrice);
        cart.setTotalItem(totalItem);
        cart.setTotalPrice(totalPrice);
        cart.setDiscount(totalPrice-totalDiscountedPrice);

        return cartRepository.save(cart);
    }
}
