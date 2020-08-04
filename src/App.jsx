import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Home from './Pages/Home';
import Platillo from './Pages/Platillo';
import Carrito from './Pages/Carrito';
import Menu from "./Components/Menu";

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (platillo) => {
    setCart([...cart, platillo]);
  }
  const removeFromCart = (_id) => {
    setCart(cart.filter(platillo => {
      return platillo._id !== _id;
    }));
  }

  return (
    <Router>

      <Menu numCart={cart.length} />

      <Switch>
        <Route path="/platillo/:_id" render={(props) => <Platillo addToCart={addToCart} {...props} />} />
        <Route path="/carrito">
          <Carrito cart={cart} removeFromCart={removeFromCart} />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>

    </Router>

  );
}

export default App;
