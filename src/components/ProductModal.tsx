import { useState } from "react";
import Icon from "@/components/ui/icon";
import type { Product } from "@/components/ProductCard";
import { products } from "@/data/products";

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (p: Product) => void;
  onAddToCompare: (p: Product) => void;
  compareIds: number[];
}

const reviews = [
  { name: "Андрей К.", rating: 5, date: "12.02.2025", text: "Отличное качество! Заказывал уже второй раз, очень доволен. Доставили быстро, упаковка без повреждений." },
  { name: "Светлана М.", rating: 4, date: "05.01.2025", text: "Хороший товар за свои деньги. Немного задержали доставку, но менеджер предупредил заранее." },
  { name: "Игорь В.", rating: 5, date: "28.12.2024", text: "Профессионально, быстро, качественно. Рекомендую всем." },
];

export default function ProductModal({ product, onClose, onAddToCart, onAddToCompare, compareIds }: ProductModalProps) {
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<"desc" | "specs" | "reviews">("desc");
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-10 overflow-y-auto">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white w-full max-w-5xl animate-scale-in z-10">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="text-xs text-gray-400 flex items-center gap-1">
            <span>Каталог</span>
            <Icon name="ChevronRight" size={12} />
            <span>{product.category}</span>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-gray-100 transition-colors">
            <Icon name="X" size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
          {/* Image */}
          <div>
            <div className="aspect-square bg-gray-50 overflow-hidden mb-3 relative">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              {product.badge && (
                <span className="absolute top-3 left-3 bg-[#141414] text-white text-xs font-bold px-2 py-1 uppercase">
                  {product.badge}
                </span>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <div className="text-xs text-gray-400 uppercase tracking-wide mb-2">{product.category}</div>
            <h2 className="font-display text-2xl font-bold text-[#141414] uppercase leading-tight mb-3">
              {product.name}
            </h2>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Icon key={s} name="Star" size={14} className={s <= product.rating ? "text-brand fill-brand" : "text-gray-200 fill-gray-200"} />
                ))}
              </div>
              <span className="text-sm text-gray-500">{product.rating} ({product.reviews} отзывов)</span>
            </div>

            <div className="flex items-baseline gap-3 mb-6 pb-6 border-b border-gray-100">
              <span className="font-display text-4xl font-bold text-[#141414]">
                {product.price.toLocaleString("ru-RU")} ₽
              </span>
              <span className="text-gray-400">/ {product.unit}</span>
              {product.oldPrice && (
                <>
                  <span className="text-gray-400 line-through text-lg">{product.oldPrice.toLocaleString("ru-RU")} ₽</span>
                  <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 font-bold">
                    -{Math.round((1 - product.price / product.oldPrice) * 100)}%
                  </span>
                </>
              )}
            </div>

            <div className={`inline-flex items-center gap-1.5 text-sm mb-6 ${product.inStock ? "text-green-600" : "text-red-500"}`}>
              <Icon name={product.inStock ? "CheckCircle" : "XCircle"} size={16} />
              {product.inStock ? "В наличии" : "Нет в наличии"}
            </div>

            {/* Qty + Add */}
            {product.inStock && (
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center border border-gray-200">
                  <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors">
                    <Icon name="Minus" size={16} />
                  </button>
                  <span className="w-12 text-center font-medium">{qty}</span>
                  <button onClick={() => setQty(qty + 1)} className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors">
                    <Icon name="Plus" size={16} />
                  </button>
                </div>
                <button
                  onClick={handleAdd}
                  className={`flex-1 py-3 font-display font-semibold uppercase tracking-wide transition-colors ${
                    added ? "bg-green-500 text-white" : "bg-[#141414] text-white hover:bg-gray-800"
                  }`}
                >
                  {added ? "Добавлено ✓" : "В корзину"}
                </button>
              </div>
            )}

            <div className="flex gap-2 mb-6">
              <button
                onClick={() => onAddToCompare(product)}
                className={`flex items-center gap-1.5 px-4 py-2.5 border text-sm transition-colors ${
                  compareIds.includes(product.id)
                    ? "border-brand text-brand bg-brand/5"
                    : "border-gray-200 text-gray-600 hover:border-gray-400"
                }`}
              >
                <Icon name="BarChart2" size={14} />
                {compareIds.includes(product.id) ? "Добавлено" : "Сравнить"}
              </button>
              <button className="flex items-center gap-1.5 px-4 py-2.5 border border-gray-200 text-sm text-gray-600 hover:border-gray-400 transition-colors">
                <Icon name="Heart" size={14} />
                В избранное
              </button>
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-500 border border-gray-100 px-3 py-2">
              <Icon name="Truck" size={14} className="text-brand" />
              Доставка от 1 дня. Бесплатно от 15 000 ₽
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-6 pb-6">
          <div className="flex border-b border-gray-100 mb-6">
            {(["desc", "specs", "reviews"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  tab === t ? "border-[#141414] text-[#141414]" : "border-transparent text-gray-400 hover:text-[#141414]"
                }`}
              >
                {{ desc: "Описание", specs: "Характеристики", reviews: `Отзывы (${reviews.length})` }[t]}
              </button>
            ))}
          </div>

          {tab === "desc" && (
            <p className="text-sm text-gray-600 leading-relaxed">
              Высококачественный товар от проверенного производителя. Соответствует всем нормам ГОСТ.
              Применяется в строительстве, ремонте и отделке. Прочный, долговечный, устойчивый к нагрузкам.
              Рекомендован профессиональными строителями.
            </p>
          )}

          {tab === "specs" && (
            <table className="w-full text-sm">
              <tbody>
                {[
                  ["Артикул", `STR-${product.id.toString().padStart(5, "0")}`],
                  ["Категория", product.category],
                  ["Единица измерения", product.unit],
                  ["В наличии", product.inStock ? "Да" : "Нет"],
                  ["Гарантия", "12 месяцев"],
                  ["Страна производства", "Россия"],
                ].map(([key, val], i) => (
                  <tr key={key} className={i % 2 === 0 ? "bg-gray-50" : ""}>
                    <td className="px-4 py-2.5 text-gray-500 w-1/2">{key}</td>
                    <td className="px-4 py-2.5 font-medium text-[#141414]">{val}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {tab === "reviews" && (
            <div className="space-y-4">
              {reviews.map((r, i) => (
                <div key={i} className="border border-gray-100 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm text-[#141414]">{r.name}</span>
                      <div className="flex">
                        {[1,2,3,4,5].map((s) => (
                          <Icon key={s} name="Star" size={11} className={s <= r.rating ? "text-brand fill-brand" : "text-gray-200 fill-gray-200"} />
                        ))}
                      </div>
                    </div>
                    <span className="text-xs text-gray-400">{r.date}</span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{r.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
