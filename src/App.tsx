import React, { useState } from 'react';
import { ShoppingCart, Star, TrendingUp, Zap, Search, BarChart3, Brain, Camera, MessageSquare, Users, Award, Clock, MapPin, Filter, ArrowRight, ChevronDown, Heart, Share2, Bell } from 'lucide-react';
import RatingRow from './components/RatingRow';
import { products } from './data/products';
import AiProductCompare from './features/shopSmart/AiProductCompare';
import AiReviewSummary from './features/shopSmart/AiReviewSummary';

function App() {
  const [activeTab, setActiveTab] = useState('browse');
  const [activeAIFeature, setActiveAIFeature] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('price-low');

  const categories = [
    { id: 'all', name: 'All Products', count: products.length },
    { id: 'seafood', name: 'Seafood', count: 3 },
    { id: 'meat', name: 'Meat', count: 1 },
    { id: 'rice', name: 'Rice & Grains', count: 1 },
    { id: 'condiments', name: 'Condiments', count: 3 }
  ];

  const sortOptions = [
    { id: 'price-low', name: 'Price: Low to High' },
    { id: 'price-high', name: 'Price: High to Low' },
    { id: 'rating', name: 'Highest Rated' },
    { id: 'discount', name: 'Best Deals' }
  ];

  const filteredProducts = products.filter(product => {
    if (selectedCategory === 'all') return true;
    // Simple category matching - in a real app, products would have category fields
    if (selectedCategory === 'seafood') return product.name.toLowerCase().includes('salmon') || product.name.toLowerCase().includes('tuna');
    if (selectedCategory === 'meat') return product.name.toLowerCase().includes('beef') || product.name.toLowerCase().includes('wagyu');
    if (selectedCategory === 'rice') return product.name.toLowerCase().includes('rice');
    if (selectedCategory === 'condiments') return product.name.toLowerCase().includes('mayo') || product.name.toLowerCase().includes('miso') || product.name.toLowerCase().includes('pickle') || product.name.toLowerCase().includes('nori');
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.ratingAverage - a.ratingAverage;
      case 'discount':
        return b.discount - a.discount;
      default:
        return 0;
    }
  });

  if (activeAIFeature === 'compare') {
    return <AiProductCompare onBack={() => setActiveAIFeature(null)} />;
  }
  
  if (activeAIFeature === 'reviewSummary') {
    return <AiReviewSummary />;
  }

  const renderBrowseTab = () => (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-emerald-600 to-blue-600 rounded-2xl p-8 text-white">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold mb-4">Smart Shopping Made Simple</h1>
          <p className="text-emerald-100 mb-6">
            Compare prices across Tokyo's top supermarkets and find the best deals with AI-powered insights.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center bg-white/20 rounded-lg px-4 py-2">
              <TrendingUp className="h-5 w-5 mr-2" />
              <span className="text-sm font-medium">Live Price Updates</span>
            </div>
            <div className="flex items-center bg-white/20 rounded-lg px-4 py-2">
              <Brain className="h-5 w-5 mr-2" />
              <span className="text-sm font-medium">AI Recommendations</span>
            </div>
            <div className="flex items-center bg-white/20 rounded-lg px-4 py-2">
              <Award className="h-5 w-5 mr-2" />
              <span className="text-sm font-medium">Best Deals</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center px-4 py-3 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
          >
            <Filter className="h-5 w-5 mr-2" />
            Filters
            <ChevronDown className={`h-4 w-4 ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {showFilters && (
          <div className="mt-6 pt-6 border-t border-slate-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">Category</label>
                <div className="space-y-2">
                  {categories.map(category => (
                    <label key={category.id} className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        value={category.id}
                        checked={selectedCategory === category.id}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-slate-300"
                      />
                      <span className="ml-3 text-sm text-slate-700">
                        {category.name} ({category.count})
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  {sortOptions.map(option => (
                    <option key={option.id} value={option.id}>{option.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sortedProducts.map(product => (
          <div key={product.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                -{product.discount}%
              </div>
              <button className="absolute top-3 left-3 p-2 bg-white/80 rounded-full hover:bg-white transition-colors">
                <Heart className="h-4 w-4 text-slate-600" />
              </button>
            </div>
            
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                  {product.store}
                </span>
                <button className="p-1 hover:bg-slate-100 rounded">
                  <Share2 className="h-4 w-4 text-slate-400" />
                </button>
              </div>
              
              <h3 className="font-semibold text-slate-900 mb-1 line-clamp-2">{product.name}</h3>
              <p className="text-sm text-slate-500 mb-3">{product.size}</p>
              
              <RatingRow
                average={product.ratingAverage}
                count={product.ratingCount}
                onClick={() => console.log('Rating clicked')}
              />
              
              <div className="flex items-center justify-between mt-4">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold text-slate-900">¥{product.price.toLocaleString()}</span>
                    <span className="text-sm text-slate-500 line-through">¥{product.originalPrice.toLocaleString()}</span>
                  </div>
                </div>
                <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center">
                  <ShoppingCart className="h-4 w-4 mr-1" />
                  Add
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderShopSmartTab = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Shop Smart with AI</h2>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Leverage artificial intelligence to make smarter shopping decisions, compare products intelligently, and discover the best deals.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* AI Product Compare */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8 border border-blue-200">
          <div className="bg-blue-500 rounded-full w-16 h-16 flex items-center justify-center mb-6">
            <Brain className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-4">AI Product Compare</h3>
          <p className="text-slate-600 mb-8">Get intelligent product comparisons based on price, quality, nutrition, and customer reviews.</p>
          <button 
            onClick={() => setActiveAIFeature('compare')}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Start Comparing
          </button>
        </div>

        {/* AI Review Summary */}
        <div className="bg-gradient-to-br from-emerald-50 to-green-100 rounded-2xl p-8 border border-emerald-200">
          <div className="bg-emerald-500 rounded-full w-16 h-16 flex items-center justify-center mb-6">
            <MessageSquare className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-4">AI Review Summary</h3>
          <p className="text-slate-600 mb-8">Summarizes customer reviews with AI.</p>
          <button 
            onClick={() => setActiveAIFeature('reviewSummary')}
            className="w-full bg-emerald-600 text-white py-3 px-6 rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Start Reviewing
          </button>
        </div>

        {/* Smart Shopping Lists */}
        <div className="bg-gradient-to-br from-purple-50 to-violet-100 rounded-2xl p-8 border border-purple-200">
          <div className="bg-purple-500 rounded-full w-16 h-16 flex items-center justify-center mb-6">
            <Zap className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-4">Smart Shopping Lists</h3>
          <p className="text-slate-600 mb-8">AI-powered shopping lists that optimize for budget, nutrition, and preferences.</p>
          <button 
            onClick={() => console.log('Create List')}
            className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Create List
          </button>
        </div>

        {/* Price Prediction */}
        <div className="bg-gradient-to-br from-orange-50 to-red-100 rounded-2xl p-8 border border-orange-200">
          <div className="bg-orange-500 rounded-full w-16 h-16 flex items-center justify-center mb-6">
            <TrendingUp className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-4">Price Prediction</h3>
          <p className="text-slate-600 mb-8">Predict future price trends and get alerts when prices drop for your favorite items.</p>
          <button 
            onClick={() => console.log('Set Alerts')}
            className="w-full bg-orange-600 text-white py-3 px-6 rounded-lg hover:bg-orange-700 transition-colors"
          >
            Set Alerts
          </button>
        </div>

        {/* Nutrition Analysis */}
        <div className="bg-gradient-to-br from-teal-50 to-cyan-100 rounded-2xl p-8 border border-teal-200">
          <div className="bg-teal-500 rounded-full w-16 h-16 flex items-center justify-center mb-6">
            <BarChart3 className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-4">Nutrition Analysis</h3>
          <p className="text-slate-600 mb-8">Analyze nutritional content and get personalized health recommendations.</p>
          <button 
            onClick={() => console.log('Analyze Nutrition')}
            className="w-full bg-teal-600 text-white py-3 px-6 rounded-lg hover:bg-teal-700 transition-colors"
          >
            Analyze Nutrition
          </button>
        </div>

        {/* Community Insights */}
        <div className="bg-gradient-to-br from-pink-50 to-rose-100 rounded-2xl p-8 border border-pink-200">
          <div className="bg-pink-500 rounded-full w-16 h-16 flex items-center justify-center mb-6">
            <Users className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-4">Community Insights</h3>
          <p className="text-slate-600 mb-8">Discover what your neighbors are buying and get community-driven recommendations.</p>
          <button 
            onClick={() => console.log('View Community')}
            className="w-full bg-pink-600 text-white py-3 px-6 rounded-lg hover:bg-pink-700 transition-colors"
          >
            View Community
          </button>
        </div>
      </div>
    </div>
  );

  const renderDealsTab = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Today's Best Deals</h2>
        <p className="text-slate-600">Limited time offers and flash sales across Tokyo supermarkets</p>
      </div>

      {/* Flash Sale Banner */}
      <div className="bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center mb-2">
              <Zap className="h-6 w-6 mr-2" />
              <span className="font-bold text-lg">Flash Sale</span>
            </div>
            <h3 className="text-2xl font-bold mb-2">Up to 50% off Premium Seafood</h3>
            <p className="text-red-100">Limited time offer - ends in 2 hours!</p>
          </div>
          <div className="text-right">
            <div className="bg-white/20 rounded-lg p-4">
              <div className="text-3xl font-bold">02:15:30</div>
              <div className="text-sm text-red-100">Time remaining</div>
            </div>
          </div>
        </div>
      </div>

      {/* Deal Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center mb-4">
            <div className="bg-green-100 rounded-full p-3 mr-4">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900">Price Drops</h3>
              <p className="text-sm text-slate-600">15 items</p>
            </div>
          </div>
          <p className="text-slate-600 mb-4">Products with significant price reductions</p>
          <button className="text-green-600 font-medium hover:text-green-700">
            View all →
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center mb-4">
            <div className="bg-blue-100 rounded-full p-3 mr-4">
              <Clock className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900">Limited Time</h3>
              <p className="text-sm text-slate-600">8 items</p>
            </div>
          </div>
          <p className="text-slate-600 mb-4">Special offers ending soon</p>
          <button className="text-blue-600 font-medium hover:text-blue-700">
            View all →
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center mb-4">
            <div className="bg-purple-100 rounded-full p-3 mr-4">
              <Award className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900">Best Value</h3>
              <p className="text-sm text-slate-600">12 items</p>
            </div>
          </div>
          <p className="text-slate-600 mb-4">Highest quality for the price</p>
          <button className="text-purple-600 font-medium hover:text-purple-700">
            View all →
          </button>
        </div>
      </div>

      {/* Featured Deals */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.filter(p => p.discount > 10).map(product => (
          <div key={product.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full font-bold">
                -{product.discount}% OFF
              </div>
              <div className="absolute bottom-3 left-3 bg-black/70 text-white px-2 py-1 rounded text-sm">
                {product.store}
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="font-semibold text-slate-900 mb-2">{product.name}</h3>
              <p className="text-sm text-slate-500 mb-3">{product.size}</p>
              
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-2xl font-bold text-slate-900">¥{product.price.toLocaleString()}</span>
                  <span className="text-sm text-slate-500 line-through ml-2">¥{product.originalPrice.toLocaleString()}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm text-green-600 font-medium">
                    Save ¥{(product.originalPrice - product.price).toLocaleString()}
                  </div>
                </div>
              </div>
              
              <button className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors">
                Grab Deal
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex items-center">
                <ShoppingCart className="h-8 w-8 text-emerald-600 mr-3" />
                <span className="text-xl font-bold text-slate-900">SmartCart</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                <Bell className="h-5 w-5" />
              </button>
              <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">U</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { id: 'browse', name: 'Browse Products', icon: Search },
              { id: 'shop-smart', name: 'Shop Smart', icon: Brain },
              { id: 'deals', name: 'Deals', icon: TrendingUp }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-1 py-4 border-b-2 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'border-emerald-500 text-emerald-600'
                      : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {tab.name}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'browse' && renderBrowseTab()}
        {activeTab === 'shop-smart' && renderShopSmartTab()}
        {activeTab === 'deals' && renderDealsTab()}
      </main>
    </div>
  );
}

export default App;