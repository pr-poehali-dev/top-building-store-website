import { useState } from "react";
import Icon from "@/components/ui/icon";
import type { Product } from "@/components/ProductCard";

interface CartItem extends Product {
  qty: number;
}

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQty: (id: number, qty: number) => void;
  onRemove: (id: number) => void;
}

export default function CartDrawer({ open, onClose, items, onUpdateQty, onRemove }: CartDrawerProps) {
  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/40 z-50" onClick={onClose} />
      )}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 flex flex-col transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Icon name="ShoppingCart" size={20} />
            <h2 className="font-display font-bold uppercase text-[#141414]">
              Корзина
            </h2>
            {items.length > 0 && (
              <span className="bg-[#141414] text-white text-xs px-2 py-0.5 font-sans">
                {items.reduce((s, i) => s + i.qty, 0)}
              </span>
            )}
          </div>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 transition-colors">
            <Icon name="X" size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <Icon name="ShoppingCart" size={48} className="mx-auto mb-4 opacity-20" />
              <p className="font-display text-lg">Корзина пуста</p>
              <p className="text-sm mt-2">Добавьте товары из каталога</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 pb-4 border-b border-gray-50">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-[#141414] leading-tight mb-1 line-clamp-2">{item.name}</h4>
                    <div className="text-xs text-gray-400 mb-2">{item.price.toLocaleString("ru-RU")} ₽ / {item.unit}</div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-gray-200">
                        <button
                          onClick={() => item.qty > 1 ? onUpdateQty(item.id, item.qty - 1) : onRemove(item.id)}
                          className="w-7 h-7 flex items-center justify-center hover:bg-gray-50 transition-colors"
                        >
                          <Icon name="Minus" size={12} />
                        </button>
                        <span className="w-8 text-center text-sm">{item.qty}</span>
                        <button
                          onClick={() => onUpdateQty(item.id, item.qty + 1)}
                          className="w-7 h-7 flex items-center justify-center hover:bg-gray-50 transition-colors"
                        >
                          <Icon name="Plus" size={12} />
                        </button>
                      </div>
                      <div className="text-sm font-bold font-display">
                        {(item.price * item.qty).toLocaleString("ru-RU")} ₽
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => onRemove(item.id)}
                    className="self-start p-1 hover:bg-gray-100 transition-colors flex-shrink-0"
                  >
                    <Icon name="Trash2" size={14} className="text-gray-400" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-gray-100 bg-gray-50">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-gray-500">Итого ({items.reduce((s, i) => s + i.qty, 0)} товаров):</span>
              <span className="font-display text-2xl font-bold text-[#141414]">
                {total.toLocaleString("ru-RU")} ₽
              </span>
            </div>
            {total < 15000 && (
              <div className="flex items-center gap-2 text-xs text-gray-500 mb-4 bg-white border border-gray-200 px-3 py-2">
                <Icon name="Truck" size={14} className="text-brand" />
                До бесплатной доставки: {(15000 - total).toLocaleString("ru-RU")} ₽
              </div>
            )}
            <button className="w-full py-4 bg-[#141414] text-white font-display font-semibold uppercase tracking-wide hover:bg-gray-800 transition-colors mb-2">
              Оформить заказ
            </button>
            <button onClick={onClose} className="w-full py-2.5 border border-gray-200 text-sm text-gray-500 hover:border-gray-400 transition-colors">
              Продолжить покупки
            </button>
          </div>
        )}
      </div>
    </>
  );
}
