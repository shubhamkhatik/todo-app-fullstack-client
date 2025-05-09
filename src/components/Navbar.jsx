import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { BASE_URL } from "../store/constants";
import { removeUser } from "../store/userSlice";

const NavBar = () => {
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      return navigate("/login");
    } catch (err) {
      console.error("Error logging out:", err);
    }
  };

  return (
    <div className="navbar text-center justify-between flex bg-gray-800 min-h-1/12 text-white">
      <div className="ml-3">
        <Link to="/" className="btn btn-ghost text-xl text-white">
          👩‍💻 Pragmatyc
        </Link>
      </div>
        <div className=" mr-8">
      {user && (
        <div className=" gap-2 flex text-center items-center">
          <div className="form-control text-white">
            Welcome, {user.firstName}
          </div>
           <div onClick={handleLogout} className="text-white mt-2 p-2 bg-amber-400 cursor-pointer">
                  Logout
                </div>
          
          </div>
      )}
      </div>
    </div>
  );
};
export default NavBar;
