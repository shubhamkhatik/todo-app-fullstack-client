import axios from "axios";
import Footer from "./Footer";
import NavBar from "./Navbar";
import { addUser } from "../store/userSlice";
import { Outlet, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { BASE_URL } from "../store/constants";

const Body = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const getUserByToken = async () => {
    try {
      const res = await axios.get(BASE_URL + "/me");
      dispatch(addUser(res.data.data));
    } catch (error) {
      console.error("Authentication failed:", error);
      dispatch(addUser(null));
      navigate("/login");
    }
  };

  useEffect(() => {
    if (!user && !window.location.pathname.includes("/login")) {
      getUserByToken();
    }
  }, [user]);

  return (
    <>
      <NavBar />
      <Outlet/>
      <Footer />
    </>
  );
};

export default Body;
