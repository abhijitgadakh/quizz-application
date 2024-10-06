import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import ResultModal from "./ResultModal";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const navigate = useNavigate();
  const setup = JSON.parse(localStorage.getItem("quizSetup"));

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await axios.get(
        `https://opentdb.com/api.php?amount=${setup.numQustions}&category=${setup.category}&difficulty=${setup.difficulty}&type=${setup.multiple}`
      );
      //   console.log(response.data.results);
      setQuestions(response.data.results);
    };
    fetchQuestions();
  }, [setup]);

  return (
    <div>
      {questions.length > 0 && (
        <div>
          <h2>{questions[currentQuestionIndex].question}</h2>
          <div>
            {
              questions[
                currentQuestionIndex.incorrect_answers.concate(questions)
              ]
            }
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
