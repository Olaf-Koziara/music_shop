import React, { useState } from "react";
import { BrowserRouter, Switch, Route, useHistory } from "react-router-dom";
import Home from "../views/Home";
import Contact from "../views/Contact";
import Products from "../views/Products";
import About from "../views/About";
import MainTemplate from "../templates/MainTemplate";
import RootContext from "../context";
import { productsArray } from "../localData/productsArray";
import { ThemeProvider } from "styled-components";
import { mainTheme } from "../theme/mainTheme";
import GlobalStyle from "../theme/GlobalStyle";
import CartItem from "../components/CartItem";
import Product from "../components/Product";
import { useEffect } from "react";

const Root = () => {
  const [products, setProducts] = useState([...productsArray]);
  //state for cart
  const [isCartOpen, setCartOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [cartCounter, setCartCounter] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  //state for filters
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [price, setPrice] = useState(0);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);
  const [category, setCategory] = useState("all");
  //for filters
  useEffect(() => {
    setProductsData(products);
  }, []);
  const setProductsData = (products) => {
    let maxPrice = Math.max(...products.map((product) => product.productPrice));
    setMax(maxPrice);
    setPrice(maxPrice);
    console.log(maxPrice);
  };
  const handlePriceInputChange = (e) => {
    setPrice(e.target.value);
  };
  useEffect(() => {
    filterProducts();
  }, [price, category]);

  const filterProducts = () => {
    let tempProducts;
    if (category === "all") {
      tempProducts = [...products];
    } else {
      tempProducts = products.filter(
        (product) => product.productCategories === category,
      );
    }
    let tempPrice = parseInt(price);
    tempProducts = tempProducts.filter(
      (product) => product.productPrice <= tempPrice,
    );
    setFilteredProducts(tempProducts);
  };

  //for cart
  const calculateCartTotals = () => {
    let total = 0;
    cart.forEach((product) => {
      total += product.productQuantity * product.productPrice;
    });
    setCartTotal(total);
  };
  useEffect(() => {
    calculateCartTotals();
  }, [cart, cartCounter]);
  const increaseCartItemQuantity = (name) => {
    cart.find((p) => p.productName === name).productQuantity++;
    increaseCartCounter();
  };
  const decreaseCartItemQuantity = (name) => {
    cart.find((p) => p.productName === name).productQuantity--;
    decreaseCartCounter();
  };
  const increaseCartCounter = () => {
    setCartCounter(cartCounter + 1);
  };
  const decreaseCartCounter = () => {
    setCartCounter(cartCounter - 1);
  };

  const handleCartOpen = () => {
    setCartOpen(true);
  };

  const handleCartClose = () => {
    setCartOpen(false);
  };
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };
  const addProductToTheCart = (product) => {
    increaseCartCounter();
    const productFromCartArray = cart.filter(
      (p) => p.productName === product.productName,
    );
    const productFromCart = productFromCartArray[0];
    if (!productFromCart) {
      setCart([{ ...product }, ...cart]);
    } else {
      const tmpProduct = { ...productFromCart };

      const tmpCart = cart.filter(
        (p) => p.productName !== tmpProduct.productName,
      );
      tmpProduct.productQuantity++;
      setCart([tmpProduct, ...tmpCart]);
    }
  };
  const deleteProductFromCart = (productName, quantity) => {
    const filteredCart = cart.filter(
      (product) => product.productName !== productName,
    );
    setCart([...filteredCart]);
    setCartCounter(cartCounter - quantity);
  };
  const clearCart = () => {
    setCart([]);
    setCartCounter(0);
  };

  return (
    <BrowserRouter>
      <RootContext.Provider
        value={{
          products,
          isCartOpen,
          handleCartClose,
          handleCartOpen,
          search,
          handleSearchChange,
          cart,
          cartCounter,
          increaseCartItemQuantity,
          decreaseCartItemQuantity,
          addProductToTheCart,
          deleteProductFromCart,
          price,
          min,
          max,
          filteredProducts,
          handlePriceInputChange,
          setCategory,
          cartTotal,
          clearCart,
        }}
      >
        <GlobalStyle />
        <ThemeProvider theme={mainTheme}>
          <MainTemplate>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/products" component={Products} />
              <Route path="/about" component={About} />
              <Route path="/contact" component={Contact} />
              <Route path="/products/:name" component={Product} />
            </Switch>
          </MainTemplate>
        </ThemeProvider>
      </RootContext.Provider>
    </BrowserRouter>
  );
};

export default Root;
