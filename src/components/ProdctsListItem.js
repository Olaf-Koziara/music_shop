import React, { useContext } from "react";
import Button from "./atoms/Button";
import { useSpring, animated } from "react-spring";
import styled from "styled-components";
import StyledImage from "./atoms/Image.js";
import RootContext from "../context";
import { Link } from "react-router-dom";
const calc = (x, y) => [x - window.innerWidth / 2, y - window.innerHeight / 2];
const trans1 = (x, y) => `translate3d(${x / -20}px,${y / -20}px,0)`;

const ProdctsListItem = ({ product }) => {
  const { productName, productPrice, productImage, productDesc } = product;
  const [props, set] = useSpring(() => ({
    xy: [0, 0],
    config: { mass: 10, tension: 650, friction: 100 },
  }));
  const value = useContext(RootContext);
  const { increaseCartCounter, addProductToTheCart } = value;
  const StyledListItem = styled(animated.li)`
    width: 400px;
    margin-top: auto;
    margin-left: auto;
    margin-right: auto;
  `;

  return (
    <StyledListItem
      onMouseMove={({ clientX: x, clientY: y }) => set({ xy: calc(x, y) })}
      style={{ transform: props.xy.interpolate(trans1) }}
    >
      <Link
        to={{
          pathname: `/products/${productName}`,
          state: {
            productName,
            productPrice,
            productImage,
            productDesc,
          },
        }}
      >
        <StyledImage isMedium src={productImage} alt="product" />
        <h2>{productName}</h2>
        <p>{productPrice}€</p>
      </Link>
      <Button
        onClick={() => {
          addProductToTheCart(product);
        }}
        isHoverable
      >
        Add to cart
      </Button>
    </StyledListItem>
  );
};

export default ProdctsListItem;
