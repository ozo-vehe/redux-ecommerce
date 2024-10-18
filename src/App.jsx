import { Outlet } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { getStoreUsers, setUser } from "./features/users/usersSlice";
import { fetchUserCart } from "./features/cart/cartSlice";

function App() {
  useSelector((state) => getStoreUsers(state));

  const dispatch = useDispatch();
  const localUser = localStorage.getItem("user");

  const jsonLocalUser = JSON.parse(localUser);

  if (jsonLocalUser?.id) {
    dispatch(setUser(jsonLocalUser));
    dispatch(fetchUserCart(jsonLocalUser.id));
  }

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

export default App;
