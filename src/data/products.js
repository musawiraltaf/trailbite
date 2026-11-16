// TrailBite product catalogue (local data, loaded through src/lib/mockLoader.js).
//
// Each record has a stable `id` that is used in URLs (/products/:id), as the React
// list key and as the cart key, so it must never change once published.
//
// Field notes
// - price:       Pakistani rupees, whole numbers.
// - packSize:    shown on the product card so customers can compare value (Problem 1).
// - stock:       units currently available. 0 = out of stock (Rule 1).
// - preparation: structured instructions (Problem 3). `method` is one of
//                'hot-water' | 'cold-water' | 'no-cook'. Left undefined when the
//                supplier has not provided instructions, so the UI can show a fallback.
// - ageRestricted: true for items that need an 18+ buyer (Rule 2).
// - image:       null until product art is added; the UI shows an illustrated fallback.
//
// A few records are intentionally awkward (very long name, missing description,
// missing preparation, zero stock) so the edge-case handling can be demonstrated.

export const CATEGORIES = ['Trail meals', 'Breakfast', 'Snacks', 'Drinks', 'Camp essentials']

export const products = [
  {
    id: 'tb-chicken-karahi',
    name: 'Chicken Karahi with Rice',
    category: 'Trail meals',
    packSize: '140 g',
    servings: 1,
    price: 1450,
    stock: 18,
    dietary: ['gluten-free'],
    description:
      'A freeze-dried take on the roadside classic: tomato-ginger chicken karahi over basmati rice. Built for a hungry evening at camp.',
    preparation: {
      method: 'hot-water',
      water: '300 ml',
      time: '12 min',
      steps: ['Tear open and remove the oxygen absorber.', 'Add 300 ml boiling water and stir well.', 'Seal and wait 12 minutes, stirring once halfway.'],
    },
    ageRestricted: false,
    image: null,
  },
  {
    id: 'tb-daal-chawal',
    name: 'Daal Chawal',
    category: 'Trail meals',
    packSize: '130 g',
    servings: 1,
    price: 1100,
    stock: 25,
    dietary: ['vegan', 'vegetarian', 'gluten-free'],
    description: 'Yellow lentils tempered with cumin and garlic, served with rice. Light to carry and gentle on the stomach at altitude.',
    preparation: {
      method: 'hot-water',
      water: '280 ml',
      time: '10 min',
      steps: ['Remove the oxygen absorber.', 'Add 280 ml boiling water and stir.', 'Seal and wait 10 minutes.'],
    },
    ageRestricted: false,
    image: null,
  },
  {
    id: 'tb-beef-pulao',
    name: 'Beef Yakhni Pulao',
    category: 'Trail meals',
    packSize: '150 g',
    servings: 1,
    price: 1600,
    stock: 2, // low stock: the order limit is capped by stock (Rule 1)
    dietary: ['gluten-free'],
    description: 'Slow-cooked beef stock pulao with whole spices. Our most filling single-serving meal.',
    preparation: {
      method: 'hot-water',
      water: '320 ml',
      time: '15 min',
      steps: ['Remove the oxygen absorber.', 'Add 320 ml boiling water and stir from the bottom.', 'Seal and wait 15 minutes.'],
    },
    ageRestricted: false,
    image: null,
  },
  {
    id: 'tb-veg-pasta',
    name: 'Creamy Mushroom Pasta',
    category: 'Trail meals',
    packSize: '135 g',
    servings: 1,
    price: 1250,
    stock: 0, // out of stock (Rule 1)
    dietary: ['vegetarian'],
    description: 'Penne in a creamy mushroom and black-pepper sauce. Contains milk and wheat.',
    preparation: {
      method: 'hot-water',
      water: '300 ml',
      time: '10 min',
      steps: ['Remove the oxygen absorber.', 'Add 300 ml boiling water.', 'Stir, seal and wait 10 minutes.'],
    },
    ageRestricted: false,
    image: null,
  },
  {
    id: 'tb-two-person-chana',
    // Intentionally long name to test card layout (Problem 1).
    name: 'Two-Person Spiced Chickpea & Spinach Curry with Cumin Rice (Family Trail Pack)',
    category: 'Trail meals',
    packSize: '260 g',
    servings: 2,
    price: 2350,
    stock: 9,
    dietary: ['vegan', 'vegetarian'],
    description: 'A double portion of chana palak with cumin rice, sized for two people sharing one stove.',
    preparation: {
      method: 'hot-water',
      water: '550 ml',
      time: '14 min',
      steps: ['Remove the oxygen absorber.', 'Add 550 ml boiling water and stir thoroughly.', 'Seal and wait 14 minutes, stirring once.'],
    },
    ageRestricted: false,
    image: null,
  },
  {
    id: 'tb-honey-oats',
    name: 'Honey Almond Oats',
    category: 'Breakfast',
    packSize: '100 g',
    servings: 1,
    price: 650,
    stock: 30,
    dietary: ['vegetarian'],
    description: 'Rolled oats with almonds, raisins and milk powder. Works with hot or cold water.',
    preparation: {
      method: 'cold-water',
      water: '200 ml',
      time: '5 min',
      steps: ['Add 200 ml water (hot or cold).', 'Stir and wait 5 minutes.'],
    },
    ageRestricted: false,
    image: null,
  },
  {
    id: 'tb-anda-paratha-wrap',
    name: 'Masala Omelette Wrap Kit',
    category: 'Breakfast',
    packSize: '120 g',
    servings: 1,
    price: 900,
    stock: 12,
    dietary: ['vegetarian'],
    description: 'Freeze-dried masala egg mix with two shelf-stable wheat wraps.',
    // preparation intentionally missing: the details page must show a fallback (Problem 3, edge case)
    ageRestricted: false,
    image: null,
  },
  {
    id: 'tb-trail-mix',
    name: 'Desi Trail Mix',
    category: 'Snacks',
    packSize: '200 g',
    servings: 4,
    price: 550,
    stock: 40,
    dietary: ['vegan', 'vegetarian', 'gluten-free'],
    description: 'Roasted chana, peanuts, almonds, raisins and a pinch of chaat masala.',
    preparation: { method: 'no-cook' },
    ageRestricted: false,
    image: null,
  },
  {
    id: 'tb-energy-bar',
    name: 'Date & Peanut Energy Bar (pack of 4)',
    category: 'Snacks',
    packSize: '4 × 45 g',
    servings: 4,
    price: 480,
    stock: 3, // low stock
    dietary: ['vegan', 'vegetarian'],
    description: 'Dense date and peanut bars with no added sugar. One bar is about 200 kcal.',
    preparation: { method: 'no-cook' },
    ageRestricted: false,
    image: null,
  },
  {
    id: 'tb-dried-apricots',
    name: 'Hunza Dried Apricots',
    category: 'Snacks',
    packSize: '250 g',
    servings: 5,
    price: 700,
    stock: 22,
    dietary: ['vegan', 'vegetarian', 'gluten-free'],
    // description intentionally missing: the UI must show a fallback (edge case)
    preparation: { method: 'no-cook' },
    ageRestricted: false,
    image: null,
  },
  {
    id: 'tb-electrolyte',
    name: 'Lemon Electrolyte Drink Mix',
    category: 'Drinks',
    packSize: '10 sachets',
    servings: 10,
    price: 600,
    stock: 35,
    dietary: ['vegan', 'vegetarian', 'gluten-free'],
    description: 'Sodium, potassium and magnesium to replace what you sweat out on long climbs.',
    preparation: {
      method: 'cold-water',
      water: '500 ml',
      time: '1 min',
      steps: ['Pour one sachet into 500 ml water.', 'Shake until dissolved.'],
    },
    ageRestricted: false,
    image: null,
  },
  {
    id: 'tb-doodh-patti',
    name: 'Instant Doodh Patti',
    category: 'Drinks',
    packSize: '8 sachets',
    servings: 8,
    price: 450,
    stock: 28,
    dietary: ['vegetarian', 'gluten-free'],
    description: 'Strong tea with milk and sugar already mixed in. Just add hot water at the summit.',
    preparation: {
      method: 'hot-water',
      water: '180 ml',
      time: '1 min',
      steps: ['Empty one sachet into a mug.', 'Add 180 ml hot water and stir.'],
    },
    ageRestricted: false,
    image: null,
  },
  {
    id: 'tb-gas-canister',
    name: 'Butane-Propane Gas Canister',
    category: 'Camp essentials',
    packSize: '230 g',
    servings: null,
    price: 1800,
    stock: 15,
    dietary: [],
    description: 'Screw-thread canister for most backpacking stoves. Flammable: adult (18+) buyers only.',
    preparation: null, // not food: no preparation section is shown
    ageRestricted: true, // Rule 2
    image: null,
  },
  {
    id: 'tb-folding-knife',
    name: 'Folding Camp Knife',
    category: 'Camp essentials',
    packSize: '8 cm blade',
    servings: null,
    price: 2200,
    stock: 6,
    dietary: [],
    description: 'Stainless steel locking blade for cooking and camp chores. Adult (18+) buyers only.',
    preparation: null,
    ageRestricted: true, // Rule 2
    image: null,
  },
  {
    id: 'tb-spork',
    name: 'Long-Handle Titanium Spork',
    category: 'Camp essentials',
    packSize: '17 g',
    servings: null,
    price: 950,
    stock: 20,
    dietary: [],
    description: 'Long enough to reach the bottom of a meal pouch without sauce on your knuckles.',
    preparation: null,
    ageRestricted: false,
    image: null,
  },
]
