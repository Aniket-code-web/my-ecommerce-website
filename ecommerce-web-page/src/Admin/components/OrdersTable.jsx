import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    getOrders,
    deleteOrder,
    confirmOrder,
    shipOrder,
    deliveredOrder,
} from "../../State/Admin/Order/Action";

import {
    Button,
    Card,
    CardHeader,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Avatar,
    AvatarGroup,
    Menu,
    MenuItem,
    Typography,
} from "@mui/material";

// 🔹 style for the status pill
const getStatusStyle = (status) => {
    switch (status) {
        case "PENDING":
            return {
                backgroundColor: "#6b6b6b",
                color: "#fff",
                padding: "4px 12px",
                borderRadius: "12px",
                fontSize: "12px",
                fontWeight: 600,
            };
        case "PLACED":
            return {
                backgroundColor: "#00c49a",
                color: "#fff",
                padding: "4px 12px",
                borderRadius: "12px",
                fontSize: "12px",
                fontWeight: 600,
            };
        case "CONFIRMED":
            return {
                backgroundColor: "#00c49a",
                color: "#fff",
                padding: "4px 12px",
                borderRadius: "12px",
                fontSize: "12px",
                fontWeight: 600,
            };
        case "SHIPPED":
            return {
                backgroundColor: "#3f51b5",
                color: "#fff",
                padding: "4px 12px",
                borderRadius: "12px",
                fontSize: "12px",
                fontWeight: 600,
            };
        case "DELIVERED":
            return {
                backgroundColor: "#009688",
                color: "#fff",
                padding: "4px 12px",
                borderRadius: "12px",
                fontSize: "12px",
                fontWeight: 600,
            };
        default:
            return {};
    }
};

const OrdersTable = () => {
    const dispatch = useDispatch();
    const adminOrder = useSelector((store) => store.adminOrder);

    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedOrderId, setSelectedOrderId] = useState(null);

    const open = Boolean(anchorEl);

    const handleStatusClick = (e, orderId) => {
        setAnchorEl(e.currentTarget);
        setSelectedOrderId(orderId);
    };

    const handleClose = () => setAnchorEl(null);

    const handleStatusChange = (type) => {
        if (type === "CONFIRMED") dispatch(confirmOrder(selectedOrderId));
        if (type === "SHIPPED") dispatch(shipOrder(selectedOrderId));
        if (type === "DELIVERED") dispatch(deliveredOrder(selectedOrderId));

        handleClose();
    };

    useEffect(() => {
        dispatch(getOrders());
    }, [dispatch]);

    return (
        <div>
            <Card className="mt-2">
                <CardHeader title="All Products" />

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Image</TableCell>
                                <TableCell>Title</TableCell>
                                <TableCell>Id</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Update</TableCell>
                                <TableCell>Delete</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {adminOrder?.orders?.map((order) => {

                                // ensure correct status for first time load
                                const statusLabel =
                                    !order.orderStatus || order.orderStatus.trim() === ""
                                        ? "PENDING"
                                        : order.orderStatus;

                                return (
                                    <TableRow key={order.id}>
                                        {/* IMAGES */}
                                        <TableCell>
                                            <AvatarGroup max={4}>
                                                {order.orderItems?.map((oi, index) => (
                                                    <Avatar
                                                        key={index}
                                                        src={oi.product?.imageUrl}
                                                        alt={oi.product?.title}
                                                        sx={{ width: 56, height: 56 }}
                                                    />
                                                ))}
                                            </AvatarGroup>
                                        </TableCell>

                                        {/* TITLES */}
                                        <TableCell>
                                            {order.orderItems?.map((oi, index) => (
                                                <div key={index}>{oi.product?.title}</div>
                                            ))}
                                        </TableCell>

                                        {/* ORDER ID */}
                                        <TableCell>{order.id}</TableCell>

                                        {/* PRICE */}
                                        <TableCell>{order.totalDiscountedPrice}</TableCell>

                                        {/* STATUS BADGE */}
                                        <TableCell>
                                            <span style={getStatusStyle(statusLabel)}>
                                                {statusLabel}
                                            </span>
                                        </TableCell>

                                        {/* UPDATE */}
                                        <TableCell>
                                            <Typography
                                                sx={{ color: "blue", cursor: "pointer", fontWeight: 600 }}
                                                onClick={(e) => handleStatusClick(e, order.id)}
                                            >
                                                STATUS
                                            </Typography>
                                        </TableCell>

                                        {/* DELETE */}
                                        <TableCell>
                                            <Button
                                                variant="outlined"
                                                color="error"
                                                onClick={() => dispatch(deleteOrder(order.id))}
                                            >
                                                DELETE
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}

                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>

            {/* STATUS DROPDOWN */}
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                <MenuItem onClick={() => handleStatusChange("CONFIRMED")}>
                    Confirmed Order
                </MenuItem>
                <MenuItem onClick={() => handleStatusChange("SHIPPED")}>
                    Shipped Order
                </MenuItem>
                <MenuItem onClick={() => handleStatusChange("DELIVERED")}>
                    Delivered Order
                </MenuItem>
            </Menu>
        </div>
    );
};

export default OrdersTable;
