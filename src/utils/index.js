import supabase from "./supabase";

export const getUploadedCartItems = async (userId) => {
  const { data, error } = await supabase
    .from("carts")
    .select("cart")
    .eq("user_id", userId);

  const carts = data[0].cart;
  console.log(error);
  return { carts, error };
};

export const getSavedUsers = async (userId, tableName) => {
  const { data, error } = await supabase
    .from(tableName)
    .select("*")
    .eq("user_id", userId);
  return { data, error };
};

export const addItemToCart = async (product, userId) => {
  console.log(product);
  const { data, error } = await supabase
    .from("carts")
    .insert([{ user_id: userId, cart: product }])
    .select();

  return { data, error };
};

export const editProductQuantity = async (carts, userId) => {
  const { data, error } = await supabase
    .from("carts")
    .update({ cart: carts })
    .eq("user_id", userId)
    .select();

  return { data, error };
};





export const getUploadedItems = async (userId) => {
  const { data, error } = await supabase
    .from("products")
    .select("products")
    .eq("user_id", userId);

  const products = data[0].products;
  console.log(error);
  return { products, error };
};

export const editProduct = async (products, userId) => {
  const { data, error } = await supabase
    .from("products")
    .update({ products: products })
    .eq("user_id", userId)
    .select();

  return { data, error };
};

export const addItem = async (products, userId) => {
  console.log(products);
  const { data, error } = await supabase
    .from("products")
    .insert([{ user_id: userId, products: products }])
    .select();

  return { data, error };
};