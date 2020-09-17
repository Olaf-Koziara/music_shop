import React, { useContext } from "react";
import Button from "./atoms/Button";
import { useSpring, animated } from "react-spring";
import styled, { css } from "styled-components";
import StyledImage from "./atoms/Image.js";
import RootContext from "../context";
import { Link } from "react-router-dom";
import StyledDiscountWrapper from "./atoms/StyledDiscountWrapper";
const calc = (x, y) => [x - window.innerWidth / 2, y - window.innerHeight / 2];
const trans1 = (x, y) => `translate3d(${x / -20}px,${y / -20}px,0)`;

const ProdctsListItem = ({ product, noCartButton }) => {
  const {
    productName,
    productPrice,
    productImage,

    productDiscount,
    discountPosition,
  } = product;

  const [props, set] = useSpring(() => ({
    xy: [0, 0],
    config: { mass: 10, tension: 650, friction: 100 },
  }));
  const value = useContext(RootContext);
  const { addProductToTheCart } = value;
  const StyledListItem = styled(animated.div)`
    width: 400px;
    margin-top: auto;
    margin-left: auto;
    margin-right: auto;
    transition: 0.4s ease-in-out;
  `;
  const startAnimation = (e) => {
    e.target.style.transform = "scale(0.2)";
  };
  return (
    <StyledListItem
      onMouseMove={({ clientX: x, clientY: y }) => set({ xy: calc(x, y) })}
      style={{ transform: props.xy.interpolate(trans1) }}
    >
      <Link
        to={{
          pathname: `/products/${productName}`,
          state: {
            product: product,
          },
        }}
      >
        <StyledImage isMedium src={productImage} alt="product"></StyledImage>
        <h2>{productName}</h2>

        {productDiscount > 0 ? (
          <>
            <del>{productPrice}€</del>
            <p>{productPrice - (productPrice * productDiscount) / 100}€</p>
            <StyledDiscountWrapper position={discountPosition}>
              -{productDiscount}%
            </StyledDiscountWrapper>
          </>
        ) : (
          <p>{productPrice}€</p>
        )}
      </Link>
      {!noCartButton ? (
        <Button
          onClick={() => {
            addProductToTheCart(product);
          }}
          isHoverable
        >
          Add to cart
        </Button>
      ) : null}
    </StyledListItem>
  );
};

export default ProdctsListItem;
