package com.aniket.controller;

import com.aniket.exception.ProductException;
import com.aniket.exception.UserException;
import com.aniket.model.Cart;
import com.aniket.model.User;
import com.aniket.request.AddItemRequest;
import com.aniket.response.ApiResponse;
import com.aniket.service.CartService;
import com.aniket.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @Autowired
    private UserService userService;

    @GetMapping("/")
    public ResponseEntity<Cart> findUserCart(@RequestHeader("Authorization") String jwt) throws UserException {

        User user = userService.findUserProfileByJwt(jwt);
        Cart cart = cartService.findUserCart(user.getId());

        return ResponseEntity.ok(cart);
    }
    @PutMapping("/add")
    public ResponseEntity<ApiResponse> addItemToCart(
            @RequestBody AddItemRequest req,
            @RequestHeader("Authorization") String jwt
    ) throws UserException, ProductException {

        User user = userService.findUserProfileByJwt(jwt);
        cartService.addCartItem(user.getId(), req);

        ApiResponse res = new ApiResponse();
        res.setMessage("Item added to cart");
        res.setStatus(true);

        return new ResponseEntity<>(res, HttpStatus.OK);
    }
}
