import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { addNewUser, userLoading, signedUser, setUser } from "../features/users/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import { v4 } from "uuid";

const Signup = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [c_password, setC_Password] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState();

  const dispatch = useDispatch();
  const loading = useSelector((state) => userLoading(state));
  const loggedUser = useSelector((state) => signedUser(state));
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== c_password) {
      setError("Passwords do not match");
      return;
    }
    setError("");
    try {
      console.log(email, password, role);
      const userDetails = {
        id: v4(),
        name: fullname,
        email: email,
        password: password,
        role: role,
      };

      dispatch(addNewUser(userDetails));

      if(!isLoading) {
        // dispatch(setUser({email, password}));
        // console.log(loggedUser)
        // localStorage.setItem("user", JSON.stringify(userDetails))
        navigate('/login');
      }

    } catch (err) {
      setError("Failed to sign up. Please try again.");
    }
  };

  useEffect(() => {
    const loadingState = async() => {
      console.log(loading)
      setIsLoading(loading);
      setUser(loggedUser);
      console.log(loggedUser);
    }

    loadingState();
  }, [loading, loggedUser])

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="fullname" className="sr-only">
                Fullname
              </label>
              <input
                id="fullname"
                name="fullname"
                type="fullname"
                autoComplete="fullname"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Fullname"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              />
            </div>

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
                autoComplete="new-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Confirm Password
              </label>
              <input
                id="c_password"
                name="c_password"
                type="password"
                autoComplete="c_password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Confirm Password"
                value={c_password}
                onChange={(e) => setC_Password(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="role" className="sr-only">
                Role
              </label>
              <select
                id="role"
                name="role"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="">Select a role</option>
                <option value="shopper">Shopper</option>
                <option value="seller">Seller</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300"
            >
              {isLoading ? (
                <span className="animate-spin block h-5 w-5 border-t rounded-full "></span>
              ) : (
                <span>Sign up</span>
              )}
            </button>
          </div>

          <div className="text-center font-[600]">
            <p>
              Have an account?{" "}
              <Link className="text-indigo-600" to="/login">
                Login
              </Link>
            </p>
          </div>
        </form>

        {/* <div className="flex flex-col gap-1">
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 rounded-md bg-white border border-gray-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-300"
            onClick={handleGoogleSignin}
          >
            <img
              className="w-[23px] h-[23px]"
              src="https://img.icons8.com/fluency/48/google-logo.png"
              alt="google-logo"
            />
          </button>
        </div> */}
        {error && (
          <p className="mt-2 text-center text-sm text-red-600">{error}</p>
        )}
      </div>
    </div>
  );
};

export default Signup;
