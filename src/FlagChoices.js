import React from 'react';
// import StyleButton from './StyledButton';
import './FlagChoices.css';

const FlagChoice = props => {
  let options = props.options || [];
  const { handleChange, handleSubmit } = props;
  let inputs = options.map(opt => (
    <label key={opt.id}>
      <input 
        type="radio"
        value={opt.id}
        checked={opt.checked}
        onChange={handleChange}
        name="flag-choice"
      />
      {opt.name}
    </label>
  ));

  return (
    <div>
      <form className="flag-form" onSubmit={handleSubmit}>
        {inputs}
        <button className="guess-btn" type="submit">GUESS</button>
      </form>
    </div>
  )
}

export default FlagChoice
