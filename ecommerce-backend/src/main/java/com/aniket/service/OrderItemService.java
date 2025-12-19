package com.aniket.service;

import com.aniket.model.OrderItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


public interface OrderItemService {

    public OrderItem createOrderItem(OrderItem orderItem);

}
