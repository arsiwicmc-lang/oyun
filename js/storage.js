const KEYS = {
  PLAYED: 'siwi_exam_played',
  PLAYER: 'siwi_exam_player',
  RESULT: 'siwi_exam_result',
  LEADERBOARD: 'siwi_exam_leaderboard'
};

const SEED_LEADERBOARD = [
  { name: 'Elif K.', score: 5, totalTime: 98, date: '2026-06-03' },
  { name: 'Can D.', score: 5, totalTime: 112, date: '2026-06-02' },
  { name: 'Selin A.', score: 4, totalTime: 105, date: '2026-06-01' },
  { name: 'Burak M.', score: 4, totalTime: 128, date: '2026-05-30' },
  { name: 'Deniz Y.', score: 3, totalTime: 140, date: '2026-05-28' }
];

export function hasPlayed() {
  return localStorage.getItem(KEYS.PLAYED) === 'true';
}

export function markPlayed(result) {
  localStorage.setItem(KEYS.PLAYED, 'true');
  localStorage.setItem(KEYS.RESULT, JSON.stringify(result));
}

export function getSavedResult() {
  try {
    const raw = localStorage.getItem(KEYS.RESULT);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function savePlayer(player) {
  localStorage.setItem(KEYS.PLAYER, JSON.stringify(player));
}

export function getPlayer() {
  try {
    const raw = localStorage.getItem(KEYS.PLAYER);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function getLeaderboard() {
  try {
    const raw = localStorage.getItem(KEYS.LEADERBOARD);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  localStorage.setItem(KEYS.LEADERBOARD, JSON.stringify(SEED_LEADERBOARD));
  return [...SEED_LEADERBOARD];
}

export function addLeaderboardEntry(entry) {
  const list = getLeaderboard();
  list.push({
    name: entry.name.split(' ')[0] + ' ' + (entry.name.split(' ')[1]?.[0] || '') + '.',
    score: entry.score,
    totalTime: entry.totalTime,
    date: new Date().toISOString().slice(0, 10)
  });
  list.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.totalTime - b.totalTime;
  });
  const top5 = list.slice(0, 5);
  localStorage.setItem(KEYS.LEADERBOARD, JSON.stringify(top5));
  return top5;
}

export function getDiscountTier(correctCount) {
  if (correctCount === 5) {
    return {
      tier: 'deha',
      code: 'SIWI30',
      title: 'Pazarlama Dehası!',
      badge: '🏆',
      message:
        'Muazzam! Sen zaten bu işin içindesin. SIWIWORLD Akademi\'de elite seviye başlaman için sana özel %30 İndirim Kodu: [SIWI30]. Formda bıraktığınız bilgiler üzerinden eğitim danışmanımız, sizi gelecekteki potansiyel çalışma arkadaşlarımızın arasına dahil etmek adına en kısa sürede arayacaktır!'
    };
  }
  if (correctCount >= 3) {
    return {
      tier: 'potansiyel',
      code: 'SIWI20',
      title: 'Yüksek Potansiyel!',
      badge: '⭐',
      message:
        'Harika refleksler! Eksik kalan stratejik parçaları tamamlamak ve geleceğin dijital dünyasını inşa etmek için %20 İndirim Kodun: [SIWI20]. Detaylar için sizinle iletişime geçeceğiz.'
    };
  }
  return {
    tier: 'gelisen',
    code: 'SIWI10',
    title: 'Gelişmekte Olan Uzman',
    badge: '🌱',
    message:
      'Pratik zekan harika ama dijital dünyanın yazısız kurallarını öğrenmen gerekiyor. Pes etmek yok, sana özel %10 Motivasyon İndirimi: [SIWI10]. Sizi gerçek bir uzmana dönüştürmek için sabırsızlanıyoruz.'
  };
}
