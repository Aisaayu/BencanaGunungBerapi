import { Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [user, setUser] = useState({ name: "", profilePicture: "" }); // State untuk menyimpan data user
  const navigate = useNavigate();

  useEffect(() => {
    // Ambil data user dari localStorage
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setUser({
        name: userData.name,
        profilePicture: userData.profilePicture || "https://via.placeholder.com/150", // Gambar default jika tidak ada URL
      });
    } else {
      navigate("/"); // Jika tidak ada user, arahkan ke login
    }
  }, [navigate]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    // Hapus token atau data user dari localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // Arahkan ke halaman login
    navigate("/");
  };

  return (
    <div className="flex flex-row min-h-screen">
      {/* Sidebar */}
      {isSidebarOpen && (
        <aside className="w-64 bg-indigo-900 text-white transition-transform duration-300">
          <div className="p-4">
            {/* Profil User */}
            <div className="flex flex-col items-center mb-6">
              <img
                src={user.profilePicture}
                alt="Profile"
                className="w-24 h-24 rounded-full mb-4 border-4 border-white shadow"
              />
              <p className="text-lg font-bold">{user.name}</p>
            </div>
            <nav className="ml-4 mt-4">
              <ul className="space-y-2">
                
              <li className="hover:bg-indigo-800 p-2 rounded">
  <Link to="/admin/settings" className="block">
    Settings
  </Link>
</li>

              </ul>
            </nav>
          </div>
        </aside>
      )}

      {/* Main Content */}
      <div className="flex flex-1 flex-col bg-blue-50">
        <header className="bg-white shadow p-4">
          <div className="flex justify-between items-center">
            <button
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
              onClick={toggleSidebar}
            >
              {isSidebarOpen ? "Hide Sidebar" : "Show Sidebar"}
            </button>
            <div className="flex items-center space-x-4">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-800"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        <main className="flex-grow p-4">
          <Outlet />
        </main>

        <footer className="bg-indigo-900 p-4 text-white text-center">
          &copy; Admin Uhuy
        </footer>
      </div>
    </div>
  );
};

export default AdminLayout;
