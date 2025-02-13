import React from 'react';
import { Link } from 'react-router-dom';

const QuestionDisplay = ({ generatedQuestions }) => {
  const handleSaveQuestions = () => {
    const content = generatedQuestions.join('\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'generated_questions.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div>
      <h2>Generated Questions:</h2>
      <div className="question-box">
        <ol>
          {generatedQuestions.map((question, index) => (
            <li key={index} className="question-item">
              {question}
            </li>
          ))}
        </ol>
      </div>
      <button className="save-button" onClick={handleSaveQuestions}>Save Questions</button>
      <Link to="/">Back to Home</Link>
    </div>
  );
};

export default QuestionDisplay;
