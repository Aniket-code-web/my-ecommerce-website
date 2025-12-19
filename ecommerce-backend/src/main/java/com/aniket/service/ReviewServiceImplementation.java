package com.aniket.service;

import com.aniket.exception.ProductException;
import com.aniket.model.Product;
import com.aniket.model.Review;
import com.aniket.model.User;
import com.aniket.repository.ProductRepository;
import com.aniket.repository.ReviewRepocitory;
import com.aniket.request.ReviewRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ReviewServiceImplementation implements ReviewService{

    private ReviewRepocitory reviewRepocitory;
    private ProductService productService;
    private ProductRepository productRepository;

    public ReviewServiceImplementation(ReviewRepocitory reviewRepocitory,ProductService productService,ProductRepository productRepository){
        this.reviewRepocitory=reviewRepocitory;
        this.productRepository=productRepository;
        this.productService=productService;
    }

    @Override
    public Review createReview(ReviewRequest req, User user) throws ProductException {
        Product produt = productService.findProductById(req.getProductId());

        Review review=new Review();
        review.setUser(user);
        review.setProduct(produt);
        review.setReview(req.getReview());
        review.setCreatedAt(LocalDateTime.now());

        return reviewRepocitory.save(review);

    }

    @Override
    public List<Review> getAllReview(Long productId) {

        return reviewRepocitory.getAllProductsReview(productId);
    }
}
