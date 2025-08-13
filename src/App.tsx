import React, { useState } from 'react';
import { Search, ShoppingCart, Star, TrendingUp, Brain, ArrowLeft, MessageSquare } from 'lucide-react';
import RatingRow from './components/RatingRow';

// Mock data for products
const mockProducts = [
  {
    id: 1,
    name: 'Japanese Mayonnaise',
    image: '/Japanese Mayonnaise.jpg',
    stores: [
      { name: 'Don Quijote', price: 298, distance: '0.5km' },
      { name: 'Life Supermarket', price: 320, distance: '0.8km' },
      { name: 'Maruetsu', price: 315, distance: '1.2km' }
    ],
    rating: 4.5,
    reviewCount: 127
  },
  {
    id: 2,
    name: 'Miso Paste (White)',
    image: '/Miso Paste (White).jpg',
    stores: [
      { name: 'Seiyu', price: 180, distance: '0.3km' },
      { name: 'Aeon', price: 195, distance: '0.7km' },
      { name: 'Summit', price: 210, distance: '1.0km' }
    ],
    rating: 4.2,
    reviewCount: 89
  },
  {
    id: 3,
    name: 'Japanese Pickles Mix',
    image: '/Japanese Pickles Mix.jpg',
    stores: [
      { name: 'Tokyu Store', price: 450, distance: '0.4km' },
      { name: 'Peacock', price: 480, distance: '0.9km' },
      { name: 'Ozeki', price: 465, distance: '1.1km' }
    ],
    rating: 3.8,
    reviewCount: 56
  }
];

// Mock review data
const mockReviews = {
  1: {
    summary: {
      pros: [
        "Creamy texture that's perfect for sandwiches and salads",
        "Authentic Japanese flavor with a hint of sweetness",
        "Great value for money compared to imported brands",
        "Versatile ingredient for both Japanese and Western dishes"
      ],
      cons: [
        "Some find it too sweet compared to regular mayonnaise",
        "Packaging could be more convenient for storage",
        "Limited availability in some areas"
      ],
      verdict: "Highly recommended for those who enjoy Japanese cuisine. The unique flavor profile makes it worth trying, though it may not suit everyone's taste preferences."
    },
    reviews: [
      {
        id: 1,
        author: "Yuki T.",
        rating: 5,
        date: "2024-01-15",
        comment: "This is the best mayonnaise I've ever tried! The creamy texture and slightly sweet taste make it perfect for okonomiyaki and takoyaki."
      },
      {
        id: 2,
        author: "Mike S.",
        rating: 4,
        date: "2024-01-10",
        comment: "Good quality mayo, though it's a bit sweeter than what I'm used to. Great for Japanese dishes."
      },
      {
        id: 3,
        author: "Sakura M.",
        rating: 5,
        date: "2024-01-08",
        comment: "Perfect for making Japanese-style potato salad. The flavor is authentic and the price is reasonable."
      }
    ]
  },
  2: {
    summary: {
      pros: [
        "Authentic white miso flavor with perfect saltiness",
        "Great for making miso soup and marinades",
        "Good packaging that keeps the paste fresh",
        "Reasonable price for the quality"
      ],
      cons: [
        "Can be too salty for some dishes",
        "Package size might be too large for occasional users",
        "Needs refrigeration after opening"
      ],
      verdict: "Essential ingredient for Japanese cooking. High quality and authentic taste make it a great choice for both beginners and experienced cooks."
    },
    reviews: [
      {
        id: 1,
        author: "Hiroshi K.",
        rating: 4,
        date: "2024-01-12",
        comment: "Good quality white miso. Perfect for my daily miso soup. The taste is authentic and not too salty."
      },
      {
        id: 2,
        author: "Emma L.",
        rating: 5,
        date: "2024-01-09",
        comment: "Excellent miso paste! I use it for marinades and soups. The flavor is rich and authentic."
      }
    ]
  },
  3: {
    summary: {
      pros: [
        "Good variety of pickles in one package",
        "Authentic Japanese taste and texture",
        "Convenient for quick meals and bento boxes",
        "Fresh and crunchy vegetables"
      ],
      cons: [
        "Some pieces can be too salty",
        "Mixed quality - some vegetables better than others",
        "Price is a bit high for the quantity"
      ],
      verdict: "Decent option for those wanting variety in their pickles. While not exceptional, it offers good convenience and authentic flavors."
    },
    reviews: [
      {
        id: 1,
        author: "Kenji N.",
        rating: 4,
        date: "2024-01-14",
        comment: "Nice variety of pickles. Great for adding to rice bowls and bento. Some pieces are saltier than others."
      },
      {
        id: 2,
        author: "Lisa W.",
        rating: 3,
        date: "2024-01-11",
        comment: "Okay pickles, but nothing special. The variety is nice but I've had better quality elsewhere."
      }
    ]
  }
};

function App() {
  const [showAICompare, setShowAICompare] = useState(false);
  const [showReviewSummary, setShowReviewSummary] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<typeof mockProducts[0] | null>(null);
  const [selectedReviewProduct, setSelectedReviewProduct] = useState<typeof mockProducts[0] | null>(null);

  const filteredProducts = mockProducts.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleProductSelect = (product: typeof mockProducts[0]) => {
    setSelectedProduct(product);
    setSearchQuery('');
  };

  const handleReviewProductSelect = (product: typeof mockProducts[0]) => {
    setSelectedReviewProduct(product);
    setSearchQuery('');
  };

  const resetAICompare = () => {
    setShowAICompare(false);
    setSelectedProduct(null);
    setSearchQuery('');
  };

  const resetReviewSummary = () => {
    setShowReviewSummary(false);
    setSelectedReviewProduct(null);
    setSearchQuery('');
  };

  // AI Compare View
  if (showAICompare) {
    if (selectedProduct) {
      const cheapestStore = selectedProduct.stores.reduce((prev, current) => 
        prev.price < current.price ? prev : current
      );

      return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
          <div className="max-w-4xl mx-auto">
            <button
              onClick={resetAICompare}
              className="mb-6 flex items-center gap-2 text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to search
            </button>

            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center gap-4 mb-8">
                <Brain className="w-8 h-8 text-indigo-600" />
                <h1 className="text-3xl font-bold text-gray-800">AI Product Analysis</h1>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-full h-64 object-cover rounded-xl mb-4"
                  />
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedProduct.name}</h2>
                  <RatingRow average={selectedProduct.rating} count={selectedProduct.reviewCount} />
                </div>

                <div className="space-y-6">
                  <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-green-800 mb-3">💡 AI Recommendation</h3>
                    <p className="text-green-700 mb-4">
                      Best deal found at <strong>{cheapestStore.name}</strong> for ¥{cheapestStore.price}
                    </p>
                    <div className="bg-white rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">{cheapestStore.name}</span>
                        <span className="text-green-600 font-bold">¥{cheapestStore.price}</span>
                      </div>
                      <div className="text-sm text-gray-600">📍 {cheapestStore.distance} away</div>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-blue-800 mb-3">📊 Price Comparison</h3>
                    <div className="space-y-3">
                      {selectedProduct.stores.map((store, index) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-white rounded-lg">
                          <div>
                            <div className="font-medium">{store.name}</div>
                            <div className="text-sm text-gray-600">📍 {store.distance}</div>
                          </div>
                          <div className={`font-bold ${store.price === cheapestStore.price ? 'text-green-600' : 'text-gray-800'}`}>
                            ¥{store.price}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={resetAICompare}
            className="mb-6 flex items-center gap-2 text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to home
          </button>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center gap-4 mb-8">
              <Brain className="w-8 h-8 text-indigo-600" />
              <h1 className="text-3xl font-bold text-gray-800">AI Product Compare</h1>
            </div>

            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for products to compare prices..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg"
              />
            </div>

            {searchQuery && (
              <div className="space-y-3">
                {filteredProducts.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => handleProductSelect(product)}
                    className="w-full p-4 border border-gray-200 rounded-xl hover:border-indigo-300 hover:bg-indigo-50 transition-all text-left"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-800">{product.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-600">{product.rating} ({product.reviewCount} reviews)</span>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Review Summary View
  if (showReviewSummary) {
    if (selectedReviewProduct) {
      const reviewData = mockReviews[selectedReviewProduct.id as keyof typeof mockReviews];

      return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-4">
          <div className="max-w-4xl mx-auto">
            <button
              onClick={resetReviewSummary}
              className="mb-6 flex items-center gap-2 text-purple-600 hover:text-purple-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to search
            </button>

            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center gap-4 mb-8">
                <Brain className="w-8 h-8 text-purple-600" />
                <h1 className="text-3xl font-bold text-gray-800">AI Review Summary</h1>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <img
                    src={selectedReviewProduct.image}
                    alt={selectedReviewProduct.name}
                    className="w-full h-64 object-cover rounded-xl mb-4"
                  />
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedReviewProduct.name}</h2>
                  <RatingRow average={selectedReviewProduct.rating} count={selectedReviewProduct.reviewCount} />
                </div>

                <div className="space-y-6">
                  <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-green-800 mb-3">✅ What Customers Love</h3>
                    <ul className="space-y-2">
                      {reviewData.summary.pros.map((pro, index) => (
                        <li key={index} className="text-green-700 text-sm flex items-start gap-2">
                          <span className="text-green-500 mt-1">•</span>
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-red-800 mb-3">⚠️ Common Concerns</h3>
                    <ul className="space-y-2">
                      {reviewData.summary.cons.map((con, index) => (
                        <li key={index} className="text-red-700 text-sm flex items-start gap-2">
                          <span className="text-red-500 mt-1">•</span>
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
                <h3 className="text-lg font-semibold text-blue-800 mb-3">🤖 AI Verdict</h3>
                <p className="text-blue-700">{reviewData.summary.verdict}</p>
              </div>

              <div className="border-t pt-8">
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <MessageSquare className="w-6 h-6" />
                  Customer Reviews
                </h3>
                <div className="space-y-6">
                  {reviewData.reviews.map((review) => (
                    <div key={review.id} className="bg-gray-50 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                            <span className="text-purple-600 font-semibold text-sm">
                              {review.author.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <div className="font-semibold text-gray-800">{review.author}</div>
                            <div className="text-sm text-gray-500">{review.date}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }, (_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-4">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={resetReviewSummary}
            className="mb-6 flex items-center gap-2 text-purple-600 hover:text-purple-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to home
          </button>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center gap-4 mb-8">
              <Brain className="w-8 h-8 text-purple-600" />
              <h1 className="text-3xl font-bold text-gray-800">AI Review Summary</h1>
            </div>

            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for products to analyze reviews..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
              />
            </div>

            {searchQuery && (
              <div className="space-y-3">
                {filteredProducts.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => handleReviewProductSelect(product)}
                    className="w-full p-4 border border-gray-200 rounded-xl hover:border-purple-300 hover:bg-purple-50 transition-all text-left"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-800">{product.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-600">{product.rating} ({product.reviewCount} reviews)</span>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Main Home View
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShoppingCart className="w-8 h-8 text-indigo-600" />
              <h1 className="text-2xl font-bold text-gray-900">Tokyo Market</h1>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Home</a>
              <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Stores</a>
              <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Deals</a>
              <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Account</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Find the Best Prices in
            <span className="text-indigo-600"> Tokyo</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Compare prices across all major supermarkets and convenience stores in Tokyo. 
            Save money and time with our smart shopping assistant.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-indigo-700 transition-colors shadow-lg">
              Start Shopping
            </button>
            <button className="border border-indigo-600 text-indigo-600 px-8 py-4 rounded-xl font-semibold hover:bg-indigo-50 transition-colors">
              View Deals
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Shop Smart with AI
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            {/* AI Product Compare */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <Brain className="w-8 h-8 text-indigo-600" />
                <h4 className="text-xl font-bold text-gray-900">AI Product Compare</h4>
              </div>
              <p className="text-gray-600 mb-6">
                Get instant price comparisons across all Tokyo stores with AI-powered recommendations for the best deals.
              </p>
              <button 
                onClick={() => setShowAICompare(true)}
                className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
              >
                Start Comparing
              </button>
            </div>

            {/* AI Review Summary */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-100 p-8 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <MessageSquare className="w-8 h-8 text-purple-600" />
                <h4 className="text-xl font-bold text-gray-900">AI Review Summary</h4>
              </div>
              <p className="text-gray-600 mb-8">
                Summarizes customer reviews with AI.
              </p>
              <button 
                onClick={() => setShowReviewSummary(true)}
                className="bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-700 transition-colors"
              >
                Start Summarizing
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Products */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h3 className="text-3xl font-bold text-gray-900">Popular Products</h3>
            <button className="text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-2">
              View All
              <TrendingUp className="w-5 h-5" />
            </button>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {mockProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h4>
                  <RatingRow average={product.rating} count={product.reviewCount} />
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Best Price</span>
                      <span className="text-2xl font-bold text-indigo-600">
                        ¥{Math.min(...product.stores.map(s => s.price))}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      at {product.stores.find(s => s.price === Math.min(...product.stores.map(store => store.price)))?.name}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <ShoppingCart className="w-6 h-6" />
                <span className="text-xl font-bold">Tokyo Market</span>
              </div>
              <p className="text-gray-400">
                Your smart shopping companion for finding the best deals in Tokyo.
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Features</h5>
              <ul className="space-y-2 text-gray-400">
                <li>Price Comparison</li>
                <li>Store Locator</li>
                <li>Deal Alerts</li>
                <li>AI Recommendations</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Support</h5>
              <ul className="space-y-2 text-gray-400">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Connect</h5>
              <ul className="space-y-2 text-gray-400">
                <li>Twitter</li>
                <li>Facebook</li>
                <li>Instagram</li>
                <li>Newsletter</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Tokyo Market. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;