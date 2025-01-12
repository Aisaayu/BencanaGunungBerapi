import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  // Fungsi untuk menangani perubahan input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Fungsi untuk menangani submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Kirim data registrasi ke API
      const response = await axios.post(
        "https://678314cd8b6c7a1316f37202.mockapi.io/users", // Ganti endpoint dengan API Anda
        form,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      // Jika berhasil, tampilkan notifikasi
      if (response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Registrasi Berhasil!",
          text: "Akun Anda berhasil dibuat. Silakan login.",
        });

        // Reset form setelah berhasil
        setForm({ name: "", email: "", password: "" });

        // Arahkan ke halaman login
        navigate("/");
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);

      // Tampilkan pesan kesalahan jika ada
      Swal.fire({
        icon: "error",
        title: "Registrasi Gagal!",
        text: error.response?.data?.message || "Terjadi kesalahan.",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Halaman Register</h2>
        <form onSubmit={handleSubmit}>
          {/* Input Nama */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium">
              Nama:
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-500"
              required
            />
          </div>

          {/* Input Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium">
              Email:
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-500"
              required
            />
          </div>

          {/* Input Password */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium">
              Password:
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-500"
              required
            />
          </div>

          {/* Tombol Submit */}
          <button
            type="submit"
            className="w-auto px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:ring focus:ring-indigo-500 focus:outline-none"
          >
            Daftar
          </button>
        </form>

        {/* Link ke Halaman Login */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Sudah punya akun?{" "}
            <Link to="/" className="text-indigo-600 hover:underline">
              Login di sini
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
