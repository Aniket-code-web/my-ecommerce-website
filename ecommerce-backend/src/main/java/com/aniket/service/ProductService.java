package com.aniket.service;

import com.aniket.exception.ProductException;
import com.aniket.model.Product;
import com.aniket.request.CreateProductRequest;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ProductService {

    Product createProduct(CreateProductRequest req) throws ProductException;

    String deleteProduct(Long productId) throws ProductException;

    Product updateProduct(Long productId, Product product) throws ProductException;

    List<Product> getAllProducts();

    Product findProductById(Long id) throws ProductException;

    List<Product> findProductByCategory(String category);

    List<Product> searchProduct(String query);

    Page<Product> getAllProduct(
            String category,
            List<String> colors,
            List<String> sizes,
            Integer minPrice,
            Integer maxPrice,
            Integer minDiscount,
            String sort,
            String stock,
            Integer pageNumber,
            Integer pageSize
    );

    List<Product> recentlyAddedProduct();
}
