const slugs = [
  "ac-split-type",
  "barbecue-utensils",
  "bath",
  "bed-linen",
  "blender",
  "bluetooth-sound-system",
  "board-games",
  "breakfast",
  "building-staff",
  "ceiling-fan",
  "cleaning-available",
  "cleaning-products",
  "clothes-drying-rack",
  "clothes-storage",
  "conditioner",
  "cooking-basics",
  "courtyard-view",
  "dedicated-workspace",
  "dining-table",
  "dishes-cutlery",
  "dishwasher",
  "driveway-parking",
  "dryer",
  "essentials",
  "extra-pillows-blankets",
  "fire-extinguisher",
  "firepit",
  "first-aid-kit",
  "fridge",
  "garden-view",
  "gas-cooker",
  "hammock",
  "hangers",
  "hdtv",
  "hot-tub",
  "hot-water",
  "kitchen",
  "launderette-nearby",
  "long-term-stays",
  "luggage-drop-off",
  "microwave",
  "mountain-view",
  "on-street-parking",
  "outdoor-dining-area",
  "outdoor-furniture",
  "outdoor-kitchen",
  "outdoor-playground",
  "outdoor-pool",
  "outdoor-shower",
  "oven",
  "pets-allowed",
  "pool-view",
  "portable-fans",
  "private-back-garden-fenced",
  "private-bbq-grill",
  "private-entrance",
  "private-patio-balcony",
  "radiant-heating",
  "rice-cooker",
  "room-darkening-blinds",
  "security-cameras",
  "self-check-in",
  "shampoo",
  "shower-gel",
  "single-level-home",
  "smoking-allowed",
  "theme-room",
  "toaster",
  "washing-machine",
  "wifi-30-mbps",
  "wine-glasses",
];

// Shuffle function using Fisher-Yates algorithm
function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

// Shuffle the slugs array
const shuffledSlugs = shuffle([...slugs]);

// Create five arrays each containing 20 slugs
const result = [];
for (let i = 0; i < 5; i++) {
  result.push(shuffledSlugs.slice(i * 20, (i + 1) * 20));
}

console.log(result);
