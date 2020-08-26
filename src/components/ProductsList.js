import React, { useContext } from "react";
import RootContext from "../context";
import ProdctsListItem from "./ProdctsListItem";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";
import { CSSTransition } from "react-transition-group";

const ProductsList = () => {
  const value = useContext(RootContext);
  const appear = useSpring({
    transform: "scale(1)",
    opacity: 1,
    from: { transform: "scale(1.3)", opacity: 0 },
    config: { duration: 400 },
  });
  const StyledProductsList = styled(animated.ul)`
    display: grid;
    align-content: end;
    width: 90%;
    margin: auto;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 50px;
    list-style: none;
    margin-top: 60px;
  `;

  return (
    <StyledProductsList style={appear}>
      {value.filteredProducts
        .filter((product) => {
          if (!value.search) {
            return product;
          } else if (
            product.productName
              .toLowerCase()
              .includes(value.search.toLowerCase()) ||
            product.productCategories
              .toLowerCase()
              .includes(value.search.toLowerCase())
          ) {
            return product;
          }
        })
        .map((product, index) => (
          <ProdctsListItem key={index} product={product} />
        ))}
    </StyledProductsList>
  );
};

export default ProductsList;
