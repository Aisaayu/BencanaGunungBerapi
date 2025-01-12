import React from "react";
import axios from "axios";

const KorbanTable = ({ korbanList, refreshData }) => {
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/korban/${id}`);
      alert("Data berhasil dihapus!");
      refreshData();
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  return (
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
  );
};

export default KorbanTable;
