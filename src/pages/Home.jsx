import Hero from "../components/Hero";
import Product from "../components/Product";
import { useSelector } from "react-redux";

const Home = () => {
  const categories = useSelector((state) => state.products.categories);
  const products = useSelector((state) => state.products.products);

  return (
    <>
      <Hero />
      <section className="trending_products mb-8 mt-24 max-w-[1440px] mx-auto">
        <p className="text-sm text-custom-btn-gray mb-1">
          Popular item in the market
        </p>
        <h1 className="oswald text-5xl mb-12">
          Trending{" "}
          <span className="underline underline-offset-4 decoration-custom-blue">
            Product
          </span>
        </h1>
        <div className="flex flex-wrap gap-4 justify-center items-start">
          {products?.slice(0, 4).map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="deals_outlet mb-8 mt-24 max-w-[1440px] mx-auto">
        <p className="text-sm text-custom-btn-gray mb-1">
          Today&apos;s deal and more
        </p>
        <h1 className="oswald text-5xl mb-12">
          Deals &{" "}
          <span className="underline underline-offset-4 decoration-custom-blue">
            Outlet
          </span>
        </h1>
        <div className="flex flex-wrap gap-4 justify-between items-start">
          <div className="deal_day relative w-[55%] h-[400px] border border-gray-100 flex justify-between rounded-[16px] overflow-hidden">
            <div className="deal_text z-10 px-8 pt-8 flex gap-8 flex-col justify-top align-center w-[40%]">
              <div>
              <h3 className="text-[24px]">Deal of the Day:</h3>
              <p className="text-[14px]">Limited quantities</p>
              </div>

              <div>
                <p className="capitalize text-[20px]">{products[1]?.title}</p>
                <p className="text-[28px] font-[600] mb-1">${products[1]?.price}</p>

                <p className="text-indigo-600 oswald font-[600] text-[18px]">Shop Now</p>
              </div>
            </div>

            <div className="deal_image relative w-[55%]">
              <img src={products[1]?.image} className="w-full h-full object-cover" alt={products[1]?.name} />
            </div>
          </div>


          <div className="w-[40%] flex gap-4 h-[400px] border border-gray-100 rounded-[16px] overflow-hidden">
            {products && (
              <>
              <Product product={products[2]} />
              <Product product={products[3]} />
            </>
            )}
          </div>
        </div>
      </section>

      <section className="trending_products mb-8 mt-24 max-w-[1440px] mx-auto">
        <div>
          <h1 className="oswald text-5xl mb-8">
            Top Selling{" "}
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
          {products.slice(4, 8).map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;
