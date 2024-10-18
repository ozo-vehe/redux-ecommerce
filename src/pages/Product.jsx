import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signedUser } from '../features/users/usersSlice';
import { addToCart } from '../features/cart/cartSlice';

const Product = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const products = useSelector((state) => state.products.products);
  const user = useSelector((state) => signedUser(state));
  const dispatch = useDispatch();

  const goBack = () => {
    navigate("..", { relative: "path" });
  }

  const handleCart = (product) => {
    // let cart = JSON.parse(localStorage.getItem("cart"));
    if(!user.id) {
      alert("Please login to add to cart");
      return;
    }

    dispatch(addToCart({ product, userId: user.id }));

    alert("Added to cart");
  };

  useEffect(() => {
    const fetchProduct = async () => {
      console.log("Fetching...")
      try {
        const product = products.find((p) => String(p.id) == id);
        setProduct(product);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id, products]);

  if (!product) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="max-w-[1440px] mx-auto px-4 py-8 min-h-[80vh] flex items-center justify-center">
        <div className="flex flex-wrap gap-x-12 gap-y-4 items-start justify-center">
          <div className="max-w-[500px] lg:h-[550px] md:h-[500px] h-[450px] p-4">
            <img className="h-full w-full object-cover" src={product.image} alt={product.name} />
          </div>

          <div className="px-8 pb-8 max-w-[500px]">
            <p className="mb-4 text-gray-700 cursor-pointer underline underline-offset-4 hover:text-gray-900 font-[500]" onClick={goBack}>Go Back</p>

            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{product.category}</div>
            <h2 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">{product.name}</h2>
            <p className="mt-4 text-2xl text-gray-800">${product.price}</p>
            <p className="mt-2 text-gray-600">{product.description}</p>
            <div className="mt-6">
              <button
                className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => handleCart(product)}
              >
                Add to Cart
              </button>
            </div>
          </div>
      </div>
    </div>
  );
};

export default Product;
