import React from "react";
import ProductsList from "../components/ProductsList";
import FilterMenu from "../navigation/FilterMenu";
const Products = () => {
  return (
    <div>
      <FilterMenu />

      <ProductsList />
    </div>
  );
};

export default Products;
