import { useState, useMemo } from "react";
import Icon from "@/components/ui/icon";
import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/data/products";
import type { Product } from "@/components/ProductCard";

interface CatalogPageProps {
  onAddToCart: (p: Product) => void;
  onAddToCompare: (p: Product) => void;
  onOpenProduct: (p: Product) => void;
  compareIds: number[];
}

const sortOptions = [
  { value: "popular", label: "По популярности" },
  { value: "price_asc", label: "Сначала дешевле" },
  { value: "price_desc", label: "Сначала дороже" },
  { value: "rating", label: "По рейтингу" },
];

export default function CatalogPage({ onAddToCart, onAddToCompare, onOpenProduct, compareIds }: CatalogPageProps) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState("popular");
  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [onlyDiscount, setOnlyDiscount] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filtered = useMemo(() => {
    let result = [...products];
    if (activeCategory !== "all") {
      result = result.filter((p) => p.category.toLowerCase().includes(activeCategory));
    }
    if (priceFrom) result = result.filter((p) => p.price >= Number(priceFrom));
    if (priceTo) result = result.filter((p) => p.price <= Number(priceTo));
    if (onlyInStock) result = result.filter((p) => p.inStock);
    if (onlyDiscount) result = result.filter((p) => p.oldPrice);

    switch (sortBy) {
      case "price_asc": result.sort((a, b) => a.price - b.price); break;
      case "price_desc": result.sort((a, b) => b.price - a.price); break;
      case "rating": result.sort((a, b) => b.rating - a.rating); break;
    }
    return result;
  }, [activeCategory, sortBy, priceFrom, priceTo, onlyInStock, onlyDiscount]);

  return (
    <div className="py-8">
      <div className="container">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-6">
          <span>Главная</span>
          <Icon name="ChevronRight" size={12} />
          <span className="text-[#141414]">Каталог</span>
        </div>

        <h1 className="font-display text-4xl font-bold uppercase text-[#141414] mb-8">Каталог товаров</h1>

        <div className="flex gap-6">
          {/* Sidebar filters */}
          <aside className="w-56 flex-shrink-0 hidden md:block">
            <div className="sticky top-24 space-y-6">
              {/* Categories */}
              <div>
                <h3 className="font-display font-semibold uppercase text-sm tracking-wide text-[#141414] mb-3">
                  Категории
                </h3>
                <div className="space-y-1">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`w-full text-left flex items-center gap-2 px-3 py-2 text-sm transition-colors ${
                        activeCategory === cat.id
                          ? "bg-[#141414] text-white"
                          : "text-gray-600 hover:bg-gray-50 hover:text-[#141414]"
                      }`}
                    >
                      <Icon name={cat.icon} size={14} />
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price filter */}
              <div>
                <h3 className="font-display font-semibold uppercase text-sm tracking-wide text-[#141414] mb-3">
                  Цена, ₽
                </h3>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="От"
                    value={priceFrom}
                    onChange={(e) => setPriceFrom(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 text-sm focus:outline-none focus:border-[#141414]"
                  />
                  <input
                    type="number"
                    placeholder="До"
                    value={priceTo}
                    onChange={(e) => setPriceTo(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 text-sm focus:outline-none focus:border-[#141414]"
                  />
                </div>
              </div>

              {/* Checkboxes */}
              <div className="space-y-3">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <div
                    className={`w-4 h-4 border flex items-center justify-center flex-shrink-0 transition-colors ${
                      onlyInStock ? "bg-[#141414] border-[#141414]" : "border-gray-300 group-hover:border-[#141414]"
                    }`}
                    onClick={() => setOnlyInStock(!onlyInStock)}
                  >
                    {onlyInStock && <Icon name="Check" size={10} className="text-white" />}
                  </div>
                  <span className="text-sm text-gray-600">Только в наличии</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <div
                    className={`w-4 h-4 border flex items-center justify-center flex-shrink-0 transition-colors ${
                      onlyDiscount ? "bg-[#141414] border-[#141414]" : "border-gray-300 group-hover:border-[#141414]"
                    }`}
                    onClick={() => setOnlyDiscount(!onlyDiscount)}
                  >
                    {onlyDiscount && <Icon name="Check" size={10} className="text-white" />}
                  </div>
                  <span className="text-sm text-gray-600">Товары со скидкой</span>
                </label>
              </div>

              <button
                onClick={() => {
                  setPriceFrom(""); setPriceTo(""); setOnlyInStock(false); setOnlyDiscount(false); setActiveCategory("all");
                }}
                className="text-xs text-gray-400 hover:text-[#141414] transition-colors underline"
              >
                Сбросить фильтры
              </button>
            </div>
          </aside>

          {/* Products */}
          <main className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
              <span className="text-sm text-gray-500">
                Найдено: <strong className="text-[#141414]">{filtered.length}</strong> товаров
              </span>
              <div className="flex items-center gap-3">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-sm border border-gray-200 px-3 py-1.5 focus:outline-none focus:border-[#141414] bg-white"
                >
                  {sortOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
                <div className="flex border border-gray-200">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-1.5 transition-colors ${viewMode === "grid" ? "bg-[#141414] text-white" : "hover:bg-gray-50"}`}
                  >
                    <Icon name="Grid3x3" size={16} />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-1.5 transition-colors ${viewMode === "list" ? "bg-[#141414] text-white" : "hover:bg-gray-50"}`}
                  >
                    <Icon name="List" size={16} />
                  </button>
                </div>
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-16 text-gray-400">
                <Icon name="SearchX" size={48} className="mx-auto mb-4 opacity-30" />
                <p className="font-display text-xl">Товары не найдены</p>
                <p className="text-sm mt-2">Попробуйте изменить фильтры</p>
              </div>
            ) : (
              <div className={viewMode === "grid" ? "grid grid-cols-2 lg:grid-cols-3 gap-4" : "space-y-3"}>
                {filtered.map((product) => (
                  viewMode === "grid" ? (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={onAddToCart}
                      onAddToCompare={onAddToCompare}
                      onOpenProduct={onOpenProduct}
                      isCompared={compareIds.includes(product.id)}
                    />
                  ) : (
                    <div key={product.id} className="flex gap-4 border border-gray-100 hover:border-gray-300 p-4 transition-all">
                      <img src={product.image} alt={product.name} className="w-24 h-24 object-cover flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="text-[11px] text-gray-400 uppercase tracking-wide mb-1">{product.category}</div>
                        <h3 className="font-medium text-[#141414] mb-1 cursor-pointer hover:text-gray-600" onClick={() => onOpenProduct(product)}>
                          {product.name}
                        </h3>
                        <div className="flex items-center gap-1 mb-2">
                          {[1,2,3,4,5].map((s) => (
                            <Icon key={s} name="Star" size={11} className={s <= product.rating ? "text-brand fill-brand" : "text-gray-200 fill-gray-200"} />
                          ))}
                          <span className="text-xs text-gray-400 ml-1">({product.reviews})</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xl font-bold font-display">{product.price.toLocaleString("ru-RU")} ₽</span>
                          <span className="text-xs text-gray-400">/ {product.unit}</span>
                          {product.oldPrice && <span className="text-sm text-gray-400 line-through">{product.oldPrice.toLocaleString("ru-RU")} ₽</span>}
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 flex-shrink-0">
                        <button
                          onClick={() => onAddToCart(product)}
                          className="px-4 py-2 bg-[#141414] text-white text-sm hover:bg-gray-800 transition-colors whitespace-nowrap"
                        >
                          В корзину
                        </button>
                        <button
                          onClick={() => onAddToCompare(product)}
                          className="px-4 py-2 border border-gray-200 text-sm hover:border-gray-400 transition-colors"
                        >
                          Сравнить
                        </button>
                      </div>
                    </div>
                  )
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
