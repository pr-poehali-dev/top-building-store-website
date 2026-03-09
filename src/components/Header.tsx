import { useState } from "react";
import Icon from "@/components/ui/icon";
import SmartSearch from "@/components/SmartSearch";
import type { Product } from "@/data/products";

interface HeaderProps {
  activePage: string;
  onNavigate: (page: string, categoryId?: string) => void;
  cartCount: number;
  compareCount: number;
  onCartOpen: () => void;
  onCompareOpen: () => void;
  onOpenProduct: (p: Product) => void;
}

const navItems = [
  { id: "home", label: "Главная" },
  { id: "catalog", label: "Каталог" },
  { id: "promo", label: "Акции" },
  { id: "delivery", label: "Доставка" },
  { id: "about", label: "О компании" },
  { id: "contacts", label: "Контакты" },
];

export default function Header({ activePage, onNavigate, cartCount, compareCount, onCartOpen, onCompareOpen, onOpenProduct }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [catalogOpen, setCatalogOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Top info bar */}
      <div className="bg-[#141414] text-white text-xs py-2 hidden md:block">
        <div className="container flex justify-between items-center">
          <div className="flex items-center gap-6 text-gray-400">
            <span className="flex items-center gap-1.5">
              <Icon name="Truck" size={12} className="text-brand" />
              Бесплатная доставка от 15 000 ₽
            </span>
            <span className="flex items-center gap-1.5">
              <Icon name="Clock" size={12} className="text-brand" />
              Пн–Сб: 8:00–20:00
            </span>
          </div>
          <a href="tel:+78001234567" className="text-brand font-medium tracking-wide hover:text-brand-light transition-colors">
            8 800 123-45-67
          </a>
        </div>
      </div>

      {/* Main row */}
      <div className="border-b border-gray-100">
        <div className="container py-3 flex items-center gap-4">
          {/* Logo */}
          <button onClick={() => onNavigate("home")} className="flex-shrink-0 flex items-center gap-2">
            <div className="w-9 h-9 bg-[#141414] flex items-center justify-center">
              <span className="text-white font-display font-bold text-lg">С</span>
            </div>
            <div className="hidden md:block">
              <div className="font-display font-bold text-[#141414] text-lg leading-tight uppercase tracking-wide">
                СтройМаркет
              </div>
              <div className="text-[9px] text-gray-400 tracking-widest uppercase">50 000+ товаров</div>
            </div>
          </button>

          {/* Smart Search */}
          <SmartSearch
            onOpenProduct={onOpenProduct}
            onNavigateCatalog={(catId) => onNavigate("catalog", catId)}
          />

          {/* Actions */}
          <div className="flex items-center flex-shrink-0">
            <button className="hidden md:flex flex-col items-center gap-0.5 px-2.5 py-2 hover:bg-gray-50 transition-colors group">
              <Icon name="User" size={20} className="text-gray-500 group-hover:text-[#141414]" />
              <span className="text-[10px] text-gray-400">Войти</span>
            </button>
            <button onClick={onCompareOpen} className="relative flex flex-col items-center gap-0.5 px-2.5 py-2 hover:bg-gray-50 transition-colors group">
              <Icon name="BarChart2" size={20} className="text-gray-500 group-hover:text-[#141414]" />
              <span className="text-[10px] text-gray-400 hidden md:block">Сравнить</span>
              {compareCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-brand text-[#141414] text-[9px] rounded-full flex items-center justify-center font-bold">{compareCount}</span>
              )}
            </button>
            <button className="hidden md:flex flex-col items-center gap-0.5 px-2.5 py-2 hover:bg-gray-50 transition-colors group">
              <Icon name="Heart" size={20} className="text-gray-500 group-hover:text-[#141414]" />
              <span className="text-[10px] text-gray-400">Избранное</span>
            </button>
            <button onClick={onCartOpen} className="relative flex flex-col items-center gap-0.5 px-2.5 py-2 hover:bg-gray-50 transition-colors group">
              <Icon name="ShoppingCart" size={20} className="text-gray-500 group-hover:text-[#141414]" />
              <span className="text-[10px] text-gray-400 hidden md:block">Корзина</span>
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#141414] text-white text-[9px] rounded-full flex items-center justify-center font-bold">{cartCount}</span>
              )}
            </button>
            <button className="md:hidden p-2 ml-1" onClick={() => setMenuOpen(!menuOpen)}>
              <Icon name={menuOpen ? "X" : "Menu"} size={22} />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="hidden md:block border-b border-gray-100 bg-white">
        <div className="container">
          <div className="flex items-center">
            <button
              onMouseEnter={() => setCatalogOpen(true)}
              onMouseLeave={() => setCatalogOpen(false)}
              onClick={() => onNavigate("catalog")}
              className="flex items-center gap-2 px-4 py-3 bg-[#141414] text-white text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              <Icon name="Grid3x3" size={15} />
              Все категории
              <Icon name="ChevronDown" size={13} className={`transition-transform ${catalogOpen ? "rotate-180" : ""}`} />
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

        {/* Mega dropdown */}
        {catalogOpen && (
          <div
            className="absolute left-0 right-0 bg-white border-b border-gray-200 shadow-xl z-40"
            onMouseEnter={() => setCatalogOpen(true)}
            onMouseLeave={() => setCatalogOpen(false)}
          >
            <div className="container py-5">
              <div className="grid grid-cols-6 gap-4">
                {[
                  { id: "fasteners", name: "Крепёж", subs: ["Саморезы", "Болты и гайки", "Анкеры", "Дюбели", "Гвозди"] },
                  { id: "tools", name: "Инструмент", subs: ["Дрели", "Перфораторы", "Болгарки", "Пилы", "Расходники"] },
                  { id: "electrical", name: "Электрика", subs: ["Кабель", "Розетки", "Автоматы", "Светильники", "Гофра"] },
                  { id: "plumbing", name: "Сантехника", subs: ["Трубы", "Фитинги", "Смесители", "Ванны", "Радиаторы"] },
                  { id: "building", name: "Стройматериалы", subs: ["Цемент", "Кирпич", "Блоки", "Пиломатериалы", "Кровля"] },
                  { id: "paint", name: "Отделка", subs: ["Краски", "Шпаклёвки", "Обои", "Плитка", "Ламинат"] },
                ].map((cat) => (
                  <div key={cat.id}>
                    <button
                      onClick={() => { onNavigate("catalog", cat.id); setCatalogOpen(false); }}
                      className="font-semibold text-sm text-[#141414] hover:text-brand mb-2 text-left w-full transition-colors"
                    >
                      {cat.name}
                    </button>
                    <ul className="space-y-1.5">
                      {cat.subs.map((sub) => (
                        <li key={sub}>
                          <button
                            onClick={() => { onNavigate("catalog", cat.id); setCatalogOpen(false); }}
                            className="text-xs text-gray-500 hover:text-[#141414] transition-colors text-left"
                          >
                            {sub}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white shadow-lg absolute w-full">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { onNavigate(item.id); setMenuOpen(false); }}
              className="w-full text-left px-5 py-3.5 text-sm border-b border-gray-50 hover:bg-gray-50 flex items-center justify-between"
            >
              {item.label}
              <Icon name="ChevronRight" size={14} className="text-gray-400" />
            </button>
          ))}
          <div className="p-4 border-t border-gray-100">
            <a href="tel:+78001234567" className="flex items-center gap-2 text-brand font-medium text-sm">
              <Icon name="Phone" size={16} />
              8 800 123-45-67
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
