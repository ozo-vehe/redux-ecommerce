/**
 * Supabase client instance.
 * @type {import('@supabase/supabase-js').SupabaseClient}
 */
import supabase from "./supabase";

/**
 * Retrieves uploaded cart items for a specific user.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<{carts: any, error: any}>} The cart items and any error.
 */
export const getUploadedCartItems = async (userId) => {
  const { data, error } = await supabase
    .from("carts")
    .select("cart")
    .eq("user_id", userId);

  const carts = data[0].cart;
  console.log(error);
  return { carts, error };
};

/**
 * Retrieves saved users from a specified table.
 * @param {string} userId - The ID of the user.
 * @param {string} tableName - The name of the table to query.
 * @returns {Promise<{data: any, error: any}>} The retrieved data and any error.
 */
export const getSavedUsers = async (userId, tableName) => {
  const { data, error } = await supabase
    .from(tableName)
    .select("*")
    .eq("user_id", userId);
  return { data, error };
};

/**
 * Adds an item to the user's cart.
 * @param {Object} product - The product to add to the cart.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<{data: any, error: any}>} The inserted data and any error.
 */
export const addItemToCart = async (product, userId) => {
  console.log(product);
  const { data, error } = await supabase
    .from("carts")
    .insert([{ user_id: userId, cart: product }])
    .select();

  return { data, error };
};

/**
 * Edits the quantity of a product in the user's cart.
 * @param {Array} carts - The updated cart items.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<{data: any, error: any}>} The updated data and any error.
 */
export const editProductQuantity = async (carts, userId) => {
  const { data, error } = await supabase
    .from("carts")
    .update({ cart: carts })
    .eq("user_id", userId)
    .select();

  return { data, error };
};

/**
 * Retrieves uploaded items for a specific user.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<{products: any, error: any}>} The products and any error.
 */
export const getUploadedItems = async (userId) => {
  const { data, error } = await supabase
    .from("products")
    .select("products")
    .eq("user_id", userId);

  const products = data[0].products;
  console.log(error);
  return { products, error };
};

/**
 * Edits a product for a specific user.
 * @param {Array} products - The updated products.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<{data: any, error: any}>} The updated data and any error.
 */
export const editProduct = async (products, userId) => {
  const { data, error } = await supabase
    .from("products")
    .update({ products: products })
    .eq("user_id", userId)
    .select();

  return { data, error };
};

/**
 * Adds an item to the products table for a specific user.
 * @param {Array} products - The products to add.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<{data: any, error: any}>} The inserted data and any error.
 */
export const addItem = async (products, userId) => {
  console.log(products);
  const { data, error } = await supabase
    .from("products")
    .insert([{ user_id: userId, products: products }])
    .select();

  return { data, error };
};