export const getRandomQuestions = (questions, count = 2) => {
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
};