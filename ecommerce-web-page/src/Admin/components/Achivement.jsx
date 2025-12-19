import { Button, Card, CardContent, styled, Typography, Box } from '@mui/material'
import React from 'react'

const TrophyImg = styled("img")({
    height: 90,
    objectFit: "contain",
});

const Achivement = () => {
    return (
        <Card sx={{
            width: "100%",
            height: "100%",
            bgcolor: "#242B2E",
            color: "white",
            display: "flex",
            alignItems: "center",
            padding: "20px",
            boxSizing: "border-box"
        }}>

            {/* LEFT SECTION (TEXT) */}
            <Box sx={{ flex: 1 }}>
                <Typography variant='h6' sx={{ letterSpacing: ".25px" }}>
                    Shop With Zosh
                </Typography>

                <Typography>Congratulations 🥳</Typography>
                <Typography>420.8k</Typography>

                <Button size='small' variant='contained' sx={{ mt: 2 }}>
                    View Sales
                </Button>
            </Box>

            {/* RIGHT SECTION (IMAGE CENTERED) */}
            <Box sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%"
            }}>
                <TrophyImg src="https://img.freepik.com/premium-vector/gold-trophy-with-name-plate-winner-competition_68708-545.jpg?semt=ais_hybrid&w=740&q=80" />
            </Box>

        </Card>
    )
}

export default Achivement
