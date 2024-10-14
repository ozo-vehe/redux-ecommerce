import PropTypes from "prop-types";
export default function Cart({ cart, remove }) {
  return (
    <div className="relative shadow-sm rounded-md border border-slate-100 items-center flex gap-4 mb-4">
      <div className="w-24 h-24">
        <img className="w-full h-full" src={cart.image} alt={cart.title} />
      </div>

      <div className="text-left p-2">
        <h3 className="mb-4 text-xl capitalize">{cart.title}</h3>
        <p className="oswald">
          <span>${cart.price}</span>
          <span>Quantity: {cart.quantity}</span>
        </p>
      </div>
      <img
        className="w-4 h-4 absolute top-2 right-2 cursor-pointer"
        src="https://img.icons8.com/ios-glyphs/30/delete-sign.png"
        alt="delete-sign"
        onClick={() => remove(cart.id)}
      />
    </div>
  );
}

Cart.propTypes = {
  cart: PropTypes.object.isRequired,
  remove: PropTypes.func.isRequired,
};
