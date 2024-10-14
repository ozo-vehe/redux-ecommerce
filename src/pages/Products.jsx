import Product from "../components/Product";
import { useSelector } from "react-redux";

export default function Products() {
  const categories = useSelector((state) => state.products.categories);
  const products = useSelector((state) => state.products.products);

  return (
    <main className="products mb-8 mt-24 max-w-[1440px] mx-auto">
      <div>
      <p className="text-sm text-custom-btn-gray mb-1">
        Popular item in the market
      </p>
      <h1 className="oswald text-5xl mb-8">
        All{" "}
        <span className="underline underline-offset-4 decoration-custom-blue">
          Products
        </span>
      </h1>
      <div className="categories flex flex-wrap gap-2 mb-12">
        {categories.map((category, _i) => (
          <button
            key={_i}
            className="bg-custom-btn-gray hover:bg-gray-600 transition-all duration-400 capitalize text-[14px] text-white rounded-full px-4 py-2"
            onClick={() => console.log(category)}
          >
            {category}
          </button>
        ))}
      </div>
      </div>
      <div className="flex flex-wrap gap-4 justify-center items-start">
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
