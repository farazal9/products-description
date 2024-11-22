import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Card,
  Typography,
  CircularProgress,
  Container,
} from "@mui/material";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import CloseIcon from '@mui/icons-material/Close';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("https://fakestoreapi.com/products?limit=5");
        if (response.status === 200) {
          setProducts(response.data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Container>
      {isLoading ? (
        <Box className="text-center my-5">
          <CircularProgress />
        </Box>
      ) : (
        <Box display="flex" gap={3}>
          {/* Left Section: Product List */}
          <Box flex={1}>
            {products.map((product, index) => (
              <Card
                key={index}
                className="d-flex align-items-center p-3 mb-4"
                sx={{
                  cursor: "pointer",
                  maxWidth: "400px",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "row",
                  gap: 2,
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                }}
                onClick={() => setSelectedProduct(product)} // Update selected product on card click
              >
                <img
                  src={product.image}
                  alt={product.title}
                  style={{
                    maxHeight: "150px",
                    width: "150px",
                    objectFit: "contain",
                  }}
                />
                <Box>
                  <Typography variant="h6" gutterBottom>
                    {product.title.length > 20
                      ? `${product.title.slice(0, 20)}...`
                      : product.title}
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    ⭐ Rating: {product.rating.rate} ({product.rating.count} reviews)
                  </Typography>
                  <Box>
                    <ExpandCircleDownIcon
                      onClick={() => setSelectedProduct(product)}
                      sx={{ cursor: "pointer", color: "primary.main" }}
                    />
                  </Box>
                </Box>
              </Card>
            ))}
          </Box>

          {/* Right Section: Product Description */}
          <Box flex={1} className="p-4 border-start">
            {selectedProduct ? (
              <>
             <Box className="d-flex align-items-center justify-content-between">
             <Typography variant="h5">{selectedProduct.title}</Typography>
             <CloseIcon sx={{cursor:"pointer"}} onClick={()=> setSelectedProduct(null)}  color="error"/>
             </Box>
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.title}
                  style={{ maxWidth: "100%", marginTop: "1rem" }}
                />
                <Typography variant="body1" className="mt-3">
                  {selectedProduct.description}
                </Typography>
                <Typography variant="h6" className="mt-3">
                  Price: ${selectedProduct.price}
                </Typography>
              </>
            ) : (
              <Typography>Select a product to see details.</Typography>
            )}
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default Product;
