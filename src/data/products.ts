// Product data for the Tokyo Supermarket Price Comparison App
export const products = [
  {
    id: 1,
    name: "King Salmon Fillet",
    size: "500g",
    price: 2800,
    originalPrice: 3200,
    discount: 13,
    store: "Maruetsu",
    image: "https://images.pexels.com/photos/1516415/pexels-photo-1516415.jpeg?auto=compress&cs=tinysrgb&w=400",
    ratingAverage: 4.2,
    ratingCount: 18,
    ratingBreakdown: { "5": 8, "4": 6, "3": 3, "2": 1, "1": 0 },
    reviews: [
      { stars: 5, text: "Fresh and high quality salmon, perfect for sashimi" },
      { stars: 4, text: "Good value for the price, nice texture" },
      { stars: 5, text: "Very fresh, great flavor and color" },
      { stars: 3, text: "Decent quality but a bit pricey" },
      { stars: 4, text: "Fresh fish, good packaging" }
    ]
  },
  {
    id: 2,
    name: "Premium Wagyu Beef",
    size: "300g",
    price: 4500,
    originalPrice: 5200,
    discount: 13,
    store: "Ito-Yokado",
    image: "https://images.pexels.com/photos/361184/asparagus-steak-veal-steak-veal-361184.jpeg?auto=compress&cs=tinysrgb&w=400",
    ratingAverage: 4.8,
    ratingCount: 25,
    ratingBreakdown: { "5": 20, "4": 4, "3": 1, "2": 0, "1": 0 },
    reviews: [
      { stars: 5, text: "Incredible marbling and flavor, melts in your mouth" },
      { stars: 5, text: "Best wagyu I've had, worth every yen" },
      { stars: 4, text: "Excellent quality but very expensive" },
      { stars: 5, text: "Perfect for special occasions, amazing taste" },
      { stars: 5, text: "Top quality beef, great texture and flavor" }
    ]
  },
  {
    id: 3,
    name: "Organic Koshihikari Rice",
    size: "5kg",
    price: 1800,
    originalPrice: 2100,
    discount: 14,
    store: "Life",
    image: "https://images.pexels.com/photos/33239/rice-grain-seed-food.jpg?auto=compress&cs=tinysrgb&w=400",
    ratingAverage: 4.5,
    ratingCount: 42,
    ratingBreakdown: { "5": 25, "4": 12, "3": 4, "2": 1, "1": 0 },
    reviews: [
      { stars: 5, text: "Perfect texture and flavor, great for daily meals" },
      { stars: 4, text: "Good quality rice, cooks well" },
      { stars: 5, text: "Organic and tasty, worth the price" },
      { stars: 4, text: "Nice grain quality, consistent results" },
      { stars: 5, text: "Best rice for sushi and onigiri" }
    ]
  },
  {
    id: 4,
    name: "Fresh Tuna Sashimi",
    size: "200g",
    price: 1200,
    originalPrice: 1400,
    discount: 14,
    store: "Seiyu",
    image: "https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg?auto=compress&cs=tinysrgb&w=400",
    ratingAverage: 4.1,
    ratingCount: 15,
    ratingBreakdown: { "5": 6, "4": 7, "3": 2, "2": 0, "1": 0 },
    reviews: [
      { stars: 4, text: "Fresh and clean taste, good for sashimi" },
      { stars: 5, text: "Excellent quality tuna, very fresh" },
      { stars: 4, text: "Good value, nice color and texture" },
      { stars: 3, text: "Decent but not the best I've had" },
      { stars: 5, text: "Perfect for home sushi making" }
    ]
  },
  {
    id: 5,
    name: "Japanese Mayonnaise",
    size: "500ml",
    price: 320,
    originalPrice: 380,
    discount: 16,
    store: "Don Quijote",
    image: "/Japanese Mayonnaise.jpg",
    ratingAverage: 4.3,
    ratingCount: 28,
    ratingBreakdown: { "5": 15, "4": 9, "3": 3, "2": 1, "1": 0 },
    reviews: [
      { stars: 5, text: "Creamy texture, perfect for Japanese dishes" },
      { stars: 4, text: "Good quality mayo, nice flavor" },
      { stars: 5, text: "Best mayonnaise for okonomiyaki and takoyaki" },
      { stars: 4, text: "Rich and creamy, good value" },
      { stars: 3, text: "Decent but a bit too sweet for my taste" }
    ]
  },
  {
    id: 6,
    name: "Miso Paste (White)",
    size: "1kg",
    price: 680,
    originalPrice: 750,
    discount: 9,
    store: "Aeon",
    image: "/Miso Paste (White).jpg",
    ratingAverage: 4.4,
    ratingCount: 35,
    ratingBreakdown: { "5": 20, "4": 11, "3": 3, "2": 1, "1": 0 },
    reviews: [
      { stars: 5, text: "Perfect for miso soup, mild and flavorful" },
      { stars: 4, text: "Good quality white miso, versatile" },
      { stars: 5, text: "Great for marinades and soup base" },
      { stars: 4, text: "Smooth texture, authentic taste" },
      { stars: 5, text: "Essential for Japanese cooking, excellent quality" }
    ]
  },
  {
    id: 7,
    name: "Japanese Pickles Mix",
    size: "300g",
    price: 450,
    originalPrice: 520,
    discount: 13,
    store: "Maruetsu",
    image: "/Japanese Pickles Mix.jpg",
    ratingAverage: 3.9,
    ratingCount: 22,
    ratingBreakdown: { "5": 8, "4": 6, "3": 6, "2": 2, "1": 0 },
    reviews: [
      { stars: 4, text: "Good variety of pickles, nice crunch" },
      { stars: 5, text: "Perfect side dish, great flavor balance" },
      { stars: 3, text: "Decent but a bit too salty" },
      { stars: 4, text: "Good quality vegetables, fresh taste" },
      { stars: 3, text: "Okay but not exceptional" }
    ]
  },
  {
    id: 8,
    name: "Nori Seaweed Sheets",
    size: "10 sheets",
    price: 280,
    originalPrice: 320,
    discount: 13,
    store: "Life",
    image: "/Nori Seaweed Sheets.jpg",
    ratingAverage: 4.6,
    ratingCount: 31,
    ratingBreakdown: { "5": 22, "4": 7, "3": 2, "2": 0, "1": 0 },
    reviews: [
      { stars: 5, text: "Crisp and flavorful, perfect for sushi rolls" },
      { stars: 4, text: "Good quality nori, stays crisp" },
      { stars: 5, text: "Excellent for onigiri and hand rolls" },
      { stars: 5, text: "Fresh seaweed taste, great texture" },
      { stars: 4, text: "Good value for money, reliable quality" }
    ]
  }
];