import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../../utils/supabase";
import { getUploadedCartItems, editProductQuantity, getSavedUsers, addItemToCart } from "../../utils";

const initialState = {
  cartItems: [],
  amount: 0,
  total: 0,
  isLoading: true,
};


/**
 * Fetches the user's cart from the database.
 *
 * @function
 * @async
 * @param {string} userId - The ID of the user whose cart is being fetched.
 * @returns {Promise<Array>} A promise that resolves to an array of cart items.
 * @throws {Error} If there's an error fetching the cart data.
 *
 * @example
 * // Dispatch the action to fetch the user's cart
 * dispatch(fetchUserCart('user123'));
 */
export const fetchUserCart = createAsyncThunk(
  "carts/fetchUserCart",
  async (userId) => {
    if (userId) {
      let { data, error } = await supabase
        .from("carts")
        .select("*")
        .eq("user_id", userId);

      if (error) console.log(error);

      const cart = data[0].cart;

      return cart;
    }
  }
);



/**
 * Async thunk action creator for adding a product to the cart.
 * 
 * @function addToCart
 * @async
 * @param {Object} payload - The payload object containing product and userId.
 * @param {Object} payload.product - The product to be added to the cart.
 * @param {string} payload.userId - The ID of the user whose cart is being updated.
 * @returns {Promise<Array>} A promise that resolves to the updated cart items array.
 * 
 * @throws {Error} Logs any errors encountered during the process.
 * 
 * @description
 * This thunk performs the following steps:
 * 1. Checks if the user has an existing cart.
 * 2. If no cart exists, creates a new cart with the product.
 * 3. If a cart exists, checks if the product is already in the cart.
 * 4. If the product is in the cart, increases its quantity.
 * 5. If the product is not in the cart, adds it as a new item.
 * 6. Updates the cart in the database.
 * 7. Returns the updated cart items.
 */
export const addToCart = createAsyncThunk(
  "carts/addTocart",
  async ({ product, userId }) => {
    // A variable to hold all the cart items
    let cartItems = [];
    const cartProduct = {
      ...product,
      quantity: 1,
    };

    console.log(cartItems);

    // Check if userId has a cart
    const { data: users, error: userError } = await getSavedUsers(userId, "carts");
    console.log(users);

    if (userError) console.log(userError);

    // If user has no cartItems
    if (users.length < 1) {
      // If the user has no cart, create a new cart and add the product.
      cartItems = [cartProduct];
      // console.log(cartItems);
      // Add the new cart to the user database.
      await addItemToCart(cartItems, userId);

      return cartItems;
    }

    // If the user has a cart, get all the saved cart items
    const { carts, error } = await getUploadedCartItems(userId);

    // console.log(carts, error);
    // If there's an error, return the error
    if (error) console.log(error);

    // Check if the product is already in the cart
    const isProductInCart = carts.find((item) => item.id === product.id);

    // If the product is already in the cart, increase the quantity
    if (isProductInCart) {
      cartItems = carts.map((item) => {
        if (item.id === isProductInCart.id) item.quantity += 1;

        return item;
      });
    } 
    // Else, add the product to the cart
    else {
      cartItems = [...carts, cartProduct];
    }

    // console.log(cartItems);

    // Update the cart in the database
    await editProductQuantity(cartItems, userId);

    // Return the updated cart items
    return cartItems;
  }
);



/**
 * Removes an item from the cart.
 *
 * @param {string} productId - The ID of the product to remove from the cart.
 * @param {string} userId - The ID of the user whose cart is being modified.
 * @returns {Promise<Array>} A promise that resolves to the updated cart items.
 * @throws {Error} If there's an error removing the item from the cart.
 *
 * @example
 * // Remove a product from the cart
 * const updatedCart = await removeFromCart('product123', 'user456');
 * console.log(updatedCart);
 */
export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async ({productId, userId}) => {
    console.log(productId, userId);
    // If the user has a cart, get all the saved cart items
    await getUploadedCartItems(userId);
    const { carts, error } = await getUploadedCartItems(userId);

    // If there's an error, return the error
    if (error) console.log(error);

    // Remove the item from the cart
    const updatedCart = carts.filter((item) => item.id !== productId);
    console.log(updatedCart);

    // Update the cart in the database
    await editProductQuantity(updatedCart, userId);

    console.log(updatedCart);
    // Return the updated cart items
    return updatedCart;
  }
);


const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    removeItem: (state, action) => {
      const itemId = action.payload.id;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },
    increase: (state, action) => {
      const cartItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      cartItem.quantity = cartItem.quantity + 1;
    },
    decrease: (state, action) => {
      const cartItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      cartItem.amount = cartItem.amount - 1;
    },
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });
      state.amount = amount;
      state.total = total;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserCart.fulfilled, (state, action) => {
        state.cartItems = action.payload;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        // console.log(action.payload);
        state.cartItems = action.payload;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.cartItems = action.payload;
      });
  },
});

export const { clearCart, removeItem, increase, decrease, calculateTotals } =
  cartSlice.actions;

export const getCartItems = (state) => state.cart.cartItems;

export default cartSlice.reducer;
