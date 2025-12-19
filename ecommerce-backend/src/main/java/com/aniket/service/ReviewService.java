package com.aniket.service;

import com.aniket.exception.ProductException;
import com.aniket.model.Review;
import com.aniket.model.User;
import com.aniket.request.ReviewRequest;

import java.util.List;

public interface ReviewService {
    public Review createReview(ReviewRequest req , User user) throws ProductException;
    public List<Review> getAllReview(Long productId);

}
