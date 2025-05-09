import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../store/constants";
import { addUser } from "../store/userSlice";
import { useNavigate } from "react-router";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setError("");
    const { firstName, lastName, email, password } = form;

    if (!email || !password || (!isLogin && (!firstName || !lastName))) {
      setError("Please fill all required fields.");
      return;
    }

    try {
      const url = isLogin ? "/login" : "/register";
      const payload = isLogin ? { email, password } : { firstName, lastName, email, password };

      const res = await axios.post(BASE_URL + url, payload, {
        withCredentials: true,
      });

      dispatch(addUser(res.data.data));
      navigate("/");
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 text-gray-200 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md p-6 rounded shadow-md">
        <h2 className="text-center text-gray-950 text-2xl font-semibold mb-4">
          {isLogin ? "Login" : "Register"}
        </h2>

        {!isLogin && (
          <>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={form.firstName}
              onChange={handleChange}
              className="input w-full mb-2 px-3 text-gray-950 py-2 border rounded"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={form.lastName}
              onChange={handleChange}
              className="input w-full mb-2 px-3 py-2  text-gray-950 border rounded"
            />
          </>
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="input w-full mb-2 px-3 py-2 text-gray-950  border rounded"
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="input w-full mb-2 px-3 py-2 text-gray-950 border rounded pr-16"
          />
          <button
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-2 text-sm text-blue-600"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {isLogin ? "Login" : "Sign Up"}
        </button>

        <p
          className="text-center mt-4 text-sm text-gray-600 cursor-pointer"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "New user? Sign up" : "Already have an account? Login"}
        </p>
        <p className="text-gray-600">email: sk@gmail.com</p><p className="text-gray-600">password: Shubham@123</p>
      </div>
    </div>
  );
};

export default Login;
