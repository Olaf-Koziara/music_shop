import React from "react";
import styled, { css } from "styled-components";
import { useState } from "react";

import { useEffect } from "react";
import saleLogo from "../assets/saleLogo.png";

const StyledCarouselWrapper = styled.div`
  width: 30%;
  margin: auto;
  margin-top: 50px;
  position: relative;
`;
const StyledDiscountWrapper = styled.div`
  background-color: ${({ theme }) => theme.redSalsa};
  position: absolute;
  left: 0%;
  bottom: 10%;
  padding: 20px 10px;
  border-radius: 200px;
  font-size: 30px;
`;

const Carousel = ({ products }) => {
  const [counter, setCounter] = useState(0);
  const changeImage = () => {
    if (counter < products.length) setCounter((counter) => counter + 1);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      changeImage();
    }, 4000);
    return () => clearInterval(interval);
  }, []);
  return (
    <StyledCarouselWrapper>
      <img
        style={{ width: "50%", position: "absolute", right: "-60%" }}
        src={saleLogo}
        alt="sale"
      />
      <img
        style={{ width: "500px" }}
        src={products[counter % products.length].productImage}
        alt="product"
      />
      <StyledDiscountWrapper>
        -{products[counter % products.length].discount}%
      </StyledDiscountWrapper>
    </StyledCarouselWrapper>
  );
};

export default Carousel;
