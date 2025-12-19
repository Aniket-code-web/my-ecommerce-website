import { Button, Grid, Box, TextField, Typography } from "@mui/material";
import React from "react";
import AddressCard from "../AddressCard/AddressCard";
import { useDispatch } from "react-redux";
import { createOrder } from "../../State/Order/Action";
import { useNavigate } from "react-router-dom";

const DeliveryAddressForm = () => {

  const navigate =useNavigate();
  const dispatch = useDispatch();
  

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    
    const address = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      streetAddress: data.get("address1"), // Changed from "address" to "address1"
      city: data.get("city"),
      state: data.get("state"),
      zipCode: data.get("zip"),
      mobile: data.get("phone") // Changed from "phoneNumber" to "phone"
    };

    const orderData = {address,navigate}
    dispatch(createOrder(orderData));
    console.log("address", orderData);
  };

  return (
    <Box
      sx={{
        px: { xs: 2, sm: 3, md: 8 },
        py: { xs: 4, sm: 6, md: 8 },
        bgcolor: "#f7f7f7",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Grid
        container
        spacing={4}
        sx={{
          flexWrap: { xs: "wrap", md: "nowrap" },
          justifyContent: "center",
          alignItems: "flex-start",
          maxWidth: "1400px",
          width: "100%"
        }}
      >
       <AddressCard/>
        {/* ---------------- Right Form Section (Less Width) ---------------- */}
        <Grid item xs={12} lg={3} md={4} sx={{ maxWidth: "800px" }}>
          <Box
            sx={{
              bgcolor: "white",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              p: { xs: 3, sm: 4, md: 4 },
              border: "1px solid #e0e0e0",
              width: "100%",
              height: { xs: "auto", md: "75vh" },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                {/* Row 1: First Name & Last Name */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="firstName"
                    name="firstName"
                    label="First Name *"
                    fullWidth
                    variant="outlined"
                    InputProps={{ sx: { height: 55 } }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="lastName"
                    name="lastName"
                    label="Last Name *"
                    fullWidth
                    variant="outlined"
                    InputProps={{ sx: { height: 55 } }}
                  />
                </Grid>

                {/* Row 2: Address */}
                <Grid item xs={12}>
                  <TextField
                    required
                    id="address1"
                    name="address1"
                    label="Address *"
                    fullWidth
                    multiline
                    rows={4}
                    variant="outlined"
                  />
                </Grid>

                {/* Row 3: City & State */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="city"
                    name="city"
                    label="City *"
                    fullWidth
                    variant="outlined"
                    InputProps={{ sx: { height: 55 } }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="state"
                    name="state"
                    label="State/Province/Region *"
                    fullWidth
                    variant="outlined"
                    InputProps={{ sx: { height: 55 } }}
                  />
                </Grid>

                {/* Row 4: Phone & Zip */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="phone"
                    name="phone"
                    label="Phone Number *"
                    fullWidth
                    variant="outlined"
                    InputProps={{ sx: { height: 55 } }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="zip"
                    name="zip"
                    label="Zip / Postal Code *"
                    fullWidth
                    variant="outlined"
                    InputProps={{ sx: { height: 55 } }}
                  />
                </Grid>

                {/* Submit Button */}
                <Grid item xs={12}>
                  <Button
                    sx={{
                      py: 1.5,
                      mt: 2,
                      bgcolor: "rgb(100, 60, 200)",
                      "&:hover": { bgcolor: "rgb(80, 40, 170)" },
                      fontWeight: "bold",
                    }}
                    size="large"
                    variant="contained"
                    type="submit"
                    fullWidth
                  >
                    DELIVER HERE
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DeliveryAddressForm;