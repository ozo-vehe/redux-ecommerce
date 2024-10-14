import PropTypes from "prop-types";
// import { addToCart } from "../utils/cart";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";

export default function Product({ product }) {
  const cart = useSelector((state) => state.cart.cartItems);
  const user = useSelector((state) => state.users.user);
  const dispatch = useDispatch();

  const handleCart = (product) => {
    // let cart = JSON.parse(localStorage.getItem("cart"));
    if(!user.id) {
      alert("Please login to add to cart");
      return;
    }

    dispatch(addToCart({ product, userId: user.id }));

    console.log(cart);
    alert("Added to cart");
  };

  return (
    <div className="group product w-250 border border-gray-100 h-400 mb-8 p-2 rounded-md">
      {product ? (
        <>
          <div className="relative">
            <div className="product_image w-full h-[250px]">
              <img
                className="w-full h-full object-contain"
                src={product?.image}
                alt={product?.name}
              />
            </div>

            <div className="z-10 flex items-center justify-center absolute bottom-0 bg-white/70 w-full h-24 translate-y-16 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
              <div className="absolute flex gap-x-4 z-10">
                <img
                  className="icon p-3 w-10 h-10 bg-custom-blue/80 hover:bg-custom-blue duration-350 transition-all"
                  src="https://img.icons8.com/material-outlined/24/ffffff/shopping-cart--v1.png"
                  alt="shopping-cart"
                  onClick={() => handleCart(product)}
                />
                {/* <img
                  className="icon p-3 w-10 h-10 bg-custom-blue/80 hover:bg-custom-blue duration-350 transition-all"
                  src="https://img.icons8.com/ios/50/ffffff/hearts--v1.png"
                  alt="favourite"
                /> */}
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center py-4">
            <p className="capitalize text-custom-btn-gray">
              {product.category}
            </p>
            <h3 className="group-hover:text-custom-blue transition-all duration-350 capitalize font-bold my-2">
              <a href="#">{product.name}</a>
            </h3>
            <span className="capitalize text-custom-btn-gray">
              Total supply: {product.amount}
            </span>
            <span className="capitalize text-[28px] font-[600] text-indigo-700 mt-3">
              ${product.price}
            </span>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}

      {/* <div className="fixed z-20 top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
        <div className="max-w-[400px] bg-white h-fit p-4 rounded-[8px] flex items-center gap-8">
          <p>Login before you add items to cart</p>
          <img
            className="w-4 h-4 cursor-pointer"
            src="https://img.icons8.com/ios-glyphs/30/delete-sign.png"
            alt="delete-sign"
          />
        </div>
      </div> */}
    </div>
  );
}

Product.propTypes = {
  product: PropTypes.object,
};
