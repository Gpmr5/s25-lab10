import QuizQuestion from "../core/QuizQuestion";

const quizData: QuizQuestion[] = [
  {
    question: "Арав дээр нэмэх нь арав",
    options: ["хорь", "арав", "хорин нэг", "тэг"],
    correctAnswer: "хорь",
  },
  {
    question: "арван хоёроос хасах нь зургаа",
    options: ["арван хоёр", "арван найм", "тэг", "зургаа"],
    correctAnswer: "зургаа",
  },
  {
    question: "хорин гурваас хасах нь арван нэг",
    options: ["арван гурав", "арван хоёр", "хорин гурав", "арван нэг"],
    correctAnswer: "арван хоёр",
  },
  {
    question: "арван хоёр нэмэх нь арван найм",
    options: ["арван хоёр", "хорь", "гуч", "зургаа"],
    correctAnswer: "гуч",
  },
];

export default quizData;
