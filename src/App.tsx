import React, { useState } from 'react';
import { Search, MapPin, TrendingUp, ShoppingCart, Brain, Camera, ChefHat, ArrowLeft, Zap } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  category: string;
  image: string;
  stores: {
    [key: string]: number;
  };
  unit: string;
}

interface Store {
  name: string;
  location: string;
  distance: string;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Japanese Mayonnaise',
    category: 'Condiments',
    image: '/Japanese Mayonnaise.jpg',
    stores: {
      'SEIJO ISHII': 580,
      'Maruetsu': 520,
      'Shizenshokuhin F & F': 650
    },
    unit: '500ml'
  },
  {
    id: 2,
    name: 'Japanese Pickles Mix',
    category: 'Pickled Foods',
    image: '/Japanese Pickles Mix.jpg',
    stores: {
      'SEIJO ISHII': 420,
      'Maruetsu': 380,
      'Shizenshokuhin F & F': 450
    },
    unit: '300g'
  },
  {
    id: 3,
    name: 'Miso Paste (White)',
    category: 'Condiments',
    image: '/Miso Paste (White).jpg',
    stores: {
      'SEIJO ISHII': 680,
      'Maruetsu': 620,
      'Shizenshokuhin F & F': 720
    },
    unit: '500g'
  },
  {
    id: 4,
    name: 'Nori Seaweed Sheets',
    category: 'Dried Goods',
    image: '/Nori Seaweed Sheets.jpg',
    stores: {
      'SEIJO ISHII': 350,
      'Maruetsu': 320,
      'Shizenshokuhin F & F': 380
    },
    unit: '10 sheets'
  },
  {
    id: 5,
    name: 'Fresh Atlantic Salmon Fillet',
    category: 'Seafood',
    image: 'https://images.pexels.com/photos/3296434/pexels-photo-3296434.jpeg?auto=compress&cs=tinysrgb&w=400',
    stores: {
      'SEIJO ISHII': 3200,
      'Maruetsu': 2900,
      'Shizenshokuhin F & F': 3100
    },
    unit: '500g'
  },
  {
    id: 6,
    name: 'Frozen Salmon Fillets',
    category: 'Seafood',
    image: 'https://images.pexels.com/photos/725991/pexels-photo-725991.jpeg?auto=compress&cs=tinysrgb&w=400',
    stores: {
      'SEIJO ISHII': 2500,
      'Maruetsu': 2300,
      'Shizenshokuhin F & F': 2400
    },
    unit: '1kg'
  },
  {
    id: 7,
    name: 'Wild Pacific Salmon Fillets',
    category: 'Seafood',
    image: 'https://images.pexels.com/photos/1683545/pexels-photo-1683545.jpeg?auto=compress&cs=tinysrgb&w=400',
    stores: {
      'SEIJO ISHII': 3900,
      'Maruetsu': 3200,
      'Shizenshokuhin F & F': 3500
    },
    unit: '400g'
  }
];

const stores: Store[] = [
  { name: 'SEIJO ISHII', location: 'Shibuya', distance: '0.5km' },
  { name: 'Maruetsu', location: 'Shinjuku', distance: '1.2km' },
  { name: 'Shizenshokuhin F & F', location: 'Harajuku', distance: '0.8km' }
];

function App() {
  const [activeTab, setActiveTab] = useState('products');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStore, setSelectedStore] = useState('all');
  const [aiFeature, setAiFeature] = useState<string | null>(null);
  const [aiSearchTerm, setAiSearchTerm] = useState('');
  const [aiAnalysis, setAiAnalysis] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStore = selectedStore === 'all' || product.stores[selectedStore];
    return matchesSearch && matchesStore;
  });

  const getLowestPrice = (stores: { [key: string]: number }) => {
    return Math.min(...Object.values(stores));
  };

  const getBestStore = (stores: { [key: string]: number }) => {
    return Object.entries(stores).reduce((a, b) => a[1] < b[1] ? a : b)[0];
  };

  const handleAiSearch = async () => {
    if (!aiSearchTerm.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Find matching products
    const matchingProducts = products.filter(product => 
      product.name.toLowerCase().includes(aiSearchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(aiSearchTerm.toLowerCase())
    );

    if (matchingProducts.length > 0) {
      // Generate AI analysis
      const analysis = generateAiAnalysis(matchingProducts, aiSearchTerm);
      setAiAnalysis(analysis);
    }
    
    setIsAnalyzing(false);
  };

  const generateAiAnalysis = (products: Product[], searchTerm: string) => {
    // Simulate AI analysis based on the products
    const productAnalyses = products.map(product => {
      const lowestPrice = getLowestPrice(product.stores);
      const bestStore = getBestStore(product.stores);
      const pricePerUnit = calculatePricePerUnit(product);
      
      return {
        product,
        lowestPrice,
        bestStore,
        pricePerUnit,
        score: Math.floor(Math.random() * 30) + 70, // Random score 70-100
        nutritionScore: Math.floor(Math.random() * 20) + 80,
        qualityScore: Math.floor(Math.random() * 25) + 75
      };
    });

    // Sort by overall value (considering price and quality)
    productAnalyses.sort((a, b) => {
      const aValue = (a.score + a.nutritionScore + a.qualityScore) / 3 - (a.pricePerUnit * 0.1);
      const bValue = (b.score + b.nutritionScore + b.qualityScore) / 3 - (b.pricePerUnit * 0.1);
      return bValue - aValue;
    });

    const winner = productAnalyses[0];
    const searchCategory = searchTerm.toLowerCase();

    let verdict = '';
    let badges = [];
    let tradeoffs = [];

    if (searchCategory.includes('salmon')) {
      if (winner.product.name.includes('Wild Pacific')) {
        verdict = "Wild Pacific Salmon is your best choice for premium quality and superior taste, despite the higher price per gram.";
        badges = ['🌊 Wild Caught', '⭐ Premium Quality', '🥦 Healthiest'];
        tradeoffs = [
          'Higher price per gram but superior omega-3 content',
          'Smaller portions (400g) perfect for 2-3 servings',
          'Wild-caught means better sustainability and taste',
          'Available at premium stores with quality guarantee',
          'Best nutritional profile with lower contaminants'
        ];
      } else if (winner.product.name.includes('Frozen')) {
        verdict = "Frozen Salmon Fillets offer the best value for families, with bulk sizing and year-round availability.";
        badges = ['💲 Best Value', '📦 Bulk Size', '❄️ Long Lasting'];
        tradeoffs = [
          'Lowest price per gram at ¥2.30/g makes it budget-friendly',
          'Large 1kg portions ideal for meal prep and families',
          'Frozen format ensures longer shelf life and less waste',
          'Slightly lower texture quality compared to fresh options',
          'Great for cooking methods like baking or grilling'
        ];
      } else {
        verdict = "Fresh Atlantic Salmon provides the perfect balance of quality, freshness, and reasonable pricing for immediate use.";
        badges = ['🐟 Fresh Daily', '⚖️ Best Balance', '👨‍🍳 Chef Choice'];
        tradeoffs = [
          'Mid-range pricing with excellent freshness guarantee',
          'Perfect 500g portions for 3-4 servings',
          'Atlantic variety offers consistent quality and availability',
          'Best texture for sashimi, grilling, or pan-searing',
          'Widely available across multiple store chains'
        ];
      }
    } else {
      // Generic analysis for other products
      verdict = `${winner.product.name} is your best choice, offering excellent value with a ${winner.score}/100 overall rating.`;
      badges = ['💲 Best Value', '⭐ Top Rated', '🏪 Widely Available'];
      tradeoffs = [
        `Lowest price at ¥${winner.lowestPrice} from ${winner.bestStore}`,
        `High quality score of ${winner.qualityScore}/100`,
        `Good nutritional profile with ${winner.nutritionScore}/100 rating`,
        `Available across ${Object.keys(winner.product.stores).length} different stores`,
        `${winner.product.unit} size is practical for most households`
      ];
    }

    return {
      verdict,
      badges,
      tradeoffs,
      products: productAnalyses,
      searchTerm
    };
  };

  const calculatePricePerUnit = (product: Product) => {
    const lowestPrice = getLowestPrice(product.stores);
    const unit = product.unit;
    
    // Extract numeric value from unit
    const numericValue = parseInt(unit.match(/\d+/)?.[0] || '1');
    
    if (unit.includes('kg')) {
      return lowestPrice / (numericValue * 1000); // Price per gram
    } else if (unit.includes('g')) {
      return lowestPrice / numericValue; // Price per gram
    } else if (unit.includes('ml')) {
      return lowestPrice / numericValue; // Price per ml
    } else {
      return lowestPrice / numericValue; // Price per unit
    }
  };

  const renderProducts = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={selectedStore}
          onChange={(e) => setSelectedStore(e.target.value)}
        >
          <option value="all">All Stores</option>
          {stores.map(store => (
            <option key={store.name} value={store.name}>{store.name}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map(product => (
          <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
            <div className="aspect-w-16 aspect-h-12 bg-gray-100">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                  {product.category}
                </span>
                <span className="text-xs text-gray-500">{product.unit}</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-3">{product.name}</h3>
              <div className="space-y-2">
                {Object.entries(product.stores).map(([store, price]) => (
                  <div key={store} className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">{store}</span>
                    <span className="font-medium text-gray-900">¥{price.toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Best Price:</span>
                  <div className="text-right">
                    <div className="font-bold text-green-600">¥{getLowestPrice(product.stores).toLocaleString()}</div>
                    <div className="text-xs text-gray-500">{getBestStore(product.stores)}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderStores = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stores.map(store => (
        <div key={store.name} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center mb-4">
            <MapPin className="w-8 h-8 text-blue-600 mr-3" />
            <div>
              <h3 className="font-semibold text-gray-900">{store.name}</h3>
              <p className="text-sm text-gray-600">{store.location}</p>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Distance:</span>
            <span className="font-medium text-gray-900">{store.distance}</span>
          </div>
        </div>
      ))}
    </div>
  );

  const renderTrends = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Price Trends</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-2">Trending Up</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Japanese Mayonnaise</span>
                <span className="text-sm text-red-600 font-medium">+5.2%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Miso Paste</span>
                <span className="text-sm text-red-600 font-medium">+3.1%</span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-2">Trending Down</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Nori Seaweed</span>
                <span className="text-sm text-green-600 font-medium">-2.8%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Pickles Mix</span>
                <span className="text-sm text-green-600 font-medium">-1.5%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderShopSmart = () => {
    if (aiFeature === 'compare') {
      return (
        <div className="space-y-6">
          <div className="flex items-center mb-6">
            <button
              onClick={() => setAiFeature(null)}
              className="mr-4 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">AI Compare</h2>
              <p className="text-gray-600">Find the best product for your needs</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex gap-3 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Type a product name (e.g., milk, salmon, rice)..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={aiSearchTerm}
                  onChange={(e) => setAiSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAiSearch()}
                />
              </div>
              <button
                onClick={handleAiSearch}
                disabled={isAnalyzing || !aiSearchTerm.trim()}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
              >
                {isAnalyzing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4" />
                    Compare
                  </>
                )}
              </button>
            </div>

            {aiSearchTerm && !isAnalyzing && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Comparing Products:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {products.filter(product => 
                    product.name.toLowerCase().includes(aiSearchTerm.toLowerCase()) ||
                    product.category.toLowerCase().includes(aiSearchTerm.toLowerCase())
                  ).map(product => (
                    <div key={product.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="aspect-w-16 aspect-h-12 bg-gray-100 rounded-lg mb-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                            {product.category}
                          </span>
                          <span className="text-xs text-gray-500">{product.unit}</span>
                        </div>
                        <h4 className="font-medium text-gray-900 text-sm">{product.name}</h4>
                        <div className="text-xs text-gray-600">
                          <div className="flex justify-between">
                            <span>Best Price:</span>
                            <span className="font-medium text-green-600">¥{getLowestPrice(product.stores).toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Store:</span>
                            <span>{getBestStore(product.stores)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {isAnalyzing && (
              <div className="text-center py-12">
                <div className="inline-flex items-center gap-3 text-blue-600">
                  <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-lg font-medium">AI is analyzing your options...</span>
                </div>
                <p className="text-gray-500 mt-2">Comparing prices, nutrition, and quality factors</p>
              </div>
            )}

            {aiAnalysis && !isAnalyzing && (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">🎯 AI Recommendation</h3>
                  <p className="text-gray-700 text-lg leading-relaxed">{aiAnalysis.verdict}</p>
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                    {aiAnalysis.badges.map((badge, index) => (
                      <span key={index} className="bg-white text-gray-700 px-3 py-1 rounded-full text-sm font-medium border border-green-200">
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 Trade-off Breakdown</h3>
                  <ul className="space-y-3">
                    {aiAnalysis.tradeoffs.map((tradeoff, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{tradeoff}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">🔍 Detailed Analysis</h3>
                  <div className="space-y-4">
                    {aiAnalysis.products.map((analysis, index) => (
                      <div key={analysis.product.id} className={`p-4 rounded-lg border-2 ${index === 0 ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'}`}>
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-medium text-gray-900">{analysis.product.name}</h4>
                            <p className="text-sm text-gray-600">{analysis.product.unit} • Best at {analysis.bestStore}</p>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-lg text-gray-900">¥{analysis.lowestPrice.toLocaleString()}</div>
                            <div className="text-sm text-gray-500">¥{analysis.pricePerUnit.toFixed(2)}/g</div>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div>
                            <div className="text-2xl font-bold text-blue-600">{analysis.score}</div>
                            <div className="text-xs text-gray-500">AI Score</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-green-600">{analysis.nutritionScore}</div>
                            <div className="text-xs text-gray-500">Nutrition</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-purple-600">{analysis.qualityScore}</div>
                            <div className="text-xs text-gray-500">Quality</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }

    if (aiFeature === 'scan') {
      return (
        <div className="space-y-6">
          <div className="flex items-center mb-6">
            <button
              onClick={() => setAiFeature(null)}
              className="mr-4 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">AI Review Scan</h2>
              <p className="text-gray-600">Scan product labels for instant insights</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
            <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Camera Feature Coming Soon</h3>
            <p className="text-gray-600 mb-6">Point your camera at any product label to get instant AI-powered insights about ingredients, nutrition, and allergens.</p>
            <button className="bg-gray-100 text-gray-500 px-6 py-3 rounded-xl cursor-not-allowed">
              Enable Camera Access
            </button>
          </div>
        </div>
      );
    }

    if (aiFeature === 'recipe') {
      return (
        <div className="space-y-6">
          <div className="flex items-center mb-6">
            <button
              onClick={() => setAiFeature(null)}
              className="mr-4 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">AI Recipe Maker</h2>
              <p className="text-gray-600">Create recipes from your favorite products</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
            <ChefHat className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Recipe Generator Coming Soon</h3>
            <p className="text-gray-600 mb-6">Select your favorite products and let AI create personalized recipes based on your preferences and dietary needs.</p>
            <button className="bg-gray-100 text-gray-500 px-6 py-3 rounded-xl cursor-not-allowed">
              Generate Recipe
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Shop Smart with AI</h2>
          <p className="text-gray-600 text-lg">Let artificial intelligence help you make better shopping decisions</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button
            onClick={() => setAiFeature('compare')}
            className="group bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-8 text-left hover:from-blue-100 hover:to-indigo-200 transition-all duration-300 border border-blue-200 hover:border-blue-300 hover:shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <Brain className="w-12 h-12 text-blue-600 group-hover:scale-110 transition-transform" />
              <div className="text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">AI Compare</h3>
            <p className="text-gray-600 leading-relaxed">
              Compare products intelligently based on price, nutrition, quality, and your personal preferences to find the perfect match.
            </p>
          </button>

          <button
            onClick={() => setAiFeature('scan')}
            className="group bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl p-8 text-left hover:from-green-100 hover:to-emerald-200 transition-all duration-300 border border-green-200 hover:border-green-300 hover:shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <Camera className="w-12 h-12 text-green-600 group-hover:scale-110 transition-transform" />
              <div className="text-green-600 opacity-0 group-hover:opacity-100 transition-opacity">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">AI Review Scan</h3>
            <p className="text-gray-600 leading-relaxed">
              Scan any product label with your camera to instantly get AI-powered insights about ingredients, allergens, and health ratings.
            </p>
          </button>

          <button
            onClick={() => setAiFeature('recipe')}
            className="group bg-gradient-to-br from-purple-50 to-pink-100 rounded-xl p-8 text-left hover:from-purple-100 hover:to-pink-200 transition-all duration-300 border border-purple-200 hover:border-purple-300 hover:shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <ChefHat className="w-12 h-12 text-purple-600 group-hover:scale-110 transition-transform" />
              <div className="text-purple-600 opacity-0 group-hover:opacity-100 transition-opacity">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">AI Recipe Maker</h3>
            <p className="text-gray-600 leading-relaxed">
              Create personalized recipes using your favorite products, dietary preferences, and cooking skill level with AI assistance.
            </p>
          </button>
        </div>

        <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-3">
            <Zap className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Powered by Advanced AI</h3>
          </div>
          <p className="text-gray-600">
            Our AI analyzes thousands of data points including nutritional information, price trends, user reviews, 
            and local availability to provide you with personalized recommendations that save you time and money.
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <ShoppingCart className="w-8 h-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Tokyo Supermarket Price Comparison</h1>
            </div>
          </div>
        </div>
      </header>

      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { id: 'products', label: 'Products', icon: ShoppingCart },
              { id: 'stores', label: 'Stores', icon: MapPin },
              { id: 'trends', label: 'Trends', icon: TrendingUp },
              { id: 'smart', label: 'Shop Smart', icon: Brain }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center px-1 py-4 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'products' && renderProducts()}
        {activeTab === 'stores' && renderStores()}
        {activeTab === 'trends' && renderTrends()}
        {activeTab === 'smart' && renderShopSmart()}
      </main>
    </div>
  );
}

export default App;