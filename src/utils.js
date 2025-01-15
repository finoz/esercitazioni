export const getRandomQuestion = (questions) => {
	const randomIndex = Math.floor(Math.random() * questions.length);
	return questions[randomIndex];
  };
  
  export const calculateStats = (correct, total) => {
	return {
	  totalQuestions: total,
	  correctAnswers: correct,
	  accuracy: total > 0 ? Math.round((correct / total) * 100) : 0
	};
  };
  
  export const shuffleArray = (array) => {
	const shuffled = [...array];
	for (let i = shuffled.length - 1; i > 0; i--) {
	  const j = Math.floor(Math.random() * (i + 1));
	  [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
	}
	return shuffled;
  };