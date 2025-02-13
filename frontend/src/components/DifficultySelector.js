import React from 'react';

const DifficultySelector = ({ difficulty, setDifficulty }) => {
  const handleChange = (event) => {
    setDifficulty(event.target.value);
  };

  return (
    <div>
      <label>
        Difficulty Level:
        <select value={difficulty} onChange={handleChange}>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </label>
    </div>
  );
};

export default DifficultySelector;
