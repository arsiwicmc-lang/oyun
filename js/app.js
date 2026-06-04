import { QUESTION_TIME_SEC } from './questions.js';
import { hasPlayed, getSavedResult } from './storage.js';
import { renderLeaderboard } from './leaderboard-ui.js';
import { ExamGame } from './game.js';

const screens = ['start', 'game', 'result', 'already-played'];

function isValidPhone(phone) {
  let digits = phone.replace(/\D/g, '');
  if (digits.startsWith('0090')) digits = digits.slice(4);
  else if (digits.startsWith('090')) digits = digits.slice(3);
  else if (digits.startsWith('90') && digits.length >= 12) digits = digits.slice(2);
  if (digits.startsWith('0') && digits.length >= 11) digits = digits.slice(1);
  return digits.length >= 10;
}

function bindFormValidation(run) {
  const ids = ['input-name', 'input-phone', 'input-email'];
  ids.forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    ['input', 'change', 'blur', 'keyup'].forEach((ev) => el.addEventListener(ev, run));
  });
  run();
  requestAnimationFrame(run);
  [100, 500, 1500].forEach((ms) => setTimeout(run, ms));
}

const ui = {
  showScreen(name) {
    screens.forEach((s) => {
      const el = document.getElementById(`screen-${s}`);
      if (el) el.classList.toggle('hidden', s !== name);
    });
  },

  validateForm() {
    const name = document.getElementById('input-name')?.value.trim() ?? '';
    const phone = document.getElementById('input-phone')?.value.trim() ?? '';
    const email = document.getElementById('input-email')?.value.trim() ?? '';
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validPhone = isValidPhone(phone);
    const btn = document.getElementById('btn-start');
    if (!btn) return false;
    const ok = name.length >= 2 && validPhone && validEmail;
    btn.disabled = !ok;
    return ok;
  },

  setProgress(current, total) {
    document.getElementById('question-progress').textContent = `Soru ${current}/${total}`;
  },

  updateScore(score) {
    document.getElementById('score-display').textContent = `Skor: ${score}`;
  },

  setQuestionText(text) {
    document.getElementById('question-text').textContent = text;
  },

  updateTimer(secondsLeft, total) {
    document.getElementById('timer-seconds').textContent = String(Math.max(0, secondsLeft));
    const pct = (secondsLeft / total) * 100;
    document.getElementById('timer-bar').style.width = `${pct}%`;
  },

  renderOptions(options, onSelect) {
    const container = document.getElementById('options-container');
    container.innerHTML = '';
    options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'option-btn';
      btn.innerHTML = `
        <span class="option-label">${opt.label}</span>
        <span>${opt.text}</span>`;
      btn.addEventListener('click', () => onSelect(idx));
      container.appendChild(btn);
    });
  },

  showAnswerFeedback(selected, correctIndex) {
    const buttons = document.querySelectorAll('#options-container .option-btn');
    buttons.forEach((btn, i) => {
      btn.disabled = true;
      if (i === correctIndex) btn.classList.add('correct');
      else if (i === selected) btn.classList.add('wrong');
    });
  },

  flashTimeout() {
    const container = document.getElementById('options-container');
    container.querySelectorAll('.option-btn').forEach((btn) => {
      btn.disabled = true;
      btn.classList.add('timeout-flash');
    });
  },

  showResult(tier, correctCount, totalTime) {
    this.showScreen('result');
    document.getElementById('result-badge').textContent = tier.badge;
    document.getElementById('result-title').textContent = tier.title;
    document.getElementById('result-message').textContent = tier.message.replace(
      /\[(SIWI\d+)\]/,
      tier.code
    );
    document.getElementById('result-code').textContent = tier.code;
    document.getElementById('result-stats').textContent =
      `${correctCount}/5 doğru · Toplam süre: ${totalTime} saniye`;
  },

  showAlreadyPlayed(result) {
    this.showScreen('already-played');
    const code = result?.discountCode || 'SIWI10';
    document.getElementById('already-played-discount').textContent =
      `İndirim kodunuz: ${code} — Skorunuz: ${result?.correctCount ?? '?'}/5`;
  },

  fireConfetti() {
    if (typeof confetti !== 'function') return;
    const duration = 2500;
    const end = Date.now() + duration;
    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#6366f1', '#f59e0b', '#22c55e']
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#6366f1', '#f59e0b', '#22c55e']
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  }
};

function init() {
  renderLeaderboard('leaderboard-start');
  renderLeaderboard('leaderboard-game');

  if (hasPlayed()) {
    ui.showAlreadyPlayed(getSavedResult());
    return;
  }

  const form = document.getElementById('start-form');
  bindFormValidation(() => ui.validateForm());

  const game = new ExamGame(ui);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!ui.validateForm()) return;
    const player = {
      name: document.getElementById('input-name').value.trim(),
      phone: document.getElementById('input-phone').value.trim(),
      email: document.getElementById('input-email').value.trim()
    };
    game.start(player);
  });

}

document.addEventListener('DOMContentLoaded', init);

export { ui, QUESTION_TIME_SEC };
