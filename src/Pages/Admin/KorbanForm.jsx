import React, { useState } from "react";
import axios from "axios";

const KorbanForm = ({ refreshData }) => {
  const [form, setForm] = useState({ nama: "", usia: "", alamat: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/korban", form);
      alert("Data berhasil ditambahkan!");
      setForm({ nama: "", usia: "", alamat: "" });
      refreshData();
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
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
        Tambah Data
      </button>
    </form>
  );
};

export default KorbanForm;
