import { useState } from "react";
import "./App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SetupQuiz from "./components/SetupQuiz";
import Quiz from "./components/Quiz";
import LeaderBoard from "./components/LeaderBoard";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<SetupQuiz />} />
          <Route path="/Quiz" element={<Quiz />} />
          <Route path="/LeaderBoard" element={<LeaderBoard />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
