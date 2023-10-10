import * as React from "react";
import { createTask } from "./utils";

const products = [
  { id: 1, name: "Poké Ball", price: 10 },
  { id: 2, name: "Great Ball", price: 20 },
  { id: 3, name: "Ultra Ball", price: 30 }
];

function calculateTotal(cart) {
  if(cart){
    return cart.reduce((total, item) => {
      return total + item.price * item.quantity;
    }
    , 0);
  }
  return 0;
}

const initialState = [];

function reducer(cart, action) {
  switch(action.type) {
    case "add": {
      const { id } = action;
      // check if item is already in cart
      const itemInCart = cart.find((item) => item.id === id);
      if (itemInCart) {
        return cart.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // if item is not in cart, add it
        const product = products.find((product) => product.id === id);
        return [
          ...cart,
          {
            ...product,
            quantity: 1
          }
        ];
      }
    }
    case "update": {
      const { id, adjustment } = action;
      return cart.map((item) =>(
        item.id === id
          ? { ...item, quantity: item.quantity + (adjustment === "increment" ? 1 : -1) }
          : item
      ));
    }
    case "remove": {
      const { id } = action;
      return cart.filter((item) => item.id !== id);
    }
    default: {
      return cart;
    }
  }
}

export default function ShoppingCart() {
  const [cart, dispatch] = React.useReducer(reducer, initialState);

  const handleAddToCart = (id) => dispatch({ type: "add", id });

  const handleUpdateQuantity = (id, adjustment, quantity) => {
    if (adjustment === "decrement" && quantity === 1) {
      return dispatch({ type: "remove", id });
    }
    dispatch({
      type: "update",
      id,
      adjustment
    });
  };

  return (
    <main>
      <h1>Poké Mart</h1>
      <section>
        <div>
          <ul className="products">
            {products.map((product) => (
              <li key={product.id}>
                {product.name} - ${product.price}
                <button
                  className="primary"
                  onClick={() => handleAddToCart(product.id)}
                >
                  Add to cart
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <hr />
      <aside>
        <div>
          <h2>Shopping Cart</h2>
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                {item.name}
                <div>
                  <button
                    onClick={() => handleUpdateQuantity(item.id, "decrement", item.quantity)}
                  >
                    -
                  </button>
                  {item.quantity}
                  <button
                    onClick={() => handleUpdateQuantity(item.id, "increment")}
                  >
                    +
                  </button>
                </div>
              </li>
            ))}
            {!cart.length && <li>Cart is empty</li>}
          </ul>
        </div>
        <hr />

        <h3>Total: ${calculateTotal(cart)}</h3>
      </aside>
    </main>
  );
            }
