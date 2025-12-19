import React from "react";
import Achivement from "./Achivement";
import MonthlyOverview from "./MonthlyOverview";
import OrderTableView from "../view/OrderTableView";
import ProductsTable from "./ProductsTable";
import ProductTableView from "../view/ProductTableView";

const AdminDashboard = () => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                padding: "20px 0",
                boxSizing: "border-box",
                alignItems: "center", // ⭐ Center everything
            }}
        >
            {/* ⭐ TOP CARDS */}
            <div
                style={{
                    display: "flex",
                    gap: "20px",
                    width: "85%",         // ⭐ Centered width like video
                }}
            >
                <div style={{ width: "320px" }}>
                    <Achivement />
                </div>

                <div style={{ flex: 1 }}>
                    <MonthlyOverview />
                </div>
            </div>

            {/* ⭐ MIDDLE: Orders + Products (side-by-side, FIXED WIDTH) */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "85%",          // ⭐ EXACT like the image
                    marginTop: "30px",
                }}
            >
                {/* LEFT: All Orders */}
                <div style={{ width: "48%" }}>  {/* ⭐ Fixed width */}
                    <OrderTableView />
                </div>

                {/* RIGHT: All Products */}
                <div style={{ width: "48%" }}>  {/* ⭐ Fixed width */}
                    <ProductTableView />
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
