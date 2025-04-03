import { useEffect,  useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../../redux/userSlice";
import { Camera, XCircle, User, Mail,  CalendarDays } from "lucide-react";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    expiryDate: "",
    profileImage: null,
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);


  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
        age: user.age || "",
        expiryDate: user.expiryDate
          ? new Date(user.expiryDate).toISOString().split("T")[0]
          : "",
      }));
      setPreviewImage(user.profileImage || null);
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, profileImage: file }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({ ...prev, profileImage: null }));
    setPreviewImage(user.profileImage || null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user?.id) return alert("User data not loaded. Please refresh.");

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) {
        if (key === "profileImage" && value instanceof File) {
          data.append(key, value);
        } else {
          data.append(key, value);
        }
      }
    });

    setIsUploading(true);
    await dispatch(updateUserProfile({ userId: user.id, formData: data }));
    setIsUploading(false);
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md my-5">
      <h2 className="text-xl font-bold text-center my-2 uppercase text-primary-dark">Update Profile</h2>
      {error && <p className="text-red-900 text-center mb-3 bg-red-200 rounded-md py-1">{error}</p>}

      <form onSubmit={handleSubmit}>
         {/* Profile Image Section */}
         <div className="relative w-24 h-24 mx-auto mb-2">
          <img
            src={previewImage}
            alt="Profile Preview"
            className="w-full h-full rounded-full object-cover border-4 border-gray-300 "
          />

          {/* Camera icon with hover tooltip */}
          <label className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow-md cursor-pointer group">
            <input
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={handleFileChange}
            />
            <Camera className="w-5 h-5 text-gray-600 hover:text-gray-800" />
            
            {/* Tooltip on hover */}
            <span className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
              Change Image
            </span>
          </label>

          {/* Remove button (top-right corner) */}
          {formData.profileImage && (
            <button
              type="button"
              className="absolute top-0 right-0 bg-white rounded-full p-1 shadow-md hover:bg-gray-200"
              onClick={handleRemoveImage}
            >
              <XCircle className="w-6 h-6 text-red-500" />
            </button>
          )}
        </div>
      {[
          { name: "name", type: "text", icon: <User className="w-5 h-5 text-gray-500" /> },
          { name: "email", type: "email", icon: <Mail className="w-5 h-5 text-gray-500" /> },
          { name: "age", type: "number", icon: <CalendarDays className="w-5 h-5 text-gray-500" /> },
        ].map(({ name, type, icon }) => (
          <div key={name} className="flex items-center border rounded p-2 mb-2">
            {icon}
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className="w-full p-1 ml-2 outline-none"
              placeholder={name.charAt(0).toUpperCase() + name.slice(1)}
            />
          </div>
        ))}
        
        <input
          type="date"
          name="expiryDate"
          value={formData.expiryDate}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-2"
        />

       

        <button
          type="submit"
          disabled={loading || isUploading}
          className="w-full bg-primary-dark text-white p-2 rounded mt-4"
        >
          {loading || isUploading ? "Updating..." : "Save  Profile"}
        </button>
      </form>
    </div>
  );
};

export default UserProfile;
