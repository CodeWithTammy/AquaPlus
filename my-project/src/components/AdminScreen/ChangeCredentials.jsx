import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ChangeCredentials = () => {
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token"); // stored on login
      const res = await fetch("http://localhost:5000/api/change-credentials", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ newEmail, newPassword }),
      });

      if (!res.ok) throw new Error("Failed to update credentials");
      navigate("/Admin");
    } catch (err) {
      console.error(err);
      setError("Failed to update credentials. Please re-login.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleUpdate}
        className="bg-white p-8 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Update Credentials</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <label className="block mb-2">New Email</label>
        <input
          type="email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />

        <label className="block mb-2">New Password</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full p-2 mb-6 border rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default ChangeCredentials;
