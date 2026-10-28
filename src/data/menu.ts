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

/* --------------------------- DINNER (OCT 2026) --------------------------- */

export const dinnerMenu: MenuSection[] = [
  {
    title: "Dips & Bread",
    items: [
      { name: "Greek Olives", price: "7" },
      { name: "Pickled Chikory", price: "10" },
      { name: "Wood-fire Greek Bread", price: "9" },
      { name: "Greek Pita Bread", price: "11" },
      { name: "Tzatziki", price: "12", desc: "cucumber, garlic, yoghurt", tags: "v, gf" },
      { name: "Tarama", price: "12", desc: "fish roe, lemon, garlic", tags: "a" },
      { name: "Tirokafteri", price: "12", desc: "feta, red pepper, bukovo", tags: "v, gf" },
      { name: "Trio of Dips", price: "26", desc: "all three dips & pita bread" },
    ],
  },
  {
    title: "Cheese & Pastry",
    items: [
      {
        name: "Chargrilled Halloumi",
        price: "20",
        desc: "lemon, oregano, extra virgin olive oil",
        tags: "v, gf",
      },
      { name: "Saganaki Cheese", price: "24", desc: "honey, roasted walnuts", tags: "v, gf" },
      {
        name: "Spanakopita",
        price: "24",
        desc: "handmade pastry with local spinach & feta cheese",
        tags: "v",
      },
      {
        name: "Tiropita",
        price: "19",
        desc: "house-made feta & ricotta pastry with thyme & honey, or plain",
      },
    ],
  },
  {
    title: "Staples",
    items: [
      { name: "Dakos Salad", price: "18", desc: "tomatoes, Cretan cheese, rusk bread" },
      {
        name: "Mediterranean Slaw",
        price: "16",
        desc: "green & red cabbage, carrot, vinegar",
        tags: "v, gf",
      },
      { name: "Tomato Salad", price: "18", desc: "tomato, balsamic vinaigrette", tags: "v, gf" },
      {
        name: "Greek Salad",
        price: "19",
        desc: "tomato, cucumber, Spanish onion, green peppers, feta, Kalamata olives, oregano",
        tags: "v, gf",
      },
      { name: "Horta", price: "18", desc: "seasonal local greens with lemon & Greek EVOO" },
      { name: "Chargrilled Corn", price: "14", tags: "v" },
      { name: "Greek Potatoes", price: "16", desc: "baked potatoes, lemon, oregano, EVOO", tags: "v" },
      { name: "Fries", price: "14", desc: "add feta +$2", tags: "v, gf" },
      { name: "Calamari", price: "25", desc: "lightly floured & pan fried", tags: "gf, i" },
    ],
  },
  {
    title: "Souvla",
    note: "Cooked over charcoal · order by weight · 200g / 500g",
    items: [
      { name: "Chicken", price: "24 / 52" },
      { name: "Lamb", price: "32 / 67" },
      { name: "Pork", price: "28 / 60" },
      { name: "Crispy Pork Belly", price: "30 / 62" },
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
    note: "All served with chips",
    items: [
      { name: "Halloumi", price: "25", desc: "tomato, onion, tzatziki" },
      { name: "Chicken", price: "24", desc: "tomato, onion, tzatziki" },
      { name: "Pork", price: "24", desc: "tomato, onion, tzatziki" },
      { name: "Lamb Shoulder", price: "26", desc: "tomato, onion, tzatziki" },
    ],
  },
  {
    title: "From the Charcoal",
    items: [
      {
        name: "Australian King Prawns (2)",
        price: "22",
        desc: "tsipouro, garlic butter. Add additional prawn +$10",
        tags: "a",
      },
      {
        name: "BBQ Octopus",
        price: "M.P",
        desc: "Western Australian octopus, chargrilled and dressed with lemon EVOO emulsion",
        tags: "a",
      },
      {
        name: "Charcoal Fish of the Day",
        price: "38",
        desc: "chargrilled and butterflied, boneless, served with wilted greens, lemon EVOO dressing",
        tags: "a",
      },
      {
        name: "House Made Sausages",
        price: "19",
        desc: "pork sausages over charcoal, kefalograviera & ouzo",
      },
      { name: "Chargrilled Chicken Wings", price: "18" },
      { name: "Chargrilled Pork Loin", price: "32", desc: "chargrilled, bone in" },
      { name: "Bifteki", price: "22", desc: "Greek style beef meatball, lemon, onion" },
      {
        name: "Angus Grass Fed T-Bone",
        price: "45",
        desc: "400g, riganolado (Greek lemon sauce), chips",
      },
      { name: "Slow Braised Lamb Shoulder", price: "35", desc: "11hr slow braised lamb shoulder" },
    ],
  },
  {
    title: "Desserts",
    items: [
      { name: "Bougatsa", price: "17", desc: "served with ice cream" },
      { name: "Chocolate Cake", price: "17", desc: "served with ice cream" },
      { name: "Bread Pudding", price: "17", desc: "ekmek" },
      {
        name: "House Strained Greek Yoghurt",
        price: "15",
        desc: "choose home-made sour cherry compote or honey & walnut",
      },
    ],
  },
  {
    title: "Kids (12 and under)",
    items: [
      { name: "Souvla Meat", price: "18", desc: "your choice of chicken, lamb or pork, chips & pita" },
    ],
  },
  {
    title: "Set Menu",
    note: "$79 per person",
    items: [
      {
        name: "Set Menu",
        price: "79pp",
        desc: "Greek salad, trio of dips with pita bread (tzatziki, tarama, tirokafteri), grilled halloumi cheese, pan fried calamari, homemade spanakopita, all the souvla meats (chicken, lamb & pork) on organic charcoal, fries. Dessert: bougatsa & ekmek",
      },
      { name: "Kids Plate", price: "30", desc: "souvla, pita, fries & ice cream" },
      { name: "Add on: Prawns Saganaki", price: "14pp", desc: "tomato saltsa & feta cheese", tags: "a" },
      {
        name: "Add on: BBQ Octopus",
        price: "10pp",
        desc: "Western Australian octopus, char-grilled & dressed with lemon EVOO emulsion",
        tags: "a",
      },
      { name: "Add on: Saganaki Cheese", price: "8pp", desc: "honey & roasted walnuts" },
      {
        name: "Add on: Spanakopita",
        price: "6pp",
        desc: "hand-made pastry with local spinach & feta cheese",
      },
      {
        name: "Add on: Greek Potatoes",
        price: "6pp",
        desc: "baked potatoes, lemon, oregano, extra virgin olive oil",
      },
      { name: "Add on: Horta", price: "5pp", desc: "seasonal local greens with lemon & Greek EVOO" },
      { name: "Add on: Char-grilled Corn", price: "4pp" },
    ],
  },
];

/* ---------------------------- LUNCH (OCT 2026) --------------------------- */

export const lunchMenu: MenuSection[] = [
  {
    title: "Pita & Dips",
    items: [
      { name: "Greek Pita Bread", price: "11" },
      { name: "Tzatziki", price: "12", desc: "cucumber, garlic, yoghurt", tags: "v, gf" },
      { name: "Tarama", price: "12", desc: "fish roe, lemon, garlic", tags: "a" },
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
        name: "Chargrilled Halloumi",
        price: "20",
        desc: "lemon, oregano, extra virgin olive oil",
        tags: "v, gf",
      },
      { name: "Calamari", price: "25", desc: "lightly floured & pan fried", tags: "gf, i" },
      {
        name: "BBQ Octopus",
        price: "M.P",
        desc: "Western Australian octopus, chargrilled and dressed with lemon EVOO emulsion",
        tags: "a",
      },
      { name: "Chargrilled Chicken Wings", price: "18" },
      { name: "Slow Braised Lamb Shoulder", price: "35", desc: "11hr slow braised lamb shoulder" },
      {
        name: "Angus Grass Fed T-Bone",
        price: "45",
        desc: "400g, riganolado (Greek lemon sauce), chips",
      },
    ],
  },
  {
    title: "Achilles Plate",
    items: [
      { name: "Chicken or Pork", price: "29", desc: "chips, Greek salad, tzatziki, pita" },
      { name: "Lamb", price: "34", desc: "chips, Greek salad, tzatziki, pita" },
    ],
  },
  {
    title: "Souvla Wraps",
    note: "All served with chips",
    items: [
      { name: "Halloumi", price: "25", desc: "tomato, onion, tzatziki" },
      { name: "Chicken", price: "24", desc: "tomato, onion, tzatziki" },
      { name: "Pork", price: "24", desc: "tomato, onion, tzatziki" },
      { name: "Lamb Shoulder", price: "26", desc: "tomato, onion, tzatziki" },
    ],
  },
  {
    title: "Burgers",
    note: "All served with chips",
    items: [
      {
        name: "Classic Cheeseburger",
        price: "22",
        desc: "pickles, American cheese, tomato sauce. Add lettuce & tomato +$2 / pork belly +$4",
      },
    ],
  },
  {
    title: "Salads",
    items: [
      {
        name: "Mediterranean Slaw",
        price: "16",
        desc: "green & red cabbage, carrot, vinegar dressing",
        tags: "v, gf",
      },
      { name: "Tomato Salad", price: "18", desc: "tomato, balsamic vinaigrette", tags: "v, gf" },
      {
        name: "Greek Salad",
        price: "19",
        desc: "tomato, cucumber, Spanish onion, green peppers, feta, Kalamata olives, oregano",
        tags: "v, gf",
      },
      { name: "Dakos Salad", price: "18", desc: "tomatoes, Cretan cheese, rusk bread" },
    ],
  },
  {
    title: "Salad Add Ons",
    items: [
      { name: "Halloumi Cheese", price: "6" },
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

/* -------------------------- BEVERAGES (OCT 2026) ------------------------- */

export const drinksMenu: MenuSection[] = [
  {
    title: "Greek Specialty Drinks",
    items: [
      { name: "Stix Mediterranean Lager (on tap)", price: "10 / 13", desc: "schooner 425ml / pint 568ml" },
      { name: "Souroti Greek Sparkling Water 750ml", price: "10.5" },
      { name: "Souroti Greek Still Water 700ml", price: "10.5" },
    ],
  },
  {
    title: "Beers on Tap",
    note: "Schooner 425ml / pint 568ml",
    items: [
      { name: "Tooheys New", price: "8 / 12" },
      { name: "Hahn Super Dry", price: "10 / 13" },
      { name: "Hahn Super Dry Mid 3.5%", price: "8 / 10.5" },
      { name: "Hawke's Lager", price: "10 / 13" },
      { name: "Heineken", price: "10 / 13.5" },
      { name: "Kirin Ichiban", price: "11.5 / 15" },
      { name: "Grifter Pale Ale", price: "10.5 / 13.5" },
      { name: "James Squire 150 Lashes", price: "10.5 / 13.5" },
      { name: "Young Henrys Newtowner", price: "10.5 / 13" },
      { name: "Stone & Wood Hinterland Pale", price: "11.5 / 11.5" },
      { name: "Stone & Wood Pacific Ale", price: "12 / 16" },
      { name: "Guinness", price: "11 / 13.5" },
    ],
  },
  {
    title: "Cocktails",
    items: [
      {
        name: "Garden of Eden",
        price: "20",
        desc: "gin, lychee, lychee juice, lime, sugar syrup, mint, cucumber",
      },
      { name: "Bloom of Symi", price: "20", desc: "gin, watermelon, lime" },
      {
        name: "Aegean Ice Tea",
        price: "20",
        desc: "ouzo, white rum, gin, vodka, blue curaçao, lime, lemonade",
      },
      { name: "Old Zeus", price: "20", desc: "Ouzeus raspberry, sweet vermouth, gin" },
      { name: "Samos Sunrise", price: "20", desc: "vodka, peach liqueur, pineapple, egg white" },
      { name: "Paros Passion", price: "20", desc: "vodka, amaretto, passionfruit, lime, sugar syrup" },
      { name: "Kalimera Margarita", price: "20", desc: "tequila, Kahlúa, mango juice, lime" },
      { name: "Hellenic Heat", price: "20", desc: "Ouzeus lime, chilli syrup, lime, sugar syrup" },
      {
        name: "Athens Riviera",
        price: "20",
        desc: "Ouzeus raspberry, vodka, strawberry juice, lemonade",
      },
      {
        name: "Grecolada",
        price: "20",
        desc: "Ouzeus lime, Malibu, white rum, pineapple, sugar syrup, lime",
      },
    ],
  },
  {
    title: "Classics",
    items: [
      { name: "Margarita", price: "19" },
      { name: "Lychee Martini", price: "19" },
      { name: "Old Fashioned", price: "19" },
      { name: "Amaretto Sour", price: "19" },
      { name: "Espresso Martini", price: "19" },
      { name: "Aperol Spritz", price: "19" },
      { name: "Long Island", price: "19" },
      { name: "Negroni", price: "19" },
      { name: "Limoncello Spritz", price: "19" },
    ],
  },
  {
    title: "Mocktails",
    items: [
      { name: "Aphrodite's Blush", price: "15", desc: "cranberry juice, lychee juice, lime" },
      {
        name: "Lychee Spritz",
        price: "15",
        desc: "High Hopes non-alcoholic Prosecco, lychee syrup, soda",
      },
      {
        name: "Santorini Sunset",
        price: "15",
        desc: "watermelon, passionfruit, orange juice, pineapple juice, lime",
      },
      {
        name: "Passionfruit Martini",
        price: "15",
        desc: "passionfruit juice, apple juice, vanilla syrup, lime",
      },
    ],
  },
  {
    title: "Bubbles",
    note: "Glass / bottle",
    items: [
      { name: "Stonefish Premium Sparkling Chardonnay Pinot Noir", price: "10 / 48", desc: "SA" },
      { name: "Garfish Prosecco", price: "10 / 48", desc: "McLaren Vale, SA" },
      { name: "G.H. Mumm Champagne", price: "109", desc: "Reims, FR" },
      { name: "Veuve Clicquot Champagne", price: "140", desc: "Reims, FR" },
    ],
  },
  {
    title: "White Wine",
    note: "Glass small / large / bottle",
    items: [
      { name: "Stonefish Sauvignon Blanc", price: "10 / 16 / 48", desc: "Margaret River, WA" },
      { name: "Stonefish Chardonnay", price: "10 / 16 / 48", desc: "Margaret River, WA" },
      { name: "Grant Burge 'Benchmark' Pinot Grigio", price: "10.5 / 17 / 50", desc: "Barossa Valley, SA" },
      { name: "Lost Turtle Sauvignon Blanc", price: "13 / 22.5 / 60", desc: "Marlborough, NZ" },
      { name: "Opawa Pinot Gris", price: "13 / 22.5 / 60", desc: "Marlborough, NZ" },
      { name: "Freycinet Vineyard Riesling", price: "60", desc: "Tasmania" },
      { name: "Vasse Felix Filius Chardonnay", price: "63", desc: "Margaret River, WA" },
      { name: "Brokenwood Semillon", price: "69", desc: "Hunter Valley, NSW" },
      { name: "Saint Clair Wairau Reserve Sauvignon Blanc", price: "79", desc: "Marlborough, NZ" },
    ],
  },
  {
    title: "Greek White",
    note: "Glass small / large / bottle",
    items: [
      {
        name: "Mati Fortuna Moschofilero Chardonnay",
        price: "10 / 16 / 48",
        desc: "Peloponnese, GR. An aromatic dry white wine",
      },
      {
        name: "Semeli Thea Moschofilero",
        price: "65",
        desc: "Peloponnese, GR. A premium single-vineyard dry white wine",
      },
      {
        name: "Diamantakis Diamantopetra Vidiano Assyrtiko",
        price: "65",
        desc: "Crete, GR. A distinctive full-bodied white wine blend",
      },
      {
        name: "Zacharias Omikron Retsina",
        price: "40",
        desc: "Peloponnese, GR. A traditional Greek white known for its distinctive pine resin flavour",
      },
    ],
  },
  {
    title: "Rosé",
    note: "Glass small / large / bottle",
    items: [
      { name: "Fenetre Lavande Rosé", price: "10.5 / 17.5 / 50", desc: "McLaren Vale, SA" },
      { name: "Brise Maritime", price: "10.5 / 17.5 / 50", desc: "Méditerranée, FR" },
      { name: "Mati Fortuna Rosé", price: "11 / 18 / 52", desc: "Peloponnese, GR" },
      { name: "Lumière de Provence", price: "62", desc: "Provence, FR" },
      { name: "Maison Saint AIX Rosé", price: "88", desc: "Provence, FR" },
    ],
  },
  {
    title: "Red Wine",
    note: "Glass small / large / bottle",
    items: [
      { name: "Stonefish Cab Sauv", price: "10 / 16 / 48", desc: "Margaret River, WA" },
      { name: "Stonefish Merlot", price: "10 / 16 / 48", desc: "Margaret River, WA" },
      { name: "Grant Burge 'Benchmark' Shiraz", price: "10.5 / 17 / 49", desc: "Barossa Valley, SA" },
      { name: "Hãhã Pinot Noir", price: "11.5 / 19 / 52", desc: "Marlborough, NZ" },
      { name: "Stonefish Reserve Shiraz", price: "14 / 23 / 65", desc: "Margaret River, WA" },
      { name: "Susana Balbo Crios Malbec", price: "62", desc: "Mendoza, ARG" },
      { name: "Munda Wines Kaurna Country Syrah", price: "62", desc: "McLaren Vale, SA" },
      { name: "Yalumba 'The Cigar' Cab Sauv", price: "62", desc: "Coonawarra, SA" },
      { name: "Grasshopper Rock Pinot Noir", price: "69", desc: "Central Otago, NZ" },
      { name: "John Duval 'Entity' Shiraz", price: "84", desc: "Barossa Valley, SA" },
      { name: "Ata Rangi Crimson Pinot Noir", price: "84", desc: "Martinborough, NZ" },
      { name: "Jim Barry 'The McRae Wood' Shiraz", price: "94", desc: "Clare Valley, SA" },
    ],
  },
  {
    title: "Greek Red",
    note: "Glass small / large / bottle",
    items: [
      {
        name: "Mati Fortuna Agiorgitiko Cab Sauv",
        price: "10 / 16 / 48",
        desc: "Peloponnese, GR. Fruity dry red",
      },
      {
        name: "Semeli Herinos Agiorgitiko Syrah",
        price: "52",
        desc: "Peloponnese, GR. A premium dry red wine",
      },
      {
        name: "Kokkinos Xinomavro",
        price: "72",
        desc: "Naoussa, GR. A medium-bodied red similar to Nebbiolo or Pinot Noir",
      },
    ],
  },
];
