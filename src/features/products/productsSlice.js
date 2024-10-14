import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getUploadedItems,
  editProduct,
  getSavedUsers,
  addItem,
} from "../../utils";
import supabase from "../../utils/supabase";

const initialState = {
  products: [],
  categories: [],
  isLoading: true,
  error: null,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const req = await fetch("https://fakestoreapi.com/products");
    const res = await req.json();

    return res;
  }
);

export const fetchCategories = createAsyncThunk(
  "product/fetchcategories",
  async () => {
    const req = await fetch("https://fakestoreapi.com/products/categories");
    const res = await req.json();

    return res;
  }
);

export const fetchUploadedProducts = createAsyncThunk(
  "products/fetchUploadedProducts",
  async () => {
    let { data, error } = await supabase.from("products").select("*");

    if (error) console.log(error);

    const products = data[0].products;

    console.log(products);
    return products;
  }
);


/**
 * Async thunk action creator for uploading a product.
 *
 * @function uploadProduct
 * @async
 * @param {Object} payload - The payload object containing product and userId.
 * @param {Object} payload.product - The product to be uploaded.
 * @param {string} payload.userId - The ID of the user who is uploading the product.
 * @returns {Promise<Object>} A promise that resolves to the uploaded product.
 *
 * @throws {Error} Logs any errors encountered during the process.
 *
 * @description
 * This thunk performs the following steps:
 * 1. Checks if the user exists.
 * 2. If the user exists, proceeds with product upload.
 * 3. If the user doesn't exist, logs an error.
 * 4. Uploads the product to the database.
 * 5. Returns the uploaded product.
 */
export const uploadProduct = createAsyncThunk(
  "products/uploadProduct",
  async ({ product, userId }) => {
    let productItems = [];

    console.log(productItems);

    // Check if userId has a product
    const { data: users, error: userError } = await getSavedUsers(
      userId,
      "products"
    );
    console.log(users);

    if (userError) console.log(userError);

    // If user has no productItems
    if (users.length < 1) {
      // If the user has no product, create the products column and add the product.
      productItems = [product];
      // console.log(productItems);
      // Add the new cart to the user database.
      await addItem(productItems, userId);

      return productItems;
    }

    // If the user has a uploaded products, get all the saved product items
    const { products, error } = await getUploadedItems(userId);

    // console.log(products, error);
    // If there's an error, return the error
    if (error) console.log(error);

    productItems = [...products, product];

    // console.log(productItems);

    // Update the cart in the database
    await editProduct(productItems, userId);

    // Return the updated cart items
    return productItems;
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        const products = action.payload;
        products.forEach((product) => {
          product.amount = 20;
        });
        state.products = products;
        state.isLoading = false;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(fetchUploadedProducts.fulfilled, (state, action) => {
        console.log(action.payload);
        state.products.push(...action.payload);
      })
      .addCase(uploadProduct.fulfilled, (state, action) => {
        state.products.push(...action.payload);
      });
  },
});

export default productsSlice.reducer;
