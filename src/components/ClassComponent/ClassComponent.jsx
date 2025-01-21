import React from 'react';
import PropTypes from 'prop-types';
import style from './ClassComponent.module.css';


export class ClassComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.resetState();
  }

  resetState() {
    return {
      message: 'Результат',
      userNumber: '',
      randomNumber: this.generateRandomNumber(),
      count: 0,
      isGuess: false,
    };
  }

  generateRandomNumber() {
    const {min, max} = this.props;
    return Math.floor((Math.random() * (max - min + 1)) + min);
  }

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.isGuess) {
      this.setState(() => this.resetState());
      return;
    }

    this.setState(state => {
      let newMessage;
      let guessed = false;

      const newCount = state.count + 1;
      const number = parseInt(state.userNumber, 10);

      if (!number || number < this.props.min || number > this.props.max) {
        const {min, max} = this.props;
        newMessage = `Введите число от ${min} до ${max}`;
      } else if (number > state.randomNumber) {
        newMessage = `${number} больше загаданного`;
      } else if (number < state.randomNumber) {
        newMessage = `${number} меньше загаданного`;
      } else {
        newMessage = `
          Вы угадали! Загаданное число ${state.randomNumber},
          попыток ${newCount}.
        `;
        guessed = true;
      }

      return {
        message: newMessage,
        userNumber: '',
        count: newCount,
        isGuess: guessed,
      };
    });
  };

  handleChange = event => {
    this.setState(() => ({
      userNumber: event.target.value,
    }));
  };

  render() {
    return (
      <div className={style.game}>
        <p className={style.message}>{this.state.message}</p>

        <form className={style.form} onSubmit={this.handleSubmit}>
          <label className={style.label} htmlFor='user_number'>
            Угадай число
          </label>

          <input
            className={style.input}
            type='number'
            id='user_number'
            onChange={this.handleChange}
            value={this.state.userNumber}
          />

          <button className={style.btn} type="submit">
            {this.state.isGuess ? 'Сыграть ещё' : 'Угадать'}
          </button>
        </form>
      </div>
    );
  }
}

ClassComponent.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
};
