import React from "react";
import styled, { css } from "styled-components";
import { useState } from "react";
import StyledDiscountWrapper from "./atoms/StyledDiscountWrapper";
import { useEffect } from "react";
import saleLogo from "../assets/saleLogo.png";
import { Link } from "react-router-dom";
import Fade from "react-reveal/Fade";
const StyledCarouselWrapper = styled.div`
  width: 40%;
  margin: auto;
  margin-top: 50px;
  position: relative;

  margin-bottom: 15px;
`;
const StyledProgressBar = styled.div`
  width: ${({ width }) => width};
  height: 20px;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 2px;
`;

const Carousel = ({ products }) => {
  const [progression, setProgression] = useState(0);
  const [counter, setCounter] = useState(0);
  let int = 0;
  const changeImage = () => {
    clearInterval(int);

    setCounter((counter) => counter + 1);
  };

  const tempProduct = products[counter % products.length];
  useEffect(() => {
    const interval = setInterval(() => {
      changeImage();
    }, 5000);

    return () => clearInterval(interval);
  }, []);
  return (
    <StyledCarouselWrapper>
      {tempProduct ? (
        <Link
          to={{
            pathname: `/products/${tempProduct.productName}`,
            state: {
              product: tempProduct,
            },
          }}
        >
          <div style={{ position: "relative", width: "auto" }}>
            <div>
              <img
                style={{
                  width: "90%",
                  maxHeight: "550px",
                  margin: "auto",
                }}
                src={tempProduct.productImage}
                alt="product"
              />
              <StyledDiscountWrapper position={tempProduct.discountPosition}>
                -{tempProduct.productDiscount}%
              </StyledDiscountWrapper>
            </div>

            <img
              style={{
                width: "30%",
                position: "absolute",
                right: "-30%",
                top: "-10%",
              }}
              src={saleLogo}
              alt="sale"
            />
            <StyledProgressBar
              width={(progression % 100) + "%"}
            ></StyledProgressBar>
          </div>
        </Link>
      ) : null}
    </StyledCarouselWrapper>
  );
};

export default Carousel;
