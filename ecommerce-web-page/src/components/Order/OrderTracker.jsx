import React from "react";
import { Stepper, Step, StepLabel } from "@mui/material";

// Step labels for tracking order progress
const steps = [
    "Placed",
    "Order Confirmed",
    "Shipped",
    "Out For Delivery",
    "Delivered",
];

const OrderTracker = ({ activeStep }) => {
    return (
        <div className="w-full">
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel
                            sx={{
                                '& .MuiStepLabel-label': {
                                    color: '#9155FD',
                                    fontSize: '18px',   // 44px is too large for StepLabel text
                                    fontWeight: 'bold'
                                }
                            }}
                        >
                            {label}
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>
        </div>
    );
};

export default OrderTracker;
