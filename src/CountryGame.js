import React, { Component } from 'react';
import FlagQuestion, { QuestionStates } from './FlagQuestion.js';
import shuffle from 'shuffle-array';

class CountryGame extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       countries: [],
       options: [],
       correctOption: undefined,
       questionState: undefined,
    }
    this.handleGuess = this.handleGuess.bind(this);
    this.onNextQuestion = this.onNextQuestion.bind(this);
  }

  handleGuess(userChoice) {
    userChoice === this.state.correctOption
      ? this.setState({...this, questionState: QuestionStates.ANSWER_CORRECT})
      : this.setState({...this, questionState: QuestionStates.ANSWER_WRONG})
  }

  onNextQuestion() {
    const { countries } = this.state;
    const correctOption = Math.floor(Math.random() * countries.length);
    const options = this._getOptions(correctOption, countries);
    this.setState ({
      options,
      correctOption,
      questionState: QuestionStates.QUESTION,
   })
  }

  componentDidMount() {
    fetch("https://restcountries.eu/rest/v2/all")
      .then(resp => resp.json())
      .then(countries => {
        const correctOption = Math.floor(Math.random() * countries.length);
        // console.log(correctOption);
        // console.log(countries[correctOption]);
        const options = this._getOptions(correctOption, countries);
        this.setState({
          countries,
          options,
          correctOption,
          questionState: QuestionStates.QUESTION,
        });
      })
      .catch(console.warn)

  }

  _getOptions(correctOption, countries) {
    let options = [correctOption];
    let tries = 0;
    while(options.length < 4 && tries < 15) {
      let option = Math.floor(Math.random() * countries.length);
      if(options.indexOf(option) === -1) {
        options.push(option);
      } else {
        tries++;
      }
    }
    console.log(options);
    return shuffle(options);
  }
  
  render() {
    const { countries, correctOption, options, questionState } = this.state;
    let output = <div>Loading...</div>;
    if(correctOption !== undefined) {
      const { flag, name } = countries[correctOption];
      let opts = options.map(opt => {
        return {
          id: opt,
          name: countries[opt].name
        };
      });
      output = (
          <FlagQuestion
            answerText={name}
            onGuess={this.handleGuess}
            onNext={this.onNextQuestion}
            options={opts}
            questionState={questionState}
            flagUrl={flag}
          />
      )
    }
    return (
      <div style={{ marginTop: "15px" }} >
        {output}
      </div>
    );
  }
}

export default CountryGame;
