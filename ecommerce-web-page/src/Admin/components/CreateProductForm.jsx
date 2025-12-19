import { useState, Fragment } from "react";
import {
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Box,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { createProduct } from "../../State/Product/Action";

const initialSizes = [
  { name: "S", quantity: 0 },
  { name: "M", quantity: 0 },
  { name: "L", quantity: 0 },
];

const CreateProductForm = () => {
  const [productData, setProductData] = useState({
    imageUrl: "",
    brand: "",
    title: "",
    color: "",
    discountedPrice: "",
    price: "",
    discountPersent: "",
    size: initialSizes,
    quantity: "",
    topLevelCategory: "",
    secondLevelCategory: "",
    thirdLevelCategory: "",
    description: "",
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSizeChange = (e, index) => {
    let { name, value } = e.target;
    name = name === "size_quantity" ? "quantity" : name;

    const sizes = [...productData.size];
    sizes[index][name] = value;

    setProductData((prev) => ({ ...prev, size: sizes }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createProduct( productData ));
  };

  return (
    <Fragment>
      <Typography variant="h3" textAlign="center" mb={3}>
        Add New Product
      </Typography>

      <Paper
        elevation={3}
        sx={{
          maxWidth: "900px",
          mx: "auto",
          p: 4,
          borderRadius: "12px",
          background: "#ffffff",
        }}
      >
        <form onSubmit={handleSubmit}>

          {/* FULL ROW INPUT */}
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              label="Image URL"
              name="imageUrl"
              value={productData.imageUrl}
              onChange={handleChange}
            />
          </Box>

          {/* TWO COLS → FLEX */}
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 2 }}>
            <TextField
              label="Brand"
              name="brand"
              value={productData.brand}
              onChange={handleChange}
              sx={{ flex: "1 1 300px" }}
              fullWidth
            />

            <TextField
              label="Title"
              name="title"
              value={productData.title}
              onChange={handleChange}
              sx={{ flex: "1 1 300px" }}
              fullWidth
            />
          </Box>

          {/* TWO COLS */}
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 2 }}>
            <TextField
              label="Color"
              name="color"
              value={productData.color}
              onChange={handleChange}
              sx={{ flex: "1 1 300px" }}
              fullWidth
            />

            <TextField
              label="Quantity"
              name="quantity"
              type="number"
              value={productData.quantity}
              onChange={handleChange}
              sx={{ flex: "1 1 300px" }}
              fullWidth
            />
          </Box>

          {/* THREE COLS (33% each) */}
          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexWrap: "wrap",
              mb: 2,
            }}
          >
            <TextField
              label="Price"
              name="price"
              type="number"
              value={productData.price}
              onChange={handleChange}
              sx={{ flex: "1 1 250px" }}
              fullWidth
            />

            <TextField
              label="Discounted Price"
              name="discountedPrice"
              type="number"
              value={productData.discountedPrice}
              onChange={handleChange}
              sx={{ flex: "1 1 250px" }}
              fullWidth
            />

            <TextField
              label="Discount Percentage"
              name="discountPersent"
              type="number"
              value={productData.discountPersent}
              onChange={handleChange}
              sx={{ flex: "1 1 250px" }}
              fullWidth
            />
          </Box>

          {/* CATEGORY ROW - 3 equal boxes */}
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 2 }}>
            <FormControl fullWidth sx={{ flex: "1 1 250px" }}>
              <InputLabel>Top Level Category</InputLabel>
              <Select
                name="topLevelCategory"
                value={productData.topLevelCategory}
                onChange={handleChange}
              >
                <MenuItem value="men">Men</MenuItem>
                <MenuItem value="women">Women</MenuItem>
                <MenuItem value="kids">Kids</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ flex: "1 1 250px" }}>
              <InputLabel>Second Level Category</InputLabel>
              <Select
                name="secondLevelCategory"
                value={productData.secondLevelCategory}
                onChange={handleChange}
              >
                <MenuItem value="clothing">Clothing</MenuItem>
                <MenuItem value="accessories">Accessories</MenuItem>
                <MenuItem value="brands">Brands</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ flex: "1 1 250px" }}>
              <InputLabel>Third Level Category</InputLabel>
              <Select
                name="thirdLevelCategory"
                value={productData.thirdLevelCategory}
                onChange={handleChange}
              >
                <MenuItem value="top">Tops</MenuItem>
                <MenuItem value="women_dress">Dresses</MenuItem>
                <MenuItem value="t-shirts">T-Shirts</MenuItem>
                <MenuItem value="saree">Saree</MenuItem>
                <MenuItem value="lengha_choli">Lengha Choli</MenuItem>
                <MenuItem value="mens_kurta">Mens Kurta</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* DESCRIPTION FULL WIDTH */}
          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Description"
              name="description"
              value={productData.description}
              onChange={handleChange}
            />
          </Box>

          {/* SIZES SECTION */}
          <Typography variant="h6" mb={1}>
            Sizes
          </Typography>

          {productData.size.map((size, idx) => (
            <Box
              key={idx}
              sx={{
                display: "flex",
                gap: 2,
                flexWrap: "wrap",
                mb: 2,
              }}
            >
              <TextField
                label="Size Name"
                name="name"
                value={size.name}
                onChange={(e) => handleSizeChange(e, idx)}
                sx={{ flex: "1 1 300px" }}
                fullWidth
              />

              <TextField
                label="Quantity"
                name="size_quantity"
                type="number"
                value={size.quantity}
                onChange={(e) => handleSizeChange(e, idx)}
                sx={{ flex: "1 1 300px" }}
                fullWidth
              />
            </Box>
          ))}

          {/* SUBMIT BUTTON */}
          <Box textAlign="center" mt={3}>
            <Button variant="contained" size="large" type="submit" sx={{ px: 5 }}>
              ADD NEW PRODUCT
            </Button>
          </Box>
        </form>
      </Paper>
    </Fragment>
  );
};

export default CreateProductForm;
