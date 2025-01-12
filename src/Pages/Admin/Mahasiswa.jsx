import React, { useState, useEffect } from "react";
import axios from "axios";

const Korban = () => {
  const [korbanList, setKorbanList] = useState([]);
  const [form, setForm] = useState({ nama: "", usia: "", alamat: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  // Fetch data korban
  const fetchKorban = async () => {
    try {
      const response = await axios.get("http://demo-api.syaifur.io/api/korban");
      setKorbanList(response.data || []);
    } catch (error) {
      console.error("Error fetching korban:", error);
    }
  };

  useEffect(() => {
    fetchKorban();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Handle form submission (Create or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditing) {
        // Update data korban
        await axios.put(`https://678314cd8b6c7a1316f37202.mockapi.io/korban/${editId}`, form);
        alert("Data berhasil diperbarui!");
      } else {
        // Create data korban baru
        await axios.post("https://678314cd8b6c7a1316f37202.mockapi.io/korban", form);
        alert("Data berhasil ditambahkan!");
      }

      setForm({ nama: "", usia: "", alamat: "" });
      setIsEditing(false);
      setEditId(null);
      fetchKorban(); // Refresh data
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://678314cd8b6c7a1316f37202.mockapi.io/korban/${id}`);
      alert("Data berhasil dihapus!");
      fetchKorban(); // Refresh data
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  // Handle edit
  const handleEdit = (korban) => {
    setForm({ nama: korban.nama, usia: korban.usia, alamat: korban.alamat });
    setIsEditing(true);
    setEditId(korban.id);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Manajemen Data Korban</h1>

      {/* Form Input */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="mb-4">
          <label className="block text-sm font-medium">Nama:</label>
          <input
            type="text"
            name="nama"
            value={form.nama}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Usia:</label>
          <input
            type="number"
            name="usia"
            value={form.usia}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Alamat:</label>
          <input
            type="text"
            name="alamat"
            value={form.alamat}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {isEditing ? "Perbarui Data" : "Tambah Data"}
        </button>
      </form>

      {/* Daftar Korban */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Daftar Korban</h2>
        <ul className="space-y-4">
          {korbanList.map((korban) => (
            <li key={korban.id} className="border p-4 rounded-lg">
              <h3 className="text-lg font-bold">{korban.nama}</h3>
              <p>Usia: {korban.usia}</p>
              <p>Alamat: {korban.alamat}</p>
              <div className="mt-4 flex space-x-2">
                <button
                  className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                  onClick={() => handleEdit(korban)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  onClick={() => handleDelete(korban.id)}
                >
                  Hapus
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Korban;
