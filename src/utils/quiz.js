export const QUIZ_STORAGE_KEY = 'cinthesia_quiz_result'

export const quizQuestions = [
  {
    id: 'skinType',
    eyebrow: 'Skin type',
    title: 'How does your skin usually feel by midday?',
    helper: 'Choose the closest match. It is okay if your skin changes with weather.',
    type: 'single',
    options: [
      { value: 'oily', label: 'Oily', description: 'Shiny quickly, especially around the T-zone.' },
      { value: 'dry', label: 'Dry', description: 'Feels tight, flaky, or rough after cleansing.' },
      { value: 'combination', label: 'Combination', description: 'Oily in some areas and dry in others.' },
      { value: 'normal', label: 'Balanced', description: 'Mostly comfortable through the day.' },
      { value: 'sensitive', label: 'Sensitive', description: 'Often reacts, stings, or gets red.' },
    ],
  },
  {
    id: 'concerns',
    eyebrow: 'Goals',
    title: 'What would you most like to improve?',
    helper: 'Pick up to three concerns so the routine stays focused.',
    type: 'multi',
    max: 3,
    options: [
      { value: 'acne', label: 'Acne & breakouts', description: 'Clogged pores, pimples, or bumps.' },
      { value: 'darkSpots', label: 'Dark spots', description: 'Marks, uneven tone, or pigmentation.' },
      { value: 'dullness', label: 'Dullness', description: 'Skin looks tired or lacks glow.' },
      { value: 'redness', label: 'Redness', description: 'Irritation, flushing, or barrier stress.' },
      { value: 'aging', label: 'Fine lines', description: 'Texture, firmness, or early signs of aging.' },
      { value: 'dehydration', label: 'Dehydration', description: 'Skin feels thirsty but may still get oily.' },
    ],
  },
  {
    id: 'sensitivity',
    eyebrow: 'Tolerance',
    title: 'How easily does your skin react to products?',
    helper: 'This helps decide how gentle or active your routine should be.',
    type: 'single',
    options: [
      { value: 'low', label: 'Rarely reacts', description: 'Most products feel fine.' },
      { value: 'medium', label: 'Sometimes reacts', description: 'Strong actives can irritate me.' },
      { value: 'high', label: 'Very reactive', description: 'I need gentle, barrier-first products.' },
    ],
  },
  {
    id: 'routineStyle',
    eyebrow: 'Lifestyle',
    title: 'What kind of routine will you actually follow?',
    helper: 'The best routine is the one you can repeat.',
    type: 'single',
    options: [
      { value: 'simple', label: 'Simple', description: 'Three or four steps max.' },
      { value: 'balanced', label: 'Balanced', description: 'I can do a few targeted steps.' },
      { value: 'advanced', label: 'Advanced', description: 'I like serums, masks, and treatments.' },
    ],
  },
  {
    id: 'spf',
    eyebrow: 'Protection',
    title: 'How often do you wear sunscreen?',
    helper: 'SPF makes the biggest difference for marks, glow, and long-term skin health.',
    type: 'single',
    options: [
      { value: 'daily', label: 'Every day', description: 'I already make sunscreen a habit.' },
      { value: 'sometimes', label: 'Sometimes', description: 'I wear it when I remember or go out.' },
      { value: 'rarely', label: 'Rarely', description: 'I need help building the habit.' },
    ],
  },
]

const productLibrary = {
  cleanser: {
    oily: {
      image: '/images/hero-products.png',
      name: 'CeraVe Foaming Cleanser',
      price: 899,
      benefit: 'Cleanses oil without stripping',
      tags: ['Cleanser', 'Oil Control'],
    },
    dry: {
      image: '/images/hero-products.png',
      name: 'CeraVe Hydrating Cleanser',
      price: 899,
      benefit: 'Creamy, gentle and barrier-safe',
      tags: ['Cleanser', 'Hydrating'],
    },
    sensitive: {
      image: '/images/blog-gentle.png',
      name: 'Simple Kind To Skin Cleanser',
      price: 385,
      benefit: 'Low-irritation daily cleanse',
      tags: ['Cleanser', 'Sensitive'],
    },
    default: {
      image: '/images/hero-products.png',
      name: 'CeraVe Hydrating Cleanser',
      price: 899,
      benefit: 'Gentle pH-balanced cleanse',
      tags: ['Cleanser', 'pH Balanced'],
    },
  },
  treatment: {
    acne: {
      image: '/images/glow-serum.png',
      name: 'Minimalist Niacinamide 10% Serum',
      price: 599,
      originalPrice: 899,
      benefit: 'Helps acne marks and oil balance',
      tags: ['Serum', 'Niacinamide'],
    },
    darkSpots: {
      image: '/images/glow-serum.png',
      name: 'Vitamin C Brightening Serum',
      price: 699,
      benefit: 'Targets spots and uneven tone',
      tags: ['Serum', 'Brightening'],
    },
    dullness: {
      image: '/images/blog-routine.png',
      name: 'PHA Gentle Glow Toner',
      price: 549,
      benefit: 'Smooths texture for a fresh glow',
      tags: ['Toner', 'Glow'],
    },
    redness: {
      image: '/images/blog-gentle.png',
      name: 'Centella Calming Ampoule',
      price: 749,
      benefit: 'Calms visible redness',
      tags: ['Calming', 'Barrier'],
    },
    aging: {
      image: '/images/glow-serum.png',
      name: 'Peptide Firming Serum',
      price: 799,
      benefit: 'Supports firmness and bounce',
      tags: ['Serum', 'Peptides'],
    },
    dehydration: {
      image: '/images/blog-ingredients.png',
      name: 'Hyaluronic Acid Hydration Serum',
      price: 545,
      benefit: 'Adds lightweight hydration',
      tags: ['Serum', 'Hydrating'],
    },
    default: {
      image: '/images/glow-serum.png',
      name: 'Minimalist Niacinamide 10% Serum',
      price: 599,
      benefit: 'Balances skin and supports clarity',
      tags: ['Serum', 'Daily Care'],
    },
  },
  moisturizer: {
    dry: {
      image: '/images/blog-gentle.png',
      name: 'Dot & Key Ceramide + HA Moisturizer',
      price: 495,
      benefit: 'Locks in moisture and repairs barrier',
      tags: ['Moisturizer', 'Ceramide'],
    },
    oily: {
      image: '/images/blog-selfcare.png',
      name: 'Gel Cloud Oil-Free Moisturizer',
      price: 449,
      benefit: 'Hydrates without heaviness',
      tags: ['Moisturizer', 'Oil-Free'],
    },
    sensitive: {
      image: '/images/blog-gentle.png',
      name: 'Barrier Repair Ceramide Cream',
      price: 575,
      benefit: 'Comforts reactive skin',
      tags: ['Moisturizer', 'Barrier'],
    },
    default: {
      image: '/images/blog-gentle.png',
      name: 'Dot & Key Ceramide + HA Moisturizer',
      price: 495,
      benefit: 'Strengthens barrier and adds comfort',
      tags: ['Moisturizer', 'Hydrating'],
    },
  },
  sunscreen: {
    image: '/images/skincare-routine.png',
    name: "Re'equil Sunscreen SPF 50+",
    price: 399,
    benefit: 'Broad spectrum protection',
    tags: ['Sunscreen', 'SPF 50+'],
  },
  nightRepair: {
    image: '/images/blog-selfcare.png',
    name: 'Overnight Barrier Recovery Cream',
    price: 625,
    benefit: 'Repairs and cushions skin overnight',
    tags: ['Night Care', 'Barrier'],
  },
}

const labelMap = {
  oily: 'Oily Skin',
  dry: 'Dry Skin',
  combination: 'Combination Skin',
  normal: 'Balanced Skin',
  sensitive: 'Sensitive Skin',
  acne: 'Acne-prone',
  darkSpots: 'Dark Spots',
  dullness: 'Dullness',
  redness: 'Redness-prone',
  aging: 'Fine Lines',
  dehydration: 'Dehydrated',
  low: 'Low Sensitivity',
  medium: 'Moderate Sensitivity',
  high: 'Very Sensitive',
}

function pickBySkinType(group, skinType, sensitivity) {
  if (sensitivity === 'high' && group.sensitive) return group.sensitive
  return group[skinType] || group.default
}

function buildInsights(answers) {
  const concerns = answers.concerns || []
  const insights = []

  if (answers.sensitivity === 'high' || answers.skinType === 'sensitive' || concerns.includes('redness')) {
    insights.push({
      icon: '🛡️',
      title: 'Focus on your barrier first',
      text: 'Use gentle formulas and add actives slowly so your skin stays calm.',
    })
  }

  if (concerns.includes('dehydration') || answers.skinType === 'dry') {
    insights.push({
      icon: '💧',
      title: 'Your skin needs steady hydration',
      text: 'Layer humectants with a moisturizer to reduce tightness and dullness.',
    })
  }

  if (concerns.includes('acne')) {
    insights.push({
      icon: '✦',
      title: 'Keep the routine light and consistent',
      text: 'Niacinamide and non-comedogenic hydration can support clearer skin.',
    })
  }

  if (answers.spf !== 'daily') {
    insights.push({
      icon: '☀️',
      title: 'Make SPF your anchor habit',
      text: 'Daily sunscreen helps prevent dark spots, dullness, and early texture changes.',
    })
  }

  if (insights.length < 3) {
    insights.push({
      icon: '🌿',
      title: 'Your routine can stay simple',
      text: 'Cleanse, treat, moisturize, and protect before adding extra steps.',
    })
  }

  return insights.slice(0, 3)
}

export function generateQuizResult(answers) {
  const concerns = answers.concerns || []
  const mainConcern = concerns[0] || 'dehydration'
  const cleanser = pickBySkinType(productLibrary.cleanser, answers.skinType, answers.sensitivity)
  const treatment = productLibrary.treatment[mainConcern] || productLibrary.treatment.default
  const moisturizer = pickBySkinType(productLibrary.moisturizer, answers.skinType, answers.sensitivity)

  const tags = [
    labelMap[answers.skinType],
    ...concerns.map((concern) => labelMap[concern]),
    answers.sensitivity === 'high' ? labelMap.high : null,
  ].filter(Boolean)

  return {
    answers,
    createdAt: new Date().toISOString(),
    profileTitle: `${labelMap[answers.skinType] || 'Balanced Skin'} Routine`,
    summary: `A ${answers.routineStyle || 'balanced'} routine focused on ${concerns.map((concern) => labelMap[concern]).join(', ') || 'healthy glow'}.`,
    skinTags: tags.slice(0, 4),
    insights: buildInsights(answers),
    products: {
      AM: [cleanser, treatment, moisturizer, productLibrary.sunscreen],
      PM: [cleanser, treatment, moisturizer, productLibrary.nightRepair],
    },
    routineSteps: {
      AM: [
        { num: 1, label: 'CLEANSE', icon: '🫧' },
        { num: 2, label: 'TREAT', icon: '✦' },
        { num: 3, label: 'HYDRATE', icon: '💧' },
        { num: 4, label: 'PROTECT', icon: '☀️' },
      ],
      PM: [
        { num: 1, label: 'CLEANSE', icon: '🫧' },
        { num: 2, label: 'TREAT', icon: '✦' },
        { num: 3, label: 'REPAIR', icon: '🛡️' },
        { num: 4, label: 'SEAL', icon: '🌙' },
      ],
    },
  }
}

export function saveQuizResult(result) {
  localStorage.setItem(QUIZ_STORAGE_KEY, JSON.stringify(result))
}

export function getStoredQuizResult() {
  try {
    const result = localStorage.getItem(QUIZ_STORAGE_KEY)
    return result ? JSON.parse(result) : null
  } catch {
    return null
  }
}
