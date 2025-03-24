import  { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePassword, resetState } from "../../redux/passwordSlice";

const ChangePassword = () => {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.password);

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(changePassword(formData));
  };

  useEffect(() => {
    if (success) {
      alert("Password changed successfully!");
      setFormData({ currentPassword: "", newPassword: "" });
      dispatch(resetState());
    }
  }, [success, dispatch]);

  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="text-xl font-semibold mb-4 ">Change Password</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Current Password</label>
          <input
            type="password"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            className=" px-3 py-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">New Password</label>
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            className=" px-3 py-2 border rounded-md"
          />
        </div>

        <button
          type="submit"
          className="bg-primary-dark text-primary-ligter p-2 rounded-md m-2"
          disabled={loading}
        >
          {loading ? "Changing..." : "Change Password"}
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
