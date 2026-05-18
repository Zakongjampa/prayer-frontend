import { Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Pecha from "./components/Pecha";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

function App() {
  return (
    <Fragment>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/prayer/:id" element={<Pecha />} />
        <Route
          path="*"
          element={<h2 style={{ zIndex: "1" }}>Page Not Found</h2>}
        />
      </Routes>
    </Fragment>
  );
}

export default App;
