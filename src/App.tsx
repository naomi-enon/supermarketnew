import React, { useState, useMemo } from 'react';
import { Search, MapPin, Star, Camera, MessageSquare, X, BarChart3, Flag, Brain, ArrowRight, ChefHat, Sparkles, AlertTriangle } from 'lucide-react';
import RatingRow from './components/RatingRow';

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
  ratingAverage: number;
  ratingCount: number;
  ratingBreakdown: { "5": number; "4": number; "3": number; "2": number; "1": number };
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

interface AICompareResult {
  verdict: string;
  tradeoffs: string[];
  badges: { text: string; emoji: string; color: string }[];
  products: {
    id: number;
    name: string;
    score: number;
    pricePerUnit: number;
    normalizedUnit: string;
  }[];
}

const Yen = ({ className }: { className?: string }) => (
  <span className={className}>¥</span>
);

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
    ratingAverage: 0,
    ratingCount: 0,
    ratingBreakdown: { "5": 0, "4": 0, "3": 0, "2": 0, "1": 0 },
    image: 'https://images.pexels.com/photos/1059905/pexels-photo-1059905.jpeg'
  },
  {
    id: 2,
    name: 'Fresh Atlantic Salmon Fillet',
    category: 'Seafood',
    prices: { seijo: 1580, maruetsu: 1280, ff: 1450 },
    unit: '100g',
    ratingAverage: 0,
    ratingCount: 0,
    ratingBreakdown: { "5": 0, "4": 0, "3": 0, "2": 0, "1": 0 },
    image: 'https://images.pexels.com/photos/1647163/pexels-photo-1647163.jpeg'
  },
  {
    id: 3,
    name: 'Organic Vegetables Mix',
    category: 'Vegetables',
    prices: { seijo: 680, maruetsu: 520, ff: 450 },
    unit: '300g',
    ratingAverage: 0,
    ratingCount: 0,
    ratingBreakdown: { "5": 0, "4": 0, "3": 0, "2": 0, "1": 0 },
    image: 'https://images.pexels.com/photos/1400172/pexels-photo-1400172.jpeg'
  },
  {
    id: 4,
    name: 'Wagyu Beef A5 Grade',
    category: 'Meat',
    prices: { seijo: 8900, maruetsu: 7800, ff: 8200 },
    unit: '200g',
    ratingAverage: 0,
    ratingCount: 0,
    ratingBreakdown: { "5": 0, "4": 0, "3": 0, "2": 0, "1": 0 },
    image: 'https://images.pexels.com/photos/361184/asparagus-steak-veal-steak-veal-361184.jpeg'
  },
  {
    id: 5,
    name: 'Fresh Milk (1L)',
    category: 'Dairy',
    prices: { seijo: 380, maruetsu: 298, ff: 320 },
    unit: '1L',
    ratingAverage: 0,
    ratingCount: 0,
    ratingBreakdown: { "5": 0, "4": 0, "3": 0, "2": 0, "1": 0 },
    image: 'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg'
  },
  {
    id: 6,
    name: 'Artisan Bread Loaf',
    category: 'Bakery',
    prices: { seijo: 580, maruetsu: 380, ff: 420 },
    unit: '1 loaf',
    ratingAverage: 0,
    ratingCount: 0,
    ratingBreakdown: { "5": 0, "4": 0, "3": 0, "2": 0, "1": 0 },
    image: 'https://images.pexels.com/photos/209206/pexels-photo-209206.jpeg'
  },
  {
    id: 7,
    name: 'Premium Green Tea',
    category: 'Beverages',
    prices: { seijo: 1280, maruetsu: 980, ff: 1150 },
    unit: '100g',
    ratingAverage: 0,
    ratingCount: 0,
    ratingBreakdown: { "5": 0, "4": 0, "3": 0, "2": 0, "1": 0 },
    image: 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg'
  },
  {
    id: 8,
    name: 'Free-Range Eggs (12 pack)',
    category: 'Dairy',
    prices: { seijo: 580, maruetsu: 450, ff: 520 },
    unit: '12 eggs',
    ratingAverage: 0,
    ratingCount: 0,
    ratingBreakdown: { "5": 0, "4": 0, "3": 0, "2": 0, "1": 0 },
    image: 'https://images.pexels.com/photos/162712/egg-white-food-protein-162712.jpeg'
  },
  {
    id: 9,
    name: 'Imported Italian Pasta',
    category: 'Grains',
    prices: { seijo: 480, maruetsu: 320, ff: 380 },
    unit: '500g',
    ratingAverage: 0,
    ratingCount: 0,
    ratingBreakdown: { "5": 0, "4": 0, "3": 0, "2": 0, "1": 0 },
    image: 'https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg'
  },
  {
    id: 10,
    name: 'Fresh Seasonal Fruits',
    category: 'Fruits',
    prices: { seijo: 890, maruetsu: 680, ff: 750 },
    unit: '1kg',
    ratingAverage: 4.2,
    ratingCount: 15,
    ratingBreakdown: { "5": 8, "4": 4, "3": 2, "2": 1, "1": 0 },
    image: 'https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg'
  },
  {
    id: 11,
    name: 'Soy Sauce (Premium)',
    category: 'Condiments',
    prices: { seijo: 680, maruetsu: 480, ff: 580 },
    unit: '500ml',
    ratingAverage: 0,
    ratingCount: 0,
    ratingBreakdown: { "5": 0, "4": 0, "3": 0, "2": 0, "1": 0 },
    image: 'https://images.pexels.com/photos/6419733/pexels-photo-6419733.jpeg'
  },
  {
    id: 12,
    name: 'Miso Paste (White)',
    category: 'Condiments',
    prices: { seijo: 580, maruetsu: 420, ff: 480 },
    unit: '400g',
    ratingAverage: 0,
    ratingCount: 0,
    ratingBreakdown: { "5": 0, "4": 0, "3": 0, "2": 0, "1": 0 },
    image: 'https://images.pexels.com/photos/5949892/pexels-photo-5949892.jpeg'
  },
  {
    id: 13,
    name: 'Tofu (Silken)',
    category: 'Protein',
    prices: { seijo: 280, maruetsu: 180, ff: 220 },
    unit: '300g',
    ratingAverage: 0,
    ratingCount: 0,
    ratingBreakdown: { "5": 0, "4": 0, "3": 0, "2": 0, "1": 0 },
    image: 'https://images.pexels.com/photos/7625056/pexels-photo-7625056.jpeg'
  },
  {
    id: 14,
    name: 'Nori Seaweed Sheets',
    category: 'Condiments',
    prices: { seijo: 480, maruetsu: 320, ff: 380 },
    unit: '10 sheets',
    ratingAverage: 0,
    ratingCount: 0,
    ratingBreakdown: { "5": 0, "4": 0, "3": 0, "2": 0, "1": 0 },
    image: 'https://images.pexels.com/photos/5949915/pexels-photo-5949915.jpeg'
  },
  {
    id: 15,
    name: 'Japanese Mayonnaise',
    category: 'Condiments',
    prices: { seijo: 380, maruetsu: 280, ff: 320 },
    unit: '400g',
    ratingAverage: 0,
    ratingCount: 0,
    ratingBreakdown: { "5": 0, "4": 0, "3": 0, "2": 0, "1": 0 },
    image: 'https://images.pexels.com/photos/6419733/pexels-photo-6419733.jpeg'
  },
  {
    id: 16,
    name: 'King Salmon Fillet',
    category: 'Seafood',
    prices: { seijo: 4800, maruetsu: 4200, ff: 4500 },
    unit: '600g',
    ratingAverage: 3.8,
    ratingCount: 5,
    ratingBreakdown: { "5": 2, "4": 1, "3": 1, "2": 1, "1": 0 },
    ratingAverage: 3.8,
    ratingCount: 5,
    ratingBreakdown: { "5": 2, "4": 1, "3": 1, "2": 1, "1": 0 },
    reviews: [
      { stars: 5, text: "Rich flavor, thick cut, grills beautifully." },
      { stars: 5, text: "Moist texture, bright color, family favorite." },
      { stars: 4, text: "Fresh taste, good value, cooks evenly." },
      { stars: 3, text: "Decent quality, price is just okay." },
      { stars: 2, text: "Some bones found, uneven thickness." }
    ],
    image: 'https://images.pexels.com/photos/725991/pexels-photo-725991.jpeg'
  },
  {
    id: 17,
    name: 'Smoked Salmon',
    category: 'Seafood',
    prices: { seijo: 2300, maruetsu: 1800, ff: 2100 },
    unit: '200g',
    ratingAverage: 3.8,
    ratingCount: 12,
    ratingBreakdown: { "5": 4, "4": 5, "3": 2, "2": 1, "1": 0 },
    image: 'https://images.pexels.com/photos/3296434/pexels-photo-3296434.jpeg'
  },
  {
    id: 18,
    name: 'Udon Noodles (Fresh)',
    category: 'Grains',
    prices: { seijo: 380, maruetsu: 250, ff: 300 },
    unit: '300g',
    ratingAverage: 0,
    ratingCount: 0,
    ratingBreakdown: { "5": 0, "4": 0, "3": 0, "2": 0, "1": 0 },
    image: 'https://images.pexels.com/photos/5949915/pexels-photo-5949915.jpeg'
  },
  {
    id: 19,
    name: 'Shiitake Mushrooms',
    category: 'Vegetables',
    prices: { seijo: 580, maruetsu: 420, ff: 480 },
    unit: '200g',
    ratingAverage: 0,
    ratingCount: 0,
    ratingBreakdown: { "5": 0, "4": 0, "3": 0, "2": 0, "1": 0 },
    image: 'https://images.pexels.com/photos/1618900/pexels-photo-1618900.jpeg'
  },
  {
    id: 20,
    name: 'Japanese Pickles Mix',
    category: 'Condiments',
    prices: { seijo: 480, maruetsu: 320, ff: 380 },
    unit: '200g',
    ratingAverage: 0,
    ratingCount: 0,
    ratingBreakdown: { "5": 0, "4": 0, "3": 0, "2": 0, "1": 0 },
    image: 'https://images.pexels.com/photos/5949915/pexels-photo-5949915.jpeg'
  },
  {
    id: 21,
    name: 'Matcha Powder (Ceremonial)',
    category: 'Beverages',
    prices: { seijo: 2800, maruetsu: 2200, ff: 2500 },
    unit: '50g',
    ratingAverage: 0,
    ratingCount: 0,
    ratingBreakdown: { "5": 0, "4": 0, "3": 0, "2": 0, "1": 0 },
    image: 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg'
  },
  {
    id: 22,
    name: 'Dashi Stock (Instant)',
    category: 'Condiments',
    prices: { seijo: 580, maruetsu: 380, ff: 480 },
    unit: '100g',
    ratingAverage: 0,
    ratingCount: 0,
    ratingBreakdown: { "5": 0, "4": 0, "3": 0, "2": 0, "1": 0 },
    image: 'https://images.pexels.com/photos/6419733/pexels-photo-6419733.jpeg'
  },
  {
    id: 23,
    name: 'Panko Breadcrumbs',
    category: 'Condiments',
    prices: { seijo: 280, maruetsu: 180, ff: 220 },
    unit: '200g',
    ratingAverage: 0,
    ratingCount: 0,
    ratingBreakdown: { "5": 0, "4": 0, "3": 0, "2": 0, "1": 0 },
    image: 'https://images.pexels.com/photos/209206/pexels-photo-209206.jpeg'
  },
  {
    id: 24,
    name: 'Japanese Curry Roux',
    category: 'Condiments',
    prices: { seijo: 380, maruetsu: 250, ff: 300 },
    unit: '200g',
    ratingAverage: 0,
    ratingCount: 0,
    ratingBreakdown: { "5": 0, "4": 0, "3": 0, "2": 0, "1": 0 },
    image: 'https://images.pexels.com/photos/2161543/pexels-photo-2161543.jpeg'
  },
  {
    id: 25,
    name: 'Tempura Flour Mix',
    category: 'Grains',
    prices: { seijo: 480, maruetsu: 320, ff: 380 },
    unit: '500g',
    ratingAverage: 0,
    ratingCount: 0,
    ratingBreakdown: { "5": 0, "4": 0, "3": 0, "2": 0, "1": 0 },
    image: 'https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg'
  },
  {
    id: 26,
    name: 'Wasabi Paste (Fresh)',
    category: 'Condiments',
    prices: { seijo: 880, maruetsu: 680, ff: 750 },
    unit: '40g',
    ratingAverage: 0,
    ratingCount: 0,
    ratingBreakdown: { "5": 0, "4": 0, "3": 0, "2": 0, "1": 0 },
    image: 'https://images.pexels.com/photos/5949915/pexels-photo-5949915.jpeg'
  },
  {
    id: 27,
    name: 'Japanese Sweet Potato',
    category: 'Vegetables',
    prices: { seijo: 480, maruetsu: 320, ff: 380 },
    unit: '500g',
    ratingAverage: 0,
    ratingCount: 0,
    ratingBreakdown: { "5": 0, "4": 0, "3": 0, "2": 0, "1": 0 },
    image: 'https://images.pexels.com/photos/1400172/pexels-photo-1400172.jpeg'
  },
  {
    id: 28,
    name: 'Sake (Junmai)',
    category: 'Beverages',
    prices: { seijo: 1880, maruetsu: 1450, ff: 1680 },
    unit: '720ml',
    ratingAverage: 0,
    ratingCount: 0,
    ratingBreakdown: { "5": 0, "4": 0, "3": 0, "2": 0, "1": 0 },
    image: 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg'
  },
  {
    id: 29,
    name: 'Ramen Noodles (Instant)',
    category: 'Grains',
    prices: { seijo: 180, maruetsu: 120, ff: 150 },
    unit: '1 pack',
    ratingAverage: 0,
    ratingCount: 0,
    ratingBreakdown: { "5": 0, "4": 0, "3": 0, "2": 0, "1": 0 },
    image: 'https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg'
  },
  {
    id: 30,
    name: 'Japanese Cucumber',
    category: 'Vegetables',
    prices: { seijo: 280, maruetsu: 180, ff: 220 },
    unit: '3 pieces',
    ratingAverage: 0,
    ratingCount: 0,
    ratingBreakdown: { "5": 0, "4": 0, "3": 0, "2": 0, "1": 0 },
    image: 'https://images.pexels.com/photos/1400172/pexels-photo-1400172.jpeg'
  },
  {
    id: 31,
    name: 'Gyoza Wrappers',
    category: 'Grains',
    prices: { seijo: 380, maruetsu: 250, ff: 300 },
    unit: '30 pieces',
    ratingAverage: 0,
    ratingCount: 0,
    ratingBreakdown: { "5": 0, "4": 0, "3": 0, "2": 0, "1": 0 },
    image: 'https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg'
  },
  {
    id: 32,
    name: 'Japanese Pork Belly',
    category: 'Meat',
    prices: { seijo: 1280, maruetsu: 980, ff: 1150 },
    unit: '300g',
    ratingAverage: 0,
    ratingCount: 0,
    ratingBreakdown: { "5": 0, "4": 0, "3": 0, "2": 0, "1": 0 },
    image: 'https://images.pexels.com/photos/361184/asparagus-steak-veal-steak-veal-361184.jpeg'
  }
];

// Demo rating data for the three salmon products
const ratingData = {
  "SAL-ATL-100": {
    "id": "SAL-ATL-100",
    "name": "Fresh Atlantic Salmon Fillet",
    "size": "500g",
    "ratingAverage": 0,
    "ratingCount": 0,
    "ratingBreakdown": { "5": 0, "4": 0, "3": 0, "2": 0, "1": 0 }
  },
  "SAL-KING-600": {
    "id": "SAL-KING-600", 
    "name": "King Salmon Fillet",
    "size": "600g",
    "ratingAverage": 0,
    "ratingCount": 0,
    "ratingBreakdown": { "5": 0, "4": 0, "3": 0, "2": 0, "1": 0 }
  },
  "SAL-SMOK-200": {
    "id": "SAL-SMOK-200",
    "name": "Smoked Salmon", 
    "size": "200g",
    "ratingAverage": 0,
    "ratingCount": 0,
    "ratingBreakdown": { "5": 0, "4": 0, "3": 0, "2": 0, "1": 0 }
  }
};

// Helper function to format rating
const formatRating = (avg: number): string => {
  return avg.toFixed(1);
};

// Helper function to render stars
const renderStars = (rating: number, size: 'sm' | 'lg' = 'sm') => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  
  const starSize = size === 'lg' ? 'w-6 h-6' : 'w-4 h-4';
  
  // Full stars
  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <Star key={`full-${i}`} className={`${starSize} fill-yellow-400 text-yellow-400`} />
    );
  }
  
  // Half star
  if (hasHalfStar) {
    stars.push(
      <div key="half" className={`${starSize} relative`}>
        <Star className={`${starSize} text-gray-300 absolute`} />
        <div className="overflow-hidden w-1/2">
          <Star className={`${starSize} fill-yellow-400 text-yellow-400`} />
        </div>
      </div>
    );
  }
  
  // Empty stars
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <Star key={`empty-${i}`} className={`${starSize} text-gray-300`} />
    );
  }
  
  return stars;
};

// Review Modal Component
const ReviewModal = ({ product, isOpen, onClose }: { 
  product: any, 
  isOpen: boolean, 
  onClose: () => void 
}) => {
  const [showReviews, setShowReviews] = useState(false);
  
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  const handleWriteReview = () => {
    onClose();
    alert('Coming soon');
  };

  // Calculate percentages for distribution bars
  const getPercentage = (count: number, total: number): number => {
    return total === 0 ? 0 : Math.round((count / total) * 100);
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      {/* Review modal */}
      <div 
        className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4 md:mx-0"
        role="dialog"
        aria-modal="true"
        aria-labelledby={`rating-panel-${product.id}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              {renderStars(product.ratingAverage, 'lg')}
            </div>
            <span className="text-2xl font-bold">
              {formatRating(product.ratingAverage)}/5
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close review panel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Total count */}
          <p className="text-gray-600 mb-6">
            {product.ratingCount > 0 
              ? `${product.ratingCount} reviews` 
              : 'No reviews yet'
            }
          </p>

          {/* Distribution bars */}
          <div className="space-y-3 mb-6">
            {[5, 4, 3, 2, 1].map((star) => {
              const count = product.ratingBreakdown[star.toString()];
              const percentage = getPercentage(count, product.ratingCount);
              
              return (
                <div key={star} className="flex items-center gap-3">
                  <span className="text-sm font-medium w-8">{star}★</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-10 text-right">
                    {percentage}%
                  </span>
                </div>
              );
            })}
          </div>

          {/* No reviews state */}
          {product.ratingCount === 0 && (
            <div className="text-center py-4 text-gray-500">
              No reviews yet — be the first to review.
            </div>
          )}

          {/* Action buttons */}
          <div className="flex gap-4 pt-4 border-t">
            <button
              disabled={product.ratingCount === 0}
              onClick={() => setShowReviews(true)}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                product.ratingCount === 0
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
              }`}
            >
              Read customer reviews
            </button>
            <button
              onClick={handleWriteReview}
              className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Write a review
            </button>
          </div>

          {showReviews && product && (
            <div id="reviews-list" className="mt-4 border-t pt-4 space-y-3">
              {product.reviews && product.reviews.length > 0 ? (
                product.reviews.slice(0,5).map((r, i) => (
                  <div key={i} className="text-sm">
                    <span className="text-amber-500 mr-2">
                      {"★".repeat(r.stars)}{"☆".repeat(5 - r.stars)}
                    </span>
                    <span className="text-slate-800">{r.text}</span>
                  </div>
                ))
              ) : (
                <div className="text-slate-500">No reviews yet — be the first to review.</div>
              )}
              <div className="mt-3">
                <button className="text-emerald-700 underline" onClick={() => setShowReviews(false)}>
                  Hide reviews
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

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
  const [activeAIFeature, setActiveAIFeature] = useState<string | null>(null);
  const [aiCompareQuery, setAiCompareQuery] = useState('');
  const [aiCompareResult, setAiCompareResult] = useState<AICompareResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedProductForReview, setSelectedProductForReview] = useState<any>(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

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

  const performAICompare = async (query: string) => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis with realistic delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Find matching products based on query
    const matchingProducts = products.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 4); // Limit to top 4 matches
    
    if (matchingProducts.length === 0) {
      setAiCompareResult({
        verdict: "No products found matching your search. Try searching for items like 'milk', 'rice', 'salmon', or 'bread'.",
        tradeoffs: [],
        badges: [],
        products: []
      });
      setIsAnalyzing(false);
      return;
    }
    
    // Simulate AI analysis results
    const analyzedProducts = matchingProducts.map(product => {
      const lowestPrice = getLowestPrice(product.prices);
      // Simulate normalized pricing and scoring
      const pricePerUnit = lowestPrice / parseFloat(product.unit.replace(/[^\d.]/g, '') || '1');
      const score = Math.random() * 40 + 60; // Random score between 60-100
      
      return {
        id: product.id,
        name: product.name,
        score: Math.round(score),
        pricePerUnit: Math.round(pricePerUnit),
        normalizedUnit: '100g'
      };
    }).sort((a, b) => b.score - a.score);
    
    const topProduct = analyzedProducts[0];
    const secondProduct = analyzedProducts[1];
    
    // Generate realistic AI verdict and analysis
    const verdicts = [
      `${topProduct.name} is your best choice - it offers excellent value at ¥${topProduct.pricePerUnit}/100g with superior nutritional profile.`,
      `Go with ${topProduct.name} for the best balance of price, quality, and health benefits at this price point.`,
      `${topProduct.name} wins on both value and nutrition, making it the smart choice for your regular shopping.`
    ];
    
    const tradeoffs = [
      `💰 Price: ${topProduct.name} costs ¥${topProduct.pricePerUnit}/100g vs ${secondProduct?.name || 'alternatives'} at ¥${secondProduct?.pricePerUnit || 'higher'}/100g`,
      `🥗 Nutrition: Higher protein content and lower sodium compared to most alternatives`,
      `⭐ Quality: Premium grade with consistent freshness based on customer reviews`,
      `🏪 Availability: Consistently in stock across all three supermarkets`,
      secondProduct ? `🔄 Alternative: ${secondProduct.name} is a solid backup choice if primary option unavailable` : '🎯 Clear winner: Significantly outperforms all alternatives'
    ];
    
    const badges = [
      { text: 'Best Value', emoji: '💲', color: 'bg-green-100 text-green-800' },
      { text: 'Healthier Choice', emoji: '🥦', color: 'bg-blue-100 text-blue-800' },
      { text: 'Top Rated', emoji: '⭐', color: 'bg-yellow-100 text-yellow-800' }
    ];
    
    setAiCompareResult({
      verdict: verdicts[Math.floor(Math.random() * verdicts.length)],
      tradeoffs: tradeoffs.slice(0, 4),
      badges: badges.slice(0, 2),
      products: analyzedProducts
    });
    
    setIsAnalyzing(false);
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

  // Handle rating click
  const handleRatingClick = (product: any) => {
    setSelectedProductForReview({
      ...product,
      ratingAverage: product.ratingAverage ?? 0,
      ratingCount: product.ratingCount ?? 0,
      ratingBreakdown: product.ratingBreakdown ?? {5:0,4:0,3:0,2:0,1:0},
      reviews: product.reviews ?? []
    });
    setIsReviewModalOpen(true);
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

    // Get rating data for this product
    const ratingKey = product.name.includes('Fresh Atlantic Salmon') ? 'SAL-ATL-100' :
                     product.name.includes('King Salmon') ? 'SAL-KING-600' :
                     product.name.includes('Smoked Salmon') ? 'SAL-SMOK-200' : null;
    const rating = ratingKey ? ratingData[ratingKey] : null;

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
          
          {/* Rating row for all products */}
          <RatingRow
            average={product.ratingAverage ?? 0}
            count={product.ratingCount ?? 0}
            onClick={() => handleRatingClick(product)}
          />
          
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
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-bold text-gray-800 mb-1">{store.name}</h3>
            <div className="flex items-center text-gray-600 mb-2">
              <MapPin className="h-4 w-4 mr-1" />
              <span className="text-sm">{store.address}</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600">
            <span className="text-sm font-medium mr-2">Hours:</span>
            <span className="text-sm">{store.hours}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <span className="text-sm font-medium mr-2">Phone:</span>
            <span className="text-sm text-emerald-600">{store.phone}</span>
          </div>
        </div>
        
        <button className="w-full mt-4 bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors duration-200">
          Get Directions
        </button>
      </div>
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
              { id: 'favorites', label: 'My Favorites', count: favorites.size },
              { id: 'shop-smart', label: 'Shop Smart', count: 3 }
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
        {activeTab === 'shop-smart' && (
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Shop Smart with AI</h2>
              <p className="text-gray-600">
                Let AI help you make smarter shopping decisions with personalized recommendations
              </p>
            </div>
            
            {!activeAIFeature ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* AI Compare Card */}
                <div 
                  onClick={() => setActiveAIFeature('compare')}
                  className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-8 cursor-pointer group border-2 border-transparent hover:border-blue-200"
                >
                  <div className="flex items-center justify-center w-16 h-16 bg-blue-500 rounded-full mb-6 group-hover:scale-110 transition-transform duration-200">
                    <Brain className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">AI Compare</h3>
                  <p className="text-gray-600 mb-4">
                    Get personalized product recommendations based on price, nutrition, quality, and your preferences.
                  </p>
                  <div className="flex items-center text-blue-600 font-medium group-hover:translate-x-1 transition-transform duration-200">
                    Start Comparing <ArrowRight className="h-4 w-4 ml-2" />
                  </div>
                </div>
                
                {/* AI Review Scan Card */}
                <div 
                  onClick={() => setActiveAIFeature('scan')}
                  className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-8 cursor-pointer group border-2 border-transparent hover:border-green-200"
                >
                  <div className="flex items-center justify-center w-16 h-16 bg-green-500 rounded-full mb-6 group-hover:scale-110 transition-transform duration-200">
                    <Camera className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">AI Review Summary</h3>
                  <p className="text-gray-600 mb-8">
                    Summarizes customer reviews with AI.

                    
                  </p>
                  <div className="flex items-center text-green-600 font-medium group-hover:translate-x-1 transition-transform duration-200">
                    Start Summarizing <ArrowRight className="h-4 w-4 ml-2" />
                  </div>
                </div>
                
                {/* AI Recipe Maker Card */}
                <div 
                  onClick={() => setActiveAIFeature('recipe')}
                  className="bg-gradient-to-br from-purple-50 to-violet-100 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-8 cursor-pointer group border-2 border-transparent hover:border-purple-200"
                >
                  <div className="flex items-center justify-center w-16 h-16 bg-purple-500 rounded-full mb-6 group-hover:scale-110 transition-transform duration-200">
                    <ChefHat className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">AI Recipe Maker</h3>
                  <p className="text-gray-600 mb-4">
                    Create personalized recipes using your favorite products and dietary preferences.
                  </p>
                  <div className="flex items-center text-purple-600 font-medium group-hover:translate-x-1 transition-transform duration-200">
                    Create Recipes <ArrowRight className="h-4 w-4 ml-2" />
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <button
                  onClick={() => setActiveAIFeature(null)}
                  className="mb-6 flex items-center text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
                  Back to AI Features
                </button>
                
                {activeAIFeature === 'compare' && (
                  <div className="bg-white rounded-xl shadow-md p-8">
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">AI Product Compare</h3>
                      <p className="text-gray-600">
                        Get intelligent recommendations based on price, nutrition, quality, and your preferences
                      </p>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="relative mb-6">
                        <input
                          type="text"
                          placeholder="What product are you looking for? (e.g., milk, rice, salmon)"
                          value={aiCompareQuery}
                          onChange={(e) => setAiCompareQuery(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-24"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter' && aiCompareQuery.trim()) {
                              performAICompare(aiCompareQuery.trim());
                            }
                          }}
                        />
                        <button
                          onClick={() => aiCompareQuery.trim() && performAICompare(aiCompareQuery.trim())}
                          disabled={!aiCompareQuery.trim() || isAnalyzing}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                        >
                          {isAnalyzing ? (
                            <>
                              <Sparkles className="h-4 w-4 mr-1 animate-spin" />
                              Analyzing
                            </>
                          ) : (
                            <>
                              <Sparkles className="h-4 w-4 mr-1" />
                              Analyze
                            </>
                          )}
                        </button>
                      </div>
                      
                      {aiCompareResult && (
                        <div className="space-y-6">
                          {aiCompareResult.products.length > 0 && (
                            <>
                              {/* Matching Products Display */}
                              <div>
                                <h4 className="font-bold text-gray-900 mb-4">Comparing These Products</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                                  {aiCompareResult.products.map((product) => {
                                    const fullProduct = products.find(p => p.id === product.id);
                                    if (!fullProduct) return null;
                                    
                                    return (
                                      <div key={product.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                                        <div className="relative">
                                          <img
                                            src={fullProduct.image}
                                            alt={fullProduct.name}
                                            className="w-full h-32 object-cover"
                                          />
                                          <div className="absolute top-2 right-2">
                                            <span className="bg-emerald-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                                              {fullProduct.category}
                                            </span>
                                          </div>
                                        </div>
                                        <div className="p-3">
                                          <h5 className="font-medium text-gray-900 text-sm mb-1 line-clamp-2">
                                            {fullProduct.name}
                                          </h5>
                                          <p className="text-xs text-gray-500 mb-2">{fullProduct.unit}</p>
                                          <div className="flex justify-between items-center">
                                            <div className="text-sm text-gray-600">
                                              Best at <span className="font-medium text-emerald-600">
                                                {getStoreName(getLowestPriceStore(fullProduct.prices))}
                                              </span>
                                            </div>
                                            <div className="font-bold text-emerald-600 flex items-center text-sm">
                                              <Yen className="h-3 w-3 mr-1" />
                                              {getLowestPrice(fullProduct.prices).toLocaleString()}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                              
                              {/* AI Verdict */}
                              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                                <div className="flex items-start">
                                  <div className="flex items-center justify-center w-8 h-8 bg-blue-500 rounded-full mr-3 mt-0.5">
                                    <Sparkles className="h-4 w-4 text-white" />
                                  </div>
                                  <div className="flex-1">
                                    <h4 className="font-bold text-blue-900 mb-2">AI Recommendation</h4>
                                    <p className="text-blue-800 text-lg leading-relaxed">{aiCompareResult.verdict}</p>
                                  </div>
                                </div>
                              </div>
                              
                              {/* Badges */}
                              {aiCompareResult.badges.length > 0 && (
                                <div className="flex flex-wrap gap-3">
                                  {aiCompareResult.badges.map((badge, index) => (
                                    <span key={index} className={`px-3 py-1 rounded-full text-sm font-medium ${badge.color}`}>
                                      {badge.emoji} {badge.text}
                                    </span>
                                  ))}
                                </div>
                              )}
                              
                              {/* Trade-offs */}
                              <div>
                                <h4 className="font-bold text-gray-900 mb-3">Key Differences</h4>
                                <div className="space-y-2">
                                  {aiCompareResult.tradeoffs.map((tradeoff, index) => (
                                    <div key={index} className="flex items-start">
                                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                      <p className="text-gray-700">{tradeoff}</p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              
                              {/* Product Comparison */}
                              <div>
                                <h4 className="font-bold text-gray-900 mb-4">Product Scores</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  {aiCompareResult.products.map((product, index) => {
                                    const fullProduct = products.find(p => p.id === product.id);
                                    return (
                                      <div key={product.id} className={`p-4 rounded-lg border-2 ${
                                        index === 0 ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-gray-50'
                                      }`}>
                                        <div className="flex items-center justify-between mb-2">
                                          <h5 className="font-medium text-gray-900 text-sm">{product.name}</h5>
                                          {index === 0 && (
                                            <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                                              Best Choice
                                            </span>
                                          )}
                                        </div>
                                        <div className="flex items-center justify-between">
                                          <div className="text-sm text-gray-600">
                                            AI Score: <span className="font-bold text-gray-900">{product.score}/100</span>
                                          </div>
                                          <div className="text-sm text-gray-600">
                                            ¥{product.pricePerUnit}/{product.normalizedUnit}
                                          </div>
                                        </div>
                                        <div className="mt-2 bg-gray-200 rounded-full h-2">
                                          <div 
                                            className={`h-2 rounded-full ${index === 0 ? 'bg-blue-500' : 'bg-gray-400'}`}
                                            style={{ width: `${product.score}%` }}
                                          ></div>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            </>
                          )}
                          
                          {aiCompareResult.products.length === 0 && (
                            <div className="text-center py-8">
                              <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                              <p className="text-gray-600">{aiCompareResult.verdict}</p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}
                
                {activeAIFeature === 'scan' && (
                  <div className="bg-white rounded-xl shadow-md p-8">
                    <div className="text-center py-12">
                      <Camera className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">AI Review Summary</h3>
                      <p className="text-gray-500">Coming soon! Scan product labels for instant health insights.</p>
                    </div>
                  </div>
                )}
                
                {activeAIFeature === 'recipe' && (
                  <div className="bg-white rounded-xl shadow-md p-8">
                    <div className="text-center py-12">
                      <ChefHat className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">AI Recipe Maker</h3>
                      <p className="text-gray-500">Coming soon! Create recipes from your favorite products.</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

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
              <Flag className="w-6 h-6 text-orange-500 mr-3" />
              <h3 className="text-lg font-semibold text-gray-900">Flag Price Issue</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Help us improve by reporting price issues. What's wrong with this price?
            </p>
            
            <div className="space-y-2 mb-6">
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
                className="flex-1 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Review Modal */}
      <ReviewModal 
        product={selectedProductForReview}
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
      />
    </div>
  );
}

export default App;