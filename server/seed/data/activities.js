const activities = [
  {
    name: 'Houseboat Cruise',
    description:
      'A leisurely cruise along the backwaters aboard a traditional kettuvallam houseboat, ' +
      'passing paddy fields, coconut groves, and village life along the banks. (Demo content)',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944',
    category: 'Water Activity',
    duration: '2-3 hours',
    price: 0,
    location: 'Kuttanad Backwaters',
    difficulty: 'Easy',
    bestTime: 'Morning or late afternoon',
    featured: true,
  },
  {
    name: 'Village Walk',
    description:
      'A guided walk through a Kuttanad village, passing coir workshops, small temples, and ' +
      'homes built along narrow canal-side paths, for a grounded look at everyday backwater ' +
      'life. (Demo content)',
    image: 'https://images.unsplash.com/photo-1580202699908-c8c9d4f2e6d3',
    category: 'Cultural',
    duration: '1.5 hours',
    price: 500,
    location: 'Champakulam',
    difficulty: 'Easy',
    bestTime: 'Morning',
    featured: false,
  },
  {
    name: 'Canoeing',
    description:
      'Glide through narrow, quiet canals in a traditional wooden canoe, reaching corners of ' +
      'the backwaters no houseboat can enter. (Demo content)',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5',
    category: 'Water Activity',
    duration: '1 hour',
    price: 800,
    location: 'Kuttanad Backwaters',
    difficulty: 'Moderate',
    bestTime: 'Early morning',
    featured: true,
  },
  {
    name: 'Kayaking',
    description:
      'Paddle your own kayak across calm stretches of Vembanad Lake and the surrounding ' +
      'canals, a more active alternative to a canoe or houseboat cruise. (Demo content)',
    image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f',
    category: 'Water Activity',
    duration: '1.5 hours',
    price: 1000,
    location: 'Vembanad Lake',
    difficulty: 'Moderate',
    bestTime: 'Morning',
    featured: false,
  },
  {
    name: 'Fishing',
    description:
      'Try your hand at traditional Kerala backwater fishing techniques alongside a local ' +
      'fisherman, using a country boat and hand lines. (Demo content)',
    image: 'https://images.unsplash.com/photo-1516132006923-6cf348e5dee2',
    category: 'Leisure',
    duration: '1-2 hours',
    price: 600,
    location: 'Vembanad Lake',
    difficulty: 'Easy',
    bestTime: 'Early morning or evening',
    featured: false,
  },
  {
    name: 'Toddy Shop Experience',
    description:
      'Visit a local toddy shop to sample freshly tapped palm toddy alongside classic Kerala ' +
      'toddy-shop snacks, a quintessential (and mildly alcoholic) local tradition. (Demo content)',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947',
    category: 'Food & Cuisine',
    duration: '1 hour',
    price: 400,
    location: 'Kuttanad Village',
    difficulty: 'Easy',
    bestTime: 'Afternoon',
    featured: false,
  },
  {
    name: 'Local Food Experience',
    description:
      'A home-style Kerala meal served on a banana leaf, featuring backwater specialities ' +
      'like karimeen (pearl spot fish) pollichathu and traditional rice preparations. (Demo content)',
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7',
    category: 'Food & Cuisine',
    duration: '1 hour',
    price: 700,
    location: 'Kuttanad Village',
    difficulty: 'Easy',
    bestTime: 'Lunch or dinner',
    featured: true,
  },
  {
    name: 'Sunset Cruise',
    description:
      'A short evening cruise timed to catch the sun setting over Vembanad Lake, with the ' +
      'water turning gold and Chinese fishing nets silhouetted against the sky. (Demo content)',
    image: 'https://images.unsplash.com/photo-1495616811223-4d98c6e9c869',
    category: 'Water Activity',
    duration: '1 hour',
    price: 0,
    location: 'Vembanad Lake',
    difficulty: 'Easy',
    bestTime: 'Evening',
    featured: true,
  },
  {
    name: 'Photography Tour',
    description:
      'A guided tour timed around the best light for photographing houseboats, paddy fields, ' +
      'fishing nets, and village life across the backwaters. (Demo content)',
    image: 'https://images.unsplash.com/photo-1500534623283-312aade485b7',
    category: 'Photography',
    duration: '2 hours',
    price: 900,
    location: 'Kuttanad Backwaters',
    difficulty: 'Easy',
    bestTime: 'Golden hour (sunrise or sunset)',
    featured: false,
  },
  {
    name: 'Cycling',
    description:
      'Cycle along narrow bunds and village lanes between paddy fields and canals, a scenic ' +
      'and active way to see rural Kuttanad up close. (Demo content)',
    image: 'https://images.unsplash.com/photo-1471506480208-91b3a4cc78be',
    category: 'Adventure',
    duration: '2 hours',
    price: 500,
    location: 'R Block Kuttanad',
    difficulty: 'Moderate',
    bestTime: 'Morning',
    featured: false,
  },
  {
    name: 'Bird Watching',
    description:
      'Spot migratory and resident water birds around Pathiramanal Island and the Kumarakom ' +
      'bird sanctuary, best enjoyed with binoculars and a patient guide. (Demo content)',
    image: 'https://images.unsplash.com/photo-1522926193341-e9ffd686c60f',
    category: 'Nature',
    duration: '2 hours',
    price: 750,
    location: 'Pathiramanal Island',
    difficulty: 'Easy',
    bestTime: 'Early morning',
    featured: false,
  },
  {
    name: 'Paddy Field Visit',
    description:
      'Walk the mud bunds of a below-sea-level paddy field and learn how Kuttanad farmers ' +
      'manage water levels to grow rice in land that sits lower than the surrounding canals. (Demo content)',
    image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6',
    category: 'Nature',
    duration: '1 hour',
    price: 400,
    location: 'R Block Kuttanad',
    difficulty: 'Easy',
    bestTime: 'Morning',
    featured: false,
  },
  {
    name: 'Traditional Cooking Experience',
    description:
      'Learn to prepare a classic Kerala backwater dish, from grinding spices to finishing ' +
      'the curry in a traditional clay pot, guided by a local home cook. (Demo content)',
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d',
    category: 'Food & Cuisine',
    duration: '1.5 hours',
    price: 850,
    location: 'Kuttanad Village',
    difficulty: 'Easy',
    bestTime: 'Late morning',
    featured: false,
  },
];

module.exports = activities;
