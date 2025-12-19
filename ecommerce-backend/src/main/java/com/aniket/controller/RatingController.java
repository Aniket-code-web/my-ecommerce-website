package com.aniket.controller;

import com.aniket.exception.ProductException;
import com.aniket.exception.UserException;
import com.aniket.model.Rating;
import com.aniket.model.User;
import com.aniket.request.RatingRequest;
import com.aniket.service.RatingService;
import com.aniket.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ratings")
public class RatingController {

    @Autowired
    private UserService userService;

    @Autowired
    private RatingService ratingService;

    @PostMapping("/create")
    public ResponseEntity<Rating> createRating(
            @RequestBody RatingRequest req,
            @RequestHeader("Authorization") String jwt
    ) throws UserException, ProductException {

        User user = userService.findUserProfileByJwt(jwt);
        Rating rating = ratingService.createRating(req, user);

        return new ResponseEntity<>(rating, HttpStatus.CREATED);
    }
    @GetMapping("/product/{productId}")
    public ResponseEntity<List<Rating>> getProductRatings(
            @PathVariable Long productId,
            @RequestHeader("Authorization") String jwt
    ) throws UserException, ProductException {

        userService.findUserProfileByJwt(jwt); // validate user

        List<Rating> ratings = ratingService.getProductsRating(productId);

        return ResponseEntity.ok(ratings);
    }

}
