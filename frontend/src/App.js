import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Routes, Route } from 'react-router-dom';
import QuestionDisplay from './components/QuestionDisplay';
import QuizDisplay from './components/QuizDisplay';
import FileUploader from './components/FileUploader';
import DifficultySelector from './components/DifficultySelector';
import NumberOfQuestionsInput from './components/NumberOfQuestionsInput';
import ChoiceModal from './components/ChoiceModal';
import './App.css';

function App() {
  const [generatedQuestions, setGeneratedQuestions] = useState([]);
  const [quiz, setQuiz] = useState([]);
  const [difficulty, setDifficulty] = useState('Easy');
  const [numberOfQuestions, setNumberOfQuestions] = useState(1);
  const [isChoiceModalOpen, setIsChoiceModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();

  const handleFileUpload = (file) => {
    if (!file) {
      console.error("No file selected");
      return;
    }
    setSelectedFile(file);
    setIsChoiceModalOpen(true);
  };

  const handleGenerate = async (choice, file) => {
    if (!file) {
      console.error("No file selected for generation");
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('difficulty', difficulty.toLowerCase()); 
    formData.append('numberOfQuestions', numberOfQuestions.toString()); 
    formData.append('mode', choice);

    console.log("Sending Form Data: ", formData);

    try {
      const response = await axios.post('http://localhost:5000/api/generate', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log("API Response: ", response.data);

      if (choice === 'questions') {
        setGeneratedQuestions(response.data.questions || []);
        navigate('/questions');
      } else {
        setQuiz(response.data.quiz || []);
        navigate('/quiz');
      }
    } catch (error) {
      console.error('Error generating content:', error);
    }
  };

  return (
    <div className="App">
      <h1>Question Bank Generator</h1>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="flex-container">
                <NumberOfQuestionsInput numberOfQuestions={numberOfQuestions} setNumberOfQuestions={setNumberOfQuestions} />
                <DifficultySelector difficulty={difficulty} setDifficulty={setDifficulty} />
              </div>
              <FileUploader onFileUpload={handleFileUpload} />
            </>
          }
        />
        <Route path="/questions" element={<QuestionDisplay generatedQuestions={generatedQuestions} />} />
        <Route path="/quiz" element={<QuizDisplay quiz={quiz} />} />
      </Routes>

      {isChoiceModalOpen && (
        <ChoiceModal
          isOpen={isChoiceModalOpen}
          onClose={() => setIsChoiceModalOpen(false)}
          onSelect={(choice) => {
            setIsChoiceModalOpen(false);
            handleGenerate(choice, selectedFile);
          }}
        />
      )}
    </div>
  );
}

export default App;
