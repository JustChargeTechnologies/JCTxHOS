import React, { useState, useCallback, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import StartScreen from './Components/StartScreen';
import DescriptionScreen from './Components/DescriptionScreen';
import GameScreen from './Components/GameScreen';
import GameOverScreen from './Components/GameOverScreen';
import CouponScreen from './Components/CouponScreen';
import FormScreen from './Components/FormScreen';
import ThankYouScreen from './Components/ThankYouScreen';
import { idiomBank } from './data/questions';

const App = () => {
  const [gameState, setGameState] = useState('start');
  const [score, setScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [couponPercentage, setCouponPercentage] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [hasPlayed, setHasPlayed] = useState(false);

  // Initialize game state and check if user has played before
  useEffect(() => {
    const playedStatus = localStorage.getItem('hasPlayed');
    if (playedStatus === 'true') {
      setHasPlayed(true);
      setGameState('completed');
    }

    // Select 2 random questions
    const shuffled = [...idiomBank].sort(() => 0.5 - Math.random()).slice(0, 2);
    setQuestions(shuffled);
  }, []);

  const startGame = useCallback(() => {
    if (!hasPlayed) {
      setGameState('description');
    }
  }, [hasPlayed]);

  const startMainGame = useCallback(() => {
    if (!hasPlayed) {
      setGameState('game');
      setScore(0);
      setCurrentQuestionIndex(0);
      setCouponPercentage(0);
    }
  }, [hasPlayed]);

  const handleAnswer = useCallback((isCorrect) => {
    if (currentQuestionIndex === 0) { // First question
      if (isCorrect) {
        // If first answer is correct, give 80% and end game
        setCouponPercentage(80);
        setScore(1);
        setGameState('gameOver');
      } else {
        // If first answer is wrong, move to second question
        setCurrentQuestionIndex(1);
      }
    } else { // Second question
      if (isCorrect) {
        // If second answer is correct, give 50%
        setCouponPercentage(50);
      } else {
        // If second answer is also wrong, give 10%
        setCouponPercentage(10);
      }
      setScore(isCorrect ? 1 : 0);
      setGameState('gameOver');
    }
  }, [currentQuestionIndex]);

  const showCouponScreen = useCallback(() => setGameState('coupon'), []);
  const showFormScreen = useCallback(() => setGameState('form'), []);

  const handleFormSubmit = useCallback(async (formData) => {
    try {
      const payload = {
        ...formData,
        score,
        coupon: `IDIOM${couponPercentage}`,
      };

      await fetch('https://script.google.com/macros/s/AKfycbyL7ne5uRiMTeKL7HS3KQ0JAbLLpOvHnx8Rf5ShKnR3KlAhrMzWjL3wCxCPwhiLZC8dwA/exec', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' },
        mode: 'no-cors',
      });

      setHasPlayed(true);
      localStorage.setItem('hasPlayed', 'true');
      setGameState('thankYou');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Something went wrong. Please try again.');
    }
  }, [couponPercentage, score]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-black text-white relative">
        {gameState === 'start' && <StartScreen onStartGame={startGame} hasPlayed={hasPlayed} />}
        {gameState === 'description' && <DescriptionScreen onStartGame={startMainGame} />}
        {gameState === 'game' && questions[currentQuestionIndex] && (
          <GameScreen
            question={questions[currentQuestionIndex]}
            onAnswer={handleAnswer}
            timeLimit={60}
            currentQuestion={currentQuestionIndex + 1}
            totalQuestions={2}
          />
        )}
        {gameState === 'gameOver' && (
          <GameOverScreen
            score={score}
            totalQuestions={2}
            couponPercentage={couponPercentage}
            onShowCoupon={showCouponScreen}
          />
        )}
        {gameState === 'coupon' && (
          <CouponScreen
            couponPercentage={couponPercentage}
            onContinue={showFormScreen}
          />
        )}
        {gameState === 'form' && (
          <FormScreen
            gameData={{
              coupon: `IDIOM${couponPercentage}`,
              score
            }}
            onSubmit={handleFormSubmit}
          />
        )}
        {(gameState === 'thankYou' || gameState === 'completed') && (
          <ThankYouScreen hasPlayed={true} />
        )}
      </div>
    </DndProvider>
  );
};

export default App;