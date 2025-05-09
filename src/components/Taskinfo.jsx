import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { clearSelectedTask, setSelectedTask } from "../store/selectedTaskSlice";
import axios from "axios";
import { BASE_URL } from "../store/constants";

const TaskInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const taskList = useSelector((state) => state.task);
  const selectedTask = useSelector((state) => state.selectedTask);

  useEffect(() => {
    dispatch(clearSelectedTask()); // 🔁 Clear stale data first

    const cached = taskList.find((task) => task._id === id);
    if (cached) {
      dispatch(setSelectedTask(cached));
    } else {
      axios
        .get(`${BASE_URL}/task/${id}`, { withCredentials: true })
        .then((res) => dispatch(setSelectedTask(res.data.task)))
        .catch((err) => console.error("Error fetching task:", err));
    }
  }, [id, taskList, dispatch]);

  if (!selectedTask) return <div className="p-4">Loading...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="p-6 max-w-xl w-full bg-gray-700 rounded-lg shadow-lg">
        <button
          onClick={() => navigate(-1)}
          className="text-blue-400 underline mb-4 cursor-pointer"
        >
          ← Back
        </button>
        <h1 className="text-3xl font-bold mb-4">{selectedTask.name}</h1>
        <p className="text-gray-300 mb-4">{selectedTask.description}</p>
        <p
          className={`font-semibold ${
            selectedTask.status === "DONE"
              ? "text-green-500"
              : "text-yellow-500"
          }`}
        >
          Status: {selectedTask.status}
        </p>
        <p className="text-sm text-gray-400 mt-4">
          Created: {new Date(selectedTask.createdAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default TaskInfo;
