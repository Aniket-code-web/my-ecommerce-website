import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Drawer,
  CssBaseline,
  Avatar,
  Typography,
  Divider,
} from "@mui/material";
import { useSelector } from "react-redux";

import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import AdminDashboard from "./Dashboard";
import CreateProductsForm from "./CreateProductForm";
import ProductsTable from "./ProductsTable";
import OrdersTable from "./OrdersTable";

const drawerWidth = 220;

const menu = [
  { name: "Dashboard", path: "/admin", icon: <DashboardIcon /> },
  { name: "Products", path: "/admin/products", icon: <DashboardIcon /> },
  { name: "Orders", path: "/admin/orders", icon: <DashboardIcon /> },
  { name: "Add Product", path: "/admin/products/create", icon: <DashboardIcon /> },
];

const Admin = () => {
  const navigate = useNavigate();

  const auth = useSelector((state) => state.auth);
  const user = auth?.user;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* ================= SIDEBAR ================= */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Box sx={{ height: "100vh" }}>

          {/* 🔥 USER INFO (TOP) */}
          {user && (
            <Box
              onClick={() => navigate("/")}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                px: 2,
                py: 2,
                cursor: "pointer",
              }}
            >
              <Avatar
                sx={{
                  bgcolor: "#000",
                  width: 40,
                  height: 40,
                  fontWeight: "bold",
                }}
              >
                {user.firstName?.[0]?.toUpperCase()}
              </Avatar>

              <Box>
                <Typography fontWeight={600} fontSize={14}>
                  {user.firstName}
                </Typography>
                <Typography fontSize={12} color="text.secondary">
                  Ecommerce
                </Typography>
              </Box>
            </Box>
          )}

          {/* 🔥 DIVIDER LINE */}
          <Divider />

          {/* 🔥 MENU (IMMEDIATELY BELOW LINE) */}
          <List>
            {menu.map((item) => (
              <ListItem
                key={item.name}
                disablePadding
                onClick={() => navigate(item.path)}
              >
                <ListItemButton>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          {/* PUSH ACCOUNT TO BOTTOM */}
          <Box sx={{ position: "absolute", bottom: 0, width: "100%" }}>
            <Divider />

            <List>
              <ListItem disablePadding onClick={() => navigate("/")}>
                <ListItemButton>
                  <ListItemIcon>
                    <Avatar
                      sx={{
                        bgcolor: "#000",
                        width: 32,
                        height: 32,
                        fontSize: 14,
                      }}
                    >
                      {user?.firstName?.[0]?.toUpperCase()}
                    </Avatar>
                  </ListItemIcon>

                  <ListItemText primary="Account" />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>

        </Box>
      </Drawer>

      {/* ================= MAIN CONTENT ================= */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Routes>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/products/create" element={<CreateProductsForm />} />
          <Route path="/products" element={<ProductsTable />} />
          <Route path="/orders" element={<OrdersTable />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default Admin;
