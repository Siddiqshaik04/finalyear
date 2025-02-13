import React, { useState, useEffect } from 'react';

const QuizDisplay = ({ quiz = [] }) => {
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  useEffect(() => {
    console.log("Received Quiz Data:", quiz); // Debugging: Check data received
  }, [quiz]);

  const handleAnswerChange = (questionIndex, selectedOption) => {
    setAnswers((prev) => ({
      ...prev,
      [questionIndex]: selectedOption,
    }));
  };

  const handleSubmit = () => {
    let correct = 0;
    quiz.forEach((q, index) => {
      if (answers[index] === q.correctAnswer) {
        correct++;
      }
    });
    setScore(correct);
  };

  return (
    <div>
      <h2>Quiz</h2>
      {quiz.length > 0 ? (
        quiz.map((q, index) => (
          <div key={index}>
            <p><strong>{index + 1}. {q.question}</strong></p>
            {q.options && q.options.length > 0 ? (
              q.options.map((option, i) => (
                <label key={i} style={{ display: "block", marginBottom: "5px" }}>
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={option}
                    checked={answers[index] === option}
                    onChange={() => handleAnswerChange(index, option)}
                  />
                  {option}
                </label>
              ))
            ) : (
              <p>No options available</p>
            )}
          </div>
        ))
      ) : (
        <p>Loading quiz...</p>
      )}
      <button onClick={handleSubmit} disabled={quiz.length === 0}>Submit Quiz</button>
      {score !== null && <p>Your Score: {score} / {quiz.length}</p>}
    </div>
  );
};

export default QuizDisplay;
