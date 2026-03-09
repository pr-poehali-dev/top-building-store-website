import Icon from "@/components/ui/icon";
import ProductCard from "@/components/ProductCard";
import { products, promos } from "@/data/products";
import type { Product } from "@/data/products";

interface PromoPageProps {
  onAddToCart: (p: Product) => void;
  onAddToCompare: (p: Product) => void;
  onOpenProduct: (p: Product) => void;
  compareIds: number[];
}

export default function PromoPage({ onAddToCart, onAddToCompare, onOpenProduct, compareIds }: PromoPageProps) {
  const discounted = products.filter((p) => p.oldPrice);

  return (
    <div className="py-8">
      <div className="container">
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-6">
          <span>Главная</span>
          <Icon name="ChevronRight" size={12} />
          <span className="text-[#141414]">Акции</span>
        </div>

        <h1 className="font-display text-4xl font-bold uppercase text-[#141414] mb-8">Акции и скидки</h1>

        {/* Promo banners */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {promos.map((promo) => (
            <div
              key={promo.id}
              className={`relative overflow-hidden bg-gradient-to-br ${promo.color} cursor-pointer group`}
            >
              <div
                className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity"
                style={{ backgroundImage: `url(${promo.image})`, backgroundSize: "cover", backgroundPosition: "center" }}
              />
              <div className="relative p-8 min-h-[220px] flex flex-col justify-between">
                <div>
                  <span className="inline-block bg-brand text-[#141414] text-xs font-bold px-3 py-1 mb-4 uppercase tracking-wide">
                    {promo.badge}
                  </span>
                  <h3 className="font-display text-2xl font-bold text-white uppercase mb-2">{promo.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{promo.subtitle}</p>
                </div>
                <div className="flex items-center justify-between mt-6">
                  <span className="text-gray-400 text-xs border border-gray-600 px-2 py-1">{promo.deadline}</span>
                  <button className="flex items-center gap-2 text-brand text-sm font-medium group-hover:gap-3 transition-all">
                    Подробнее <Icon name="ArrowRight" size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Discounted products */}
        <div>
          <h2 className="font-display text-2xl font-bold uppercase text-[#141414] mb-6 flex items-center gap-3">
            Товары со скидкой
            <span className="bg-red-500 text-white text-sm px-2 py-0.5 font-sans font-normal normal-case">
              {discounted.length} позиций
            </span>
          </h2>
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
      </div>
    </div>
  );
}