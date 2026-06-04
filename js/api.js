/**
 * Form ve sınav sonuçlarını backend'e göndermek için hazır altyapı.
 * Firebase veya REST API entegrasyonunda submitExamResults kullanın.
 */
const API_CONFIG = {
  endpoint: null, // örn: 'https://api.siwiworld.com/exam-submissions'
  enabled: false
};

export async function submitExamResults(payload) {
  const body = {
    submittedAt: new Date().toISOString(),
    player: payload.player,
    score: payload.score,
    correctCount: payload.correctCount,
    totalQuestions: payload.totalQuestions,
    totalTimeSeconds: payload.totalTimeSeconds,
    discountCode: payload.discountCode,
    tier: payload.tier,
    answers: payload.answers || []
  };

  console.info('[SIWI Exam] Submit payload (API hazır):', body);

  if (!API_CONFIG.enabled || !API_CONFIG.endpoint) {
    return { ok: true, mock: true, data: body };
  }

  try {
    const res = await fetch(API_CONFIG.endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return { ok: true, data: await res.json() };
  } catch (err) {
    console.error('[SIWI Exam] Submit failed:', err);
    return { ok: false, error: err.message };
  }
}

export function configureApi({ endpoint, enabled }) {
  if (endpoint !== undefined) API_CONFIG.endpoint = endpoint;
  if (enabled !== undefined) API_CONFIG.enabled = enabled;
}
