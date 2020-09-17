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
import { client } from "../contentfulData/contentfulData";

const Root = () => {
  const [products, setProducts] = useState([...productsArray]);
  //state for cart
  const [isCartOpen, setCartOpen] = useState(false);

  const getCartFromLocalStorage = () => {
    let tempCart;
    if (localStorage.getItem("cart")) {
      tempCart = JSON.parse(localStorage.getItem("cart"));
    } else {
      tempCart = [];
    }
    return tempCart;
  };

  const [cart, setCart] = useState(getCartFromLocalStorage());
  const getCartCounterFromLocalStorage = () => {
    let tempCartCounter;
    if (localStorage.getItem("cartCounter")) {
      tempCartCounter = JSON.parse(localStorage.getItem("cartCounter"));
    } else {
      tempCartCounter = 0;
    }
    return tempCartCounter;
  };
  const [cartCounter, setCartCounter] = useState(
    getCartCounterFromLocalStorage(),
  );
  const [cartTotal, setCartTotal] = useState(0);
  //state for filters
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [price, setPrice] = useState(0);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);
  const [category, setCategory] = useState("all");
  const [pictures, setPictures] = useState([]);
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  // local storage
  const setCartToLocalStorage = () => {
    localStorage.setItem("cart", JSON.stringify(cart));
  };
  const setCartCounterToLocalStorage = () => {
    localStorage.setItem("cartCounter", JSON.stringify(cartCounter));
  };

  //
  const getContentfulData = () => {
    client
      .getEntries({ content_type: "productName" })
      .then((response) => setContentfulData(response.items));
  };
  const setContentfulData = (data) => {
    if (data.length !== 0) {
      let contentfulProducts = data.map((item) => {
        const productImage = item.fields.productImage.fields.file.url;
        const productName = item.fields.productName;
        const productDesc = item.fields.productDesc;
        const productCategories = item.fields.productCategories;
        const productQuantity = item.fields.productQuantity;
        const productPrice = item.fields.productPrice;
        const productDiscount = item.fields.productDiscount;
        const discountPosition = item.fields.discountPosition;
        const id = item.sys.id;
        const product = {
          id,
          productImage,
          productName,
          productDesc,
          productCategories,
          productQuantity,
          productPrice,
          productDiscount,
          discountPosition,
        };
        return product;
      });
      setProducts(contentfulProducts);
      setProductsFilterPrices(contentfulProducts);
      getCategories();
    }
  };
  const getCategories = () => {
    const tempCategories = [];
    products.map((product) => {
      if (!tempCategories.includes(product.productCategories)) {
        tempCategories.push(product.productCategories);
      }
    });
    setCategories(tempCategories);
  };
  useEffect(() => {
    getContentfulData();
  }, []);
  //for filters
  const clearFilters = () => {
    setPrice(max);
    setCategory("all");
    setSearch("");
  };
  const setProductsFilterPrices = (products) => {
    let maxPrice = Math.max(...products.map((product) => product.productPrice));
    setMax(maxPrice);
    setPrice(maxPrice);
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
    setCartToLocalStorage();
    setCartCounterToLocalStorage();
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
    const productFromCart = cart.find(
      (p) => p.productName === product.productName,
    );

    if (!productFromCart) {
      product.productQuantity = 1;
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
    setCartCounter(0);
    setCart([]);
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
          clearFilters,
          categories,
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
