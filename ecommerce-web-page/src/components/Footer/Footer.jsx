import { Button, Grid, Typography, Box } from "@mui/material";
import React from "react";

const Footer = () => {
  const footerSections = [
    {
      title: "Company",
      links: ["About", "Blog", "Press", "Jobs", "Partners"],
    },
    {
      title: "Solutions",
      links: ["Marketing", "Analytics", "Commerce", "Insights", "Support"],
    },
    {
      title: "Documentation",
      links: ["Guides", "API Status"],
    },
    {
      title: "Legal",
      links: ["Claim", "Privacy", "Terms"],
    },
  ];

  return (
    <Box
      sx={{
        bgcolor: "#000",
        color: "white",
        mt: 10,
        pt: { xs: 6, sm: 8 },
        pb: { xs: 3, sm: 4 },
        px: { xs: 3, sm: 6, md: 10 }, // ✅ side padding increased
      }}
    >
      <Grid
        container
        spacing={6} // ✅ increased gap between columns
        justifyContent="space-between" // ✅ spread evenly
        sx={{
          maxWidth: "1300px", // ✅ wider area
          mx: "auto",
          mb: 6,
        }}
      >
        {footerSections.map((section, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                mb: 2,
                fontSize: { xs: "1.1rem", md: "1.25rem" },
              }}
            >
              {section.title}
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {section.links.map((item) => (
                <Button
                  key={item}
                  variant="text"
                  sx={{
                    color: "grey.400",
                    justifyContent: "flex-start",
                    textTransform: "none",
                    fontSize: { xs: "0.9rem", md: "0.95rem" },
                    p: 0,
                    minWidth: "auto",
                    "&:hover": {
                      color: "white",
                      backgroundColor: "transparent",
                    },
                  }}
                >
                  {item}
                </Button>
              ))}
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Divider Line */}
      <Box
        sx={{
          borderTop: "1px solid",
          borderColor: "grey.800",
          maxWidth: "1300px",
          mx: "auto",
        }}
      />

      {/* Copyright */}
      <Box sx={{ textAlign: "center", mt: 3 }}>
        <Typography
          variant="body2"
          sx={{
            color: "grey.500",
            fontSize: { xs: "0.8rem", md: "0.9rem" },
          }}
        >
          © 2024 Your Company. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;

