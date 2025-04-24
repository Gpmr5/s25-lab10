import quizData from '../data/quizData';
import QuizQuestion from './QuizQuestion';

/**
 * The `QuizCore` class represents the core logic for managing a quiz, including
 * maintaining the quiz questions, tracking the user's progress, and calculating
 * their score.
 * 
 * It provides methods for navigating through the quiz, answering questions,
 * and retrieving information about the current state of the quiz.
 */
class QuizCore {
  private questions: QuizQuestion[];
  private currentQuestionIndex: number;
  private score: number;
  private userAnswers: (string | null)[] = []; // Array to store user's answers

  /**
   * Constructor
   * @param filePath - The file path to a JSON file containing quiz data.
   * @param callback - A callback function called when the quiz data is loaded.
   */
  constructor() {
    this.questions = quizData;
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.userAnswers = new Array(this.questions.length).fill(null); // Initialize user answers array
  }

  /**
   * Get the current question.
   * @returns The current question or null if no questions are available.
   */
  public getCurrentQuestion(): QuizQuestion | null {
    if (this.currentQuestionIndex >= 0 && this.currentQuestionIndex < this.questions.length) {
      return this.questions[this.currentQuestionIndex];
    }
    return null;
  }
  public previousQuestion(){
    this.currentQuestionIndex--;
    if (this.currentQuestionIndex < 0) {
      this.currentQuestionIndex = 0; 
    }
  }

  /**
   * Move to the next question.
   */
  public nextQuestion(): void {      
    this.currentQuestionIndex++;
  }

  /**
   * Checks if there is a next question available in the quiz.
   *
   * @returns {boolean} True if there is a next question, false if the quiz has been completed.
   */
  public hasNextQuestion(): boolean {
    return this.currentQuestionIndex < this.questions.length - 1;
  }
  public hasPreviousQuestion(): boolean {
    return this.currentQuestionIndex > 0;
  }
  public getCurrentQuestionIndex(): number{
    return this.currentQuestionIndex;
  }
  public setCurrentQuestionIndex(index: number): void {
    if (index >= 0 && index < this.questions.length) {
      this.currentQuestionIndex = index; 
    } else {
      throw new Error("Invalid question index");
    }
  }

  /**
   * Record the user's answer and update the score.
   * @param answer - The user's answer.
   */
  public answerQuestion(answer: string): void {
    this.userAnswers[this.currentQuestionIndex] = answer; 
    const currentQuestion = this.getCurrentQuestion();
    if (currentQuestion && answer === currentQuestion.correctAnswer) {
      this.score++;
    }
  }

  /**
   * Get the user's score.
   * @returns The user's score.
   */
  public getScore(): number {
    return this.questions.reduce((score, question, index) => {
      const userAnswer = this.userAnswers[index];
      if (userAnswer === question.correctAnswer) {
        return score + 1;
      }
      return score;
    }, 0);
  }
  

  /**
   * Get the total number of questions in the quiz.
   * @returns The total number of questions.
   */
  public getTotalQuestions(): number {
    return this.questions.length;
  }
  public getUserAnswer(index: number): string | null {
    return this.userAnswers[index];
  }
  public getUserAnswers(): (string | null)[] {
    return this.userAnswers;
  }


}

export default QuizCore;