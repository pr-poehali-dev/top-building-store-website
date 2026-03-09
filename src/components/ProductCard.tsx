import { useState } from "react";
import Icon from "@/components/ui/icon";
import type { Product } from "@/data/products";

export type { Product };

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onAddToCompare: (product: Product) => void;
  onOpenProduct: (product: Product) => void;
  isCompared?: boolean;
  tableMode?: boolean;
}

export default function ProductCard({ product, onAddToCart, onAddToCompare, onOpenProduct, isCompared, tableMode }: ProductCardProps) {
  const [liked, setLiked] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const discount = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : null;

  if (tableMode) {
    return (
      <div
        className="flex gap-3 border-b border-gray-100 py-3 hover:bg-gray-50 transition-colors cursor-pointer px-2"
        onClick={() => onOpenProduct(product)}
      >
        <img src={product.image} alt={product.name} className="w-12 h-12 object-cover flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-[#141414] leading-tight line-clamp-2">{product.name}</div>
          <div className="text-xs text-gray-400 mt-0.5">{product.brand} · {product.sku}</div>
        </div>
        <div className="flex items-center gap-4 flex-shrink-0">
          <div className={`text-xs font-medium px-1.5 py-0.5 ${product.inStock ? "text-green-700 bg-green-50" : "text-red-600 bg-red-50"}`}>
            {product.inStock ? "В наличии" : "Нет"}
          </div>
          <div className="text-right min-w-[80px]">
            <div className="font-bold font-display text-[#141414]">{product.price.toLocaleString("ru-RU")} ₽</div>
            <div className="text-xs text-gray-400">/ {product.unit}</div>
          </div>
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap ${
              added ? "bg-green-500 text-white" : product.inStock ? "bg-[#141414] text-white hover:bg-gray-700" : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            {added ? "✓" : "+ В корзину"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="group bg-white border border-gray-100 hover:border-gray-300 hover:shadow-md transition-all duration-200 flex flex-col">
      <div className="relative overflow-hidden aspect-square bg-gray-50 cursor-pointer" onClick={() => onOpenProduct(product)}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.badge && (
            <span className="bg-[#141414] text-white text-[10px] font-bold px-2 py-0.5 uppercase tracking-wide">
              {product.badge}
            </span>
          )}
          {discount && (
            <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5">−{discount}%</span>
          )}
        </div>
        <div className="absolute top-2 right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => { e.stopPropagation(); setLiked(!liked); }}
            className="w-7 h-7 bg-white shadow flex items-center justify-center hover:bg-gray-50"
          >
            <Icon name="Heart" size={13} className={liked ? "text-red-500 fill-red-500" : "text-gray-500"} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onAddToCompare(product); }}
            className={`w-7 h-7 bg-white shadow flex items-center justify-center hover:bg-gray-50 ${isCompared ? "bg-brand/10" : ""}`}
          >
            <Icon name="BarChart2" size={13} className={isCompared ? "text-brand" : "text-gray-500"} />
          </button>
        </div>
        {!product.inStock && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
            <span className="text-xs font-medium text-gray-500 bg-white px-2 py-1 border border-gray-200">Нет в наличии</span>
          </div>
        )}
      </div>

      <div className="p-3 flex flex-col flex-1">
        <div className="text-[10px] text-gray-400 uppercase tracking-wide mb-1">{product.brand}</div>
        <h3
          className="text-sm font-medium text-[#141414] leading-snug mb-2 cursor-pointer hover:text-gray-600 line-clamp-2 flex-1"
          onClick={() => onOpenProduct(product)}
        >
          {product.name}
        </h3>

        <div className="flex items-center gap-1 mb-2">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((s) => (
              <Icon key={s} name="Star" size={11} className={s <= Math.round(product.rating) ? "text-brand fill-brand" : "text-gray-200 fill-gray-200"} />
            ))}
          </div>
          <span className="text-[10px] text-gray-400">({product.reviews})</span>
        </div>

        <div className="flex items-baseline gap-1.5 mb-2">
          <span className="text-lg font-bold text-[#141414] font-display">
            {product.price.toLocaleString("ru-RU")} ₽
          </span>
          <span className="text-xs text-gray-400">/ {product.unit}</span>
          {product.oldPrice && (
            <span className="text-xs text-gray-400 line-through">{product.oldPrice.toLocaleString("ru-RU")} ₽</span>
          )}
        </div>

        <div className="mb-2.5">
          <span className={`text-[11px] font-medium ${product.inStock ? "text-green-600" : "text-red-500"}`}>
            {product.inStock ? "● В наличии" : "● Нет в наличии"}
          </span>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className={`w-full py-2 text-xs font-medium transition-all duration-200 ${
            added
              ? "bg-green-500 text-white"
              : product.inStock
              ? "bg-[#141414] text-white hover:bg-gray-800"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
        >
          {added ? "✓ Добавлено" : product.inStock ? "+ В корзину" : "Нет в наличии"}
        </button>
      </div>
    </div>
  );
}
