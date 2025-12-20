package com.aniket.controller;

import com.aniket.exception.OrderException;
import com.aniket.model.Order;
import com.aniket.model.PaymentDetails;
import com.aniket.repository.OrderRepository;
import com.aniket.response.ApiResponse;
import com.aniket.service.OrderService;
import com.aniket.service.UserService;
import com.razorpay.Payment;
import com.razorpay.PaymentLink;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class PaymentController {

    @Value("${razorpay.api.key}")
    private String apiKey;

    @Value("${razorpay.api.secret}")
    private String apiSecret;

    @Value("${frontend.url}")
    private String frontendUrl;

    @Autowired
    private OrderService orderService;

    @Autowired
    private UserService userService;

    @Autowired
    private OrderRepository orderRepository;

    // ================= CREATE PAYMENT LINK =================

    @PostMapping("/payments/{orderId}")
    public ResponseEntity<PaymentLinkResponse> createPaymentLink(
            @PathVariable Long orderId,
            @RequestHeader("Authorization") String jwt
    ) throws OrderException, RazorpayException {

        Order order = orderService.findOrderById(orderId);

        try {
            RazorpayClient razorpay = new RazorpayClient(apiKey, apiSecret);

            JSONObject paymentLinkRequest = new JSONObject();
            paymentLinkRequest.put("amount", order.getTotalDiscountedPrice() * 100);
            paymentLinkRequest.put("currency", "INR");
            paymentLinkRequest.put("reference_id", String.valueOf(orderId));

            JSONObject customer = new JSONObject();
            customer.put("name", order.getUser().getFirstName());
            customer.put("email", order.getUser().getEmail());
            paymentLinkRequest.put("customer", customer);

            JSONObject notify = new JSONObject();
            notify.put("sms", true);
            notify.put("email", true);
            paymentLinkRequest.put("notify", notify);

            // ✅ CORRECT CALLBACK URL
            paymentLinkRequest.put(
                    "callback_url",
                    "https://aniketmuni-ecommerce.vercel.app" + "/payment/" + order.getId()
            );
            paymentLinkRequest.put("callback_method", "get");

            PaymentLink payment = razorpay.paymentLink.create(paymentLinkRequest);

            PaymentLinkResponse res = new PaymentLinkResponse();
            res.setPayment_link_id(payment.get("id"));
            res.setPayment_link_url(payment.get("short_url"));

            return new ResponseEntity<>(res, HttpStatus.CREATED);

        } catch (Exception e) {
            throw new RazorpayException(e.getMessage());
        }
    }

    // ================= PAYMENT REDIRECT HANDLER =================

    @GetMapping("/payments")
    public ResponseEntity<ApiResponse> redirect(
            @RequestParam("razorpay_payment_id") String paymentId,
            @RequestParam("order_id") Long orderId
    ) throws OrderException, RazorpayException {

        Order order = orderService.findOrderById(orderId);
        RazorpayClient razorpay = new RazorpayClient(apiKey, apiSecret);

        try {
            Payment payment = razorpay.payments.fetch(paymentId);

            if ("captured".equals(payment.get("status"))) {

                if (order.getPaymentDetails() == null) {
                    order.setPaymentDetails(new PaymentDetails());
                }

                order.getPaymentDetails().setPaymentId(paymentId);
                order.getPaymentDetails().setPaymentMethod(payment.get("method"));
                order.getPaymentDetails().setPaymentStatus(payment.get("status"));
                order.getPaymentDetails().setRazorpayPaymentId(payment.get("id"));

                String paymentLinkId = payment.get("payment_link_id");
                if (paymentLinkId != null) {
                    PaymentLink link = razorpay.paymentLink.fetch(paymentLinkId);
                    order.getPaymentDetails().setRazorpayPaymentLinkId(paymentLinkId);
                    order.getPaymentDetails().setRazorpayPaymentLinkReferenceId(link.get("reference_id"));
                    order.getPaymentDetails().setRazorpayPaymentLinkSatus(link.get("status"));
                }

                // ✅ MATCH FRONTEND STATUS EXPECTATION
                order.setOrderStatus("PLACED");
                orderRepository.save(order);
            }

            ApiResponse res = new ApiResponse();
            res.setMessage("Order placed successfully");
            res.setStatus(true);

            return new ResponseEntity<>(res, HttpStatus.OK);

        } catch (Exception e) {
            throw new RazorpayException(e.getMessage());
        }
    }
}
