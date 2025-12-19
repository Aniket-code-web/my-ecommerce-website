import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DevicesIcon from '@mui/icons-material/Devices';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Avatar, Box, Card, CardContent, CardHeader, Grid, IconButton, Typography } from '@mui/material';
const salesData = [
    {
        stats: '245K',
        title: 'Sales',
        color: '#E5D68A',
        icon: <TrendingUpIcon sx={{ fontSize: "1.75rem" }} />
    },
    {
        stats: '12.5k',
        title: 'Customers',
        color: '#22CB5C',
        icon: <AccountCircleIcon sx={{ fontSize: "1.75rem" }} />
    },
    {
        stats: '1.54k',
        title: 'Products',
        color: '#DE4839',
        icon: <DevicesIcon sx={{ fontSize: "1.75rem" }} />
    },
    {
        stats: '88k',
        title: 'Revenue',
        color: '#12B0E8',
        icon: <AttachMoneyIcon sx={{ fontSize: "1.75rem" }} />
    },
];

const renderStats = () => {
    return salesData.map((item, index) => (
        <Grid item xs={12} sm={3} key={index}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar
                    variant="rounded"
                    sx={{
                        mr: 3,
                        width: 44,
                        height: 44,
                        boxShadow: 3,
                        color: 'white',
                        background: `${item.color}`
                    }}
                >
                    {item.icon}
                </Avatar>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="caption">{item.title}</Typography>
                    <Typography variant="h6">{item.stats}</Typography>
                </Box>

            </Box>
        </Grid>
    ));
};


const MonthlyOverview = () => {
    return (
        <Card sx={{
            bgcolor: "#242B2E",
            color: "white",
            height: "100%",       // ⭐ FULL HEIGHT
            width: "100%"         // ⭐ FULL WIDTH
        }}>
            <CardHeader
                title="Monthly Overview"
                action={
                    <IconButton size="small">
                        <MoreVertIcon />
                    </IconButton>
                }
                subheader={
                    <Typography variant='body2'>
                        <Box component="span" sx={{ fontWeight: 600, }}>
                            Total 48.5% growth this month
                        </Box>

                    </Typography>
                }
                titleTypographyProps={{
                    sx: {
                        mb: 2.5,
                        lineHeight: '2rem !important',
                        letterSpacing: '.15px !important'
                    }
                }}
            />
            <CardContent sx={{ pt: 3 }}>
                <Grid container spacing={3}>
                    {renderStats()}
                </Grid>
            </CardContent>


        </Card>

    )
}
export default MonthlyOverview