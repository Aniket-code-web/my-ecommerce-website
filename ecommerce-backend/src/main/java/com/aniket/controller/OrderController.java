package com.aniket.controller;

import com.aniket.exception.OrderException;
import com.aniket.exception.UserException;
import com.aniket.model.Address;
import com.aniket.model.Order;
import com.aniket.model.User;
import com.aniket.service.OrderService;
import com.aniket.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private UserService userService;


    // -------------------- CREATE ORDER --------------------

    @PostMapping("/")
    public ResponseEntity<Order> createOrder(
            @RequestBody Address shippingAddress,
            @RequestHeader("Authorization") String jwt
    ) throws UserException {

        User user = userService.findUserProfileByJwt(jwt);
        Order order = orderService.createOrder(user, shippingAddress);

        return new ResponseEntity<>(order, HttpStatus.CREATED);
    }


    // -------------------- MY ORDERS (User Order History) --------------------

    @GetMapping("/my")
    public ResponseEntity<List<Order>> getMyOrders(
            @RequestHeader("Authorization") String jwt
    ) throws UserException {

        User user = userService.findUserProfileByJwt(jwt);

        List<Order> orders = orderService.usersOrderHistory(user.getId());

        return new ResponseEntity<>(orders, HttpStatus.OK);
    }


    // -------------------- FIND ORDER BY ID --------------------

    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(
            @PathVariable("id") Long orderId,
            @RequestHeader("Authorization") String jwt
    ) throws UserException, OrderException {

        User user = userService.findUserProfileByJwt(jwt);
        Order order = orderService.findOrderById(orderId);

        // security check
        if (order.getUser().getId() != user.getId()) {
            throw new OrderException("You cannot access someone else's order.");
        }

        return new ResponseEntity<>(order, HttpStatus.OK);
    }
    // -------------------- CANCEL ORDER --------------------

    @PutMapping("/{id}/cancel")
    public ResponseEntity<Order> cancelOrder(
            @PathVariable("id") Long orderId,
            @RequestHeader("Authorization") String jwt
    ) throws UserException, OrderException {

        User user = userService.findUserProfileByJwt(jwt);
        Order order = orderService.findOrderById(orderId);

        if (order.getUser().getId() != user.getId()) {
            throw new OrderException("You cannot cancel someone else's order.");
        }

        Order cancelled = orderService.cancelOrder(orderId);

        return new ResponseEntity<>(cancelled, HttpStatus.OK);
    }


// -------------------- RETURN ORDER --------------------

    @PutMapping("/{id}/return")
    public ResponseEntity<Order> returnOrder(
            @PathVariable("id") Long orderId,
            @RequestHeader("Authorization") String jwt
    ) throws UserException, OrderException {

        User user = userService.findUserProfileByJwt(jwt);
        Order order = orderService.findOrderById(orderId);

        if (order.getUser().getId() != user.getId()) {
            throw new OrderException("You cannot return someone else's order.");
        }

        Order returned = orderService.returnOrder(orderId);

        return new ResponseEntity<>(returned, HttpStatus.OK);
    }

}


