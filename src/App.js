import "./App.css";

import { Route,Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {Home} from './frontend/pages/Home/Home'
import {Products} from './frontend/pages/Products/Products'
import {Cart} from './frontend/pages/Cart/Cart'
import {Wishlist} from './frontend/pages/Wishlist/Wishlist'
import {Product} from './frontend/pages/SingleProductPage/Product'
import { Login,Signup } from "./frontend/pages/Auth/Auth";
import { Profile } from "./frontend/pages/Profile/Profile";
import { Checkout } from "./frontend/pages/Checkout/Checkout";

import {RequiresAuth} from './frontend/Utils/RequireAuth'

function App() {
  return (
    <div className="App">
       <ToastContainer
        position="bottom-right"
        autoClose="400"
        closeOnClick="true"
        draggable="true"
        borderRadius="10px"
      />
    
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path='/products'element={<Products/>} />
      <Route path='/products/:productId'element={<Product/>} />
      <Route path='/checkout' element={<Checkout/>} />
      <Route path="/cart" element={
      <RequiresAuth>
        <Cart/>
      </RequiresAuth>
      } />

<Route path="/profile" element={
      <RequiresAuth>
        <Profile/>
      </RequiresAuth>
      } />

      <Route path="/wishlist" element={<RequiresAuth>
        <Wishlist/>
      </RequiresAuth>} />
      
    </Routes>
    </div>
  );
}

export default App;
