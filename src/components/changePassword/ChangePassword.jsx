import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePassword, resetState } from "../../redux/passwordSlice";
import { LockKeyhole } from "lucide-react";

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
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md">
        <h2 className="flex justify-center items-center mx-auto
        text-2xl bg-primary-light rounded-full h-20 w-20 font-semibold text-center mb-4 text-gray-800">
        <LockKeyhole size={60} className=""/>
        </h2>

        {error && <p className="text-red-900 text-center mb-3 bg-red-200 rounded-md py-1">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-primary-dark font-medium mb-1">
              Current Password
            </label>
            <input
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-dark"
              placeholder="Enter your current password"
            />
          </div>

          <div>
            <label className="block text-primary-dark font-medium mb-1">
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-dark"
              placeholder="Enter a new password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary-dark text-white font-semibold py-2 rounded-md hover:bg-primary-lighter transition"
            disabled={loading}
          >
            {loading ? "Changing..." : "Change Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
