import { useSelector } from "react-redux";
import { signedUser } from "../features/users/usersSlice";
import { getCartItems } from "../features/cart/cartSlice";
import Product from "../components/Product";
import { getUploadedItems } from "../utils";
import { useEffect, useState } from "react";

const Profile = () => {
  const [products, setProducts] = useState([]);

  const user = useSelector((state) => signedUser(state));
  const cart = useSelector((state) => getCartItems(state));

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getUploadedItems(user.id);

      setProducts(products.products);
    };
    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto py-8 max-w-[1440px] px-[5%] min-h-[80vh]">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex gap-2 items-center mb-6">
          <p className="border border-gray-200 text-[44px] text-indigo-600 rounded-full w-20 h-20 flex items-center justify-center text-xl font-[800] hover:bg-indigo-600 hover:text-white transition-all duration-300 ease-in-out">
            {user.name.charAt(0).toUpperCase()}
          </p>
          <div>
            <h1 className="text-2xl capitalize font-bold">{user.name}</h1>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>

        <div className="mb-8">
          {user.role === "seller" && (
            <>
              <h2 className="text-xl font-semibold mb-4">Uploaded Products</h2>
              {products.length > 0 ? (
                <div className="space-y-2 flex items-start justify-center gap-8">
                  {products.map((product) => (
                    <Product key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No products uploaded yet.</p>
              )}
            </>
          )}
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Cart Products</h2>
          {cart.length > 0 ? (
            <div className="space-y-2 flex items-start justify-center gap-8">
              {cart.map((product) => (
                <Product key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No products purchased yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
