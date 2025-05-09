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
        .get(`${BASE_URL}/task/${id}`,{withCredentials: true})
        .then((res) => dispatch(setSelectedTask(res.data.task)))
        .catch((err) => console.error("Error fetching task:", err));
    }
  }, [id, taskList, dispatch]);

  if (!selectedTask) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-4 max-w-xl mx-auto min-h-screen bg-gray-800 text-white">
      <button
        onClick={() => navigate(-1)}
        className="text-blue-600 underline mb-4"
      >
        ← Back
      </button>
      <h1 className="text-2xl font-bold mb-2">{selectedTask.name}</h1>
      <p className="text-gray-700 mb-2">{selectedTask.description}</p>
      <p
        className={`font-semibold ${
          selectedTask.status === "DONE" ? "text-green-600" : "text-yellow-600"
        }`}
      >
        Status: {selectedTask.status}
      </p>
      <p className="text-sm text-gray-500 mt-2">
        Created: {new Date(selectedTask.createdAt).toLocaleString()}
      </p>
    </div>
  );
};

export default TaskInfo;
