package com.aniket.repository;

import com.aniket.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    // find by exact name (returns list)
    List<Category> findByName(String name);

    // find category by name + parent category name
    @Query("SELECT c FROM Category c WHERE LOWER(c.name) = LOWER(:name) AND LOWER(c.parentCategory.name) = LOWER(:parentName)")
    List<Category> findByNameAndParentCategory(
            @Param("name") String name,
            @Param("parentName") String parentName
    );
}
