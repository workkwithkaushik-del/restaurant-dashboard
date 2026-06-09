// The Aroma Labs — Full Luxury Café Menu with Analytics & SOPs
export const menuCategories = ["Signature Coffee", "Classic Coffee", "Non-Coffee", "Breakfast", "Mains", "Small Plates", "Desserts"];

export const menuItems = [
  // ── Signature Coffee ──
  {
    id: "m01", name: "Mysore Filter Kaapi", category: "Signature Coffee", price: 280, badge: "Bestseller",
    description: "Slow-dripped South Indian coffee with chicory, served in a brass davara-tumbler set.",
    ingredients: ["Arabica beans", "Chicory blend", "Whole milk", "Demerara sugar"],
    allergens: ["Dairy"],
    dailyOrders: 142, weeklyRevenue: 278320, margin: 72, rating: 4.9, trend: +8.2,
    peakHour: "8 AM", topOutlet: "Central Square",
    sop: [
      "Measure 18g of house Arabica-chicory blend (70:30 ratio).",
      "Pack tightly into the brass filter; pour 90°C water in two stages (bloom 30s, then full pour).",
      "Allow 12–15 min drip extraction into the lower tumbler.",
      "Heat 120ml whole milk to 78°C (do not boil).",
      "Pour decoction into heated davara, add milk & sugar to order.",
      "Aerate by pouring between davara and tumbler 4 times for signature froth.",
      "Serve immediately on a brass tray with a cube of palm jaggery."
    ]
  },
  {
    id: "m02", name: "Coorg Estate Pour-Over", category: "Signature Coffee", price: 360, badge: "Premium",
    description: "Single-origin Coorg Arabica, hand-poured using a Hario V60 for a clean, floral cup.",
    ingredients: ["Single-origin Coorg Arabica", "Filtered water"],
    allergens: [],
    dailyOrders: 64, weeklyRevenue: 161280, margin: 78, rating: 4.8, trend: +12.5,
    peakHour: "10 AM", topOutlet: "Lake Road",
    sop: [
      "Grind 20g Coorg beans to medium-fine (setting 18 on EK43).",
      "Rinse Hario V60 filter with 93°C water; discard rinse.",
      "Add grounds, create a well in the centre.",
      "Bloom with 40ml water for 45 seconds.",
      "Pour in slow concentric circles: 100ml at 0:45, 80ml at 1:15, 60ml at 1:45.",
      "Total brew time target: 2:45–3:15.",
      "Serve in a warm ceramic cup with a tasting notes card."
    ]
  },
  {
    id: "m03", name: "Cardamom Rose Latte", category: "Signature Coffee", price: 320, badge: "Chef's Pick",
    description: "Espresso layered with cardamom-infused milk and a whisper of rosewater, topped with crushed pistachios.",
    ingredients: ["Espresso", "Whole milk", "Green cardamom", "Rosewater", "Pistachios"],
    allergens: ["Dairy", "Tree nuts"],
    dailyOrders: 98, weeklyRevenue: 219520, margin: 68, rating: 4.7, trend: +5.1,
    peakHour: "3 PM", topOutlet: "Campus Gate",
    sop: [
      "Pull a double espresso (18g in, 36g out, 28 seconds).",
      "Steam 200ml whole milk with 2 crushed green cardamom pods to 65°C.",
      "Strain cardamom from milk through fine mesh.",
      "Add 3 drops of culinary rosewater to the steamed milk.",
      "Pour latte art into a 240ml ceramic cup over the espresso.",
      "Garnish with finely crushed pistachios and one dried rose petal.",
      "Serve on a marble coaster with a cardamom biscotti."
    ]
  },
  {
    id: "m04", name: "Jaggery Cold Brew", category: "Signature Coffee", price: 300, badge: "Seasonal",
    description: "18-hour cold-steeped Arabica sweetened with Kolhapur palm jaggery, served over artisan ice.",
    ingredients: ["Cold brew concentrate", "Palm jaggery syrup", "Filtered water", "Artisan ice"],
    allergens: [],
    dailyOrders: 118, weeklyRevenue: 247800, margin: 74, rating: 4.8, trend: +15.3,
    peakHour: "2 PM", topOutlet: "Campus Gate",
    sop: [
      "Coarsely grind 200g Arabica beans for cold brew batch.",
      "Steep in 1.2L filtered water at 4°C for 18 hours.",
      "Strain through double muslin cloth, then paper filter.",
      "Prepare jaggery syrup: dissolve 100g palm jaggery in 100ml warm water, cool.",
      "In a 350ml glass, add 3 large artisan ice cubes.",
      "Pour 180ml cold brew concentrate, add 30ml jaggery syrup.",
      "Stir gently, garnish with a thin jaggery shard on the rim."
    ]
  },
  // ── Classic Coffee ──
  {
    id: "m05", name: "Classic Espresso", category: "Classic Coffee", price: 180, badge: "",
    description: "A bold double shot pulled from our house blend—crema-rich and intensely aromatic.",
    ingredients: ["House blend espresso"],
    allergens: [],
    dailyOrders: 86, weeklyRevenue: 108360, margin: 82, rating: 4.6, trend: +2.1,
    peakHour: "9 AM", topOutlet: "Central Square",
    sop: [
      "Dose 18g of house blend into portafilter.",
      "Distribute and tamp at 15kg pressure.",
      "Pull shot: 36g output in 26–30 seconds.",
      "Serve immediately in a pre-heated 60ml demitasse.",
      "Accompany with a sparkling water shot and a dark chocolate coin."
    ]
  },
  {
    id: "m06", name: "Flat White", category: "Classic Coffee", price: 240, badge: "",
    description: "Velvety microfoam over a double ristretto—silky, strong, and perfectly balanced.",
    ingredients: ["Ristretto espresso", "Whole milk"],
    allergens: ["Dairy"],
    dailyOrders: 74, weeklyRevenue: 124320, margin: 70, rating: 4.5, trend: +3.8,
    peakHour: "11 AM", topOutlet: "Lake Road",
    sop: [
      "Pull double ristretto (18g in, 28g out, 22–25 seconds).",
      "Steam 160ml whole milk to 62°C with microfoam texture (1–2mm bubbles).",
      "Pour into 180ml tulip cup with latte art.",
      "Serve on a wooden saucer with a biscoff."
    ]
  },
  {
    id: "m07", name: "Iced Americano", category: "Classic Coffee", price: 220, badge: "",
    description: "Double espresso over ice, lengthened with chilled filtered water—crisp and clean.",
    ingredients: ["Espresso", "Filtered water", "Ice"],
    allergens: [],
    dailyOrders: 92, weeklyRevenue: 141680, margin: 76, rating: 4.4, trend: +6.9,
    peakHour: "1 PM", topOutlet: "Campus Gate",
    sop: [
      "Fill a 360ml glass with ice to the brim.",
      "Add 200ml chilled filtered water.",
      "Pull a double espresso directly over the ice.",
      "Stir once gently. Serve with a bamboo straw."
    ]
  },
  // ── Non-Coffee ──
  {
    id: "m08", name: "Kashmiri Kahwa", category: "Non-Coffee", price: 260, badge: "Heritage",
    description: "Traditional Kashmiri green tea with saffron, cinnamon, cardamom, and crushed almonds.",
    ingredients: ["Green tea", "Saffron threads", "Cinnamon stick", "Cardamom", "Almonds"],
    allergens: ["Tree nuts"],
    dailyOrders: 56, weeklyRevenue: 101920, margin: 65, rating: 4.7, trend: +4.2,
    peakHour: "4 PM", topOutlet: "Central Square",
    sop: [
      "Boil 250ml water with 1 cinnamon stick and 2 cracked cardamom pods for 3 min.",
      "Add 5 saffron threads and 1 tsp green tea leaves. Steep 2 min off heat.",
      "Strain into a handcrafted copper cup.",
      "Garnish with slivered almonds and an extra saffron thread.",
      "Serve with a small bowl of honey on the side."
    ]
  },
  {
    id: "m09", name: "Mango Lassi Frappé", category: "Non-Coffee", price: 290, badge: "Seasonal",
    description: "Thick Alphonso mango lassi blended with ice, topped with a cardamom cream cloud.",
    ingredients: ["Alphonso mango pulp", "Greek yoghurt", "Cardamom cream", "Ice", "Pistachios"],
    allergens: ["Dairy", "Tree nuts"],
    dailyOrders: 84, weeklyRevenue: 170520, margin: 62, rating: 4.8, trend: +18.4,
    peakHour: "3 PM", topOutlet: "Campus Gate",
    sop: [
      "Blend 120g Alphonso pulp, 80g Greek yoghurt, 30ml honey, and 6 ice cubes until smooth.",
      "Pour into a 400ml glass.",
      "Whip 50ml cream with a pinch of cardamom powder to soft peaks.",
      "Spoon cream on top. Dust with cardamom and crushed pistachios.",
      "Serve with a wide metal straw."
    ]
  },
  {
    id: "m10", name: "Matcha Coconut Cooler", category: "Non-Coffee", price: 310, badge: "",
    description: "Ceremonial-grade Uji matcha whisked with chilled coconut milk over ice.",
    ingredients: ["Uji matcha powder", "Coconut milk", "Agave syrup", "Ice"],
    allergens: [],
    dailyOrders: 48, weeklyRevenue: 104160, margin: 66, rating: 4.5, trend: +9.7,
    peakHour: "2 PM", topOutlet: "Lake Road",
    sop: [
      "Sift 3g ceremonial matcha into a chawan bowl.",
      "Add 30ml hot water (75°C) and whisk with chasen until frothy.",
      "Fill a 360ml glass with ice, add 200ml chilled coconut milk.",
      "Pour matcha over the milk. Drizzle 10ml agave syrup.",
      "Serve with a bamboo straw and a matcha shortbread."
    ]
  },
  // ── Breakfast ──
  {
    id: "m11", name: "Truffle Masala Omelette", category: "Breakfast", price: 420, badge: "Bestseller",
    description: "Fluffy three-egg omelette with black truffle, green chillies, and aged cheddar on sourdough.",
    ingredients: ["Free-range eggs", "Black truffle oil", "Green chillies", "Aged cheddar", "Sourdough"],
    allergens: ["Eggs", "Dairy", "Gluten"],
    dailyOrders: 68, weeklyRevenue: 199920, margin: 58, rating: 4.8, trend: +7.6,
    peakHour: "9 AM", topOutlet: "Central Square",
    sop: [
      "Crack 3 free-range eggs into a bowl, season with salt and white pepper.",
      "Whisk vigorously for 30 seconds (do not add milk).",
      "Heat non-stick pan to medium, add 15g butter until foaming.",
      "Pour eggs, let set for 20 seconds, then gently push edges to centre.",
      "When 80% set, add diced green chillies, grated cheddar, and truffle oil.",
      "Fold omelette, slide onto toasted sourdough slice.",
      "Finish with microgreens and a drizzle of truffle oil. Plate within 45 seconds."
    ]
  },
  {
    id: "m12", name: "Avocado Chaat Toast", category: "Breakfast", price: 380, badge: "Vegan",
    description: "Smashed avocado on multigrain toast with pomegranate, chaat masala, and crispy sev.",
    ingredients: ["Avocado", "Multigrain bread", "Pomegranate", "Chaat masala", "Sev", "Lime"],
    allergens: ["Gluten"],
    dailyOrders: 92, weeklyRevenue: 244720, margin: 64, rating: 4.7, trend: +22.1,
    peakHour: "10 AM", topOutlet: "Campus Gate",
    sop: [
      "Toast multigrain bread to golden crisp on both sides.",
      "Halve and pit one ripe avocado. Smash with fork (keep chunky).",
      "Season with salt, chaat masala, and a squeeze of lime.",
      "Spread generously on toast.",
      "Top with pomegranate arils, thin red onion rings, and a handful of sev.",
      "Drizzle with green chutney and serve immediately."
    ]
  },
  {
    id: "m13", name: "Eggs Kejriwal", category: "Breakfast", price: 440, badge: "Heritage",
    description: "A Bombay club classic — fried eggs on cheesy chilli toast, a legendary brunch staple.",
    ingredients: ["Free-range eggs", "Cheddar", "Green chillies", "White bread", "Butter"],
    allergens: ["Eggs", "Dairy", "Gluten"],
    dailyOrders: 54, weeklyRevenue: 166320, margin: 60, rating: 4.9, trend: +5.8,
    peakHour: "11 AM", topOutlet: "Lake Road",
    sop: [
      "Butter and toast two slices of thick-cut white bread.",
      "Layer generous cheddar on each toast, grill until melting and bubbly.",
      "Fry 2 eggs sunny-side up in butter (runny yolk mandatory).",
      "Finely chop green chillies and scatter over the cheese toast.",
      "Place fried eggs on top. Season with salt and cracked pepper.",
      "Serve on a heated plate with tomato ketchup on the side."
    ]
  },
  // ── Mains ──
  {
    id: "m14", name: "Butter Chicken Brioche Burger", category: "Mains", price: 520, badge: "Bestseller",
    description: "Tandoori-spiced chicken patty in makhani sauce, pickled onions, on a toasted brioche bun.",
    ingredients: ["Chicken thigh", "Makhani sauce", "Brioche bun", "Pickled onions", "Lettuce", "Cheese"],
    allergens: ["Gluten", "Dairy"],
    dailyOrders: 104, weeklyRevenue: 378560, margin: 52, rating: 4.9, trend: +14.2,
    peakHour: "1 PM", topOutlet: "Campus Gate",
    sop: [
      "Form 180g tandoori-marinated chicken thigh mince into a patty.",
      "Grill on flat-top at 200°C for 4 min each side (internal temp 74°C).",
      "Toast brioche bun on grill, butter-side down, for 90 seconds.",
      "Spread 30ml warm makhani sauce on bottom bun.",
      "Layer: lettuce, patty, cheddar slice (melt with dome), pickled onions.",
      "Close bun, secure with bamboo pick. Serve with masala fries."
    ]
  },
  {
    id: "m15", name: "Paneer Tikka Wrap", category: "Mains", price: 420, badge: "Vegetarian",
    description: "Chargrilled paneer tikka in a whole-wheat wrap with mint chutney and crunchy slaw.",
    ingredients: ["Paneer", "Tikka marinade", "Whole-wheat roti", "Mint chutney", "Cabbage slaw"],
    allergens: ["Dairy", "Gluten"],
    dailyOrders: 76, weeklyRevenue: 223440, margin: 58, rating: 4.6, trend: +8.9,
    peakHour: "12 PM", topOutlet: "Central Square",
    sop: [
      "Cut 200g paneer into 1-inch cubes, toss in tikka marinade for minimum 2 hours.",
      "Thread onto skewers, chargrill at high heat for 3 min per side.",
      "Warm whole-wheat roti on tawa for 30 seconds each side.",
      "Spread mint-yoghurt chutney on roti.",
      "Layer chargrilled paneer, crunchy cabbage-carrot slaw, and pickled onions.",
      "Roll tightly, cut diagonally. Serve with tamarind dip."
    ]
  },
  {
    id: "m16", name: "Keema Pav Sliders", category: "Mains", price: 480, badge: "Chef's Pick",
    description: "Spiced lamb keema on buttered mini pavs — a luxury twist on Mumbai's iconic street food.",
    ingredients: ["Lamb mince", "Pav buns", "Onion", "Tomato", "Ginger-garlic", "Pav bhaji masala"],
    allergens: ["Gluten"],
    dailyOrders: 62, weeklyRevenue: 208320, margin: 54, rating: 4.8, trend: +11.3,
    peakHour: "7 PM", topOutlet: "Lake Road",
    sop: [
      "Heat oil, sauté finely diced onions until deep golden (10 min).",
      "Add ginger-garlic paste, cook 2 min. Add 300g lamb mince, break up well.",
      "Cook mince until browned, add diced tomatoes and pav bhaji masala.",
      "Simmer until dry and intensely flavoured (15 min). Finish with lime juice and coriander.",
      "Butter-toast 4 mini pavs on flat-top until golden.",
      "Spoon keema generously into each pav. Top with raw onion rings and green chilli.",
      "Serve on a wooden board with a wedge of lime."
    ]
  },
  // ── Small Plates ──
  {
    id: "m17", name: "Truffle Podi Fries", category: "Small Plates", price: 340, badge: "Bestseller",
    description: "Crispy hand-cut fries tossed in gunpowder podi and truffle oil, with curry leaf aioli.",
    ingredients: ["Potatoes", "Gunpowder podi", "Truffle oil", "Curry leaves", "Aioli"],
    allergens: ["Eggs"],
    dailyOrders: 136, weeklyRevenue: 323680, margin: 68, rating: 4.8, trend: +19.6,
    peakHour: "5 PM", topOutlet: "Campus Gate",
    sop: [
      "Blanch hand-cut fries at 140°C for 6 min. Drain and rest 30 min.",
      "Fry at 190°C until golden and crispy (3–4 min).",
      "Toss immediately in a bowl with 1 tbsp gunpowder podi and truffle oil.",
      "Prepare curry leaf aioli: blend fried curry leaves into house mayo.",
      "Serve in a paper-lined copper bowl with aioli on the side."
    ]
  },
  {
    id: "m18", name: "Tandoori Broccoli Steaks", category: "Small Plates", price: 360, badge: "Vegan",
    description: "Thick-cut broccoli steaks charred in tandoori marinade, served with peanut raita.",
    ingredients: ["Broccoli", "Tandoori marinade", "Peanuts", "Yoghurt", "Mint"],
    allergens: ["Dairy", "Peanuts"],
    dailyOrders: 44, weeklyRevenue: 110880, margin: 66, rating: 4.5, trend: +7.4,
    peakHour: "7 PM", topOutlet: "Central Square",
    sop: [
      "Cut broccoli into 2cm thick steaks through the crown.",
      "Marinate in tandoori spice paste for 1 hour minimum.",
      "Chargrill on high heat for 4 min per side until charred and tender.",
      "Prepare peanut raita: crush roasted peanuts into thick yoghurt with mint.",
      "Plate broccoli on a warm stone plate, drizzle raita alongside.",
      "Finish with a squeeze of lemon and chaat masala dusting."
    ]
  },
  {
    id: "m19", name: "Ghee Roast Mushrooms", category: "Small Plates", price: 380, badge: "",
    description: "Mangalorean ghee-roasted oyster mushrooms with coastal spices and appam crisps.",
    ingredients: ["Oyster mushrooms", "Ghee", "Byadgi chillies", "Tamarind", "Appam"],
    allergens: ["Dairy", "Gluten"],
    dailyOrders: 52, weeklyRevenue: 138320, margin: 62, rating: 4.7, trend: +6.8,
    peakHour: "6 PM", topOutlet: "Lake Road",
    sop: [
      "Clean and tear oyster mushrooms into large pieces.",
      "Prepare ghee roast masala: toast Byadgi chillies, coriander, cumin, fenugreek; grind with tamarind.",
      "Heat ghee in a heavy pan, add masala paste, cook until oil separates.",
      "Add mushrooms, toss on high heat for 4 min until caramelised.",
      "Make appam crisps: pour thin appam batter on tawa, cook until lacy and crisp.",
      "Serve mushrooms on a banana leaf with appam crisps on the side."
    ]
  },
  // ── Desserts ──
  {
    id: "m20", name: "Gulab Jamun Cheesecake", category: "Desserts", price: 420, badge: "Bestseller",
    description: "New York cheesecake infused with saffron, topped with mini gulab jamuns and rose syrup.",
    ingredients: ["Cream cheese", "Saffron", "Mini gulab jamuns", "Rose syrup", "Digestive biscuits"],
    allergens: ["Dairy", "Gluten", "Eggs"],
    dailyOrders: 88, weeklyRevenue: 258720, margin: 56, rating: 4.9, trend: +24.8,
    peakHour: "8 PM", topOutlet: "Lake Road",
    sop: [
      "Prepare biscuit base: crush digestives, mix with melted butter, press into ring mould.",
      "Beat 400g cream cheese with sugar, add 3 eggs one at a time.",
      "Infuse with saffron-milk (10 threads steeped in 30ml warm milk).",
      "Bake at 160°C for 45 min in a water bath. Cool in oven with door ajar.",
      "Chill overnight. Unmould and top with halved mini gulab jamuns.",
      "Drizzle with rose syrup and garnish with crushed pistachios.",
      "Slice with a hot knife. Plate with a saffron tuile."
    ]
  },
  {
    id: "m21", name: "Chai Crème Brûlée", category: "Desserts", price: 360, badge: "Chef's Pick",
    description: "Silky vanilla custard steeped with masala chai spices, crackled with caramelised sugar.",
    ingredients: ["Heavy cream", "Masala chai spices", "Egg yolks", "Vanilla bean", "Sugar"],
    allergens: ["Dairy", "Eggs"],
    dailyOrders: 66, weeklyRevenue: 166320, margin: 64, rating: 4.8, trend: +10.2,
    peakHour: "9 PM", topOutlet: "Central Square",
    sop: [
      "Heat 400ml heavy cream with crushed masala chai spices (cinnamon, cardamom, clove, ginger) to 80°C.",
      "Steep for 20 min off heat. Strain through fine mesh.",
      "Whisk 6 egg yolks with 80g sugar. Temper with warm cream.",
      "Pour into ramekins. Bake at 150°C in a water bath for 35 min.",
      "Chill for minimum 4 hours.",
      "Before service, sprinkle even layer of demerara sugar.",
      "Torch until deeply caramelised. Let cool 60 seconds before serving."
    ]
  },
  {
    id: "m22", name: "Rasmalai Tiramisu", category: "Desserts", price: 440, badge: "Premium",
    description: "Italian tiramisu reimagined with rasmalai-soaked sponge, saffron mascarpone, and cardamom dust.",
    ingredients: ["Rasmalai", "Mascarpone", "Saffron", "Espresso", "Ladyfinger biscuits", "Cardamom"],
    allergens: ["Dairy", "Gluten", "Eggs"],
    dailyOrders: 58, weeklyRevenue: 178640, margin: 58, rating: 4.9, trend: +16.5,
    peakHour: "9 PM", topOutlet: "Lake Road",
    sop: [
      "Prepare rasmalai syrup: simmer milk with saffron and cardamom until reduced by half.",
      "Dip ladyfinger biscuits briefly in light espresso (2 seconds each side).",
      "Beat mascarpone with sugar and fold in crumbled rasmalai pieces.",
      "Layer: espresso-dipped ladyfingers → saffron mascarpone → repeat.",
      "Chill for minimum 6 hours (overnight preferred).",
      "Dust with cardamom powder and cocoa before service.",
      "Garnish with a whole rasmalai and edible gold leaf."
    ]
  },
  {
    id: "m23", name: "Sitaphal Kulfi Sundae", category: "Desserts", price: 380, badge: "Seasonal",
    description: "Custard apple kulfi scoops with falooda vermicelli, rose basil seeds, and praline crumble.",
    ingredients: ["Custard apple pulp", "Condensed milk", "Falooda sev", "Basil seeds", "Rose syrup", "Praline"],
    allergens: ["Dairy", "Tree nuts"],
    dailyOrders: 46, weeklyRevenue: 122360, margin: 60, rating: 4.7, trend: +13.1,
    peakHour: "8 PM", topOutlet: "Campus Gate",
    sop: [
      "Prepare kulfi base: mix custard apple pulp with condensed milk and cream. Freeze in moulds for 8 hours.",
      "Soak basil seeds in rose syrup water for 30 min.",
      "Cook falooda vermicelli until translucent, chill.",
      "Make praline: caramelise sugar with crushed cashews and almonds, cool and crush.",
      "Unmould 2 kulfi scoops into a chilled sundae glass.",
      "Layer with falooda, rose basil seeds, and praline crumble.",
      "Drizzle with rose syrup. Serve immediately with a wafer."
    ]
  },
];
