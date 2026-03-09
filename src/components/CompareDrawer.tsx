import Icon from "@/components/ui/icon";
import type { Product } from "@/data/products";

interface CompareDrawerProps {
  open: boolean;
  onClose: () => void;
  items: Product[];
  onRemove: (id: number) => void;
}

export default function CompareDrawer({ open, onClose, items, onRemove }: CompareDrawerProps) {
  const specs = ["Цена", "Единица", "Рейтинг", "Отзывы", "Наличие", "Категория"];

  const getSpec = (product: Product, spec: string) => {
    switch (spec) {
      case "Цена": return `${product.price.toLocaleString("ru-RU")} ₽`;
      case "Единица": return product.unit;
      case "Рейтинг": return `${product.rating} / 5`;
      case "Отзывы": return `${product.reviews} отзывов`;
      case "Наличие": return product.inStock ? "В наличии" : "Нет в наличии";
      case "Категория": return product.category;
      default: return "—";
    }
  };

  return (
    <>
      {open && <div className="fixed inset-0 bg-black/40 z-50" onClick={onClose} />}
      <div
        className={`fixed top-0 right-0 h-full bg-white z-50 flex flex-col transition-transform duration-300 shadow-2xl ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ width: Math.min(items.length * 220 + 160, 900) + "px", maxWidth: "95vw" }}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Icon name="BarChart2" size={20} />
            <h2 className="font-display font-bold uppercase text-[#141414]">
              Сравнение товаров
            </h2>
            {items.length > 0 && (
              <span className="bg-[#141414] text-white text-xs px-2 py-0.5 font-sans">{items.length}</span>
            )}
          </div>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 transition-colors">
            <Icon name="X" size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-auto">
          {items.length === 0 ? (
            <div className="text-center py-16 text-gray-400 px-6">
              <Icon name="BarChart2" size={48} className="mx-auto mb-4 opacity-20" />
              <p className="font-display text-lg">Нет товаров для сравнения</p>
              <p className="text-sm mt-2">Добавьте товары из каталога с помощью кнопки «Сравнить»</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left px-4 py-3 text-xs text-gray-400 uppercase font-medium w-32 border-b border-gray-100">
                      Характеристика
                    </th>
                    {items.map((item) => (
                      <th key={item.id} className="px-4 py-3 border-b border-gray-100 min-w-[180px]">
                        <div className="relative">
                          <button
                            onClick={() => onRemove(item.id)}
                            className="absolute -top-1 -right-1 w-5 h-5 bg-gray-100 hover:bg-red-100 flex items-center justify-center transition-colors"
                          >
                            <Icon name="X" size={10} />
                          </button>
                          <img src={item.image} alt={item.name} className="w-20 h-20 object-cover mx-auto mb-2" />
                          <div className="text-sm font-medium text-[#141414] leading-tight">{item.name}</div>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {specs.map((spec, si) => (
                    <tr key={spec} className={si % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                      <td className="px-4 py-3 text-xs font-medium text-gray-500 uppercase">{spec}</td>
                      {items.map((item) => (
                        <td key={item.id} className="px-4 py-3 text-sm text-[#141414] text-center font-medium">
                          {spec === "Наличие" ? (
                            <span className={item.inStock ? "text-green-600" : "text-red-500"}>
                              {getSpec(item, spec)}
                            </span>
                          ) : spec === "Цена" ? (
                            <span className="font-display font-bold text-base">{getSpec(item, spec)}</span>
                          ) : (
                            getSpec(item, spec)
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}