import React, { useState, useEffect } from 'react';
import { QuizCard, Stats } from './components';
import { getRandomQuestion, calculateStats } from './utils';

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [quizState, setQuizState] = useState({
    currentQuestion: null,
    showAnswer: false,
    selectedAnswer: null,
    score: 0,
    questionsAnswered: 0,
  });

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        // Carica tutti e tre i file JSON
        const [binaryResponse, truthResponse, flowResponse, chartResponse] = await Promise.all([
          fetch('/binary-questions.json'),
          fetch('/truth-questions.json'),
          fetch('/flow-questions.json'),
          fetch('/chart-questions.json')
        ]);

        // Converte le risposte in JSON
        const [binaryData, truthData, flowData, chartData] = await Promise.all([
          binaryResponse.json(),
          truthResponse.json(),
          flowResponse.json(),
          chartResponse.json()
        ]);

        // Combina tutte le domande in un unico array
        const allQuestions = [
          ...binaryData.questions,
          ...truthData.questions,
          ...flowData.questions,
          ...chartData.questions
        ];

        // Mescola l'array di domande
        const shuffledQuestions = [...allQuestions].sort(() => Math.random() - 0.5);

        setQuestions(shuffledQuestions);
        setQuizState(prev => ({
          ...prev,
          currentQuestion: shuffledQuestions[0]
        }));
      } catch (error) {
        console.error('Errore nel caricamento delle domande:', error);
      }
    };

    loadQuestions();
  }, []);

  const handleAnswerSelect = (answer) => {
    const isCorrect = answer === quizState.currentQuestion?.correctAnswer;
    
    setQuizState(prev => ({
      ...prev,
      selectedAnswer: answer,
      showAnswer: true,
      score: isCorrect ? prev.score + 1 : prev.score,
      questionsAnswered: prev.questionsAnswered + 1
    }));
  };

  const handleNextQuestion = () => {
    setQuizState(prev => ({
      ...prev,
      currentQuestion: getRandomQuestion(questions),
      showAnswer: false,
      selectedAnswer: null
    }));
  };

  if (!quizState.currentQuestion) {
    return <div>Caricamento...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-center mb-8">
          Quiz di Informatica
        </h1>

        <Stats
          correct={quizState.score}
          total={quizState.questionsAnswered}
        />

        <QuizCard
          question={quizState.currentQuestion}
          selectedAnswer={quizState.selectedAnswer}
          showAnswer={quizState.showAnswer}
          onAnswerSelect={handleAnswerSelect}
          onNextQuestion={handleNextQuestion}
        />
      </div>
    </div>
  );
};

export default App;