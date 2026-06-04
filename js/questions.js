/**
 * Pratik zeka ve kriz yönetimi senaryo soruları.
 * correctIndex: 0=A, 1=B, 2=C
 * trapIndex: yanıltıcı şık (görsel geri bildirim için işaretlenir)
 */
export const QUESTIONS = [
  {
    id: 1,
    text:
      'Müşterinizin Instagram hesabına sabah 09:00\'da viral bir "yanlış fiyat" ekran görüntüsü düştü. Yorumlar 15 dakikada 2.000\'i geçti, marka "dolandırıcı" diye etiketleniyor. İlk 30 dakikada sen olsan ne yaparsın?',
    options: [
      {
        label: 'A',
        text: 'Hemen tüm yorumları kapat, gönderiyi sil ve "teknik hata" deyip sessiz kal — kriz kendi kendine söner.',
        type: 'trap'
      },
      {
        label: 'B',
        text: 'Şeffaf bir açıklama videosu/story + etkilenenlere DM ile telafi planı yayınla; aynı anda hukuk ve müşteri hizmetlerini senkronize et.',
        type: 'correct'
      },
      {
        label: 'C',
        text: 'Sadece rakip markaların benzer krizlerinde ne yaptıklarına bakıp aynı metni kopyala — başka strateji gerekmez.',
        type: 'neutral'
      }
    ],
    correctIndex: 1
  },
  {
    id: 2,
    text:
      'Google Ads hesabınızda gece 03:00\'te bütçe 10 katına çıkmış, CPC uçmuş. Sabah ekibi panikte. Kriz anında önceliğin ne?',
    options: [
      {
        label: 'A',
        text: 'Tüm kampanyaları durdur, hesabı dondur, hafta sonu hiç dokunma — pazartesi "temiz sayfa" açarız.',
        type: 'neutral'
      },
      {
        label: 'B',
        text: 'Anında bütçe tavanı ve negatif anahtar kelime revizyonu yap; son 48 saat loglarını inceleyip fraud/yanlış hedefleme ihtimalini raporla.',
        type: 'correct'
      },
      {
        label: 'C',
        text: 'Harcanan parayı "organik görünürlük yatırımı" say, daha fazla reklam aç — ne kadar harcarsan o kadar öğrenirsin.',
        type: 'trap'
      }
    ],
    correctIndex: 1
  },
  {
    id: 3,
    text:
      'Influencer, ürününüzü eleştiren 45 dakikalık bir YouTube videosu yayınladı. Satışlar %18 düştü. Marka sesi olarak hangi refleks doğru?',
    options: [
      {
        label: 'A',
        text: 'Influencer\'a dava tehdidi + topluluk yönetiminde agresif moderasyon — itibar "kazanmak için" savaş.',
        type: 'trap'
      },
      {
        label: 'B',
        text: 'Veriye dayalı yanıt (myth-busting içerik), müşteri testimonial\'ları ve ürün geliştirme ekibine geri bildirim döngüsü kur.',
        type: 'correct'
      },
      {
        label: 'C',
        text: 'Hiçbir resmi açıklama yapma; sadece indirim kodu dağıt — tartışma kendiliğinden biter sanılır.',
        type: 'neutral'
      }
    ],
    correctIndex: 1
  },
  {
    id: 4,
    text:
      'E-posta listenizde GDPR şikayeti geldi; 12.000 kişilik segment "izinsiz" iddia ediliyor. Pazarlama direktörü "kampanyayı iptal etme" diyor. Sen?',
    options: [
      {
        label: 'A',
        text: 'Segmenti hemen dondur, opt-in kanıtlarını topla, şeffaf ret politikası yayınla; hukuk onayı olmadan tekrar gönderim yok.',
        type: 'correct'
      },
      {
        label: 'B',
        text: 'Sadece konuyu değiştirerek aynı listeye farklı konu satırıyla mail at — kimse fark etmez.',
        type: 'trap'
      },
      {
        label: 'C',
        text: 'GDPR sadece AB içindir diye Türkiye listesinde hiçbir prosedür uygulama — "diğer ülkelerde böyle yapılıyor".',
        type: 'neutral'
      }
    ],
    correctIndex: 0
  },
  {
    id: 5,
    text:
      'Black Friday\'de site çöktü, sepet terk oranı %70. CEO canlı yayında "hemen indirimi iki katına çıkar" diyor. Teknik ekip hâlâ sunucu ölçekliyor. Kararın?',
    options: [
      {
        label: 'A',
        text: 'CEO\'nun dediğini anında uygula, tüm stokları %70 indir — trafik zaten geliyor, fırsat kaçmasın.',
        type: 'trap'
      },
      {
        label: 'B',
        text: 'Bekleme sayfası + e-posta/SMS ile "sıra" kurgusu, stok ve ödeme altyapısı stabil olunca kontrollü kampanya aç.',
        type: 'correct'
      },
      {
        label: 'C',
        text: 'Ne indirim ne iletişim — site düzelene kadar tüm reklamları kapatıp yılı kapat; başka strateji denenmez.',
        type: 'neutral'
      }
    ],
    correctIndex: 1
  }
];

export const QUESTION_TIME_SEC = 30;
export const TOTAL_QUESTIONS = QUESTIONS.length;
