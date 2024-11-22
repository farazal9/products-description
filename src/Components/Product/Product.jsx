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
import CloseIcon from "@mui/icons-material/Close";

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
        <Box style={{ textAlign: "center", margin: "2rem 0" }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box style={{ display: "flex", gap: "1.5rem" }}>
          {/* Left Section: Product List */}
          <Box style={{ flex: 1 }}>
            {products.map((product, index) => (
              <Card
                key={index}
                style={{
                  cursor: "pointer",
                  maxWidth: "400px",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "row",
                  gap: "1rem",
                  padding: "1rem",
                  marginBottom: "1rem",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                }}
                onClick={() => setSelectedProduct(product)}
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
                  <Typography variant="h6" style={{ marginBottom: "0.5rem" }}>
                    {product.title.length > 20
                      ? `${product.title.slice(0, 20)}...`
                      : product.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    style={{ color: "gray", fontSize: "0.9rem" }}
                  >
                    ⭐ Rating: {product.rating.rate} ({product.rating.count} reviews)
                  </Typography>
                  <Box>
                    <ExpandCircleDownIcon
                      onClick={() => setSelectedProduct(product)}
                      style={{ cursor: "pointer", color: "blue" }}
                    />
                  </Box>
                </Box>
              </Card>
            ))}
          </Box>

          {/* Right Section: Product Description */}
          <Box
            style={{
              flex: 1,
              padding: "1rem",
              borderLeft: "1px solid #ddd",
            }}
          >
            {selectedProduct ? (
              <>
                <Box
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="h5">{selectedProduct.title}</Typography>
                  <CloseIcon
                    style={{ cursor: "pointer", color: "red" }}
                    onClick={() => setSelectedProduct(null)}
                  />
                </Box>
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.title}
                  style={{ maxWidth: "100%", marginTop: "1rem" }}
                />
                <Typography style={{ marginTop: "1rem", fontSize: "1rem" }}>
                  {selectedProduct.description}
                </Typography>
                <Typography
                  style={{
                    marginTop: "1rem",
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                  }}
                >
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
