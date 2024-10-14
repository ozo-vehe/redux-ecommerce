import { useState } from "react";
import useFetch from "../hooks/useFetch";

export default function Hero() {
  const MAX_IMAGES = 4;
  const [nextImage, setNextImage] = useState(0);


  /**
   * Handles cycling to the next image in the product carousel.
   * 
   * This function updates the `nextImage` state to show the next product image.
   * If the current image is the last one (MAX_IMAGES - 1), it cycles back to the first image (0).
   * Otherwise, it increments the current image index by 1.
   * 
   * @function
   * @name handleNextImage
   * @returns {void}
   */

  const handleNextImage = () => {
    if (nextImage === MAX_IMAGES - 1) {
      setNextImage(0);
    } else {
      setNextImage((prev) => prev + 1);
    }
  };

  /**
   * Fetches product data from the Fake Store API.
   *
   * This line uses the custom `useFetch` hook to make an API request to the Fake Store API
   * and retrieve product data. It returns an object with three properties:
   *
   * @property {Array|null} data - The fetched product data, or null if not yet loaded.
   * @property {boolean} loading - Indicates whether the data is currently being fetched.
   * @property {Error|null} error - Any error that occurred during the fetch, or null if successful.
   */
  const { data, loading, error } = useFetch("https://fakestoreapi.com/products");

  if (loading) {
    return (
      <div className="max-w-[1440px] mx-auto min-h-[80vh] flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="max-w-[1440px] mx-auto min-h-[80vh] flex items-center justify-center">
        <p>Error: {error.message}</p>
      </div>
    );
  }

  return (
    <main className="flex flex-wrap bg-white items-center justify-center gap-x-12 gap-y-4 min-h-[80vh] max-w-[1440px] mx-auto">
      <div className="w-600 text-center heroText">
        <h4 className="text-3xl pb-4 text-gray-500">Shop is fun</h4>
        <h1 className="text-5xl uppercase font-bold pb-4">
          browse our premium product
        </h1>
        <p className="text-gray-700">
          Us which over of signs divide dominion deep fill bring the meat beho
          upon own earth without morning over third. Their male dry. They are
          great appear whose land fly grass
        </p>
        <button className="bg-custom-blue text-white rounded-full transition-all duration-500 px-12 py-4 mt-12">
          {" "}
          Browse Now
        </button>
      </div>

      <div className="hero_image w-[400px] flex items-center gap-1 justify-center">
        <img src={data[`${nextImage}`].image} alt="" />
        {/* Next arrow */}
        <img width="50" height="50" className="cursor-pointer" src={`https://img.icons8.com/ios-filled/9ca3af/50/circled-chevron-right.png`} alt="circled-chevron-right" onClick={handleNextImage} />
      </div>
    </main>
  );
}
