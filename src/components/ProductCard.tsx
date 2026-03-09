import { useState } from "react";
import Icon from "@/components/ui/icon";

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  unit: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  badge?: string;
  image: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onAddToCompare: (product: Product) => void;
  onOpenProduct: (product: Product) => void;
  isCompared?: boolean;
}

export default function ProductCard({ product, onAddToCart, onAddToCompare, onOpenProduct, isCompared }: ProductCardProps) {
  const [liked, setLiked] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const discount = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : null;

  return (
    <div className="group bg-white border border-gray-100 hover:border-gray-300 hover:shadow-md transition-all duration-300 flex flex-col">
      {/* Image */}
      <div className="relative overflow-hidden aspect-square bg-gray-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
          onClick={() => onOpenProduct(product)}
        />
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.badge && (
            <span className="bg-[#141414] text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wide">
              {product.badge}
            </span>
          )}
          {discount && (
            <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-1">
              -{discount}%
            </span>
          )}
        </div>
        {/* Actions */}
        <div className="absolute top-2 right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => setLiked(!liked)}
            className="w-8 h-8 bg-white shadow-sm flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <Icon name="Heart" size={14} className={liked ? "text-red-500 fill-red-500" : "text-gray-500"} />
          </button>
          <button
            onClick={() => onAddToCompare(product)}
            className={`w-8 h-8 bg-white shadow-sm flex items-center justify-center hover:bg-gray-50 transition-colors ${isCompared ? "bg-gray-100" : ""}`}
          >
            <Icon name="BarChart2" size={14} className={isCompared ? "text-brand" : "text-gray-500"} />
          </button>
        </div>
        {!product.inStock && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
            <span className="text-sm font-medium text-gray-500">Нет в наличии</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <div className="text-[11px] text-gray-400 uppercase tracking-wide mb-1">{product.category}</div>
        <h3
          className="text-sm font-medium text-[#141414] leading-snug mb-2 cursor-pointer hover:text-gray-600 transition-colors line-clamp-2"
          onClick={() => onOpenProduct(product)}
        >
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Icon
                key={star}
                name="Star"
                size={12}
                className={star <= Math.round(product.rating) ? "text-brand fill-brand" : "text-gray-200 fill-gray-200"}
              />
            ))}
          </div>
          <span className="text-[11px] text-gray-400">({product.reviews})</span>
        </div>

        <div className="mt-auto">
          {/* Price */}
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-xl font-bold text-[#141414] font-display">
              {product.price.toLocaleString("ru-RU")} ₽
            </span>
            <span className="text-xs text-gray-400">/ {product.unit}</span>
            {product.oldPrice && (
              <span className="text-sm text-gray-400 line-through ml-1">
                {product.oldPrice.toLocaleString("ru-RU")} ₽
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`w-full py-2.5 text-sm font-medium transition-all duration-200 ${
              added
                ? "bg-green-500 text-white"
                : product.inStock
                ? "bg-[#141414] text-white hover:bg-gray-800"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            {added ? (
              <span className="flex items-center justify-center gap-1">
                <Icon name="Check" size={14} /> Добавлено
              </span>
            ) : (
              <span className="flex items-center justify-center gap-1">
                <Icon name="ShoppingCart" size={14} />
                В корзину
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
