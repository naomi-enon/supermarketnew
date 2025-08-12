import React, { useState, useMemo } from 'react';
import { Star, MapPin, Search, Pen as Yen, Flag, AlertTriangle } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  category: string;
  prices: {
    seijo: number;
    maruetsu: number;
    ff: number;
  };
  unit: string;
  image: string;
}

interface Store {
  id: string;
  name: string;
  address: string;
  hours: string;
  phone: string;
  coordinates: { lat: number; lng: number };
}

interface FlaggedPrice {
  productId: number;
  store: string;
  reason: string;
  timestamp: Date;
}

const stores: Store[] = [
  {
    id: 'seijo',
    name: 'SEIJO ISHII Tokyo Dome LaQua Store',
    address: '1-3-61 Koraku, Bunkyo City, Tokyo 112-0004',
    hours: '10:00 - 22:00',
    phone: '03-5800-9581',
    coordinates: { lat: 35.7056, lng: 139.7514 }
  },
  {
    id: 'maruetsu',
    name: 'Maruetsu (Kasuga Ekimae)',
    address: '1-16-21 Kasuga, Bunkyo City, Tokyo 112-0003',
    hours: '9:00 - 24:00',
    phone: '03-3814-5511',
    coordinates: { lat: 35.7026, lng: 139.7528 }
  },
  {
    id: 'ff',
    name: 'Shizenshokuhin F & F Metro M Korakuen',
    address: '1-4-1 Koraku, Bunkyo City, Tokyo 112-0004',
    hours: '8:00 - 23:00',
    phone: '03-3818-3591',
    coordinates: { lat: 35.7067, lng: 139.7512 }
  }
];

const products: Product[] = [
  {
    id: 1,
    name: 'Premium Japanese Rice (5kg)',
    category: 'Grains',
    prices: { seijo: 2980, maruetsu: 2450, ff: 2680 },
    unit: '5kg',
    image: 'https://images.pexels.com/photos/1059905/pexels-photo-1059905.jpeg'
  },
  {
    id: 2,
    name: 'Fresh Atlantic Salmon Fillet',
    category: 'Seafood',
    prices: { seijo: 1580, maruetsu: 1280, ff: 1450 },
    unit: '100g',
    image: 'https://images.pexels.com/photos/1647163/pexels-photo-1647163.jpeg'
  },
  {
    id: 3,
    name: 'Organic Vegetables Mix',
    category: 'Vegetables',
    prices: { seijo: 680, maruetsu: 520, ff: 450 },
    unit: '300g',
    image: 'https://images.pexels.com/photos/1400172/pexels-photo-1400172.jpeg'
  },
  {
    id: 4,
    name: 'Wagyu Beef A5 Grade',
    category: 'Meat',
    prices: { seijo: 8900, maruetsu: 7800, ff: 8200 },
    unit: '200g',
    image: 'https://images.pexels.com/photos/361184/asparagus-steak-veal-steak-veal-361184.jpeg'
  },
  {
    id: 5,
    name: 'Fresh Milk (1L)',
    category: 'Dairy',
    prices: { seijo: 380, maruetsu: 298, ff: 320 },
    unit: '1L',
    image: 'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg'
  },
  {
    id: 6,
    name: 'Artisan Bread Loaf',
    category: 'Bakery',
    prices: { seijo: 580, maruetsu: 380, ff: 420 },
    unit: '1 loaf',
    image: 'https://images.pexels.com/photos/209206/pexels-photo-209206.jpeg'
  },
  {
    id: 7,
    name: 'Premium Green Tea',
    category: 'Beverages',
    prices: { seijo: 1280, maruetsu: 980, ff: 1150 },
    unit: '100g',
    image: 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg'
  },
  {
    id: 8,
    name: 'Free-Range Eggs (12 pack)',
    category: 'Dairy',
    prices: { seijo: 580, maruetsu: 450, ff: 520 },
    unit: '12 eggs',
    image: 'https://images.pexels.com/photos/162712/egg-white-food-protein-162712.jpeg'
  },
  {
    id: 9,
    name: 'Imported Italian Pasta',
    category: 'Grains',
    prices: { seijo: 480, maruetsu: 320, ff: 380 },
    unit: '500g',
    image: 'https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg'
  },
  {
    id: 10,
    name: 'Fresh Seasonal Fruits',
    category: 'Fruits',
    prices: { seijo: 890, maruetsu: 680, ff: 750 },
    unit: '1kg',
    image: 'https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg'
  },
  {
    id: 11,
    name: 'Soy Sauce (Premium)',
    category: 'Condiments',
    prices: { seijo: 680, maruetsu: 480, ff: 580 },
    unit: '500ml',
    image: 'https://images.pexels.com/photos/6419733/pexels-photo-6419733.jpeg'
  },
  {
    id: 12,
    name: 'Miso Paste (White)',
    category: 'Condiments',
    prices: { seijo: 580, maruetsu: 420, ff: 480 },
    unit: '400g',
    image: 'https://images.pexels.com/photos/5949892/pexels-photo-5949892.jpeg'
  },
  {
    id: 13,
    name: 'Tofu (Silken)',
    category: 'Protein',
    prices: { seijo: 280, maruetsu: 180, ff: 220 },
    unit: '300g',
    image: 'https://images.pexels.com/photos/7625056/pexels-photo-7625056.jpeg'
  },
  {
    id: 14,
    name: 'Nori Seaweed Sheets',
    category: 'Condiments',
    prices: { seijo: 480, maruetsu: 320, ff: 380 },
    unit: '10 sheets',
    image: 'https://images.pexels.com/photos/5949915/pexels-photo-5949915.jpeg'
  },
  {
    id: 15,
    name: 'Japanese Mayonnaise',
    category: 'Condiments',
    prices: { seijo: 380, maruetsu: 280, ff: 320 },
    unit: '400g',
    image: 'https://images.pexels.com/photos/6419733/pexels-photo-6419733.jpeg'
  },
  {
    id: 16,
    name: 'Udon Noodles (Fresh)',
    category: 'Grains',
    prices: { seijo: 380, maruetsu: 250, ff: 300 },
    unit: '300g',
    image: 'https://images.pexels.com/photos/5949915/pexels-photo-5949915.jpeg'
  },
  {
    id: 17,
    name: 'Shiitake Mushrooms',
    category: 'Vegetables',
    prices: { seijo: 580, maruetsu: 420, ff: 480 },
    unit: '200g',
    image: 'https://images.pexels.com/photos/1618900/pexels-photo-1618900.jpeg'
  },
  {
    id: 18,
    name: 'Japanese Pickles Mix',
    category: 'Condiments',
    prices: { seijo: 480, maruetsu: 320, ff: 380 },
    unit: '200g',
    image: 'https://images.pexels.com/photos/5949915/pexels-photo-5949915.jpeg'
  },
  {
    id: 19,
    name: 'Matcha Powder (Ceremonial)',
    category: 'Beverages',
    prices: { seijo: 2800, maruetsu: 2200, ff: 2500 },
    unit: '50g',
    image: 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg'
  },
  {
    id: 20,
    name: 'Dashi Stock (Instant)',
    category: 'Condiments',
    prices: { seijo: 580, maruetsu: 380, ff: 480 },
    unit: '100g',
    image: 'https://images.pexels.com/photos/6419733/pexels-photo-6419733.jpeg'
  },
  {
    id: 21,
    name: 'Panko Breadcrumbs',
    category: 'Condiments',
    prices: { seijo: 280, maruetsu: 180, ff: 220 },
    unit: '200g',
    image: 'https://images.pexels.com/photos/209206/pexels-photo-209206.jpeg'
  },
  {
    id: 22,
    name: 'Japanese Curry Roux',
    category: 'Condiments',
    prices: { seijo: 380, maruetsu: 250, ff: 300 },
    unit: '200g',
    image: 'https://images.pexels.com/photos/2161543/pexels-photo-2161543.jpeg'
  },
  {
    id: 23,
    name: 'Tempura Flour Mix',
    category: 'Grains',
    prices: { seijo: 480, maruetsu: 320, ff: 380 },
    unit: '500g',
    image: 'https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg'
  },
  {
    id: 24,
    name: 'Wasabi Paste (Fresh)',
    category: 'Condiments',
    prices: { seijo: 880, maruetsu: 680, ff: 750 },
    unit: '40g',
    image: 'https://images.pexels.com/photos/5949915/pexels-photo-5949915.jpeg'
  },
  {
    id: 25,
    name: 'Japanese Sweet Potato',
    category: 'Vegetables',
    prices: { seijo: 480, maruetsu: 320, ff: 380 },
    unit: '500g',
    image: 'https://images.pexels.com/photos/1400172/pexels-photo-1400172.jpeg'
  },
  {
    id: 26,
    name: 'Sake (Junmai)',
    category: 'Beverages',
    prices: { seijo: 1880, maruetsu: 1450, ff: 1680 },
    unit: '720ml',
    image: 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg'
  },
  {
    id: 27,
    name: 'Ramen Noodles (Instant)',
    category: 'Grains',
    prices: { seijo: 180, maruetsu: 120, ff: 150 },
    unit: '1 pack',
    image: 'https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg'
  },
  {
    id: 28,
    name: 'Japanese Cucumber',
    category: 'Vegetables',
    prices: { seijo: 280, maruetsu: 180, ff: 220 },
    unit: '3 pieces',
    image: 'https://images.pexels.com/photos/1400172/pexels-photo-1400172.jpeg'
  },
  {
    id: 29,
    name: 'Gyoza Wrappers',
    category: 'Grains',
    prices: { seijo: 380, maruetsu: 250, ff: 300 },
    unit: '30 pieces',
    image: 'https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg'
  },
  {
    id: 30,
    name: 'Japanese Pork Belly',
    category: 'Meat',
    prices: { seijo: 1280, maruetsu: 980, ff: 1150 },
    unit: '300g',
    image: 'https://images.pexels.com/photos/361184/asparagus-steak-veal-steak-veal-361184.jpeg'
  }
];

function App() {
  const [activeTab, setActiveTab] = useState('favorites');
  const [favorites, setFavorites] = useState<Set<number>>(new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]));
  const [quantities, setQuantities] = useState<Record<number, number>>(() => {
    const initialQuantities: Record<number, number> = {};
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].forEach(id => {
      initialQuantities[id] = 1;
    });
    return initialQuantities;
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [flaggedPrices, setFlaggedPrices] = useState<FlaggedPrice[]>([]);
  const [showFlagModal, setShowFlagModal] = useState(false);
  const [flaggingProduct, setFlaggingProduct] = useState<{ productId: number; store: string } | null>(null);

  const toggleFavorite = (productId: number) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(productId)) {
      newFavorites.delete(productId);
      // Remove quantity when unfavoriting
      const newQuantities = { ...quantities };
      delete newQuantities[productId];
      setQuantities(newQuantities);
    } else {
      newFavorites.add(productId);
      // Set default quantity when favoriting
      setQuantities(prev => ({ ...prev, [productId]: 1 }));
    }
    setFavorites(newFavorites);
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity > 0) {
      setQuantities(prev => ({ ...prev, [productId]: quantity }));
    }
  };

  const getLowestPrice = (prices: Product['prices']) => {
    return Math.min(prices.seijo, prices.maruetsu, prices.ff);
  };

  const getLowestPriceStore = (prices: Product['prices']) => {
    const lowest = getLowestPrice(prices);
    if (prices.seijo === lowest) return 'seijo';
    if (prices.maruetsu === lowest) return 'maruetsu';
    return 'ff';
  };

  const getStoreName = (storeId: string) => {
    const store = stores.find(s => s.id === storeId);
    return store ? store.name.split(' ')[0] : storeId;
  };

  const flagPrice = (productId: number, store: string, reason: string) => {
    const newFlag: FlaggedPrice = {
      productId,
      store,
      reason,
      timestamp: new Date()
    };
    setFlaggedPrices([...flaggedPrices, newFlag]);
    setShowFlagModal(false);
    setFlaggingProduct(null);
  };

  const isPriceFlagged = (productId: number, store: string) => {
    return flaggedPrices.some(flag => flag.productId === productId && flag.store === store);
  };

  const removeFlaggedPrice = (productId: number, store: string) => {
    setFlaggedPrices(flaggedPrices.filter(flag => 
      !(flag.productId === productId && flag.store === store)
    ));
  };

  const calculateTotalCost = () => {
    return favoriteProducts.reduce((total, product) => {
      const quantity = quantities[product.id] || 1;
      const lowestPrice = getLowestPrice(product.prices);
      return total + (lowestPrice * quantity);
    }, 0);
  };

  const calculateSupermarketTotals = () => {
    const totals = {
      seijo: 0,
      maruetsu: 0,
      ff: 0
    };

    favoriteProducts.forEach(product => {
      const quantity = quantities[product.id] || 1;
      totals.seijo += product.prices.seijo * quantity;
      totals.maruetsu += product.prices.maruetsu * quantity;
      totals.ff += product.prices.ff * quantity;
    });

    return totals;
  };

  const getCheapestSupermarket = () => {
    const totals = calculateSupermarketTotals();
    const cheapestStore = Object.entries(totals).reduce((min, [store, total]) => 
      total < min.total ? { store, total } : min
    , { store: 'seijo', total: totals.seijo });
    
    return {
      store: cheapestStore.store,
      total: cheapestStore.total,
      name: getStoreName(cheapestStore.store)
    };
  };

  const filteredProducts = useMemo(() => {
    return products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const favoriteProducts = filteredProducts.filter(product => favorites.has(product.id));
  const cheapestSupermarket = getCheapestSupermarket();
  const supermarketTotals = calculateSupermarketTotals();

  const ProductCard = ({ product, showAllPrices = false, showQuantity = false }: { product: Product; showAllPrices?: boolean; showQuantity?: boolean }) => {
    const lowestPrice = getLowestPrice(product.prices);
    const lowestStore = getLowestPriceStore(product.prices);
    const isFavorite = favorites.has(product.id);
    const quantity = quantities[product.id] || 1;

    return (
      <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover"
          />
          <button
            onClick={() => toggleFavorite(product.id)}
            className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 ${
              isFavorite
                ? 'bg-yellow-400 text-white shadow-lg scale-110'
                : 'bg-white/80 text-gray-400 hover:bg-yellow-400 hover:text-white'
            }`}
          >
            <Star className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
          <div className="absolute bottom-3 left-3">
            <span className="bg-emerald-600 text-white px-2 py-1 rounded-full text-xs font-medium">
              {product.category}
            </span>
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="font-bold text-gray-800 mb-2 line-clamp-2">{product.name}</h3>
          <p className="text-sm text-gray-500 mb-3">{product.unit}</p>
          
          {showQuantity && (
            <div className="flex items-center justify-between mb-3 p-2 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium text-gray-600">Quantity:</span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => updateQuantity(product.id, quantity - 1)}
                  disabled={quantity <= 1}
                  className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  -
                </button>
                <span className="w-8 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => updateQuantity(product.id, quantity + 1)}
                  className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>
          )}
          
          {showAllPrices ? (
            <div className="space-y-2">
              {[
                { id: 'seijo', name: 'SEIJO ISHII', price: product.prices.seijo },
                { id: 'maruetsu', name: 'Maruetsu', price: product.prices.maruetsu },
                { id: 'ff', name: 'F & F', price: product.prices.ff }
              ].map(store => (
                <div key={store.id} className="flex justify-between items-center group">
                  <span className="text-sm text-gray-600">{store.name}</span>
                  <div className="flex items-center space-x-2">
                    <span className={`font-bold flex items-center ${
                      store.price === lowestPrice
                        ? 'text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full'
                        : 'text-gray-700'
                    }`}>
                      <Yen className="h-4 w-4 mr-1" />
                      {store.price.toLocaleString()}
                      {isPriceFlagged(product.id, store.id) && (
                        <button
                          onClick={() => removeFlaggedPrice(product.id, store.id)}
                          className="ml-1 hover:bg-orange-100 rounded p-0.5 transition-colors duration-200"
                          title="Remove flag"
                        >
                          <AlertTriangle className="h-3 w-3 text-orange-500 hover:text-orange-600" />
                        </button>
                      )}
                    </span>
                    <button
                      onClick={() => {
                        setFlaggingProduct({ productId: product.id, store: store.id });
                        setShowFlagModal(true);
                      }}
                      className="p-1 hover:bg-orange-100 rounded transition-colors duration-200"
                      title="Flag incorrect price"
                    >
                      <Flag className="h-3 w-3 text-orange-400 hover:text-orange-600" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex justify-between items-center group">
              <div className="text-sm text-gray-600">
                Best at <span className="font-medium text-emerald-600">{getStoreName(lowestStore)}</span>
                {showQuantity && quantity > 1 && (
                  <div className="text-xs text-gray-500 mt-1">
                    {quantity} × ¥{lowestPrice.toLocaleString()} = ¥{(lowestPrice * quantity).toLocaleString()}
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <div className="font-bold text-xl text-emerald-600 flex items-center">
                  <Yen className="h-5 w-5 mr-1" />
                  {showQuantity && quantity > 1 ? (lowestPrice * quantity).toLocaleString() : lowestPrice.toLocaleString()}
                  {isPriceFlagged(product.id, lowestStore) && (
                    <button
                      onClick={() => removeFlaggedPrice(product.id, lowestStore)}
                      className="ml-1 hover:bg-orange-100 rounded p-0.5 transition-colors duration-200"
                      title="Remove flag"
                    >
                      <AlertTriangle className="h-4 w-4 text-orange-500 hover:text-orange-600" />
                    </button>
                  )}
                </div>
                <button
                  onClick={() => {
                    setFlaggingProduct({ productId: product.id, store: lowestStore });
                    setShowFlagModal(true);
                  }}
                  className="p-1 hover:bg-orange-100 rounded transition-colors duration-200"
                  title="Flag incorrect price"
                >
                  <Flag className="h-4 w-4 text-orange-400 hover:text-orange-600" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const StoreCard = ({ store }: { store: Store }) => (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-bold text-xl text-gray-800 mb-2">{store.name}</h3>
          <div className="flex items-center text-gray-600 mb-2">
            <MapPin className="h-4 w-4 mr-2 text-emerald-600" />
            <span className="text-sm">{store.address}</span>
          </div>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-sm font-medium text-gray-600">Hours:</span>
          <span className="text-sm text-gray-800">{store.hours}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm font-medium text-gray-600">Phone:</span>
          <span className="text-sm text-emerald-600">{store.phone}</span>
        </div>
      </div>
      
      <button className="w-full mt-4 bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors duration-200">
        View on Map
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Tokyo Supermarket Comparison
            </h1>
            <p className="text-gray-600">
              Compare prices across SEIJO ISHII, Maruetsu, and F & F stores
            </p>
          </div>
          
          {/* Search Bar */}
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
          
          {/* Tabs */}
          <div className="flex space-x-8 border-b border-gray-200">
            {[
              { id: 'locations', label: 'Store Locations', count: stores.length },
              { id: 'products', label: 'All Products', count: filteredProducts.length },
              { id: 'favorites', label: 'My Favorites', count: favorites.size }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 whitespace-nowrap text-sm font-medium border-b-2 transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'border-emerald-500 text-emerald-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
                <span className="ml-2 bg-gray-100 text-gray-600 py-1 px-2 rounded-full text-xs">
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'favorites' && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Favorite Products</h2>
              <p className="text-gray-600">
                Your top {favorites.size} products with the best prices highlighted
              </p>
            </div>
            
            {favoriteProducts.length > 0 && (
              <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">Total Cost (Best Prices)</h3>
                      <p className="text-sm text-gray-600">
                        Shopping at the cheapest supermarket for each item
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-emerald-600 flex items-center">
                        <Yen className="h-8 w-8 mr-2" />
                        {calculateTotalCost().toLocaleString()}
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        {favoriteProducts.reduce((total, product) => total + (quantities[product.id] || 1), 0)} items total
                      </p>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">Cheapest Single Supermarket</h3>
                        <p className="text-sm text-gray-600">
                          Shopping everything at <span className="font-medium text-emerald-600">{cheapestSupermarket.name}</span>
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-blue-600 flex items-center">
                          <Yen className="h-8 w-8 mr-2" />
                          {cheapestSupermarket.total.toLocaleString()}
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          +¥{(cheapestSupermarket.total - calculateTotalCost()).toLocaleString()} vs best prices
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Compare all supermarkets:</h4>
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { id: 'seijo', name: 'SEIJO ISHII', total: supermarketTotals.seijo },
                        { id: 'maruetsu', name: 'Maruetsu', total: supermarketTotals.maruetsu },
                        { id: 'ff', name: 'F & F', total: supermarketTotals.ff }
                      ].map(store => (
                        <div key={store.id} className={`p-3 rounded-lg border-2 ${
                          store.id === cheapestSupermarket.store 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-200 bg-gray-50'
                        }`}>
                          <div className="text-xs font-medium text-gray-600 mb-1">{store.name}</div>
                          <div className={`text-lg font-bold flex items-center ${
                            store.id === cheapestSupermarket.store ? 'text-blue-600' : 'text-gray-700'
                          }`}>
                            <Yen className="h-4 w-4 mr-1" />
                            {store.total.toLocaleString()}
                          </div>
                          {store.id === cheapestSupermarket.store && (
                            <div className="text-xs text-blue-600 font-medium mt-1">Cheapest!</div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {favoriteProducts.length === 0 ? (
              <div className="text-center py-12">
                <Star className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No favorites yet</h3>
                <p className="text-gray-500">
                  {searchTerm ? 'No favorite products match your search.' : 'Start adding products to your favorites by clicking the star icon.'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {favoriteProducts.map(product => (
                  <ProductCard key={product.id} product={product} showQuantity={true} />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'products' && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">All Products</h2>
              <p className="text-gray-600">
                Compare prices across all {stores.length} supermarkets
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} showAllPrices={true} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'locations' && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Store Locations</h2>
              <p className="text-gray-600">
                Find all {stores.length} supermarkets in Tokyo
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stores.map(store => (
                <StoreCard key={store.id} store={store} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Flag Price Modal */}
      {showFlagModal && flaggingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <div className="flex items-center mb-4">
              <Flag className="h-6 w-6 text-orange-500 mr-2" />
              <h3 className="text-lg font-bold text-gray-900">Flag Incorrect Price</h3>
            </div>
            
            <p className="text-gray-600 mb-4">
              Report an incorrect price for this product at {getStoreName(flaggingProduct.store)}.
            </p>
            
            <div className="space-y-3 mb-6">
              {[
                'Price is too high',
                'Price is too low',
                'Product is out of stock',
                'Wrong product information',
                'Other'
              ].map(reason => (
                <button
                  key={reason}
                  onClick={() => flagPrice(flaggingProduct.productId, flaggingProduct.store, reason)}
                  className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-orange-300 transition-colors duration-200"
                >
                  {reason}
                </button>
              ))}
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={() => {
                  setShowFlagModal(false);
                  setFlaggingProduct(null);
                }}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;