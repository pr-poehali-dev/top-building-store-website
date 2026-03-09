import { useState, useMemo } from "react";
import Icon from "@/components/ui/icon";
import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/data/products";
import type { Product } from "@/data/products";

interface CatalogPageProps {
  onAddToCart: (p: Product) => void;
  onAddToCompare: (p: Product) => void;
  onOpenProduct: (p: Product) => void;
  compareIds: number[];
  initialCategory?: string;
}

const sortOptions = [
  { value: "popular", label: "По популярности" },
  { value: "price_asc", label: "Сначала дешевле" },
  { value: "price_desc", label: "Сначала дороже" },
  { value: "rating", label: "По рейтингу" },
];

export default function CatalogPage({ onAddToCart, onAddToCompare, onOpenProduct, compareIds, initialCategory }: CatalogPageProps) {
  const [activeCategory, setActiveCategory] = useState(initialCategory || "all");
  const [activeSub, setActiveSub] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("popular");
  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [onlyDiscount, setOnlyDiscount] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const currentCat = categories.find((c) => c.id === activeCategory);

  const filtered = useMemo(() => {
    let result = [...products];
    if (activeCategory !== "all") result = result.filter((p) => p.category === activeCategory);
    if (priceFrom) result = result.filter((p) => p.price >= Number(priceFrom));
    if (priceTo) result = result.filter((p) => p.price <= Number(priceTo));
    if (onlyInStock) result = result.filter((p) => p.inStock);
    if (onlyDiscount) result = result.filter((p) => !!p.oldPrice);
    switch (sortBy) {
      case "price_asc": result.sort((a, b) => a.price - b.price); break;
      case "price_desc": result.sort((a, b) => b.price - a.price); break;
      case "rating": result.sort((a, b) => b.rating - a.rating); break;
    }
    return result;
  }, [activeCategory, sortBy, priceFrom, priceTo, onlyInStock, onlyDiscount]);

  const resetFilters = () => { setPriceFrom(""); setPriceTo(""); setOnlyInStock(false); setOnlyDiscount(false); };

  const hasActiveFilters = !!(priceFrom || priceTo || onlyInStock || onlyDiscount);

  return (
    <div className="bg-gray-50 min-h-screen py-6">
      <div className="container">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
          <span>Главная</span>
          <Icon name="ChevronRight" size={12} />
          <span className={currentCat ? "cursor-pointer hover:text-[#141414]" : "text-[#141414]"} onClick={() => currentCat && setActiveCategory("all")}>Каталог</span>
          {currentCat && <>
            <Icon name="ChevronRight" size={12} />
            <span className="text-[#141414]">{currentCat.name}</span>
          </>}
        </div>

        <h1 className="font-display text-3xl font-bold uppercase text-[#141414] mb-6">
          {currentCat ? currentCat.name : "Каталог товаров"}
        </h1>

        {/* Mobile toolbar */}
        <div className="flex md:hidden gap-2 mb-4">
          <button
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 bg-white text-sm font-medium flex-1 justify-center"
          >
            <Icon name="SlidersHorizontal" size={15} />
            Фильтры
            {hasActiveFilters && <span className="w-4 h-4 bg-brand text-[#141414] text-[9px] rounded-full flex items-center justify-center font-bold">!</span>}
          </button>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
            className="flex-1 text-sm border border-gray-200 px-3 py-2.5 bg-white focus:outline-none">
            {sortOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>

        {/* Mobile filters */}
        {mobileFiltersOpen && (
          <div className="md:hidden bg-white border border-gray-200 p-4 mb-4 space-y-4 animate-fade-in">
            <div>
              <div className="text-xs font-bold text-gray-400 uppercase mb-2">Категория</div>
              <div className="flex flex-wrap gap-2">
                <button onClick={() => setActiveCategory("all")}
                  className={`text-xs px-3 py-1.5 border transition-colors ${activeCategory === "all" ? "bg-[#141414] text-white border-[#141414]" : "border-gray-200 text-gray-600"}`}>
                  Все
                </button>
                {categories.map((cat) => (
                  <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
                    className={`text-xs px-3 py-1.5 border transition-colors ${activeCategory === cat.id ? "bg-[#141414] text-white border-[#141414]" : "border-gray-200 text-gray-600"}`}>
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div className="text-xs font-bold text-gray-400 uppercase mb-2">Цена, ₽</div>
              <div className="flex gap-2">
                <input type="number" placeholder="От" value={priceFrom} onChange={(e) => setPriceFrom(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 text-sm focus:outline-none" />
                <input type="number" placeholder="До" value={priceTo} onChange={(e) => setPriceTo(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 text-sm focus:outline-none" />
              </div>
            </div>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={onlyInStock} onChange={(e) => setOnlyInStock(e.target.checked)} className="w-4 h-4" />
                <span className="text-sm">В наличии</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={onlyDiscount} onChange={(e) => setOnlyDiscount(e.target.checked)} className="w-4 h-4" />
                <span className="text-sm">Со скидкой</span>
              </label>
            </div>
          </div>
        )}

        <div className="flex gap-5">
          {/* SIDEBAR — Петрович стиль */}
          <aside className="w-52 flex-shrink-0 hidden md:block">
            <div className="sticky top-28 space-y-0 border border-gray-200 bg-white">
              <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                <h3 className="font-display font-bold uppercase text-xs tracking-widest text-gray-500">Категории</h3>
              </div>
              <button
                onClick={() => { setActiveCategory("all"); setActiveSub(null); }}
                className={`w-full text-left flex items-center justify-between px-4 py-2.5 text-sm transition-colors border-l-2 ${
                  activeCategory === "all" ? "border-brand text-[#141414] font-medium bg-brand/5" : "border-transparent text-gray-600 hover:bg-gray-50 hover:text-[#141414]"
                }`}
              >
                <span>Все товары</span>
                <span className="text-[10px] text-gray-400">{products.length}</span>
              </button>
              {categories.map((cat) => (
                <div key={cat.id}>
                  <button
                    onClick={() => { setActiveCategory(cat.id); setActiveSub(null); }}
                    className={`w-full text-left flex items-center justify-between px-4 py-2.5 text-sm transition-colors border-l-2 ${
                      activeCategory === cat.id ? "border-brand text-[#141414] font-medium bg-brand/5" : "border-transparent text-gray-600 hover:bg-gray-50 hover:text-[#141414]"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Icon name={cat.icon} size={13} className="text-gray-400 flex-shrink-0" />
                      {cat.name}
                    </span>
                    <span className="text-[10px] text-gray-400">{products.filter((p) => p.category === cat.id).length}</span>
                  </button>
                  {activeCategory === cat.id && (
                    <div className="bg-gray-50 border-t border-b border-gray-100">
                      {cat.subcategories.map((sub) => (
                        <button
                          key={sub}
                          onClick={() => setActiveSub(activeSub === sub ? null : sub)}
                          className={`w-full text-left px-6 py-2 text-xs transition-colors ${
                            activeSub === sub ? "text-brand font-medium" : "text-gray-500 hover:text-[#141414]"
                          }`}
                        >
                          {activeSub === sub ? "▶ " : "· "}{sub}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Filters in sidebar */}
              <div className="border-t border-gray-100 p-4 space-y-4">
                <div>
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Цена, ₽</div>
                  <div className="flex gap-1.5">
                    <input type="number" placeholder="От" value={priceFrom} onChange={(e) => setPriceFrom(e.target.value)}
                      className="w-full px-2 py-1.5 border border-gray-200 text-xs focus:outline-none focus:border-[#141414]" />
                    <input type="number" placeholder="До" value={priceTo} onChange={(e) => setPriceTo(e.target.value)}
                      className="w-full px-2 py-1.5 border border-gray-200 text-xs focus:outline-none focus:border-[#141414]" />
                  </div>
                </div>
                <div className="space-y-2">
                  {[
                    { val: onlyInStock, set: setOnlyInStock, label: "Только в наличии" },
                    { val: onlyDiscount, set: setOnlyDiscount, label: "Со скидкой" },
                  ].map((cb) => (
                    <label key={cb.label} className="flex items-center gap-2 cursor-pointer group">
                      <div onClick={() => cb.set(!cb.val)}
                        className={`w-4 h-4 border flex items-center justify-center flex-shrink-0 transition-colors ${
                          cb.val ? "bg-[#141414] border-[#141414]" : "border-gray-300 group-hover:border-[#141414]"
                        }`}>
                        {cb.val && <Icon name="Check" size={10} className="text-white" />}
                      </div>
                      <span className="text-xs text-gray-600">{cb.label}</span>
                    </label>
                  ))}
                </div>
                {hasActiveFilters && (
                  <button onClick={resetFilters} className="text-xs text-red-400 hover:text-red-600 flex items-center gap-1">
                    <Icon name="X" size={10} /> Сбросить
                  </button>
                )}
              </div>
            </div>
          </aside>

          {/* Main */}
          <main className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-3 bg-white border border-gray-200 px-4 py-2.5">
              <span className="text-sm text-gray-500">
                <strong className="text-[#141414]">{filtered.length}</strong> товаров
              </span>
              <div className="flex items-center gap-3">
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
                  className="hidden md:block text-sm border border-gray-200 px-3 py-1.5 focus:outline-none bg-white">
                  {sortOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
                <div className="flex border border-gray-200">
                  <button onClick={() => setViewMode("grid")}
                    className={`p-1.5 transition-colors ${viewMode === "grid" ? "bg-[#141414] text-white" : "hover:bg-gray-50 text-gray-400"}`}>
                    <Icon name="LayoutGrid" size={15} />
                  </button>
                  <button onClick={() => setViewMode("table")}
                    className={`p-1.5 transition-colors ${viewMode === "table" ? "bg-[#141414] text-white" : "hover:bg-gray-50 text-gray-400"}`}>
                    <Icon name="List" size={15} />
                  </button>
                </div>
              </div>
            </div>

            {/* Subcategory chips */}
            {currentCat && (
              <div className="flex flex-wrap gap-2 mb-4">
                {currentCat.subcategories.map((sub) => (
                  <button key={sub} onClick={() => setActiveSub(activeSub === sub ? null : sub)}
                    className={`text-xs px-3 py-1.5 border transition-colors ${
                      activeSub === sub ? "bg-[#141414] text-white border-[#141414]" : "bg-white border-gray-200 text-gray-600 hover:border-[#141414] hover:text-[#141414]"
                    }`}>
                    {sub}
                  </button>
                ))}
              </div>
            )}

            {filtered.length === 0 ? (
              <div className="bg-white border border-gray-200 text-center py-16 text-gray-400">
                <Icon name="SearchX" size={40} className="mx-auto mb-3 opacity-30" />
                <p className="font-display text-lg">Ничего не найдено</p>
                <button onClick={resetFilters} className="mt-3 text-sm text-brand underline">Сбросить фильтры</button>
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {filtered.map((p) => (
                  <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} onAddToCompare={onAddToCompare}
                    onOpenProduct={onOpenProduct} isCompared={compareIds.includes(p.id)} />
                ))}
              </div>
            ) : (
              <div className="bg-white border border-gray-200">
                <div className="hidden md:flex items-center border-b border-gray-100 px-4 py-2 bg-gray-50 text-xs font-bold text-gray-400 uppercase tracking-wide gap-3">
                  <div className="w-12 flex-shrink-0" />
                  <div className="flex-1">Наименование</div>
                  <div className="w-20 text-center">Наличие</div>
                  <div className="w-24 text-right">Цена</div>
                  <div className="w-24 text-center">Действие</div>
                </div>
                {filtered.map((p) => (
                  <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} onAddToCompare={onAddToCompare}
                    onOpenProduct={onOpenProduct} isCompared={compareIds.includes(p.id)} tableMode />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
