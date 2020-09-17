import React, { useEffect } from "react";
import Carousel from "../components/Carousel";
import RootContext from "../context";
import { useContext } from "react";
import { useState } from "react";
import ProdctsListItem from "../components/ProdctsListItem";
const Home = () => {
  const { products } = useContext(RootContext);
  const productsOnSale = products.filter(
    (product) => product.productDiscount > 0,
  );
  console.log(productsOnSale);

  return (
    <div>
      <Carousel products={productsOnSale} />
      <ul
        style={{
          width: "90%",
          display: "flex",
          margin: "auto",
          listStyle: "none",
          justifyContent: "space-beetwen",
          flexWrap: "wrap",
        }}
      >
        {productsOnSale.map((product) => (
          <ProdctsListItem product={product} noCartButton />
        ))}
      </ul>
    </div>
  );
};

export default Home;
