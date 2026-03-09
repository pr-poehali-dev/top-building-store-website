import { useState, useRef, useEffect } from "react";
import Icon from "@/components/ui/icon";
import { products } from "@/data/products";
import type { Product } from "@/data/products";

interface SmartSearchProps {
  onOpenProduct: (p: Product) => void;
  onNavigateCatalog: (categoryId?: string) => void;
}

// Умный поиск: понимает "саморез 4.2 75", "бур 6", "диск 125"
function smartSearch(query: string): Product[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase().trim();
  const tokens = q.split(/[\s×x,]+/).filter(Boolean);

  return products.filter((p) => {
    const searchText = [
      p.name.toLowerCase(),
      ...p.searchTags.map((t) => t.toLowerCase()),
      p.brand.toLowerCase(),
      p.categoryName.toLowerCase(),
    ].join(" ");

    // Все токены должны встретиться
    return tokens.every((token) => searchText.includes(token));
  }).slice(0, 8);
}

const SUGGESTIONS = [
  "саморез 4.2 75",
  "бур 6",
  "диск 125",
  "кабель ВВГ 2.5",
  "цемент М500",
  "автомат 25А",
];

export default function SmartSearch({ onOpenProduct, onNavigateCatalog }: SmartSearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.length >= 2) {
      setResults(smartSearch(query));
      setOpen(true);
    } else {
      setResults([]);
      setOpen(focused && query.length === 0);
    }
  }, [query, focused]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setOpen(false);
        setFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSelect = (p: Product) => {
    setOpen(false);
    setQuery("");
    onOpenProduct(p);
  };

  const handleSearch = () => {
    if (results.length > 0) {
      onNavigateCatalog();
    }
    setOpen(false);
  };

  return (
    <div className="relative flex-1" ref={dropRef}>
      <div className="flex">
        <input
          ref={inputRef}
          type="text"
          placeholder='Поиск: "саморез 4.2 75", "бур 6", "диск 125"...'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => { setFocused(true); setOpen(true); }}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="w-full pl-4 pr-3 py-3 border border-gray-200 border-r-0 bg-gray-50 text-sm focus:outline-none focus:border-[#141414] focus:bg-white transition-all"
        />
        <button
          onClick={handleSearch}
          className="px-5 py-3 bg-[#141414] text-white hover:bg-gray-800 transition-colors flex-shrink-0 flex items-center gap-2"
        >
          <Icon name="Search" size={18} />
          <span className="hidden md:inline text-sm font-medium">Найти</span>
        </button>
      </div>

      {open && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 shadow-xl z-50 animate-fade-in">
          {query.length < 2 ? (
            <div className="p-3">
              <div className="text-xs text-gray-400 uppercase tracking-wide mb-2 px-1">Популярные запросы</div>
              <div className="flex flex-wrap gap-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => setQuery(s)}
                    className="text-xs px-3 py-1.5 border border-gray-200 text-gray-600 hover:border-[#141414] hover:text-[#141414] transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="p-4 text-sm text-gray-500 text-center">
              <Icon name="SearchX" size={24} className="mx-auto mb-2 opacity-30" />
              Ничего не найдено по запросу «{query}»
            </div>
          ) : (
            <div>
              <div className="text-xs text-gray-400 uppercase tracking-wide px-4 pt-3 pb-1">
                Найдено: {results.length} товаров
              </div>
              {results.map((p) => (
                <button
                  key={p.id}
                  onClick={() => handleSelect(p)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 text-left transition-colors"
                >
                  <img src={p.image} alt={p.name} className="w-10 h-10 object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-[#141414] line-clamp-1">{p.name}</div>
                    <div className="text-xs text-gray-400">{p.brand} · {p.categoryName}</div>
                  </div>
                  <div className="text-sm font-bold font-display text-[#141414] flex-shrink-0">
                    {p.price.toLocaleString("ru-RU")} ₽
                  </div>
                </button>
              ))}
              <div className="border-t border-gray-100 px-4 py-2.5">
                <button
                  onClick={handleSearch}
                  className="text-sm text-brand hover:text-brand-dark font-medium flex items-center gap-1"
                >
                  Показать все результаты по «{query}» <Icon name="ArrowRight" size={14} />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
