import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
    getOrders,
} from "../../State/Admin/Order/Action";

import {
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
    Button,
} from "@mui/material";

// 🔹 style for the status pill
const getStatusStyle = (status) => {
    switch (status) {
        case "PENDING":
            return { backgroundColor: "#6b6b6b", color: "#fff", padding: "4px 12px", borderRadius: "12px", fontSize: 12, fontWeight: 600 };
        case "PLACED":
        case "CONFIRMED":
            return { backgroundColor: "#00c49a", color: "#fff", padding: "4px 12px", borderRadius: "12px", fontSize: 12, fontWeight: 600 };
        case "SHIPPED":
            return { backgroundColor: "#3f51b5", color: "#fff", padding: "4px 12px", borderRadius: "12px", fontSize: 12, fontWeight: 600 };
        case "DELIVERED":
            return { backgroundColor: "#009688", color: "#fff", padding: "4px 12px", borderRadius: "12px", fontSize: 12, fontWeight: 600 };
        default:
            return {};
    }
};

const OrderTableView = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {adminOrder} = useSelector((store) => store);

    useEffect(() => {
        dispatch(getOrders());
    }, [dispatch]);

    return (
        <div>
            <Card className="mt-2">
                <CardHeader title="All Orders" action={
                        <Button onClick={() => navigate('/admin/orders')}>
                            View All
                        </Button>
                    }/>

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
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {adminOrder?.orders?.slice(0,5).map((order) => {
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

                                        {/* UPDATE (Only text, no scroll menu) */}
                                        <TableCell sx={{ color: "blue", fontWeight: 600 }}>
                                            STATUS
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
        </div>
    );
};

export default OrderTableView;
