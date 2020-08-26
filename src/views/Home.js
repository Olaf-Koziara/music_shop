import React, { useEffect } from "react";
import Carousel from "../components/Carousel";
import RootContext from "../context";
import { useContext } from "react";
import { useState } from "react";
const Home = () => {
  const { products } = useContext(RootContext);
  const productsOnSale = products.filter((product) => product.discount > 0);

  return (
    <div>
      <Carousel products={productsOnSale} />
    </div>
  );
};

export default Home;
