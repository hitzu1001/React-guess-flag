import React from 'react';
import './FlagAnswer.css';

const FlagAnswer = ({ correct, answer, onNext }) => (
  <div className="flag-answer">
    {correct
      ? `Correct! ${answer}`
      : `Incorrect! Correct answer is ${answer}`
    }
    <button onClick={onNext}>NEXT</button>
  </div>
);

export default FlagAnswer;
