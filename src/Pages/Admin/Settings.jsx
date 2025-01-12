import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Settings = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    profileImage: "",
  });
  const [newProfileImage, setNewProfileImage] = useState(null);

  // Ambil data user dari localStorage atau API
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = JSON.parse(localStorage.getItem("user"))?.id; // Ambil ID user dari localStorage
        if (!userId) return;

        const response = await axios.get(`http://localhost:5000/users/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, []);

  // Handle perubahan input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // Handle perubahan file untuk profileImage
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewProfileImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        setUser({ ...user, profileImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle submit untuk update data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = JSON.parse(localStorage.getItem("user"))?.id; // Ambil ID user dari localStorage
      if (!userId) return;

      // Simpan perubahan ke API
      await axios.put(`http://localhost:5000/users/${userId}`, user);

      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Profil berhasil diperbarui.",
      });

      // Perbarui localStorage dengan data baru
      localStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      console.error("Error updating user data:", error);
      Swal.fire({
        icon: "error",
        title: "Gagal!",
        text: "Terjadi kesalahan saat memperbarui profil.",
      });
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Pengaturan Profil</h2>

        <form onSubmit={handleSubmit}>
          {/* Foto Profil */}
          <div className="mb-4 text-center">
            <img
              src={user.profileImage || "https://via.placeholder.com/150"}
              alt="Foto Profil"
              className="w-24 h-24 rounded-full mx-auto mb-2"
            />
            <label className="block text-sm font-medium text-gray-700">
              Ganti Foto Profil:
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block mt-2"
              />
            </label>
          </div>

          {/* Nama */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium">
              Nama:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={user.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-500"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-500"
              required
            />
          </div>

          {/* Tombol Submit */}
          <button
            type="submit"
            className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:ring focus:ring-indigo-500 focus:outline-none"
          >
            Simpan Perubahan
          </button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
