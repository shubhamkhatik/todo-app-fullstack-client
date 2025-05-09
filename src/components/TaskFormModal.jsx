import { useEffect, useState } from "react";
import { BASE_URL } from "../store/constants";
import axios from "axios";

const TaskFormModal = ({ isOpen, onClose, fetchTasks, task = null }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("PENDING");

  useEffect(() => {
    if (task) {
      setName(task.name);
      setDescription(task.description);
      setStatus(task.status);
    } else {
      setName("");
      setDescription("");
      setStatus("PENDING");
    }
  }, [task]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (task) {
        await axios.put(`${BASE_URL}/update/${task._id}`, {
          name,
          description,
          status,
        },{ withCredentials: true });
      } else {
        await axios.post(BASE_URL + "/create", { name, description, status },{ withCredentials: true });
      }
      fetchTasks();
      onClose();
    } catch (err) {
      console.error("Error submitting task", err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 text-white bg-opacity-50 flex justify-center items-start pt-20 z-50">
      <div className="bg-white p-6 rounded w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">
          {task ? "Edit Task" : "Create Task"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            className="w-full p-2 text-gray-800 border rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <textarea
            placeholder="Description"
            className="w-full p-2 border text-gray-800 rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full p-2 border text-gray-800 rounded"
          >
            <option value="PENDING">Pending</option>
            <option value="DONE">Done</option>
          </select>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-600 cursor-pointer text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 cursor-pointer rounded"
            >
              {task ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskFormModal;
