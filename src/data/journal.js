// Trail Journal posts (/journal). Written for TrailBite; local data like the catalogue.
// Each post links to trails (trailIds) and products (productIds) so readers can go
// straight from reading about a hike to planning and packing for it.
//
// body: list of blocks — { type: 'p' | 'h2', text } or { type: 'list', items: [] }
// trending: lower number = higher in the "Trending" list

export const posts = [
  {
    slug: 'margalla-trails-for-winter-mornings',
    title: 'Five Margalla trails for winter mornings',
    date: '2026-11-10',
    readMinutes: 5,
    trending: 1,
    tag: 'Trending trails',
    excerpt: 'Cool air, clear views and short drives: the season when Islamabad’s own hills are at their best.',
    trailIds: ['trail-3', 'trail-5', 'saidpur-trail', 'trail-6', 'tilla-charouni'],
    productIds: ['tb-electrolyte', 'tb-headlamp', 'tb-doodh-patti'],
    body: [
      {
        type: 'p',
        text: 'From November to February the Margallas are at their best. Mornings are cool enough to climb without overheating, the haze lifts after rain, and the city spreads out below every viewpoint. These are the five routes we get asked about most.',
      },
      { type: 'h2', text: 'For a quick sunrise: Trail 3' },
      {
        type: 'p',
        text: 'Steep and short. Start in the dark with a headlamp and you will be at the viewpoint as the sun comes up over the city. It is busy on weekends, so go on a weekday if you can.',
      },
      { type: 'h2', text: 'For a first hike: Trail 5 or Saidpur' },
      {
        type: 'p',
        text: 'Trail 5 climbs gently beside a stream and links across to Trail 3 near the top. The Saidpur path is even shorter and ends with tea at Daman-e-Koh. Both work well for friends who have never hiked before.',
      },
      { type: 'h2', text: 'For a quiet day: Trail 6' },
      {
        type: 'p',
        text: 'Starting behind Faisal Mosque, Trail 6 heads into the eastern ridges where you meet far fewer people. Pack lunch: it is long enough to need one.',
      },
      { type: 'h2', text: 'For a challenge: Tilla Charouni' },
      {
        type: 'p',
        text: 'The highest point of the Margallas is a full day of ridges and steep drops. Go with someone who knows the route and carry a hot meal and plenty of water.',
      },
      {
        type: 'list',
        items: [
          'Carry at least 1.5 litres of water, even in winter.',
          'Mornings can be near freezing on the ridge: bring a warm layer.',
          'Leave nothing behind. Pack out every wrapper.',
        ],
      },
    ],
  },
  {
    slug: 'what-to-eat-on-a-six-hour-hike',
    title: 'What to eat on a six-hour hike',
    date: '2026-11-03',
    readMinutes: 4,
    trending: 2,
    tag: 'Trail food',
    excerpt: 'Snack little and often, keep a hot meal for the top, and drink before you feel thirsty.',
    trailIds: ['trail-6', 'miranjani'],
    productIds: ['tb-trail-mix', 'tb-energy-bar', 'tb-peanut-butter', 'tb-chicken-biryani', 'tb-electrolyte'],
    body: [
      {
        type: 'p',
        text: 'On a long hike your body burns through energy faster than a big breakfast can cover. The trick is to eat small amounts often, and to choose food that packs a lot of energy into very little weight.',
      },
      { type: 'h2', text: 'Before you start' },
      {
        type: 'p',
        text: 'Eat a breakfast with slow carbohydrates, such as oats or paratha with egg, an hour before you set off. Drink half a litre of water with it.',
      },
      { type: 'h2', text: 'On the way up' },
      {
        type: 'p',
        text: 'Snack every 45 to 60 minutes: a handful of trail mix, an energy bar or a squeeze of peanut butter. Fats and nuts give you the most energy for their weight, and sugary snacks like chikki help on the steepest sections.',
      },
      { type: 'h2', text: 'At the top' },
      {
        type: 'p',
        text: 'This is where a hot meal pays off. A freeze-dried pouch needs only boiling water and about ten minutes, and it is far lighter to carry than a packed lunch.',
      },
      {
        type: 'list',
        items: [
          'Add an electrolyte sachet to one of your bottles on hot or long days.',
          'Keep a sweet snack in a pocket for the walk down.',
          'Carry one more snack than you think you will need.',
        ],
      },
    ],
  },
  {
    slug: 'mukshpuri-or-miranjani',
    title: 'Mukshpuri or Miranjani? Picking your Galiyat summit',
    date: '2026-10-21',
    readMinutes: 6,
    trending: 3,
    tag: 'Trending trails',
    excerpt: 'Two summits ten minutes apart by road, and two very different days on foot.',
    trailIds: ['mukshpuri', 'miranjani', 'pipeline-track'],
    productIds: ['tb-doodh-patti', 'tb-mash-two-person', 'tb-water-filter', 'tb-trekking-poles'],
    body: [
      {
        type: 'p',
        text: 'Mukshpuri and Miranjani face each other across Nathia Gali, and both reward you with views that can stretch to Nanga Parbat on a clear day. Which one you choose depends on how much time and climbing you want.',
      },
      { type: 'h2', text: 'Mukshpuri: the friendlier summit' },
      {
        type: 'p',
        text: 'From Dunga Gali the path climbs steadily through pine forest to an open grassy top. Most hikers take three to five hours for the round trip. It is the better choice for a mixed group.',
      },
      { type: 'h2', text: 'Miranjani: the bigger day' },
      {
        type: 'p',
        text: 'Miranjani is higher, steeper and longer, with a rocky final section. Allow five to six hours, start early, and turn back if cloud rolls in.',
      },
      { type: 'h2', text: 'Not feeling a summit?' },
      {
        type: 'p',
        text: 'The Pipeline Track between Dunga Gali and Ayubia is almost flat and shaded the whole way. It is ideal for families or as a recovery walk the day after a summit.',
      },
      {
        type: 'list',
        items: [
          'It can be 10°C colder on top than in Islamabad: pack a warm layer.',
          'Filter any spring water before drinking it.',
          'Poles help a lot on the steep descent from Miranjani.',
        ],
      },
    ],
  },
  {
    slug: 'your-first-hot-meal-on-the-trail',
    title: 'Your first hot meal on the trail',
    date: '2026-10-08',
    readMinutes: 4,
    trending: 4,
    tag: 'How to',
    excerpt: 'A canister, a small pot and ten minutes is all a freeze-dried dinner needs.',
    trailIds: ['tilla-charouni', 'mukshpuri'],
    productIds: ['tb-gas-canister', 'tb-cook-pot', 'tb-spork', 'tb-daal-chawal'],
    body: [
      {
        type: 'p',
        text: 'Cooking on the trail sounds complicated, but a freeze-dried meal only needs boiling water. Here is the simplest setup that works.',
      },
      { type: 'h2', text: 'What you need' },
      {
        type: 'list',
        items: [
          'A screw-thread gas canister and a small stove that fits it.',
          'A small pot, around 750 ml, to boil water in.',
          'A long spoon or spork that reaches the bottom of the pouch.',
        ],
      },
      { type: 'h2', text: 'Safety first' },
      {
        type: 'p',
        text: 'Cook on flat, open ground away from dry grass, never inside a tent, and keep the canister upright. Gas canisters are flammable, which is why we only sell them to customers aged 18 and over.',
      },
      { type: 'h2', text: 'The ten-minute dinner' },
      {
        type: 'p',
        text: 'Boil the amount of water printed on the pouch, pour it in, stir from the bottom, seal and wait. Stir once halfway. Eat straight from the pouch, then roll it up and carry it home.',
      },
    ],
  },
  {
    slug: 'pack-it-out-margallas',
    title: 'Pack it out: keeping the Margallas clean',
    date: '2026-09-25',
    readMinutes: 3,
    trending: 5,
    tag: 'Trail care',
    excerpt: 'Every wrapper you carry up can come down with you. Here is how we make it easy.',
    trailIds: ['trail-3', 'trail-5'],
    productIds: ['tb-trail-bandana'],
    body: [
      {
        type: 'p',
        text: 'The busiest Margalla trails see thousands of walkers each week, and litter builds up quickly around viewpoints. The fix is simple: bring a bag and take your rubbish home.',
      },
      {
        type: 'list',
        items: [
          'Keep one zip pouch just for rubbish; empty meal pouches roll up small.',
          'Pick up one piece of litter that is not yours on every hike.',
          'Stay on the marked path to protect the hillside.',
        ],
      },
      {
        type: 'p',
        text: 'Our meal pouches are designed to be eaten from and then sealed again, so carrying them out takes no space at all.',
      },
    ],
  },
]

export function formatPostDate(iso) {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}
