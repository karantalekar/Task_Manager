import "./App.css";
import Add_task from "./component/Add_task";
import { Route, Routes } from "react-router-dom";
import Show_task from "./component/Show_task";
import Register from "./component/Register";
import Login from "./component/Login";
import Footer from "./component/Footer";
function App() {
  return (
    <>
      <Footer />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add_task" element={<Add_task />} />
        <Route path="/show_task" element={<Show_task />} />
        {/* <Route path="*" element={"page Not found"} /> */}
      </Routes>
    </>
  );
}

export default App;
