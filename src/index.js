import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import {BrowserRouter as Router} from 'react-router-dom'

import {ProductsContext,ProductsContextProvider} from './frontend/context/ProductContext'
import {CartContext,CartContextProvider} from './frontend/context/CartContext'
import { WishlistContext,WishlistContextProvider } from "./frontend/context/WishlistContext";
import { SingleProductContext,SingleProductContextProvider } from "./frontend/context/SingleProductContext";
import {CategoryContext,CategoryContextProvider} from './frontend/context/CategoryContext'
import {AuthContext,AuthContextProvider} from './frontend/context/AuthContext'
import { AddressContext,AddressContextProvider } from "./frontend/context/AddressContext";

export {ProductsContext,CartContext,WishlistContext,SingleProductContext,CategoryContext,AuthContext,AddressContext};
// Call make Server
makeServer();

const root = ReactDOM.createRoot(document.getElementById("root"));


root.render(
    <Router>
      <AuthContextProvider>
      <ProductsContextProvider>
        <CartContextProvider>
          <WishlistContextProvider>
            <SingleProductContextProvider>
              <CategoryContextProvider>
                <AddressContextProvider>
                  <App />
                </AddressContextProvider>
              </CategoryContextProvider>
            </SingleProductContextProvider>
          </WishlistContextProvider>
        </CartContextProvider>
      </ProductsContextProvider>       
    </AuthContextProvider>
    </Router>
);
