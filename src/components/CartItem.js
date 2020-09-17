import React, { useContext } from "react";
import StyledImage from "./atoms/Image";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import Button from "./atoms/Button";
import RootContext from "../context";
import IndeterminateCheckBoxRoundedIcon from "@material-ui/icons/IndeterminateCheckBoxRounded";
import AddBoxIcon from "@material-ui/icons/AddBox";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
const StyledLi = styled.li`
  display: grid;
  grid-template-columns: 20% 30% 10% 5% 5% 10% 5%;
  border-bottom: 1px solid black;
  padding: 10px;
  grid-column-gap: 3%;
`;
const StyledSpan = styled.span`
  text-align: center;
`;
const CartItem = (product) => {
  const { productName, productPrice, productQuantity, productImage } = product;
  const value = useContext(RootContext);
  const {
    deleteProductFromCart,

    increaseCartItemQuantity,
    decreaseCartItemQuantity,
  } = value;
  return (
    <StyledLi>
      <StyledImage isTiny src={productImage} alt={productName} />
      <h4>{productName}</h4>
      <Button
        icon
        disabled={productQuantity < 2}
        onClick={() => decreaseCartItemQuantity(productName)}
      >
        <IndeterminateCheckBoxRoundedIcon />
      </Button>
      <StyledSpan rounded>
        <p>{productQuantity}</p>
      </StyledSpan>
      <Button onClick={() => increaseCartItemQuantity(productName)} icon>
        <AddBoxIcon />
      </Button>
      <StyledSpan>
        <h4>{productPrice}€</h4>
      </StyledSpan>

      <Button
        onClick={() => deleteProductFromCart(productName, productQuantity)}
        icon
      >
        <DeleteForeverIcon />
      </Button>
    </StyledLi>
  );
};

export default CartItem;
