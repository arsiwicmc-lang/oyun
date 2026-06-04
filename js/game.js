import { QUESTIONS, QUESTION_TIME_SEC, TOTAL_QUESTIONS } from './questions.js';
import {
  markPlayed,
  addLeaderboardEntry,
  getDiscountTier,
  savePlayer
} from './storage.js';
import { submitExamResults } from './api.js';
import { renderLeaderboard } from './leaderboard-ui.js';

export class ExamGame {
  constructor(ui) {
    this.ui = ui;
    this.currentIndex = 0;
    this.score = 0;
    this.totalTime = 0;
    this.answers = [];
    this.player = null;
    this.timerId = null;
    this.secondsLeft = QUESTION_TIME_SEC;
    this.locked = false;
  }

  start(player) {
    this.player = player;
    savePlayer(player);
    this.currentIndex = 0;
    this.score = 0;
    this.totalTime = 0;
    this.answers = [];
    this.ui.showScreen('game');
    this.ui.updateScore(this.score);
    this.loadQuestion();
  }

  loadQuestion() {
    this.locked = false;
    const q = QUESTIONS[this.currentIndex];
    this.ui.setProgress(this.currentIndex + 1, TOTAL_QUESTIONS);
    this.ui.setQuestionText(q.text);
    this.ui.renderOptions(q.options, (idx) => this.onAnswer(idx));
    this.startTimer();
  }

  startTimer() {
    this.clearTimer();
    this.secondsLeft = QUESTION_TIME_SEC;
    this.ui.updateTimer(this.secondsLeft, QUESTION_TIME_SEC);

    this.timerId = setInterval(() => {
      this.secondsLeft -= 1;
      this.ui.updateTimer(this.secondsLeft, QUESTION_TIME_SEC);

      if (this.secondsLeft <= 0) {
        this.clearTimer();
        this.onTimeout();
      }
    }, 1000);
  }

  clearTimer() {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  onTimeout() {
    if (this.locked) return;
    this.locked = true;
    this.totalTime += QUESTION_TIME_SEC;
    this.answers.push({ questionId: QUESTIONS[this.currentIndex].id, correct: false, timeout: true });
    this.ui.flashTimeout();
    setTimeout(() => this.nextQuestion(), 1000);
  }

  onAnswer(selectedIndex) {
    if (this.locked) return;
    this.locked = true;
    this.clearTimer();

    const q = QUESTIONS[this.currentIndex];
    const elapsed = QUESTION_TIME_SEC - this.secondsLeft;
    this.totalTime += elapsed;

    const isCorrect = selectedIndex === q.correctIndex;
    if (isCorrect) this.score += 1;

    this.answers.push({
      questionId: q.id,
      selectedIndex,
      correct: isCorrect,
      timeout: false
    });

    this.ui.showAnswerFeedback(selectedIndex, q.correctIndex);
    this.ui.updateScore(this.score);

    setTimeout(() => this.nextQuestion(), 1000);
  }

  nextQuestion() {
    this.currentIndex += 1;
    if (this.currentIndex >= TOTAL_QUESTIONS) {
      this.finish();
      return;
    }
    this.loadQuestion();
  }

  async finish() {
    const correctCount = this.score;
    const tier = getDiscountTier(correctCount);

    const result = {
      correctCount,
      discountCode: tier.code,
      tier: tier.tier,
      totalTime: this.totalTime
    };

    markPlayed(result);
    addLeaderboardEntry({
      name: this.player.name,
      score: correctCount,
      totalTime: this.totalTime
    });

    await submitExamResults({
      player: this.player,
      score: correctCount,
      correctCount,
      totalQuestions: TOTAL_QUESTIONS,
      totalTimeSeconds: this.totalTime,
      discountCode: tier.code,
      tier: tier.tier,
      answers: this.answers
    });

    renderLeaderboard('leaderboard-start');
    this.ui.showResult(tier, correctCount, this.totalTime);
    this.ui.fireConfetti();
  }
}
