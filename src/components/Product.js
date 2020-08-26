import React from "react";
import styled from "styled-components";
const StyledWrapper = styled.div`
  width: 65%;
  margin: auto;
  text-align: center;
`;
const Product = (props) => {
  const {
    productName,
    productPrice,
    productImage,
    productDesc,
  } = props.location.state;
  return (
    <StyledWrapper>
      <h1> {productName}</h1>
      <img style={{ width: "500px" }} src={productImage} alt="product" />
      <p>{productDesc}</p>
      <p style={{ fontSize: "30px" }}>{productPrice}€</p>
    </StyledWrapper>
  );
};

export default Product;
