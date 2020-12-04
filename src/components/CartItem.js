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
  grid-template-columns: 25% 20% 10% 8% 8% 15% 8%;
  border-bottom: 1px solid black;
  padding: 10px;
  grid-column-gap: 2%;
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
      <div>
        <h4>{productName}</h4>
      </div>
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
