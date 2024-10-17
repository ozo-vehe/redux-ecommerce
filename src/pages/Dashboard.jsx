import { useEffect, useState } from "react";
import { v4 } from "uuid";
import { useSelector, useDispatch } from "react-redux";
import {
  getStoreUsers,
  deleteUser,
  addNewUser,
  removeUser,
} from "../features/users/usersSlice";

const Dashboard = () => {
  // Get users from the store
  const storeUsers = useSelector((state) => getStoreUsers(state));
  const storeUser = useSelector((state) => state.users.user);
  const dispatch = useDispatch();

  const [newUser, setNewUser] = useState({
    id: "",
    name: "",
    email: "",
    role: "",
    password: "",
  });
  const [c_password, setC_Password] = useState("");
  const [error, setError] = useState(null);
  const [displayedUsers, setDisplayedUsers] = useState(
    storeUsers.filter((user) => user.id !== storeUser.id)
  );

  // const displayedUsers = storeUsers.filter((user) => user.id !== storeUser.id);

  const addUser = (e) => {
    e.preventDefault();
    try {
      // Check if passwords match
      if (newUser.password !== c_password) {
        setError("Passwords do not match");
        return;
      }
      // Check if input fields are not empty
      if (newUser.name && newUser.email && newUser.password && newUser.role) {
        newUser.id = v4();
        dispatch(addNewUser(newUser));

        setNewUser({ id: "", name: "", email: "", role: "", password: "" });
        setC_Password("");
      }
    } catch (error) {
      console.log(error);
      setError("Failed to add user. Please try again.");
    }
  };

  const deleteStoredUser = (id) => {
    dispatch(removeUser(id));
    dispatch(deleteUser(id));
  };

  useEffect(() => {
    setDisplayedUsers(storeUsers);
  }, [storeUsers]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-[1440px]">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 justify-center gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Add New User</h2>
          <form onSubmit={addUser} className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
              className="w-full p-2 border rounded"
              required
            />
            <select
              name="role"
              id="role"
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select role</option>
              <option value="seller">Seller</option>
              <option value="shopper">Shopper</option>
            </select>
            <input
              type="password"
              placeholder="Password"
              value={newUser.password}
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.target.value })
              }
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={c_password}
              onChange={(e) => setC_Password(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700"
            >
              Add User
            </button>
          </form>

          {error && (
            <p className="mt-4 text-center font-[500] text-sm text-red-600">
              {error}
            </p>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border max-h-[460px] overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4">User List</h2>
          <table className="w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 text-left">Name</th>
                <th className="p-2 text-left">Email</th>
                <th className="p-2 text-left">Role</th>
                <th className="p-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {displayedUsers?.map((user) => (
                <>
                  {user.id !== storeUser.id && user.role !== "admin" && (
                    <tr key={user.id} className="border-b">
                      <td className="p-2">{user.name}</td>
                      <td className="p-2">{user.email}</td>
                      <td className="p-2">{user.role || "User"}</td>
                      <td className="p-2">
                        <button
                          onClick={() => deleteStoredUser(user.id)}
                          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
