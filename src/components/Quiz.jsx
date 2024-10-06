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
        `https://opentdb.com/api.php?amount=${setup.numQuestions}&category=${setup.category}&difficulty=${setup.difficulty}&type=multiple`
      );
      setQuestions(response.data.results);
    };
    fetchQuestions();
  }, [setup]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          handleNextQuestion();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [currentQuestionIndex]);

  useEffect(() => {
    setTimeLeft(
      setup.difficulty === "easy" ? 20 : setup.difficulty === "medium" ? 15 : 10
    );
  }, [currentQuestionIndex, setup.difficulty]);

  const handleAnswer = (answer) => {
    setAnswers((prev) => [
      ...prev,
      { questionIndex: currentQuestionIndex, answer },
    ]);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setQuizComplete(true);
      calculateScore();
      setShowResult(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) setCurrentQuestionIndex((prev) => prev - 1);
  };

  const calculateScore = () => {
    let correctAnswers = 0;
    answers.forEach((ans, i) => {
      if (questions[ans.questionIndex].correct_answer === ans.answer) {
        correctAnswers += 1;
      }
    });
    setScore(correctAnswers * 10);
  };

  return (
    <div className="quiz-container">
      {questions.length > 0 && (
        <div>
          <h2>{questions[currentQuestionIndex].question}</h2>
          <div>
            {questions[currentQuestionIndex].incorrect_answers
              .concat(questions[currentQuestionIndex].correct_answer)
              .map((option, index) => (
                <button
                  className="options"
                  key={index}
                  disabled={answers.some(
                    (a) => a.questionIndex === currentQuestionIndex
                  )}
                  onClick={() => handleAnswer(option)}
                >
                  {index + 1}: {option}
                </button>
              ))}
          </div>
          <div className="time-left">Time left: {timeLeft}s</div>
          <button
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
            className="nav-buttons"
          >
            Previous
          </button>
          {currentQuestionIndex < questions.length - 1 ? (
            <button onClick={handleNextQuestion} className="nav-buttons">
              Next
            </button>
          ) : (
            <button onClick={handleNextQuestion} className="submit-btn">
              Submit
            </button>
          )}
        </div>
      )}
      {showResult && (
        <ResultModal score={score} onClose={() => navigate("/leaderboard")} />
      )}
    </div>
  );
};

export default Quiz;
