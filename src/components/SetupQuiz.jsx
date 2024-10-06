import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SetupQuiz = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [numQustions, setNumQustions] = useState(10);

  const navigate = useNavigate();

  const startQuiz = () => {
    if (name && category && difficulty && numQustions) {
      const setupData = { name, category, difficulty, numQustions };
      localStorage.setItem("quizSetup", JSON.stringify(setupData));
      navigate("/quiz");
    }
  };

  return (
    <div>
      <button onClick={() => navigate("/leaderboard")}>Leader Board</button>
      <h1>Quiz SetUp</h1>

      {/* 1st Input Name  */}
      <label>
        Name:{" "}
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <br />
      {/* 2nd Select Category:  */}
      <label>
        Category:
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Select Category</option>
          <option value="9">General Knowlegde</option>
          <option value="21">Sports</option>
          <option value="23">History</option>
          <option value="18">Science : Computers</option>
          <option value="31">Entertainment: Japanese Anime & Manga</option>
        </select>
      </label>
      <br />
      {/* 3rd Select Difficulty:  */}
      <label>
        Category:
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="">Select Category</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </label>
      <br />
      {/* 4th Input Name  */}
      <label>
        Number of questions:{" "}
        <input
          type="number"
          value={numQustions}
          onChange={(e) => setNumQustions(e.target.value)}
        />
      </label>

      <button
        onClick={startQuiz}
        disabled={!name || !category || !difficulty || !numQustions}
      >
        START QUIZ
      </button>
    </div>
  );
};

export default SetupQuiz;
