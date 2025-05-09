import { BrowserRouter, Route, Routes } from "react-router";
import Store from "./store/store";
import { Provider } from "react-redux";
import Task from "./components/Task";
import Taskinfo from "./components/Taskinfo";
import Body from "./components/Body";
import Login from "./components/login";

function App() {
  return (
    <Provider store={Store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/" element={<Task />} />
            <Route path="/login" element={<Login />} />
            <Route path="/task/:id" element={<Taskinfo />} />
          </Route>
          <Route path="*" element={<div>Page not found! 404</div>} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
