import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../store/constants";
import { setTasks } from "../store/taskSlice";
import TaskFormModal from "./TaskFormModal";
import { Link } from "react-router";

const Task = () => {
  const task = useSelector((state) => state.task);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [editTask, setEditTask] = useState(null);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [Date, setDate] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchTasks = async () => {
    try {
      const res = await axios.get(BASE_URL + "/tasks", {
        params: { search, status, Date ,page},
        withCredentials: true,
      });
      dispatch(setTasks(res.data.tasks));
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [search, status, Date, page]);

  const handleDelete = async (id) => {
    if (!confirm("Delete task?")) return;
    await axios.delete(`${BASE_URL}/delete/${id}`,{withCredentials: true});
    fetchTasks();
  };

  const toggleStatus = async (task) => {
    await axios.put(`${BASE_URL}/update/${task._id}`, {
      ...task,
      status: task.status === "DONE" ? "PENDING" : "DONE",
    },{withCredentials: true});
    fetchTasks();
  };

  return (
    <div className="p-4  min-h-screen bg-gray-800 text-white">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Your Tasks</h1>
        <button
          onClick={() => {
            setEditTask(null);
            setShowModal(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-700 transition duration-200"
        >
          + Create Task
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        <input
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="p-2 border rounded text-blue-900"
        >
          <option value="">All Status</option>
          <option value="PENDING">Pending</option>
          <option value="DONE">Done</option>
        </select>
        <input
          type="date"
          value={Date}
          onChange={(e) => setDate(e.target.value)}
          className="p-2 border rounded"
        />
      </div>

      {/* Task List */}
      <div className="grid gap-4">
        {task.map((task) => (
          <Link to={`/task/${task._id}`} key={task._id} className="border p-4 rounded shadow cursor-pointer hover:bg-gray-700 transition duration-200">
            <div className="flex justify-between items-center">
              <div className="font-semibold">
                {task.name}
              </div>
              <span
                className={`px-2 py-1 rounded text-sm ${
                  task.status === "DONE"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {task.status}
              </span>
            </div>
            <p className="text-gray-600">{task.description}</p>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => toggleStatus(task)}
                className="text-blue-600 text-sm px-2 py-1 bg-green-100 text-green-800 rounded  "
              >
                change Status
              </button>
              <button
                onClick={() => {
                  setEditTask(task);
                  setShowModal(true);
                }}
                className="text-yellow-600 px-2 py-1 bg-green-100  text-sm "
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(task._id)}
                className="text-red-600 bg-green-100 px-2 py-1 text-sm"
              >
                Delete
              </button>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex gap-2 mt-4">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`px-3 py-1 rounded  cursor-pointer ${
              page === i + 1 ? "bg-blue-600 text-white" : "bg-gray-500"
            }`}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <TaskFormModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        task={editTask}
        fetchTasks={fetchTasks}
      />
    </div>
  );
};

export default Task;
