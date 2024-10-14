import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUploadedProducts, uploadProduct } from "../features/products/productsSlice";
import { v4 } from "uuid";
import { signedUser } from "../features/users/usersSlice";

const AddProduct = () => {
  const [title, setTitle] = useState();
  const [price, setPrice] = useState();
  const [description, setDescription] = useState();
  const [image, setImage] = useState();
  const [category, setCategory] = useState();
  const [amount, setAmount] = useState();

  const categories = useSelector((state) => state.products.categories);
  const user = useSelector((state) => signedUser(state));
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the product data to your API
    if (title && price && description && image && category) {
      try {
        const product = {
          id: v4(),
          title,
          price,
          description,
          image,
          category,
          amount,
        };

        dispatch(uploadProduct({ product, userId: user.id }));
        dispatch(fetchUploadedProducts());
        // navigate("/products");
        alert("Product uploaded successfully");
      } catch (error) {
        console.log(error);
      } finally {
        // Reset data after submission
        setTitle("");
        setPrice("");
        setDescription("");
        setImage("");
        setCategory("");
      }
    }
  };

  return (
    <div className="max-w-[1440px] min-h-[80vh] flex flex-col justify-center mx-auto px-[5%] py-3 relative z-10">
      <h1 className="text-2xl font-bold mb-4">Add New Product</h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 my-10 max-w-[500px] mx-auto"
      >
        <input
          type="text"
          placeholder="Title"
          value={title}
          id="title"
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          placeholder="Price"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          placeholder="Amount available"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          className="w-full p-2 border rounded"
          placeholder="Description"
          value={description}
          name="description"
          id="description"
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <input
          type="url"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <select
          name="category"
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select category</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700"
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
