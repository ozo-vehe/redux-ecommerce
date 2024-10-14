/**
 * Checkout Component
 *
 * This component renders a checkout page for an e-commerce application.
 * It displays a form for shipping and payment information, and handles the checkout process.
 *
 * @component
 * @example
 * return (
 *   <Checkout />
 * )
 */

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signedUser } from "../features/users/usersSlice";
import {
  clearCart,
  deleteCartItems,
  getCartItems,
} from "../features/cart/cartSlice";

const Checkout = () => {
  // State for total price
  const [totalPrice, setTotalPrice] = useState();

  // Redux selectors and dispatch
  const user = useSelector((state) => signedUser(state));
  const cartItems = useSelector((state) => getCartItems(state));
  const dispatch = useDispatch();

  // Form data state
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    address: "",
    city: "",
    country: "",
    zip: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  /**
   * Handles changes in form inputs
   * @param {Object} e - Event object
   */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /**
   * Handles form submission
   * @param {Object} e - Event object
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    // Form validation logic
    if (!cartItems.length) {
      alert("Please add items to cart");
      return;
    }
    if (
      !formData.name ||
      !formData.email ||
      !formData.address ||
      !formData.city ||
      !formData.country ||
      !formData.zip ||
      !formData.cardNumber ||
      !formData.expiryDate ||
      !formData.cvv
    ) {
      alert("Please fill in all fields");
      return;
    }
    if (formData.cardNumber.length < 15) {
      alert("Please enter a valid card number");
      return;
    }
    if (formData.cvv.length !== 3) {
      alert("Please enter a valid CVV");
      return;
    }

    // Order placement logic
    alert("Order placed successfully");

    // Reset form data
    setFormData({
      name: user.name,
      email: user.email,
      address: "",
      city: "",
      country: "",
      zip: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    });

    // Clear cart and delete cart items
    dispatch(clearCart());
    dispatch(deleteCartItems(user.id));
    console.log("Form submitted:", formData);
  };

  /**
   * Calculates and sets the total price of items in the cart
   */
  useEffect(() => {
    const getTotalPrice = () => {
      const price = cartItems
        .reduce((acc, curr) => acc + curr.price * curr.quantity, 0)
        .toFixed(2);
      setTotalPrice(price);
    };
    getTotalPrice();
  }, [cartItems]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <p>Total price: {totalPrice}</p>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        {/* Shipping Information Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
          <div className="grid grid-cols-1 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                name="country"
                placeholder="Country"
                value={formData.country}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <input
              type="text"
              name="zip"
              placeholder="ZIP / Postal Code"
              value={formData.zip}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>
        {/* Payment Information Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
          <div className="grid grid-cols-1 gap-4">
            <input
              type="text"
              name="cardNumber"
              placeholder="Card Number"
              value={formData.cardNumber}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="expiryDate"
                placeholder="MM/YY"
                value={formData.expiryDate}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                name="cvv"
                placeholder="CVV"
                value={formData.cvv}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-custom-blue text-white py-3 rounded-md hover:bg-blue-700 transition duration-400"
        >
          Place Order
        </button>
      </form>
    </div>
  );
};

export default Checkout;
