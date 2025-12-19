package com.aniket.service;

import com.aniket.exception.OrderException;
import com.aniket.model.Address;
import com.aniket.model.Order;
import com.aniket.model.User;

import java.util.List;

public interface OrderService {

    public Order createOrder(User user, Address shippingAddress);

    public Order findOrderById(Long orderId) throws OrderException;

    public List<Order> usersOrderHistory(Long userId);

    public Order placedOrder(Long orderId) throws OrderException;

    public Order confirmedOrder(Long orderId) throws OrderException;

    public Order shippedOrder(Long orderId) throws OrderException;
    public Order deliverdOrder(Long orderId) throws OrderException;
    public Order cancelOrder(Long orderId) throws OrderException;

    public List<Order> getAllOrders();

    public void deleteOrder(Long orderId) throws OrderException;

    Order returnOrder(Long orderId) throws OrderException;



}
