package com.aniket.repository;

import java.util.List;

import com.aniket.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query("SELECT p FROM Product p WHERE LOWER(p.category.name) LIKE %:category%")
    List<Product> findByCategory(@Param("category") String category);

    @Query("SELECT p FROM Product p WHERE " +
            "(LOWER(p.title) LIKE %:query% OR LOWER(p.description) LIKE %:query% OR LOWER(p.brand) LIKE %:query% OR LOWER(p.category.name) LIKE %:query%)")
    List<Product> searchProduct(@Param("query") String query);

    @Query("SELECT p FROM Product p " +
            "WHERE (:category = '' OR LOWER(p.category.name) LIKE %:category%) " +
            "AND ((:minPrice IS NULL AND :maxPrice IS NULL) OR (p.discountedPrice BETWEEN :minPrice AND :maxPrice)) " +
            "AND (:minDiscount IS NULL OR p.discountPercent >= :minDiscount) " +
            "ORDER BY " +
            "CASE WHEN :sort = 'price_low' THEN p.discountedPrice ELSE NULL END ASC, " +
            "CASE WHEN :sort = 'price_high' THEN p.discountedPrice ELSE NULL END DESC, " +
            "p.createdAt DESC")
    List<Product> filterProducts(
            @Param("category") String category,
            @Param("minPrice") Integer minPrice,
            @Param("maxPrice") Integer maxPrice,
            @Param("minDiscount") Integer minDiscount,
            @Param("sort") String sort
    );

    List<Product> findTop10ByOrderByCreatedAtDesc();
}
