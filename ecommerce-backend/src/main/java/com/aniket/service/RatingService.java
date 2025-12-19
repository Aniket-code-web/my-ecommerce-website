package com.aniket.service;

import com.aniket.exception.ProductException;
import com.aniket.model.Rating;
import com.aniket.model.User;
import com.aniket.request.RatingRequest;
import org.springframework.stereotype.Service;

import java.util.List;


public interface RatingService {
    public Rating createRating(RatingRequest req , User user) throws ProductException;

    public List<Rating> getProductsRating(Long productId);


}
