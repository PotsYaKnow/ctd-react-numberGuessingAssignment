import React, { useEffect, useMemo, useState } from "react";
import GuessControl from "./GuessControl";
import GuessMessage from "./GuessMessage";
import GameOver from "./GameOver";

/**
 *
 * Returns a random integer number from 1-100 inclusive
 */
function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

const NumberGuessingGame = () => {

   const [numberToGuess, setNumberToGuess ]= useState(0)
   const [numberOfGuesses, setNumberOfGuesses] = useState(0);
   const [latestGuess, setLatestGuess] = useState(null);
   const [maxAttemps, setMaxAttempts] = useState(5);

   
   useEffect( ()=> {
    setNumberToGuess(getRandomNumber())
   }, [])

   console.log(numberToGuess)
   const handleGuess = (guess) => {
    setLatestGuess(guess);
    setNumberOfGuesses((prevNumberOfGuesses) => prevNumberOfGuesses + 1)
   }


   const handleReset = () => {
    setNumberToGuess(getRandomNumber());
    setNumberOfGuesses(0);
    setLatestGuess(null);
    setMaxAttempts(5)
  }

  const isCorrectGuess = useMemo(() => latestGuess === numberToGuess, [latestGuess, numberToGuess])
  console.log(isCorrectGuess)
  const isGameOver = useMemo(() => numberOfGuesses === maxAttemps, [numberOfGuesses, maxAttemps])

  return (
    <div>
        <h2>I'm thinking of a number from 1 to 100.</h2>
        <h2>``
          Can you guess the number I am thinking of in {maxAttemps} tries?
        </h2>

        <GuessControl onGuess={handleGuess} />
        {(isGameOver || isCorrectGuess) && (
          <GameOver hasWon={isCorrectGuess} onReset={handleReset} />
        )}
        {!isGameOver && !isCorrectGuess && (
          <GuessMessage
            guess={latestGuess}
            numberToGuess={numberToGuess}
            numberOfGuesses={numberOfGuesses}
          />
        )}
      </div>
  )
}

export default NumberGuessingGame;
