export const CH_QUESTIONS_EN = [
  {
    id: 1,
    q: "She ______ glasses before she had surgery.",
    options: ["wear", "used to wear", "wears", "wearing"],
    a: "used to wear",
    explanation: "نستخدم 'used to' للتعبير عن عادة في الماضي لم تعد موجودة.",
    golden: false
  },
  {
    id: 2,
    q: "How ______ water does a camel store in its hump?",
    options: ["many", "much", "more", "few"],
    a: "much",
    explanation: "كلمة 'water' غير معدودة (uncountable)، فنستخدم 'much' وليس 'many'.",
    golden: false
  },
  {
    id: 3,
    q: "If I ______ you, I would study harder for the exam.",
    options: ["am", "was", "were", "be"],
    a: "were",
    explanation: "في الجملة الشرطية النوع الثاني للنصيحة نستخدم 'If I were you'.",
    golden: true
  },
  {
    id: 4,
    q: "The story was ______ written by a famous author.",
    options: ["beautiful", "beautifully", "beauty", "beautify"],
    a: "beautifully",
    explanation: "نحتاج ظرفاً (Adverb) لوصف الفعل 'written'، لذا نختار 'beautifully'.",
    golden: true
  },
  {
    id: 5,
    q: "By the time she arrived, he ______ the report.",
    options: ["finish", "finished", "had finished", "was finishing"],
    a: "had finished",
    explanation: "نستخدم Past Perfect (had + V3) للحدث الذي اكتمل قبل حدث آخر في الماضي.",
    golden: true
  },
];

export const CH_QUESTIONS_BIO = [
  {
    id: 1,
    q: "ما العضية المسؤولة عن إنتاج الطاقة (ATP) في الخلية؟",
    options: ["النواة", "الميتوكوندريا", "جهاز گولجي", "الريبوسومات"],
    a: "الميتوكوندريا",
    explanation: "الميتوكوندريا هي 'مصنع الطاقة' في الخلية، تُنتج ATP عبر التنفس الخلوي.",
    golden: false
  },
  {
    id: 2,
    q: "ما العملية التي تصنع فيها النباتات غذاءها باستخدام ضوء الشمس؟",
    options: ["التنفس", "التركيب الضوئي", "الهضم", "النتح"],
    a: "التركيب الضوئي",
    explanation: "التركيب الضوئي (Photosynthesis) يحوّل ثاني أكسيد الكربون والماء والضوء إلى غلوكوز وأكسجين.",
    golden: false
  },
  {
    id: 3,
    q: "DNA اختصار لـ ______.",
    options: ["Deoxyribose Nucleic Acid", "Deoxyribonucleic Acid", "Di-nitrogen Amino Acid", "Dynamic Nucleic Atom"],
    a: "Deoxyribonucleic Acid",
    explanation: "DNA اختصار لـ Deoxyribonucleic Acid وهي المادة الوراثية في خلايا الكائنات الحية.",
    golden: true
  },
  {
    id: 4,
    q: "كم عدد كروموسومات الإنسان الطبيعية في الخلية الجسدية؟",
    options: ["23", "46", "92", "44"],
    a: "46",
    explanation: "الخلية الجسدية تحتوي على 46 كروموسوم (23 زوج).",
    golden: true
  },
  {
    id: 5,
    q: "أي مما يلي مثال على الانتقاء الطبيعي؟",
    options: ["تهجين نباتين", "نمو الكائنات المتكيفة وتكاثرها أكثر", "استنساخ حيوان", "التلقيح الصناعي"],
    a: "نمو الكائنات المتكيفة وتكاثرها أكثر",
    explanation: "الانتقاء الطبيعي: الكائنات ذات الصفات الملائمة للبيئة تتكاثر أكثر وتنقل صفاتها للأجيال.",
    golden: true
  },
];

export const getCHQuestions = (subject) => subject === 'biology' ? CH_QUESTIONS_BIO : CH_QUESTIONS_EN;

