import React, { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import mermaid from 'mermaid';

mermaid.initialize({
  startOnLoad: true,
  theme: 'default',
  securityLevel: 'loose',
  flowchart: {
    htmlLabels: true,
    curve: 'linear',
  },
});

export const QuizCard = ({
  question,
  selectedAnswer,
  showAnswer,
  onAnswerSelect,
  onNextQuestion,
}) => {
  useEffect(() => {
    // Aggiorna il diagramma quando cambia la domanda
    if (question.diagram) {
      mermaid.contentLoaded();
    }
  }, [question]);

  return (
    <Card className="mb-4">
      <CardContent className="pt-6">
        <h2 className="text-xl font-bold mb-4">{question.question}</h2>
        
        {/* Rendering del diagramma se presente */}
        {question.diagram && (
          <div className="mb-4 p-4 bg-white rounded-lg">
            <div className="mermaid">
              {question.diagram}
            </div>
          </div>
        )}

        <div className="space-y-2">
          {question.options.map((option, index) => (
            <Button
              key={index}
              onClick={() => onAnswerSelect(option)}
              variant={selectedAnswer === option ? 'default' : 'outline'}
              disabled={showAnswer}
              className="w-full justify-start"
            >
              {option}
            </Button>
          ))}
        </div>

        {showAnswer && (
          <div className="mt-4 p-4 rounded-lg bg-gray-100">
            <div className="flex items-center gap-2 mb-2">
              {selectedAnswer === question.correctAnswer ? (
                <>
                  <CheckCircle2 className="text-green-500" />
                  <span className="font-bold text-green-500">Corretto!</span>
                </>
              ) : (
                <>
                  <AlertCircle className="text-red-500" />
                  <span className="font-bold text-red-500">
                    Sbagliato. La risposta corretta è: {question.correctAnswer}
                  </span>
                </>
              )}
            </div>
            <p className="text-gray-700">{question.explanation}</p>
          </div>
        )}

        {showAnswer && (
          <Button onClick={onNextQuestion} className="w-full mt-4">
            Prossima Domanda
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export const Stats = ({ correct, total }) => {
  const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;

  return (
    <div className="mb-4 p-4 bg-gray-100 rounded-lg">
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-sm text-gray-600">Totale</p>
          <p className="text-xl font-bold">{total}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Corrette</p>
          <p className="text-xl font-bold text-green-600">{correct}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Accuratezza</p>
          <p className="text-xl font-bold">{accuracy}%</p>
        </div>
      </div>
    </div>
  );
};