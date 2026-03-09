import Icon from "@/components/ui/icon";
import ProductCard from "@/components/ProductCard";
import { products, promos, categories, HERO_IMAGE } from "@/data/products";
import type { Product } from "@/data/products";

interface HomePageProps {
  onNavigate: (page: string, categoryId?: string) => void;
  onAddToCart: (p: Product) => void;
  onAddToCompare: (p: Product) => void;
  onOpenProduct: (p: Product) => void;
  compareIds: number[];
}

export default function HomePage({ onNavigate, onAddToCart, onAddToCompare, onOpenProduct, compareIds }: HomePageProps) {
  const hits = products.filter((p) => p.badge === "Хит");
  const discounted = products.filter((p) => p.oldPrice);

  return (
    <div className="bg-gray-50">
      {/* HERO */}
      <section className="relative bg-[#141414] overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundImage: `url(${HERO_IMAGE})`, backgroundSize: "cover", backgroundPosition: "center", opacity: 0.15 }} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#141414]/80 to-transparent" />
        <div className="container relative z-10 py-16 md:py-24">
          <div className="max-w-lg">
            <div className="inline-flex items-center gap-2 bg-brand/20 border border-brand/30 px-3 py-1 mb-5">
              <Icon name="Tag" size={12} className="text-brand" />
              <span className="text-brand text-xs font-medium uppercase tracking-widest">Весенние скидки до 30%</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl text-white font-bold uppercase leading-none mb-4">
              Всё для<br /><span className="text-brand">строительства</span><br />и ремонта
            </h1>
            <p className="text-gray-300 text-base mb-8 leading-relaxed">
              50 000+ товаров в наличии. Доставка от 1 дня. Профессиональные консультации бесплатно.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => onNavigate("catalog")}
                className="bg-brand text-[#141414] px-6 py-3 font-display font-semibold uppercase tracking-wide hover:bg-brand-light transition-colors text-sm"
              >
                Перейти в каталог
              </button>
              <button
                onClick={() => onNavigate("calculator")}
                className="border border-white/30 text-white px-6 py-3 font-display font-semibold uppercase tracking-wide hover:border-white hover:bg-white/5 transition-all text-sm flex items-center gap-2"
              >
                <Icon name="Calculator" size={14} />
                Калькулятор
              </button>
            </div>
          </div>
        </div>
        {/* Stats strip */}
        <div className="border-t border-white/10">
          <div className="container">
            <div className="grid grid-cols-3">
              {[
                { v: "50 000+", l: "Товаров" },
                { v: "15 лет", l: "На рынке" },
                { v: "200K+", l: "Клиентов" },
              ].map((s, i) => (
                <div key={i} className="text-center py-4 border-r border-white/10 last:border-0">
                  <div className="font-display text-xl font-bold text-brand">{s.v}</div>
                  <div className="text-gray-400 text-xs">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES — Leroy style: большие карточки с картинками */}
      <section className="py-10 bg-white">
        <div className="container">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl font-bold uppercase text-[#141414]">Категории</h2>
            <button
              onClick={() => onNavigate("catalog")}
              className="text-xs text-gray-400 hover:text-[#141414] flex items-center gap-1 transition-colors uppercase tracking-wide"
            >
              Все <Icon name="ChevronRight" size={14} />
            </button>
          </div>

          {/* Крупная сетка как у Леруа */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onNavigate("catalog", cat.id)}
                className="group relative overflow-hidden bg-white border border-gray-100 hover:border-gray-300 hover:shadow-md transition-all duration-300 flex flex-col"
              >
                {/* Image */}
                <div className="aspect-[4/3] overflow-hidden bg-gray-50">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                {/* Label */}
                <div className="p-3 text-left">
                  <div className="font-semibold text-sm text-[#141414] group-hover:text-brand transition-colors leading-tight">
                    {cat.name}
                  </div>
                  <div className="text-[10px] text-gray-400 mt-0.5">{cat.count.toLocaleString("ru-RU")} товаров</div>
                </div>
              </button>
            ))}
          </div>

          {/* Подкатегории быстрый доступ */}
          <div className="mt-4 flex flex-wrap gap-2">
            {["Саморезы", "Бур SDS+", "Кабель ВВГ", "Цемент М500", "Диск 125", "Анкер M10", "Автомат 25А", "Труба PP"].map((sub) => (
              <button
                key={sub}
                onClick={() => onNavigate("catalog")}
                className="text-xs px-3 py-1.5 border border-gray-200 text-gray-600 hover:border-[#141414] hover:text-[#141414] transition-colors bg-white"
              >
                {sub}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* АКЦИИ */}
      <section className="py-10 bg-gray-50">
        <div className="container">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl font-bold uppercase text-[#141414]">Акции</h2>
            <button onClick={() => onNavigate("promo")} className="text-xs text-gray-400 hover:text-[#141414] flex items-center gap-1 uppercase tracking-wide">
              Все акции <Icon name="ChevronRight" size={14} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {promos.map((promo) => (
              <div
                key={promo.id}
                onClick={() => onNavigate("promo")}
                className={`relative overflow-hidden bg-gradient-to-br ${promo.color} cursor-pointer group`}
              >
                <div className="absolute inset-0 opacity-15 group-hover:opacity-25 transition-opacity"
                  style={{ backgroundImage: `url(${promo.image})`, backgroundSize: "cover", backgroundPosition: "center" }} />
                <div className="relative p-6 min-h-[160px] flex flex-col justify-between">
                  <div>
                    <span className="inline-block bg-brand text-[#141414] text-xs font-bold px-2 py-0.5 mb-3 uppercase">
                      {promo.badge}
                    </span>
                    <h3 className="font-display text-xl font-bold text-white uppercase leading-tight mb-1">{promo.title}</h3>
                    <p className="text-gray-300 text-sm">{promo.subtitle}</p>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-gray-500 text-xs">{promo.deadline}</span>
                    <Icon name="ArrowRight" size={14} className="text-brand group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ХИТЫ ПРОДАЖ */}
      <section className="py-10 bg-white">
        <div className="container">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl font-bold uppercase text-[#141414]">
              Хиты продаж
            </h2>
            <button onClick={() => onNavigate("catalog")} className="text-xs text-gray-400 hover:text-[#141414] flex items-center gap-1 uppercase tracking-wide">
              Смотреть все <Icon name="ChevronRight" size={14} />
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {hits.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onAddToCart={onAddToCart}
                onAddToCompare={onAddToCompare}
                onOpenProduct={onOpenProduct}
                isCompared={compareIds.includes(p.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* СКИДКИ */}
      {discounted.length > 0 && (
        <section className="py-10 bg-gray-50">
          <div className="container">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-2xl font-bold uppercase text-[#141414] flex items-center gap-3">
                Товары со скидкой
                <span className="bg-red-500 text-white text-sm px-2 py-0.5 font-sans font-normal normal-case">−%</span>
              </h2>
              <button onClick={() => onNavigate("promo")} className="text-xs text-gray-400 hover:text-[#141414] flex items-center gap-1 uppercase tracking-wide">
                Все скидки <Icon name="ChevronRight" size={14} />
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {discounted.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onAddToCart={onAddToCart}
                  onAddToCompare={onAddToCompare}
                  onOpenProduct={onOpenProduct}
                  isCompared={compareIds.includes(p.id)}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Почему мы */}
      <section className="py-10 bg-[#141414]">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: "Truck", title: "Доставка от 1 дня", desc: "По Москве и всей России" },
              { icon: "Shield", title: "Гарантия качества", desc: "Сертифицированные товары" },
              { icon: "Phone", title: "Поддержка 24/7", desc: "Консультации специалистов" },
              { icon: "RefreshCw", title: "Возврат 14 дней", desc: "Без вопросов" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-10 h-10 border border-brand/30 flex items-center justify-center flex-shrink-0">
                  <Icon name={item.icon} size={18} className="text-brand" />
                </div>
                <div>
                  <div className="font-semibold text-sm text-white">{item.title}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
