import { useState } from "react";
import Icon from "@/components/ui/icon";
import ProductCard from "@/components/ProductCard";
import { products, promos, categories, HERO_IMAGE } from "@/data/products";
import type { Product } from "@/components/ProductCard";

interface HomePageProps {
  onNavigate: (page: string) => void;
  onAddToCart: (p: Product) => void;
  onAddToCompare: (p: Product) => void;
  onOpenProduct: (p: Product) => void;
  compareIds: number[];
}

export default function HomePage({ onNavigate, onAddToCart, onAddToCompare, onOpenProduct, compareIds }: HomePageProps) {
  const [activePromo, setActivePromo] = useState(0);
  const featured = products.filter((p) => p.badge).slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#141414] min-h-[520px] flex items-center">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(${HERO_IMAGE})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#141414]/90 to-transparent" />
        <div className="container relative z-10 py-20">
          <div className="max-w-xl animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-brand/20 border border-brand/30 px-3 py-1.5 mb-6">
              <span className="text-brand text-xs font-medium uppercase tracking-widest">
                Весенние скидки
              </span>
            </div>
            <h1 className="font-display text-5xl md:text-6xl text-white font-bold uppercase leading-none mb-4 tracking-tight">
              Всё для<br />
              <span className="text-brand">строительства</span>
            </h1>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              Более 50 000 товаров в наличии. Доставка по всей России от 1 дня.
              Профессиональные консультации бесплатно.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => onNavigate("catalog")}
                className="bg-brand text-[#141414] px-8 py-3.5 font-display font-semibold uppercase tracking-wide hover:bg-brand-light transition-colors"
              >
                Перейти в каталог
              </button>
              <button
                onClick={() => onNavigate("delivery")}
                className="border border-white/30 text-white px-8 py-3.5 font-display font-semibold uppercase tracking-wide hover:border-white hover:bg-white/5 transition-all"
              >
                Условия доставки
              </button>
            </div>
          </div>
        </div>
        {/* Stats */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-white/10">
          <div className="container">
            <div className="grid grid-cols-3 md:grid-cols-3">
              {[
                { value: "50 000+", label: "Товаров в наличии" },
                { value: "15 лет", label: "На рынке" },
                { value: "200 000+", label: "Довольных клиентов" },
              ].map((stat, i) => (
                <div key={i} className="text-center py-5 border-r border-white/10 last:border-0">
                  <div className="font-display text-2xl font-bold text-brand">{stat.value}</div>
                  <div className="text-gray-400 text-xs mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 border-b border-gray-100">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-3xl font-bold uppercase text-[#141414]">Категории</h2>
            <button
              onClick={() => onNavigate("catalog")}
              className="text-sm text-gray-500 hover:text-[#141414] flex items-center gap-1 transition-colors"
            >
              Все категории <Icon name="ChevronRight" size={16} />
            </button>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-2">
            {categories.filter((c) => c.id !== "all").map((cat) => (
              <button
                key={cat.id}
                onClick={() => onNavigate("catalog")}
                className="group flex flex-col items-center gap-2 p-3 border border-gray-100 hover:border-gray-300 hover:shadow-sm transition-all"
              >
                <div className="w-10 h-10 bg-gray-50 group-hover:bg-[#141414] flex items-center justify-center transition-colors">
                  <Icon name={cat.icon} size={20} className="text-gray-600 group-hover:text-white transition-colors" />
                </div>
                <span className="text-[11px] font-medium text-gray-600 group-hover:text-[#141414] text-center leading-tight transition-colors">
                  {cat.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Promos */}
      <section className="py-12 bg-gray-50">
        <div className="container">
          <h2 className="font-display text-3xl font-bold uppercase text-[#141414] mb-8">Акции</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {promos.map((promo, i) => (
              <div
                key={promo.id}
                className={`relative overflow-hidden bg-gradient-to-br ${promo.color} cursor-pointer group`}
                onClick={() => onNavigate("promo")}
              >
                <div
                  className="absolute inset-0 opacity-15 group-hover:opacity-25 transition-opacity"
                  style={{
                    backgroundImage: `url(${promo.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                <div className="relative p-6 min-h-[180px] flex flex-col justify-between">
                  <div>
                    <span className="inline-block bg-brand text-[#141414] text-xs font-bold px-2 py-1 mb-3 uppercase">
                      {promo.badge}
                    </span>
                    <h3 className="font-display text-xl font-bold text-white uppercase mb-1">
                      {promo.title}
                    </h3>
                    <p className="text-gray-300 text-sm">{promo.subtitle}</p>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-gray-400 text-xs">{promo.deadline}</span>
                    <Icon name="ArrowRight" size={16} className="text-brand group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className="py-12">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-3xl font-bold uppercase text-[#141414]">Хиты продаж</h2>
            <button
              onClick={() => onNavigate("catalog")}
              className="text-sm text-gray-500 hover:text-[#141414] flex items-center gap-1 transition-colors"
            >
              Смотреть все <Icon name="ChevronRight" size={16} />
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {featured.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                onAddToCompare={onAddToCompare}
                onOpenProduct={onOpenProduct}
                isCompared={compareIds.includes(product.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="py-12 bg-[#141414] text-white">
        <div className="container">
          <h2 className="font-display text-3xl font-bold uppercase mb-10 text-center">
            Почему выбирают <span className="text-brand">СтройМаркет</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: "Truck", title: "Быстрая доставка", desc: "От 1 дня по России. Бесплатно от 15 000 ₽" },
              { icon: "Shield", title: "Гарантия качества", desc: "Только сертифицированные материалы от проверенных производителей" },
              { icon: "Phone", title: "Поддержка 24/7", desc: "Консультации специалистов по выбору и расчёту материалов" },
              { icon: "RefreshCw", title: "Лёгкий возврат", desc: "Возврат и обмен товара в течение 14 дней" },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 border border-brand/30 flex items-center justify-center">
                  <Icon name={item.icon} size={22} className="text-brand" />
                </div>
                <h3 className="font-display font-semibold uppercase text-sm tracking-wide">{item.title}</h3>
                <p className="text-gray-400 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recommendations */}
      <section className="py-12 border-b border-gray-100">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-3xl font-bold uppercase text-[#141414]">
              Рекомендуем
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {products.slice(4, 8).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                onAddToCompare={onAddToCompare}
                onOpenProduct={onOpenProduct}
                isCompared={compareIds.includes(product.id)}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}