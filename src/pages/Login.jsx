/**
 * Login Component
 *
 * This component renders a login form and handles user authentication.
 *
 * @component
 * @example
 * return (
 *   <Login />
 * )
 */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { setUser, signedUser } from "../features/users/usersSlice";
import { fetchUserCart } from "../features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  /**
   * State for email input
   * @type {[string, function]}
   */
  const [email, setEmail] = useState("");

  /**
   * State for password input
   * @type {[string, function]}
   */
  const [password, setPassword] = useState("");

  /**
   * State for logged in user details
   * @type {[object, function]}
   */
  const [loggedUser, setLoggedUser] = useState({});

  /**
   * State for error messages
   * @type {[string, function]}
   */
  const [error, setError] = useState("");

  /**
   * Hook for programmatic navigation
   */
  const navigate = useNavigate();

  /**
   * Selector to get signed user details from Redux store
   */
  const signedUserDetails = useSelector((state) => signedUser(state));

  /**
   * Hook to dispatch actions to Redux store
   */
  const dispatch = useDispatch();

  /**
   * Handles form submission
   * @param {Event} e - The submit event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      dispatch(setUser({ email, password }));
    } catch (err) {
      setError("Failed to log in. Please check your credentials.");
    }
  };

  /**
   * Effect to handle user authentication and navigation
   */
  useEffect(() => {
    setLoggedUser(signedUserDetails);
    if (signedUserDetails?.id) {
      dispatch(fetchUserCart(signedUserDetails.id));
      localStorage.setItem("user", JSON.stringify(signedUserDetails));
      if (signedUserDetails?.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    }
  }, [signedUserDetails, dispatch, navigate]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Login to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Login
            </button>
          </div>

          <div className="text-center font-[600]">
            <p>
              Have an account?{" "}
              <Link className="text-indigo-600" to="/signup">
                Signup
              </Link>
            </p>
          </div>
        </form>
        {error && (
          <p className="mt-2 text-center text-sm text-red-600">{error}</p>
        )}
        {loggedUser?.length < 1 && (
          <p className="mt-2 text-center text-sm text-red-600">
            {"User not found"}
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
