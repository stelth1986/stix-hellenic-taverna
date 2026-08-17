export type MenuItem = {
  name: string;
  price?: string;
  desc?: string;
  tags?: string;
};

export type MenuSection = {
  title: string;
  note?: string;
  items: MenuItem[];
};

/* ------------------------------ DINNER (A4) ------------------------------ */

export const dinnerMenu: MenuSection[] = [
  {
    title: "Small Shares",
    items: [
      { name: "Greek Olives", price: "7" },
      { name: "Pickled Chikory", price: "12" },
      { name: "Woodfire Greek Bread", price: "9" },
      { name: "Greek Pita Bread", price: "11" },
      { name: "Tzatziki", price: "12", desc: "cucumber, garlic, yoghurt", tags: "v, gf" },
      { name: "Tarama", price: "12", desc: "fish roe, lemon, garlic" },
      { name: "Tirokafteri", price: "12", desc: "feta, red pepper, bukovo", tags: "v, gf" },
      { name: "Trio of Dips", price: "26", desc: "all three dips & pita bread" },
      { name: "Chargrilled Corn", price: "14", tags: "v" },
      {
        name: "Greek Potatoes",
        price: "15",
        desc: "baked potatoes, lemon, oregano, extra virgin olive oil",
        tags: "v",
      },
      { name: "Horta", price: "18", desc: "seasonal local greens with lemon & Greek EVOO" },
      { name: "Fries", price: "14", desc: "add feta +$2", tags: "v, gf" },
    ],
  },
  {
    title: "Medium Shares",
    items: [
      {
        name: "Mediterranean Slaw",
        price: "15",
        desc: "green & red cabbage, carrot, vinegar dressing",
        tags: "v, gf",
      },
      { name: "Tomato Salad", price: "17", desc: "tomato, balsamic vinaigrette", tags: "v, gf" },
      {
        name: "Greek Salad",
        price: "19",
        desc: "tomato, cucumber, Spanish onion, green peppers, feta, Kalamata olives, oregano",
        tags: "v, gf",
      },
      {
        name: "Chargrilled Haloumi",
        price: "20",
        desc: "lemon, oregano, extra virgin olive oil",
        tags: "v, gf",
      },
      { name: "Saganaki Cheese", price: "24", desc: "honey, roasted walnuts", tags: "v, gf" },
      {
        name: "Spanakopita",
        price: "24",
        desc: "hand-made pastry with local spinach & feta cheese",
        tags: "v",
      },
      { name: "Calamari", price: "25", desc: "lightly floured & pan fried", tags: "gf" },
      { name: "Chargrilled Chicken Wings", price: "18" },
      { name: "Bifteki", price: "22", desc: "Greek style beef meatball, lemon, onion" },
    ],
  },
  {
    title: "Large Shares",
    items: [
      {
        name: "BBQ Octopus",
        price: "30",
        desc: "Western Australian octopus, chargrilled and dressed with lemon EVOO emulsion",
      },
      {
        name: "Charcoal Fish of the Day",
        price: "38",
        desc: "chargrilled with head on and butterflied, boneless, served with wilted greens, lemon EVOO dressing. Ask the staff what fish is on today",
      },
      { name: "Slow Roasted Lamb Shoulder", price: "35", desc: "11hr slow braised lamb shoulder" },
      { name: "Chargrilled Pork Loin", price: "32", desc: "chargrilled, bone in" },
    ],
  },
  {
    title: "Stix",
    note: "Two pieces served with tzatziki",
    items: [
      { name: "Chicken", price: "20" },
      { name: "Pork Belly", price: "20" },
      { name: "Lamb Backstrap", price: "22" },
    ],
  },
  {
    title: "Souvla Wraps",
    note: "Served with chips",
    items: [
      { name: "Lamb", price: "25", desc: "tomato, onion, tzatziki" },
      { name: "Pork", price: "23", desc: "tomato, onion, tzatziki" },
      { name: "Chicken", price: "22", desc: "tomato, onion, tzatziki" },
      { name: "Haloumi", price: "25", desc: "tomato, onion, tzatziki" },
    ],
  },
  {
    title: "Souvla Meat Cooked Over Charcoal",
    items: [
      { name: "Chicken", price: "22 / 52", desc: "200g / 500g" },
      { name: "Lamb", price: "30 / 65", desc: "200g / 500g" },
      { name: "Pork", price: "28 / 60", desc: "200g / 500g" },
      { name: "Crispy Pork Belly", price: "28 / 60", desc: "200g / 500g" },
    ],
  },
  {
    title: "Kids (12 and under)",
    items: [
      { name: "Souvla Meat", price: "18", desc: "your choice of chicken, lamb or pork, chips & pita" },
    ],
  },
  {
    title: "Desserts",
    items: [
      { name: "Bougatsa", price: "17", desc: "served with ice cream" },
      { name: "Chocolate Cake", price: "17", desc: "served with ice cream" },
      { name: "Bread Pudding", price: "17", desc: "ekmek" },
    ],
  },
];

/* ------------------------------- LUNCH ----------------------------------- */

export const lunchMenu: MenuSection[] = [
  {
    title: "Souvla Wraps",
    note: "Served with chips",
    items: [
      { name: "Haloumi", price: "25", desc: "tomato, onion, tzatziki" },
      { name: "Chicken", price: "22", desc: "tomato, onion, tzatziki" },
      { name: "Pork", price: "23", desc: "tomato, onion, tzatziki" },
      { name: "Lamb Shoulder", price: "25", desc: "tomato, onion, tzatziki" },
    ],
  },
  {
    title: "Burgers",
    items: [
      {
        name: "Battered Fish Burger",
        price: "24",
        desc: "special mayo, lettuce, pickles, American cheese & hash brown",
      },
      {
        name: "Chargrilled Chicken Burger",
        price: "30",
        desc: "special mayo, lettuce, pickles, American cheese & Stix chilli sauce",
      },
      {
        name: "Classic Cheeseburger",
        price: "22",
        desc: "pickles, American cheese, tomato sauce. Add lettuce and tomato +$2",
      },
      { name: "Stix Beef Burger", price: "24", desc: "special mayo, lettuce, pickles & American cheese" },
      {
        name: "Teras Burger",
        price: "30",
        desc: "two chargrilled beef patties, crispy pork belly, onion rings, BBQ sauce, pickles & American cheese",
      },
    ],
  },
  {
    title: "Salads",
    items: [
      {
        name: "Mediterranean Slaw",
        price: "15",
        desc: "green & red cabbage, carrot, vinegar dressing",
        tags: "v, gf",
      },
      { name: "Tomato Salad", price: "17", desc: "tomato, balsamic vinaigrette", tags: "v, gf" },
      {
        name: "Greek Salad",
        price: "19",
        desc: "tomato, cucumber, Spanish onion, green peppers, feta, Kalamata olives, oregano",
        tags: "v, gf",
      },
    ],
  },
  {
    title: "Pita & Dips",
    items: [
      { name: "Greek Pita Bread", price: "11" },
      { name: "Tzatziki", price: "12", desc: "cucumber, garlic, yoghurt", tags: "v, gf" },
      { name: "Tarama", price: "12", desc: "fish roe, lemon, garlic" },
      { name: "Tirokafteri", price: "12", desc: "feta, red pepper, bukovo", tags: "v, gf" },
      { name: "Trio of Dips", price: "26", desc: "all three dips & pita bread" },
    ],
  },
  {
    title: "Shared",
    items: [
      { name: "Chargrilled Corn", price: "14", tags: "v" },
      { name: "Fries", price: "14", desc: "add feta +$2", tags: "v, gf" },
      {
        name: "Spanakopita",
        price: "24",
        desc: "hand-made pastry with local spinach & feta cheese",
        tags: "v",
      },
      {
        name: "Chargrilled Haloumi",
        price: "20",
        desc: "lemon, oregano, extra virgin olive oil",
        tags: "v, gf",
      },
      { name: "Calamari", price: "25", desc: "lightly floured & pan fried", tags: "gf" },
      { name: "Chargrilled Chicken Wings", price: "18" },
      { name: "Slow Roasted Lamb Shoulder", price: "35", desc: "11hr slow braised lamb shoulder" },
    ],
  },
  {
    title: "Soup",
    items: [
      {
        name: "Lentil Soup",
        price: "18",
        desc: "served with chargrilled bread. Add lamb shoulder +$9",
      },
    ],
  },
  {
    title: "Add Ons",
    items: [
      { name: "Haloumi Cheese", price: "6" },
      { name: "Greek Feta Cheese", price: "6" },
      { name: "Chicken Souvla", price: "7" },
      { name: "Chargrilled Chicken", price: "7" },
      { name: "Pork Souvla", price: "8" },
      { name: "Lamb Shoulder", price: "9" },
    ],
  },
  {
    title: "Kids (12 and under)",
    items: [
      { name: "Souvla Meat", price: "18", desc: "your choice of chicken, lamb or pork, chips & pita" },
    ],
  },
];

/* ------------------------------ BEVERAGES -------------------------------- */

export const drinksMenu: MenuSection[] = [
  {
    title: "Greek Specialty Drinks",
    items: [
      { name: "Stix Mediterranean Lager (on tap)", price: "9.5 / 12.5", desc: "schooner 425ml / pint 568ml" },
      { name: "Alfa Beer Lager", price: "10.5" },
      { name: "Fix Hellas Lager", price: "10.5" },
      { name: "Mythos Pale Lager", price: "10.5" },
      { name: "Nissos Pilsner", price: "10.5" },
      { name: "Ouzo Acropolis", price: "8.5" },
      { name: "Ouzo Mytilini", price: "9" },
      { name: "Ouzo Plomari", price: "9.5" },
      { name: "Tsipouro Idoniko", price: "9" },
      { name: "Tsipouro Zacharias", price: "10" },
      { name: "Skinos Mastiha", price: "10" },
      { name: "Metaxa 5 Star Brandy", price: "8.5" },
      { name: "Metaxa 12 Star Greek Brandy", price: "10" },
      { name: "Souroti Greek Sparkling Water 750ml", price: "10.5" },
    ],
  },
  {
    title: "Cocktails",
    items: [
      { name: "Aperol Spritz", price: "16", desc: "Aperol, Prosecco, soda" },
      {
        name: "Long Island",
        price: "20",
        desc: "Absolut, Beefeater, Olmeca, Havana white rum, triple sec, lemon & cola",
      },
      { name: "Espresso Martini", price: "20", desc: "vodka, Kahlua, espresso" },
      { name: "Classic Margarita", price: "20", desc: "Olmeca, triple sec, lime juice, sugar syrup" },
      {
        name: "Paros Passion",
        price: "20",
        desc: "gin, Amaretto, passionfruit puree, sugar syrup, lime juice",
      },
      { name: "Hera's Garden", price: "20", desc: "Ouzeus lime, soda, mint, fresh lime" },
      { name: "Old Zeus", price: "20", desc: "Ouzeus raspberry, sweet vermouth, gin" },
      {
        name: "Bloom of Symi",
        price: "20",
        desc: "Beefeater pink gin, watermelon puree, lime juice",
      },
    ],
  },
  {
    title: "Mocktails",
    items: [
      {
        name: "Santorini Sunset",
        price: "12",
        desc: "watermelon, passionfruit, orange and pineapple",
      },
      { name: "Aphrodite's Blush", price: "12", desc: "lychee, cranberry, lime and rose syrup" },
    ],
  },
  {
    title: "Greek Wine",
    note: "By the glass & bottle",
    items: [
      {
        name: "Mati Fortuna Moschofilero Chardonnay",
        price: "10 / 48",
        desc: "Peloponnese GR. An aromatic dry white",
      },
      {
        name: "Semeli Thea Moschofilero",
        price: "10.5 / 50",
        desc: "Peloponnese GR. A premium single vineyard dry white",
      },
      {
        name: "Diamantakis Diamantopetra Vidiano Assyrtiko",
        price: "52",
        desc: "Crete GR. A distinctive full bodied white blend",
      },
      {
        name: "Zacharias Omikron Retsina",
        price: "40",
        desc: "traditional Greek white known for its distinctive pine resin flavour",
      },
      { name: "Mati Fortuna Rosé", price: "10 / 48", desc: "Peloponnese GR" },
      {
        name: "Mati Fortuna Agiorgitiko Cab Sauv",
        price: "10 / 48",
        desc: "Peloponnese GR. Fruity and pungent dry red",
      },
      {
        name: "Semeli Herinos Agiorgitiko Syrah",
        price: "52",
        desc: "Peloponnese GR. A premium dry red",
      },
      {
        name: "Kokkinos Xinomavro",
        price: "72",
        desc: "Naoussa GR. A medium style red similar to Nebbiolo or Pinot Noir",
      },
    ],
  },
  {
    title: "Bubbles, White & Rosé",
    note: "Glass small / large, bottle",
    items: [
      { name: "Stonefish Premium Sparkling Chardonnay Pinot Noir", price: "48", desc: "SA" },
      { name: "Garfish Moscato", price: "48", desc: "McLaren Vale, SA" },
      { name: "G.H. Mumm Champagne", price: "109", desc: "Reims, FR" },
      { name: "Veuve Clicquot Champagne", price: "140", desc: "Reims, FR" },
      { name: "Stonefish Sauvignon Blanc", price: "10 / 48", desc: "Margaret River, WA" },
      { name: "Stonefish Chardonnay", price: "10 / 48", desc: "Margaret River, WA" },
      { name: "Grant Burge 'Benchmark' Pinot Grigio", price: "10.5 / 50", desc: "Barossa Valley, SA" },
      { name: "Lost Turtle Sauvignon Blanc", price: "13 / 60", desc: "Marlborough, NZ" },
      { name: "Opawa Pinot Gris", price: "13 / 60", desc: "Marlborough, NZ" },
      { name: "Freycinet Vineyard Riesling", price: "60", desc: "Tasmania" },
      { name: "Vasse Felix Filius Chardonnay", price: "63", desc: "Margaret River, WA" },
      { name: "Brokenwood Semillon", price: "69", desc: "Hunter Valley, NSW" },
      { name: "Saint Clair Wairau Reserve Sauvignon Blanc", price: "79", desc: "Marlborough, NZ" },
      { name: "Fenetre Lavande Rosé", price: "10 / 48", desc: "McLaren Vale, SA" },
      { name: "Brise Maritime", price: "10.5 / 50", desc: "Méditerranée, FR" },
      { name: "Lumiere De Provence Rosé", price: "52", desc: "Provence, FR" },
      { name: "Maison Saint AIX Rosé", price: "88", desc: "Provence, FR" },
    ],
  },
  {
    title: "Red Wine",
    note: "Glass small / large, bottle",
    items: [
      { name: "Stonefish Cab Sauv", price: "10 / 48", desc: "Margaret River, WA" },
      { name: "Stonefish Merlot", price: "10 / 48", desc: "Margaret River, WA" },
      { name: "Grant Burge 'Benchmark' Shiraz", price: "10.5 / 49", desc: "Barossa Valley, SA" },
      { name: "Hãhã Pinot Noir", price: "11 / 52", desc: "Marlborough, NZ" },
      { name: "Stonefish Reserve Shiraz", price: "11.5 / 52", desc: "Margaret River, WA" },
      { name: "Susana Balbo Crios Malbec", price: "14 / 65", desc: "Mendoza, ARG" },
      { name: "Munda Wines Kaurna Country Syrah", price: "62", desc: "McLaren Vale, SA" },
      { name: "Yalumba 'The Cigar' Cab Sauv", price: "62", desc: "Coonawarra, SA" },
      { name: "Grasshopper Rock Pinot Noir", price: "69", desc: "Central Otago, NZ" },
      { name: "John Duval 'Entity' Shiraz", price: "84", desc: "Barossa Valley, SA" },
      { name: "Ata Rangi Crimson Pinot Noir", price: "84", desc: "Martinborough, NZ" },
      { name: "Jim Barry 'The McRae' Wood Shiraz", price: "94", desc: "Clare Valley, SA" },
    ],
  },
];
