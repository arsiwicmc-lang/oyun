import { getLeaderboard } from './storage.js';

export function renderLeaderboard(containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;

  const list = getLeaderboard();
  const rows = list
    .map(
      (item, i) => `
    <div class="leaderboard-item">
      <span>
        <span class="leaderboard-rank">#${i + 1}</span>
        ${escapeHtml(item.name)}
      </span>
      <span class="text-slate-400">
        <span class="text-emerald-400 font-semibold">${item.score}/5</span>
        · ${item.totalTime}s
      </span>
    </div>`
    )
    .join('');

  el.innerHTML = `
    <h3>🏆 Günün En Yüksek Skor Yapan Mezun Adayları</h3>
    ${rows || '<p class="text-slate-500 text-sm">Henüz skor yok.</p>'}
  `;
}

function escapeHtml(str) {
  const d = document.createElement('div');
  d.textContent = str;
  return d.innerHTML;
}
