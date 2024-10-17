import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../../utils/supabase";
import { decrypt } from "../../utils";

const initialState = {
  users: [],
  user: {},
  isLoading: true,
  error: null,
};

// Async thunk to fetch users from the database
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  let { data } = await supabase.from("users").select("*");

  return data;
});

// Async thunk to add a new user to the database
export const addNewUser = createAsyncThunk(
  "users/addNewUser",
  async (userDetails) => {

    const { data } = await supabase
      .from("users")
      .insert([userDetails])
      .select();
    
    return data;
  }
);

/**
 * Async thunk to delete a user from the database
 * @param {string} userId - The ID of the user to be deleted
 * @returns {Promise<Object>} The deleted user data
 * @throws {Error} If the deletion fails
 */
export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (userId) => {
    console.log("Deleting user with ID:", userId);
    const { error } = await supabase
      .from("users")
      .delete()
      .eq("id", userId);

    if (error) throw new Error(error.message);

    console.log("Deleted user with ID:", userId);
    
    return userId;
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { email, password } = action.payload;

      const user = state.users.find(
        (user) => user.email === email && decrypt(user.password, user.email) === password
      );

      if (user) state.user = user;
      else alert("Invalid login details");

      state.isLoading = false;
    },
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    removeUser: (state, action) => {
      state.users = state.users.filter(
        (user) => user.id !== action.payload
      );
    },
    logOut: (state) => {
      state.user = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = true;
        state.users = action.payload;
        state.isLoading = false;
      })
      .addCase(addNewUser.fulfilled, (state, action) => {
        state.isLoading = true;
        state.users.push(...action.payload);
        state.isLoading = false;
      })
      .addCase(addNewUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = true;
        state.users = state.users.filter(
          (user) => user.id !== action.payload.id
        );
        state.isLoading = false;
      });
  },
});

export const getStoreUsers = (state) => state.users.users;
export const signedUser = (state) => state.users.user;
export const userError = (state) => state.users.error;
export const userLoading = (state) => state.users.isLoading;

export const { setUser, logOut, removeUser } = usersSlice.actions;

export default usersSlice.reducer;
