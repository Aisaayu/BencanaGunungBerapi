import React, { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const [showTable, setShowTable] = useState(false);
  const [korbanList, setKorbanList] = useState([]);
  const [form, setForm] = useState({ nama: "", usia: "", alamat: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  // Fetch data korban
  const fetchKorban = async () => {
    try {
      const response = await axios.get("http://localhost:5000/korban");
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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`http://localhost:5000/korban/${editId}`, form);
        alert("Data berhasil diperbarui!");
      } else {
        await axios.post("http://localhost:5000/korban", form);
        alert("Data berhasil ditambahkan!");
      }
      setForm({ nama: "", usia: "", alamat: "" });
      setIsEditing(false);
      setEditId(null);
      fetchKorban();
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/korban/${id}`);
      alert("Data berhasil dihapus!");
      fetchKorban();
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
      <h1 className="text-3xl font-bold text-center mb-6">Dashboard Kebencanaan Gunung Merapi</h1>

      {/* Informasi Gunung Merapi */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Informasi Tentang Gunung Merapi</h2>
        <img
          src="https://cdn.antaranews.com/cache/1200x800/2023/03/11/IMG_20230311_131956.jpg"
          alt="Gunung Merapi"
          className="w-full h-auto rounded-lg shadow mb-4"
        />
        <p className="text-gray-700">
          Gunung Merapi adalah salah satu gunung berapi teraktif di dunia. Terletak di perbatasan Jawa Tengah dan Yogyakarta,
          Merapi sering menunjukkan aktivitas vulkanik yang signifikan. Aktivitas terbaru menunjukkan peningkatan aktivitas vulkanik,
          sehingga masyarakat di sekitar kawasan ini dihimbau untuk selalu waspada.
        </p>
      </section>

      {/* Status Terkini */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Status Terkini</h2>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-700">
            <span className="font-semibold">Status:</span> Siaga (Level III)
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Rekomendasi:</span> Hindari radius 5 km dari puncak.
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Tanggal:</span> 15 Januari 2025
          </p>
        </div>
      </section>

      {/* Tips Keselamatan */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Tips Keselamatan</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Selalu siapkan tas darurat yang berisi kebutuhan dasar.</li>
          <li>Ikuti arahan petugas evakuasi dan hindari zona bahaya.</li>
          <li>Gunakan masker untuk melindungi diri dari abu vulkanik.</li>
          <li>Pastikan jalur komunikasi tetap terbuka dengan keluarga.</li>
        </ul>
      </section>

      {/* Tabel Korban */}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
        onClick={() => setShowTable(!showTable)}
      >
        {showTable ? "Hide Data Korban" : "See Data Korban"}
      </button>

      {showTable && (
        <div>
          <h3 className="text-xl font-bold mb-4">Daftar Korban</h3>
          <table className="w-full bg-white rounded-lg shadow-md mb-6">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2">Nama</th>
                <th className="px-4 py-2">Usia</th>
                <th className="px-4 py-2">Alamat</th>
                <th className="px-4 py-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {korbanList.map((korban) => (
                <tr key={korban.id} className="border-t">
                  <td className="px-4 py-2">{korban.nama}</td>
                  <td className="px-4 py-2">{korban.usia}</td>
                  <td className="px-4 py-2">{korban.alamat}</td>
                  <td className="px-4 py-2">
                    <button
                      className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 mr-2"
                      onClick={() => handleEdit(korban)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                      onClick={() => handleDelete(korban.id)}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3 className="text-xl font-bold mb-4">Tambah Data Korban</h3>
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
              {isEditing ? "Perbarui Data" : "Tambah Data"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
