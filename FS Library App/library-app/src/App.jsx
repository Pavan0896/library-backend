import { Link, Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Library from "./Components/Library";
import Creator from "./Components/Creator";

const App = () => {
  return (
    <div style={{ width: "100%" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          width: "100%",
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          padding: "1%",
        }}
      >
        <Link to={"/"}>Home</Link>
        <Link to={"/register"}>Register</Link>
        <Link to={"/login"}>Login</Link>
        <Link to={"/library"}>Library</Link>
        <Link to={"/createBook"}>Create Book</Link>
      </div>
      <Routes>
        <Route path="/" element={<h1 style={{textAlign:"center"}}>Home</h1>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/library" element={<Library />} />
        <Route path="/createBook" element={<Creator />} />
      </Routes>
    </div>
  );
};

export default App;
