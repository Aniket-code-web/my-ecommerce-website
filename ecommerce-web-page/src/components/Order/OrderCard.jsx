import { Grid, Chip } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate } from "react-router-dom";

const getStatusColor = (status) => {
  switch (status) {
    case "PENDING":
      return "bg-gray-500";
    case "PLACED":
    case "CONFIRMED":
      return "bg-blue-500";
    case "SHIPPED":
      return "bg-indigo-500";
    case "DELIVERED":
      return "bg-green-600";
    case "CANCELLED":
      return "bg-red-500";
    default:
      return "bg-gray-400";
  }
};

const formatDate = (dateString) => {
  if (!dateString) return "";
  const d = new Date(dateString);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const OrderCard = ({ order }) => {
  const navigate = useNavigate();
  const firstItem = order?.orderItems?.[0];
  const product = firstItem?.product;

  const image = product?.imageUrl;
  const title = product?.title || "Order";
  const size = firstItem?.size;
  const color = product?.color;
  const orderDate = formatDate(order?.orderDate);
  const status = order?.orderStatus || "PENDING";

  return (
    <div
      onClick={() => navigate(`/orders/${order.id}`)}
      className="p-4 md:p-5 shadow-md hover:shadow-lg rounded-lg border border-gray-100 cursor-pointer bg-white transition-shadow"
    >
      <Grid container alignItems="center" spacing={2}>
        {/* Image */}
        <Grid item xs={3} sm={2}>
          <img
            className="w-full h-20 object-cover object-top rounded-md"
            src={
              image ||
              "https://via.placeholder.com/80x80.png?text=Product"
            }
            alt={title}
          />
        </Grid>

        {/* Middle information */}
        <Grid item xs={9} sm={7}>
          <div className="flex flex-col gap-1">
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-semibold text-sm md:text-base text-gray-800">
                {title}
              </p>

              <span
                className={`text-xs md:text-xs text-white px-2 py-0.5 rounded-full ${getStatusColor(
                  status
                )}`}
              >
                {status}
              </span>
            </div>

            <p className="text-xs text-gray-500">
              Order ID: <span className="font-mono">{order.id}</span>
            </p>

            {orderDate && (
              <p className="text-xs text-gray-600">
                Ordered on <span className="font-medium">{orderDate}</span>
              </p>
            )}

            <p className="text-xs text-gray-500">
              {order.totalItem} item(s) •{" "}
              <span className="font-semibold text-gray-800">
                ₹{order.totalDiscountedPrice}
              </span>
            </p>

            {(size || color) && (
              <p className="text-[11px] text-gray-500">
                {size && <>Size: <span className="font-medium">{size}</span>{" "}</>}
                {color && <>Color: <span className="font-medium">{color}</span></>}
              </p>
            )}
          </div>
        </Grid>

        {/* Right side */}
        <Grid item xs={12} sm={3}>
          <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center h-full gap-1">
            {status === "DELIVERED" ? (
              <div className="flex items-center text-xs md:text-sm text-green-700">
                <CheckCircleIcon sx={{ fontSize: "1.1rem", marginRight: 0.3 }} />
                <span>Delivered</span>
              </div>
            ) : (
              <span className="text-xs md:text-sm text-gray-600">
                View order details
              </span>
            )}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default OrderCard;
