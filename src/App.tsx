import React, { Suspense } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navigation from "./components/navigation";
import Home from "./components/home";
import Error from "./components/error";

const About = React.lazy(() => import("./components/about"));
const Contact = React.lazy(() => import("./components/contact"));

function App() {
  return (
    <Router>
      <div>
        <Navigation />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
              <Route path="/home" element={<Home/>} />
              <Route path="/about" element={<About/>} />
              <Route path="/contact" element={<Contact/>} />
            <Route element={<Error/>} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;