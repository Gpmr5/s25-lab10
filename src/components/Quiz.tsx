import React, { useState } from 'react';
import './Quiz.css';
import QuizCore from '../core/QuizCore';
import QuizQuestion from '../core/QuizQuestion';

const quizCore = new QuizCore(); 

const Quiz: React.FC = () => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(quizCore.getUserAnswer(quizCore.getCurrentQuestionIndex()));
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [refresh, setRefresh] = useState(false); // Trigger re-render

  const currentQuestion: QuizQuestion | null = quizCore.getCurrentQuestion();

  const handleOptionSelect = (option: string): void => {
    setSelectedAnswer(option);
    quizCore.answerQuestion(option); 
  };

  const handleNext = (): void => {
    if (selectedAnswer) {
      quizCore.answerQuestion(selectedAnswer);
      setSelectedAnswer(quizCore.getUserAnswer(quizCore.getCurrentQuestionIndex()));
      setRefresh(!refresh); // Force re-render

      if (quizCore.hasNextQuestion()) {
        quizCore.nextQuestion();
        setRefresh(!refresh); // Force re-render
      } else {
        setIsQuizCompleted(true);
      }
    }
  };
  const handlePrev = (): void => {
    quizCore.previousQuestion();
    setSelectedAnswer(quizCore.getUserAnswer(quizCore.getCurrentQuestionIndex()));
    setRefresh(!refresh); // Force re-render
  }

  if (isQuizCompleted || !currentQuestion) {
    const allQuestions = quizCore.getTotalQuestions();
    const userAnswers = quizCore.getUserAnswers();
    return (
      <div>
        <h2>Шалгалт дууслаа!</h2>
        <p>Оноо : {quizCore.getScore()} / {quizCore.getTotalQuestions()}</p>
        <h3>Хариултууд</h3>
        <ul>
          {quizCore['questions'].map((question, index) => {
            const userAnswer = userAnswers[index];
            const isCorrect = userAnswer === question.correctAnswer;
            return(
              <li key={index} style={{ color: isCorrect ? 'green' : 'red' }}>
                <strong>{question.question}</strong><br />
                <span style={{ color: 'blue' }}>Таны хариулт: {userAnswer}</span><br />
                <span style={{ color: 'green' }}>Зөв хариулт: {question.correctAnswer}</span><br />
                <span style={{ color: 'gray' }}>Асуулт {index + 1} / {allQuestions}</span><br />
                {isCorrect ? (
                  <span style={{ color: 'green' }}>Зөв</span>
                ) : (
                  <span style={{ color: 'red' }}>Буруу</span>
                )}
                <br />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <h2>{currentQuestion.question}</h2>

      <ul>
        {currentQuestion.options.map((option) => (
          <li
            key={option}
            onClick={() => handleOptionSelect(option)}
            className={selectedAnswer === option ? 'selected' : ''}
          >
            {option}
          </li>
        ))}
      </ul>

      <h3>Сонгогдсон хариулт:</h3>
      <p>{selectedAnswer ?? 'Хариулт сонгогдоогүй байна! '}</p>
      <div className ="button-group">{
        quizCore.hasPreviousQuestion() && (
          <button onClick={handlePrev} className="prev-button" disabled={quizCore.getCurrentQuestionIndex()===0}>Өмнөх асуулт</button>
        )}
        <button onClick={handleNext}  className="next-button" disabled={selectedAnswer===null}>{
        quizCore.hasNextQuestion() ? 'Дараагийн асуулт' : 'Асуултыг дуусгах'}</button>

      </div>
    </div>
  );
};

export default Quiz;
