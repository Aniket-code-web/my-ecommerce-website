package com.aniket.repository;

import com.aniket.model.Rating;
import com.aniket.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReviewRepocitory extends JpaRepository<Review, Long> {

    @Query("SELECT r From Review r Where r.product.id=:productId")
    public List<Review> getAllProductsReview(@Param("productId")Long productId);

}
