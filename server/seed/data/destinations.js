const destinations = [
  {
    name: 'Kuttanad Backwaters',
    description:
      'Kuttanad, often called the "Rice Bowl of Kerala", is a vast network of canals, ' +
      'rivers, and lagoons where farming happens below sea level behind mud embankments. ' +
      'A slow cruise here reveals emerald paddy fields, coconut groves, and village life ' +
      'lived almost entirely on and around the water. (Demo content)',
    shortDescription: 'The iconic backwater region where paddy fields sit below sea level.',
    images: [
      'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944',
      'https://images.unsplash.com/photo-1602241442689-33aa2b7fd6f6',
    ],
    location: { area: 'Kuttanad', district: 'Alappuzha', state: 'Kerala', country: 'India' },
    thingsToDo: ['Houseboat cruise', 'Village walk', 'Paddy field visit', 'Canoe ride'],
    recommendedDuration: 'Full day',
    bestTimeToVisit: 'November to February',
    category: 'Backwaters',
    coordinates: { type: 'Point', coordinates: [76.452, 9.4021] },
    featured: true,
  },
  {
    name: 'Alappuzha Beach',
    description:
      'A wide, breezy stretch of golden sand facing the Arabian Sea, anchored by a ' +
      'century-old pier that reaches far out into the water. Evenings bring cooling sea ' +
      'breezes, snack vendors, and some of the best sunsets on the Kerala coast. (Demo content)',
    shortDescription: 'A classic Kerala beach evening with a historic sea-facing pier.',
    images: [
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2',
      'https://images.unsplash.com/photo-1519046904884-53103b34b206',
    ],
    location: { area: 'Alappuzha Town', district: 'Alappuzha', state: 'Kerala', country: 'India' },
    thingsToDo: ['Sunset walk', 'Pier photography', 'Beach park', 'Light snacks'],
    recommendedDuration: '2-3 hours',
    bestTimeToVisit: 'October to March',
    category: 'Beach',
    coordinates: { type: 'Point', coordinates: [76.326, 9.49] },
    featured: true,
  },
  {
    name: 'Pathiramanal Island',
    description:
      'A small, uninhabited island in the middle of Vembanad Lake, reachable only by boat. ' +
      'Its quiet mangroves and reed beds attract migratory birds every winter, making it a ' +
      'favourite short stop for birdwatchers and anyone wanting an hour of complete calm. (Demo content)',
    shortDescription: 'A tranquil island stop known for migratory birds and mangroves.',
    images: ['https://images.unsplash.com/photo-1544551763-46a013bb70d5'],
    location: { area: 'Vembanad Lake', district: 'Alappuzha', state: 'Kerala', country: 'India' },
    thingsToDo: ['Bird watching', 'Island walk', 'Photography'],
    recommendedDuration: '1-2 hours',
    bestTimeToVisit: 'December to February',
    category: 'Island',
    coordinates: { type: 'Point', coordinates: [76.4193, 9.5883] },
    featured: false,
  },
  {
    name: 'Kumarakom',
    description:
      'A cluster of little islands on the eastern bank of Vembanad Lake, known for its bird ' +
      'sanctuary, upscale backwater resorts, and calm stretches of water perfect for a ' +
      'leisurely houseboat detour. (Demo content)',
    shortDescription: 'Lakeside village famous for its bird sanctuary and resorts.',
    images: ['https://images.unsplash.com/photo-1602436737052-7b1ffa6f00d6'],
    location: { area: 'Kumarakom', district: 'Kottayam', state: 'Kerala', country: 'India' },
    thingsToDo: ['Bird sanctuary visit', 'Houseboat cruise', 'Ayurveda spa'],
    recommendedDuration: 'Half day',
    bestTimeToVisit: 'November to February',
    category: 'Backwaters',
    coordinates: { type: 'Point', coordinates: [76.4295, 9.6178] },
    featured: true,
  },
  {
    name: 'Marari Beach',
    description:
      'Once a quiet fishing hamlet, Marari retains its unhurried character even as it has ' +
      'become known for palm-fringed shores and calm, uncrowded sand — a good contrast to a ' +
      'day spent on the backwaters. (Demo content)',
    shortDescription: 'A laid-back fishing-village beach, quieter than Alappuzha Beach.',
    images: ['https://images.unsplash.com/photo-1571417925490-fcbb7e2eff9a'],
    location: { area: 'Mararikulam', district: 'Alappuzha', state: 'Kerala', country: 'India' },
    thingsToDo: ['Beach walk', 'Fishing village visit', 'Seafood tasting'],
    recommendedDuration: 'Half day',
    bestTimeToVisit: 'October to March',
    category: 'Beach',
    coordinates: { type: 'Point', coordinates: [76.2892, 9.6122] },
    featured: false,
  },
  {
    name: 'Vembanad Lake',
    description:
      "Kerala's longest lake and the backbone of the entire Kuttanad backwater network. " +
      'Houseboats, canoes, and Chinese fishing nets share the water, and the annual Nehru ' +
      'Trophy Boat Race is held here every August. (Demo content)',
    shortDescription: "Kerala's longest lake and the heart of the backwater network.",
    images: ['https://images.unsplash.com/photo-1593693411515-c20261bcad6e'],
    location: { area: 'Vembanad', district: 'Alappuzha', state: 'Kerala', country: 'India' },
    thingsToDo: ['Houseboat cruise', 'Fishing', 'Sunset viewing'],
    recommendedDuration: 'Full day',
    bestTimeToVisit: 'August (boat race season) or November-February',
    category: 'Backwaters',
    coordinates: { type: 'Point', coordinates: [76.431, 9.5916] },
    featured: true,
  },
  {
    name: 'Ambalappuzha',
    description:
      'Home to the historic Ambalappuzha Sree Krishna Temple, famous for its Palpayasam ' +
      '(sweet milk pudding) offering. The temple town is a quick, culturally rich detour ' +
      'from a backwater itinerary. (Demo content)',
    shortDescription: 'Temple town known for the Sree Krishna Temple and its Palpayasam.',
    images: ['https://images.unsplash.com/photo-1600100397608-f9f6c3b1b3c8'],
    location: { area: 'Ambalappuzha', district: 'Alappuzha', state: 'Kerala', country: 'India' },
    thingsToDo: ['Temple visit', 'Palpayasam tasting', 'Local heritage walk'],
    recommendedDuration: '1-2 hours',
    bestTimeToVisit: 'Year round',
    category: 'Culture',
    coordinates: { type: 'Point', coordinates: [76.34, 9.386] },
    featured: false,
  },
  {
    name: 'Champakulam',
    description:
      'A quiet backwater village credited as the site of Kerala\'s first snake boat race. ' +
      'Narrow canals wind past churches, coir workshops, and paddy fields, giving a ' +
      'grounded look at everyday Kuttanad life. (Demo content)',
    shortDescription: 'Historic backwater village and birthplace of the snake boat race.',
    images: ['https://images.unsplash.com/photo-1580202699908-c8c9d4f2e6d3'],
    location: { area: 'Champakulam', district: 'Alappuzha', state: 'Kerala', country: 'India' },
    thingsToDo: ['Village walk', 'Canal cruise', 'Coir-making demo'],
    recommendedDuration: 'Half day',
    bestTimeToVisit: 'November to February',
    category: 'Village',
    coordinates: { type: 'Point', coordinates: [76.4667, 9.4667] },
    featured: false,
  },
  {
    name: 'Punnamada',
    description:
      'The finish line and home stretch of the world-famous Nehru Trophy Boat Race, held ' +
      'every August on Punnamada Lake. Outside of race season it is a calm stretch of open ' +
      'water popular with houseboat operators. (Demo content)',
    shortDescription: 'Home of the Nehru Trophy Boat Race on open backwater lake.',
    images: ['https://images.unsplash.com/photo-1602436737003-49d6b6bcd8bf'],
    location: { area: 'Punnamada', district: 'Alappuzha', state: 'Kerala', country: 'India' },
    thingsToDo: ['Boat race grounds visit', 'Houseboat departure point', 'Photography'],
    recommendedDuration: '1-2 hours',
    bestTimeToVisit: 'August for the race, otherwise year round',
    category: 'Backwaters',
    coordinates: { type: 'Point', coordinates: [76.355, 9.487] },
    featured: false,
  },
  {
    name: 'R Block Kuttanad',
    description:
      'One of Kuttanad\'s reclaimed paddy "blocks", where fields stretch below the water ' +
      'level of the surrounding canals, held back by mud bunds. Walking the narrow bunds at ' +
      'harvest time is a highlight for visitors wanting to see Kuttanad farming up close. (Demo content)',
    shortDescription: 'A below-sea-level paddy farming block, classic Kuttanad scenery.',
    images: ['https://images.unsplash.com/photo-1596394516093-501ba68a0ba6'],
    location: { area: 'R Block', district: 'Alappuzha', state: 'Kerala', country: 'India' },
    thingsToDo: ['Paddy field walk', 'Farming demonstration', 'Village lunch'],
    recommendedDuration: 'Half day',
    bestTimeToVisit: 'December to February (harvest season)',
    category: 'Village',
    coordinates: { type: 'Point', coordinates: [76.46, 9.33] },
    featured: false,
  },
];

module.exports = destinations;
