package com.aniket.service;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.aniket.exception.ProductException;
import com.aniket.model.Category;
import com.aniket.model.Product;
import com.aniket.repository.CategoryRepository;
import com.aniket.repository.ProductRepository;
import com.aniket.request.CreateProductRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class ProductServiceImplementation implements ProductService {

    private final ProductRepository productRepository;
    private final UserService userService;
    private final CategoryRepository categoryRepository;

    public ProductServiceImplementation(ProductRepository productRepository,
                                        UserService userService,
                                        CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.userService = userService;
        this.categoryRepository = categoryRepository;
    }

    @Override
    public Product createProduct(CreateProductRequest req) {

        // ---------- 1. TOP LEVEL ----------
        List<Category> topLevels = categoryRepository.findByName(req.getTopLevelCategory());
        Category topLevel;

        if (!topLevels.isEmpty()) {
            topLevel = topLevels.get(0);
        } else {
            topLevel = new Category();
            topLevel.setName(req.getTopLevelCategory());
            topLevel.setLevel(1);
            topLevel = categoryRepository.save(topLevel);
        }

        // ---------- 2. SECOND LEVEL ----------
        List<Category> secondLevels =
                categoryRepository.findByNameAndParentCategory(req.getSecondLevelCategory(), topLevel.getName());

        Category secondLevel;

        if (!secondLevels.isEmpty()) {
            secondLevel = secondLevels.get(0);
        } else {
            secondLevel = new Category();
            secondLevel.setName(req.getSecondLevelCategory());
            secondLevel.setParentCategory(topLevel);
            secondLevel.setLevel(2);
            secondLevel = categoryRepository.save(secondLevel);
        }

        // ---------- 3. THIRD LEVEL ----------
        List<Category> thirdLevels =
                categoryRepository.findByNameAndParentCategory(req.getThirdLevelCategory(), secondLevel.getName());

        Category thirdLevel;

        if (!thirdLevels.isEmpty()) {
            thirdLevel = thirdLevels.get(0);
        } else {
            thirdLevel = new Category();
            thirdLevel.setName(req.getThirdLevelCategory());
            thirdLevel.setParentCategory(secondLevel);
            thirdLevel.setLevel(3);
            thirdLevel = categoryRepository.save(thirdLevel);
        }

        // ---------- 4. SAVE PRODUCT ----------
        Product product = new Product();
        product.setTitle(req.getTitle());
        product.setColor(req.getColor());
        product.setDescription(req.getDescription());
        product.setDiscountedPrice(req.getDiscountedPrice());
        product.setDiscountPercent(req.getDiscountPercent());
        product.setImageUrl(req.getImageUrl());
        product.setBrand(req.getBrand());
        product.setPrice(req.getPrice());
        product.setSizes(req.getSize());
        product.setQuantity(req.getQuantity());
        product.setCategory(thirdLevel);
        product.setCreatedAt(LocalDateTime.now());

        return productRepository.save(product);
    }

    @Override
    public String deleteProduct(Long productId) throws ProductException {

        Product product = findProductById(productId);
        product.getSizes().clear();
        productRepository.delete(product);

        return "Product deleted Successfully";
    }

    @Override
    public Product updateProduct(Long productId, Product req) throws ProductException {
        Product product = findProductById(productId);

        if (req.getQuantity() != 0) {
            product.setQuantity(req.getQuantity());
        }
        if (req.getDescription() != null) {
            product.setDescription(req.getDescription());
        }

        return productRepository.save(product);
    }

    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public Product findProductById(Long id) throws ProductException {
        Optional<Product> opt = productRepository.findById(id);

        if (opt.isPresent()) {
            return opt.get();
        }
        throw new ProductException("product not found with id " + id);
    }

    @Override
    public List<Product> findProductByCategory(String category) {
        System.out.println("category --- " + category);
        return productRepository.findByCategory(category);
    }

    @Override
    public List<Product> searchProduct(String query) {
        return productRepository.searchProduct(query);
    }

    // ================== MAIN GENERIC FILTER ==================

    @Override
    public Page<Product> getAllProduct(String category,
                                       List<String> colors,
                                       List<String> sizes,
                                       Integer minPrice,
                                       Integer maxPrice,
                                       Integer minDiscount,
                                       String sort,
                                       String stock,
                                       Integer pageNumber,
                                       Integer pageSize) {

        Pageable pageable = PageRequest.of(pageNumber, pageSize);

        // 1. load all products
        List<Product> products = productRepository.findAll();

        // 2. normalize category from URL (mens-kurta / dresses / etc.)
        String categorySlug = slugify(category);

        if (!categorySlug.isEmpty()) {
            products = products.stream()
                    .filter(p -> {
                        Category cat = p.getCategory();
                        if (cat == null || cat.getName() == null) return false;
                        String productSlug = slugify(cat.getName());
                        return !productSlug.isEmpty() && productSlug.equals(categorySlug);
                    })
                    .collect(Collectors.toList());
        }

        // 3. price filter (on discountedPrice)
        if (minPrice != null) {
            products = products.stream()
                    .filter(p -> p.getDiscountedPrice() >= minPrice)
                    .collect(Collectors.toList());
        }

        if (maxPrice != null) {
            products = products.stream()
                    .filter(p -> p.getDiscountedPrice() <= maxPrice)
                    .collect(Collectors.toList());
        }

        // 4. discount filter
        if (minDiscount != null) {
            products = products.stream()
                    .filter(p -> p.getDiscountPercent() >= minDiscount)
                    .collect(Collectors.toList());
        }

        // 5. color filter
        if (colors != null && !colors.isEmpty()) {
            products = products.stream()
                    .filter(p -> {
                        if (p.getColor() == null) return false;
                        String c = p.getColor().toLowerCase();
                        return colors.stream().anyMatch(col -> col.equalsIgnoreCase(c));
                    })
                    .collect(Collectors.toList());
        }

        // 6. size filter
        if (sizes != null && !sizes.isEmpty()) {
            products = products.stream()
                    .filter(p -> p.getSizes() != null &&
                            p.getSizes().stream().anyMatch(
                                    s -> sizes.contains(s.getName())
                            ))
                    .collect(Collectors.toList());
        }

        // 7. stock filter
        if (stock != null) {
            if (stock.equals("in_stock")) {
                products = products.stream()
                        .filter(p -> p.getQuantity() > 0)
                        .collect(Collectors.toList());
            } else if (stock.equals("out_of_stock")) {
                products = products.stream()
                        .filter(p -> p.getQuantity() < 1)
                        .collect(Collectors.toList());
            }
        }

        // 8. sorting
        if ("price_low".equalsIgnoreCase(sort)) {
            products.sort(Comparator.comparingInt(Product::getDiscountedPrice));
        } else if ("price_high".equalsIgnoreCase(sort)) {
            products.sort(Comparator.comparingInt(Product::getDiscountedPrice).reversed());
        } else {
            // default: newest first
            products.sort(Comparator.comparing(Product::getCreatedAt).reversed());
        }

        // 9. manual pagination
        int start = (int) pageable.getOffset();
        int end = Math.min(start + pageable.getPageSize(), products.size());
        List<Product> pageContent = start > end ? List.of() : products.subList(start, end);

        return new PageImpl<>(pageContent, pageable, products.size());
    }

    @Override
    public List<Product> recentlyAddedProduct() {
        return productRepository.findTop10ByOrderByCreatedAtDesc();
    }

    // ---------- helper: make URL & DB category comparable ----------
    private String slugify(String name) {
        if (name == null) return "";

        // normalize separators & case
        String s = name.trim().toLowerCase()
                .replace("_", " ")
                .replace("-", " ");

        if (s.isEmpty()) return "";

        String[] parts = s.split("\\s+");
        String last = parts[parts.length - 1];

        // plural handling ONLY on last word
        if (last.length() > 3) {
            if (last.endsWith("ses")) {         // dresses -> dress
                last = last.substring(0, last.length() - 2);
            } else if (last.endsWith("ies")) {  // parties -> party
                last = last.substring(0, last.length() - 3) + "y";
            } else if (last.endsWith("s") && !last.endsWith("ss")) { // shoes -> shoe
                last = last.substring(0, last.length() - 1);
            }
        }

        return last;
    }
}
