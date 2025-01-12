import users from "../../data/users";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://678314cd8b6c7a1316f37202.mockapi.io/users`
      );
  
      const user = response.data.find(
        (u) => u.email === form.email && u.password === form.password
      );
  
      if (user) {
        Swal.fire({
          icon: "success",
          title: "Login berhasil",
          text: `Selamat datang, ${user.name}!`,
        });
  
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/admin");
      } else {
        Swal.fire({
          icon: "error",
          title: "Login gagal",
          text: "Email atau password salah.",
        });
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      Swal.fire({
        icon: "error",
        title: "Login gagal",
        text: "Terjadi kesalahan.",
      });
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Halaman Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium">
              Email:
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium">
              Password:
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-auto px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:ring focus:ring-indigo-500 focus:outline-none"
          >
            Login
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Belum punya akun?{" "}
            <Link to="/register" className="text-indigo-600 hover:underline">
              Daftar di sini
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
