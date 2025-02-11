import { useState } from "react";
import CartList from "./CartList";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../features/cart/cartSlice";
import { logOut, signedUser } from "../features/users/usersSlice";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const cart = useSelector((state) => state.cart.cartItems);
  const loggedUser = useSelector((state) => signedUser(state));

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const links = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Products",
      link: "/products",
    },
    {
      name: "Contact",
      link: "/contact",
    },
    {
      name: "About Us",
      link: "/about",
    },
  ];

  const removeCart = (productId) => {
    console.log(loggedUser.id);
    dispatch(
      removeFromCart({ productId: productId.id, userId: loggedUser.id })
    );
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch(logOut());
    navigate("/");
    window.location.reload();
  };

  return (
    <nav className="flex items-center justify-between max-w-[1440px] mx-auto">
      <NavLink className="w-32 flex items-center gap-2" to="/">
        {/* <img className="" src={logo} alt="Logo" /> */}
        <p className="text-3xl font-bold">StoRedux</p>
      </NavLink>
      <div
        className="text-black flex items-center justify-center"
        id="navbarSupportedContent"
      >
        <ul className="flex items-start justify-between w-full gap-x-10">
          {links.map((link, _i) => (
            <li key={_i} className="hover:text-custom-blue">
              <NavLink
                className={({ isActive }) => isActive && "text-custom-blue"}
                to={link.link}
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center justify-center">
        <ul className="flex items-center justify-center gap-x-4">
          <li className="cart relative">
            <button>
              <CartList cart={cart} remove={removeCart} />
              <span className="text-white text-xs rounded-full bg-custom-blue absolute top-0">
                {cart.length}
              </span>
            </button>{" "}
          </li>
        </ul>
      </div>

      {loggedUser?.id ? (
        <>
          <div className="relative">
            <div
              className="border border-gray-200 text-custom-blue cursor-pointer hover:bg-custom-blue hover:text-white hover:border-custom-blue rounded-full transition-all duration-500 p-4 w-10 h-10 flex items-center justify-center"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <span className="rounded-full flex items-center justify-center text-xl font-[800]">
                {loggedUser.name.charAt(0).toUpperCase()}
              </span>
            </div>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                <ul className="text-sm text-gray-700 pt-2 pb-0">
                  {loggedUser?.id && (
                    <li className="hover:bg-gray-100 w-full px-4 py-2">
                      <NavLink
                        className={({ isActive }) =>
                          isActive && "text-gray-800"
                        }
                        to={"/profile"}
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                      >
                        Profile
                      </NavLink>
                    </li>
                  )}
                  {loggedUser?.role === "admin" && (
                    <>
                      <li className="hover:bg-gray-100 w-full px-4 py-2">
                        <NavLink
                          className={({ isActive }) =>
                            isActive && "text-gray-800"
                          }
                          to={"/dashboard"}
                          onClick={() => setDropdownOpen(!dropdownOpen)}
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li className="hover:bg-gray-100 w-full px-4 py-2">
                        <NavLink
                          className={({ isActive }) =>
                            isActive && "text-gray-800"
                          }
                          to={"/add-product"}
                          onClick={() => setDropdownOpen(!dropdownOpen)}
                        >
                          Upload Product
                        </NavLink>
                      </li>
                    </>
                  )}
                  {loggedUser?.role === "seller" && (
                    <li className="hover:bg-gray-100 w-full px-4 py-2">
                      <NavLink
                        className={({ isActive }) =>
                          isActive && "text-gray-800"
                        }
                        to={"/add-product"}
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                      >
                        Upload Product
                      </NavLink>
                    </li>
                  )}
                </ul>
                <button
                  onClick={handleLogout}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </>
      ) : (
        <NavLink
          to="/signup"
          className="border border-gray-100 hover:border-blue-500 rounded-3xl transition-all duration-500 px-8 py-2"
        >
          {" "}
          Sign up{" "}
        </NavLink>
      )}
    </nav>
  );
}
