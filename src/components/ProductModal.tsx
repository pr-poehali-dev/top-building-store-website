import { useState } from "react";
import Icon from "@/components/ui/icon";
import type { Product } from "@/data/products";

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (p: Product) => void;
  onAddToCompare: (p: Product) => void;
  compareIds: number[];
}

const mockReviews = [
  { name: "Андрей К.", rating: 5, date: "12.02.2025", text: "Отличное качество! Заказывал уже второй раз. Доставили быстро, упаковка без повреждений." },
  { name: "Светлана М.", rating: 4, date: "05.01.2025", text: "Хороший товар за свои деньги. Немного задержали доставку, но менеджер предупредил заранее." },
  { name: "Игорь В.", rating: 5, date: "28.12.2024", text: "Профессионально, быстро, качественно. Рекомендую всем." },
];

export default function ProductModal({ product, onClose, onAddToCart, onAddToCompare, compareIds }: ProductModalProps) {
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<"desc" | "specs" | "reviews">("specs");
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : null;

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="relative min-h-screen flex items-start justify-center p-4 pt-6">
        <div className="relative bg-white w-full max-w-4xl shadow-2xl z-10">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100 bg-gray-50">
            <div className="flex items-center gap-2 text-xs text-gray-400 min-w-0">
              <span>{product.categoryName}</span>
              <Icon name="ChevronRight" size={11} />
              <span className="text-[#141414] font-medium truncate">{product.name}</span>
            </div>
            <button onClick={onClose} className="p-1.5 hover:bg-gray-200 transition-colors ml-3 flex-shrink-0">
              <Icon name="X" size={18} />
            </button>
          </div>

          {/* TOP — Леруа: фото + название + цена + наличие */}
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="border-r border-gray-100 bg-gray-50 flex items-center justify-center p-6">
              <div className="relative w-full max-w-xs aspect-square">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                {product.badge && (
                  <span className="absolute top-3 left-3 bg-[#141414] text-white text-[10px] font-bold px-2 py-0.5 uppercase">{product.badge}</span>
                )}
                {discount && (
                  <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-0.5">−{discount}%</span>
                )}
              </div>
            </div>

            <div className="p-5 flex flex-col">
              <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">{product.brand} · {product.sku}</div>
              <h2 className="font-display text-xl font-bold text-[#141414] uppercase leading-tight mb-3">{product.name}</h2>

              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[1,2,3,4,5].map((s) => (
                    <Icon key={s} name="Star" size={13} className={s <= product.rating ? "text-brand fill-brand" : "text-gray-200 fill-gray-200"} />
                  ))}
                </div>
                <span className="text-xs text-gray-500">{product.rating} ({product.reviews} отзывов)</span>
              </div>

              <div className="flex items-baseline gap-2 mb-2">
                <span className="font-display text-3xl font-bold text-[#141414]">{product.price.toLocaleString("ru-RU")} ₽</span>
                <span className="text-gray-400 text-sm">/ {product.unit}</span>
                {product.oldPrice && (
                  <span className="text-gray-400 line-through text-base ml-1">{product.oldPrice.toLocaleString("ru-RU")} ₽</span>
                )}
              </div>

              <div className={`flex items-center gap-1.5 text-sm font-medium mb-5 ${product.inStock ? "text-green-600" : "text-red-500"}`}>
                <Icon name={product.inStock ? "CheckCircle" : "XCircle"} size={15} />
                {product.inStock ? "В наличии" : "Нет в наличии"}
              </div>

              {product.inStock && (
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center border border-gray-200 flex-shrink-0">
                    <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-9 h-10 flex items-center justify-center hover:bg-gray-50">
                      <Icon name="Minus" size={14} />
                    </button>
                    <span className="w-10 text-center text-sm font-medium">{qty}</span>
                    <button onClick={() => setQty(qty + 1)} className="w-9 h-10 flex items-center justify-center hover:bg-gray-50">
                      <Icon name="Plus" size={14} />
                    </button>
                  </div>
                  <button onClick={handleAdd}
                    className={`flex-1 py-2.5 font-display font-semibold uppercase tracking-wide text-sm transition-all ${
                      added ? "bg-green-500 text-white" : "bg-[#141414] text-white hover:bg-gray-800"
                    }`}>
                    {added ? "✓ Добавлено" : "+ В корзину"}
                  </button>
                </div>
              )}

              <div className="flex gap-2 mb-4">
                <button onClick={() => onAddToCompare(product)}
                  className={`flex items-center gap-1.5 px-3 py-2 border text-xs transition-colors ${
                    compareIds.includes(product.id) ? "border-brand text-brand" : "border-gray-200 text-gray-500 hover:border-gray-400"
                  }`}>
                  <Icon name="BarChart2" size={13} />
                  {compareIds.includes(product.id) ? "Добавлено" : "Сравнить"}
                </button>
                <button className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 text-xs text-gray-500 hover:border-gray-400 transition-colors">
                  <Icon name="Heart" size={13} />
                  Избранное
                </button>
              </div>

              <div className="flex items-center gap-2 text-xs text-gray-400 border border-gray-100 bg-gray-50 px-3 py-2 mt-auto">
                <Icon name="Truck" size={13} className="text-brand flex-shrink-0" />
                Доставка от 1 дня · Бесплатно от 15 000 ₽
              </div>
            </div>
          </div>

          {/* BOTTOM — Петрович: таблица характеристик */}
          <div className="border-t border-gray-100">
            <div className="flex border-b border-gray-100 bg-gray-50">
              {(["specs", "desc", "reviews"] as const).map((t) => (
                <button key={t} onClick={() => setTab(t)}
                  className={`px-5 py-3 text-sm font-medium transition-colors border-b-2 ${
                    tab === t ? "border-[#141414] text-[#141414] bg-white" : "border-transparent text-gray-400 hover:text-[#141414]"
                  }`}>
                  {{ specs: "Характеристики", desc: "Описание", reviews: `Отзывы (${mockReviews.length})` }[t]}
                </button>
              ))}
            </div>

            <div className="p-5">
              {tab === "specs" && (
                <table className="w-full text-sm">
                  <tbody>
                    {Object.entries(product.specs).map(([key, val], i) => (
                      <tr key={key} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                        <td className="px-4 py-2.5 text-gray-500 w-1/2 border-b border-gray-50">{key}</td>
                        <td className="px-4 py-2.5 font-medium text-[#141414] border-b border-gray-50">{val}</td>
                      </tr>
                    ))}
                    <tr className="bg-gray-50">
                      <td className="px-4 py-2.5 text-gray-500">Артикул</td>
                      <td className="px-4 py-2.5 font-medium text-[#141414]">{product.sku}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2.5 text-gray-500">Бренд</td>
                      <td className="px-4 py-2.5 font-medium text-[#141414]">{product.brand}</td>
                    </tr>
                  </tbody>
                </table>
              )}
              {tab === "desc" && (
                <p className="text-sm text-gray-600 leading-relaxed">
                  {product.name} — высококачественный товар от {product.brand}. Соответствует всем нормам ГОСТ. Применяется в строительстве, ремонте и отделке. Прочный, долговечный, устойчивый к нагрузкам. Поставляется в оригинальной упаковке производителя.
                </p>
              )}
              {tab === "reviews" && (
                <div className="space-y-3">
                  {mockReviews.map((r, i) => (
                    <div key={i} className="border border-gray-100 p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">{r.name}</span>
                          <div className="flex">
                            {[1,2,3,4,5].map((s) => (
                              <Icon key={s} name="Star" size={11} className={s <= r.rating ? "text-brand fill-brand" : "text-gray-200 fill-gray-200"} />
                            ))}
                          </div>
                        </div>
                        <span className="text-xs text-gray-400">{r.date}</span>
                      </div>
                      <p className="text-sm text-gray-600">{r.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
