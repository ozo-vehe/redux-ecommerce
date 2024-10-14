import PropTypes from "prop-types";
import Cart from "./Cart";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { getCartItems } from "../features/cart/cartSlice";

export default function CartList({ remove }) {
  const [show, setShow] = useState(false);
  const carts = useSelector((state) => getCartItems(state));

  return (
    <div className="relative">
      <img
        className="icon"
        src="https://img.icons8.com/material-outlined/24/null/shopping-cart--v1.png"
        alt="shopping-cart"
        onClick={() => {
          setShow(!show);
        }}
      />
      {show && (
        <div className="productCart rounded-md flex flex-col absolute right-0 border w-400 pb-8 z-20">
          <h1 className="text-2xl relative font-bold underline mb-6">
            Cart
            <img
              className="w-4 h-4 absolute right-2 top-2"
              src="https://img.icons8.com/ios-glyphs/30/delete-sign.png"
              alt="delete-sign"
              onClick={() => {
                setShow(!show);
              }}
            />
          </h1>
          {carts.map((product) => (
            <Cart
              key={product.id}
              cart={product}
              remove={(id) => remove({ id: id })}
            />
          ))}

          <div className="mt-4">
            <p className="oswald text-xl font-bold m-2">
              Total Items: {carts.length}
            </p>
            <p className="oswald text-xl mb-4 font-bold">
              Total: $
              {carts
                .reduce((acc, curr) => acc + curr.price * curr.quantity, 0)
                .toFixed(2)}
            </p>
            {carts.length >= 1 && (
              <Link
                to="/checkout"
                className="bg-custom-blue text-white rounded-full p-4 w-full block"
                onClick={() => {
                  console.log("Clicked");
                  setShow(!show);
                }}
              >
                Checkout
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

CartList.propTypes = {
  cart: PropTypes.array.isRequired,
  remove: PropTypes.func.isRequired,
};
