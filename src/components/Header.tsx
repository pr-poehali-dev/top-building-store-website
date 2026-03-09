import { useState } from "react";
import Icon from "@/components/ui/icon";

interface HeaderProps {
  activePage: string;
  onNavigate: (page: string) => void;
  cartCount: number;
  compareCount: number;
  onCartOpen: () => void;
  onCompareOpen: () => void;
}

const navItems = [
  { id: "home", label: "Главная" },
  { id: "catalog", label: "Каталог" },
  { id: "promo", label: "Акции" },
  { id: "delivery", label: "Доставка" },
  { id: "about", label: "О компании" },
  { id: "contacts", label: "Контакты" },
];

export default function Header({ activePage, onNavigate, cartCount, compareCount, onCartOpen, onCompareOpen }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      {/* Top bar */}
      <div className="bg-[#141414] text-white text-xs py-2">
        <div className="container flex justify-between items-center">
          <span className="text-gray-400">Бесплатная доставка от 15 000 ₽</span>
          <div className="flex gap-6 items-center">
            <span className="text-gray-400">Пн–Сб: 8:00–20:00</span>
            <a href="tel:+78001234567" className="text-brand font-medium hover:text-brand-light transition-colors">
              8 800 123-45-67
            </a>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container py-4">
        <div className="flex items-center gap-6">
          {/* Logo */}
          <button
            onClick={() => onNavigate("home")}
            className="flex-shrink-0 flex items-center gap-2 group"
          >
            <div className="w-9 h-9 bg-[#141414] flex items-center justify-center">
              <span className="text-white font-display font-bold text-lg leading-none">С</span>
            </div>
            <div>
              <div className="font-display font-bold text-[#141414] text-xl leading-tight tracking-wide uppercase">
                СтройМаркет
              </div>
              <div className="text-[10px] text-gray-400 tracking-widest uppercase">
                Строительные материалы
              </div>
            </div>
          </button>

          {/* Search */}
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Поиск товаров, категорий, брендов..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 pr-12 py-3 border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:border-[#141414] focus:bg-white transition-all"
            />
            <button className="absolute right-0 top-0 h-full px-4 bg-[#141414] text-white hover:bg-gray-800 transition-colors">
              <Icon name="Search" size={18} />
            </button>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1">
            <button className="flex flex-col items-center gap-1 px-3 py-2 hover:bg-gray-50 transition-colors group">
              <Icon name="User" size={20} className="text-gray-600 group-hover:text-[#141414]" />
              <span className="text-[10px] text-gray-500 whitespace-nowrap">Войти</span>
            </button>
            <button
              onClick={onCompareOpen}
              className="relative flex flex-col items-center gap-1 px-3 py-2 hover:bg-gray-50 transition-colors group"
            >
              <Icon name="BarChart2" size={20} className="text-gray-600 group-hover:text-[#141414]" />
              <span className="text-[10px] text-gray-500">Сравнить</span>
              {compareCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-brand text-white text-[9px] rounded-full flex items-center justify-center font-bold">
                  {compareCount}
                </span>
              )}
            </button>
            <button className="flex flex-col items-center gap-1 px-3 py-2 hover:bg-gray-50 transition-colors group">
              <Icon name="Heart" size={20} className="text-gray-600 group-hover:text-[#141414]" />
              <span className="text-[10px] text-gray-500">Избранное</span>
            </button>
            <button
              onClick={onCartOpen}
              className="relative flex flex-col items-center gap-1 px-3 py-2 hover:bg-gray-50 transition-colors group"
            >
              <Icon name="ShoppingCart" size={20} className="text-gray-600 group-hover:text-[#141414]" />
              <span className="text-[10px] text-gray-500">Корзина</span>
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#141414] text-white text-[9px] rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile menu */}
          <button
            className="md:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>
      </div>

      {/* Nav */}
      <nav className="border-t border-gray-100 hidden md:block">
        <div className="container">
          <div className="flex items-center gap-0">
            <button
              onClick={() => onNavigate("catalog")}
              className="flex items-center gap-2 px-4 py-3 bg-[#141414] text-white text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              <Icon name="Grid3x3" size={16} />
              Все категории
            </button>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-4 py-3 text-sm font-medium transition-colors border-b-2 ${
                  activePage === item.id
                    ? "border-brand text-[#141414]"
                    : "border-transparent text-gray-600 hover:text-[#141414]"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile menu dropdown */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white shadow-lg">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { onNavigate(item.id); setMenuOpen(false); }}
              className="w-full text-left px-6 py-3 text-sm border-b border-gray-50 hover:bg-gray-50"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
