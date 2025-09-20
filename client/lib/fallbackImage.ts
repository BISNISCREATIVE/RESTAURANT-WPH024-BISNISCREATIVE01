const FALLBACKS: { match: RegExp; url: string }[] = [
  // Drinks
  {
    match: /(boba|bubble tea|milk tea|teh susu)/i,
    url: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?q=80&w=1200&auto=format&fit=crop",
  },
  {
    match:
      /(coffee|kopi|espresso|latte|cappuccino|americano|macchiato|mocha|flat white|cold brew)/i,
    url: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1200&auto=format&fit=crop",
  },
  {
    match: /(tea|teh|matcha|oolong|earl grey|chamomile|green tea|black tea)/i,
    url: "https://images.unsplash.com/photo-1509440159598-8c1e1a3fe5bf?q=80&w=1200&auto=format&fit=crop",
  },
  {
    match: /(juice|jus|smoothie)/i,
    url: "https://images.unsplash.com/photo-1542444459-db63c1c87f24?q=80&w=1200&auto=format&fit=crop",
  },
  {
    match: /(soda|soft ?drink|carbonated|cola|sprite|coke|fanta)/i,
    url: "https://images.unsplash.com/photo-1552960562-daf630e9278b?q=80&w=1200&auto=format&fit=crop",
  },
  {
    match: /(milkshake|shake)/i,
    url: "https://images.unsplash.com/photo-1521296797184-b2e3b62a7591?q=80&w=1200&auto=format&fit=crop",
  },
  {
    match: /(chocolate|coklat|cocoa|hot chocolate)/i,
    url: "https://images.unsplash.com/photo-1542996966-2e31c00bae30?q=80&w=1200&auto=format&fit=crop",
  },
  {
    match: /(water|air mineral|mineral water|aqua)/i,
    url: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?q=80&w=1200&auto=format&fit=crop",
  },
  {
    match: /(beer|lager|ale)/i,
    url: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1200&auto=format&fit=crop",
  },
  {
    match: /(wine|merlot|cabernet|chardonnay|sauvignon|pinot)/i,
    url: "https://images.unsplash.com/photo-1514361892635-6b07e31e75bf?q=80&w=1200&auto=format&fit=crop",
  },
  {
    match: /(cocktail|mojito|martini|margarita|negroni|spritz)/i,
    url: "https://images.unsplash.com/photo-1544145945-f90425340c7e?q=80&w=1200&auto=format&fit=crop",
  },
  {
    match: /(mocktail)/i,
    url: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200&auto=format&fit=crop",
  },
  {
    match: /(drink|drinks|minuman|beverage)/i,
    url: "https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=1200&auto=format&fit=crop",
  },

  // Foods
  {
    match: /(burger|beef|king)/i,
    url: "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1200&auto=format&fit=crop",
  },
  {
    match: /(pizza)/i,
    url: "https://images.unsplash.com/photo-1548365328-9f547fb09536?q=80&w=1200&auto=format&fit=crop",
  },
  {
    match: /(sushi|japan|japanese)/i,
    url: "https://images.unsplash.com/photo-1542736667-069246bdbc74?q=80&w=1200&auto=format&fit=crop",
  },
  {
    match: /(ramen|noodle|mie|udon|pho|laksa)/i,
    url: "https://images.unsplash.com/photo-1543352634-8730e6a9b6b5?q=80&w=1200&auto=format&fit=crop",
  },
  {
    match: /(steak|grill|bbq)/i,
    url: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=1200&auto=format&fit=crop",
  },
  {
    match: /(fried chicken|ayam|chicken|wings)/i,
    url: "https://images.unsplash.com/photo-1604908176997-4316513b0d4a?q=80&w=1200&auto=format&fit=crop",
  },
  {
    match: /(seafood|fish|shrimp|prawn|crab)/i,
    url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop",
  },
  {
    match: /(salad|vegan|healthy|vegetable)/i,
    url: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1200&auto=format&fit=crop",
  },
  {
    match: /(dessert|cake|sweet|ice cream)/i,
    url: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?q=80&w=1200&auto=format&fit=crop",
  },
  {
    match: /(rice|nasi|bento|padang|biryani)/i,
    url: "https://images.unsplash.com/photo-1604908554049-16c9f0a51b69?q=80&w=1200&auto=format&fit=crop",
  },
];

export function getFallbackImage(
  name?: string,
  category?: string,
  context?: string,
) {
  const hay = [name, category, context].filter(Boolean).join(" ");
  for (const f of FALLBACKS) if (f.match.test(hay)) return f.url;
  // Neutral generic restaurant/food & drinks fallback
  return "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop";
}

export default getFallbackImage;
