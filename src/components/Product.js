import React from "react";
import styled from "styled-components";
import Button from "./atoms/Button";
import RootContext from "../context";
import { useContext } from "react";
const StyledWrapper = styled.div`
  width: 65%;
  margin: auto;
  text-align: center;
`;
const Product = (props) => {
  const { addProductToTheCart } = useContext(RootContext);
  const { product } = props.location.state;
  const { productName, productPrice, productImage, productDesc } = product;
  return (
    <StyledWrapper>
      <h1> {productName}</h1>
      <img style={{ width: "500px" }} src={productImage} alt="product" />
      <p>{productDesc}</p>
      <p style={{ fontSize: "30px" }}>{productPrice}€</p>
      <Button
        onClick={() => {
          addProductToTheCart(product);
        }}
        isHoverable
      >
        Add to cart
      </Button>
    </StyledWrapper>
  );
};

export default Product;
