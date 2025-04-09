import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import axios from "axios";

const Profile = ({ isProfileOpen, setProfileOpen }) => {
    const navigate = useNavigate(); 

    const [user, setUser] = useState(null);
  
    useEffect(() => {
      const fetchUser = async () => {
        const token = localStorage.getItem("token");
  
        if (!token) {
          navigate("/login"); 
          return;
        }
  
        try {
          const response = await axios.get("http://localhost:5000/api/profile", {
            headers: { Authorization: `Bearer ${token}` },
          });
  
          setUser(response.data);
        } catch (error) {
          console.error("Error fetching user:", error);
          localStorage.removeItem("token");
          navigate("/login"); 
        }
      };
  
      fetchUser();
    }, [navigate]);
  
    const handleLogout = () => {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      navigate("/"); 
    };

  return (
    <div
      className={`fixed top-0 right-0 w-80 h-full bg-greenDeep shadow-lg p-4 transition-transform ${
        isProfileOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex justify-between items-center border-b pb-2">
        <h2 className="text-lg font-semibold">Profile</h2>
        <X className="w-6 h-6 cursor-pointer" onClick={() => setProfileOpen(false)} />
      </div>

      {user ? (
        <div className="mt-4 text-center">
          <p className="font-semibold text-lg">👤 {user.firstName} {user.lastName}</p>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      ) : (
        <p className="mt-4 text-center text-gray-500">Loading...</p>
      )}

      <div className="mt-6 space-y-2">
        <button className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600">
          My Profile
        </button>
        <button onClick={handleLogout} className="w-full py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
