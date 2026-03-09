import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import CompareDrawer from "@/components/CompareDrawer";
import ProductModal from "@/components/ProductModal";
import HomePage from "@/pages/HomePage";
import CatalogPage from "@/pages/CatalogPage";
import PromoPage from "@/pages/PromoPage";
import DeliveryPage from "@/pages/DeliveryPage";
import AboutPage from "@/pages/AboutPage";
import ContactsPage from "@/pages/ContactsPage";
import CalculatorPage from "@/pages/CalculatorPage";
import type { Product } from "@/data/products";
import Icon from "@/components/ui/icon";

interface CartItem extends Product {
  qty: number;
}

export default function App() {
  const [page, setPage] = useState("home");
  const [catalogCategory, setCatalogCategory] = useState<string | undefined>(undefined);
  const [cartOpen, setCartOpen] = useState(false);
  const [compareOpen, setCompareOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [compareItems, setCompareItems] = useState<Product[]>([]);

  const navigate = (p: string, categoryId?: string) => {
    setPage(p);
    if (p === "catalog" && categoryId) {
      setCatalogCategory(categoryId);
    } else if (p === "catalog" && !categoryId) {
      setCatalogCategory(undefined);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const addToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) return prev.map((i) => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const updateQty = (id: number, qty: number) => {
    setCartItems((prev) => prev.map((i) => i.id === id ? { ...i, qty } : i));
  };

  const removeFromCart = (id: number) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  };

  const addToCompare = (product: Product) => {
    setCompareItems((prev) => {
      if (prev.find((i) => i.id === product.id)) return prev.filter((i) => i.id !== product.id);
      if (prev.length >= 4) return prev;
      return [...prev, product];
    });
  };

  const compareIds = compareItems.map((i) => i.id);

  const pageProps = {
    onAddToCart: addToCart,
    onAddToCompare: addToCompare,
    onOpenProduct: setSelectedProduct,
    compareIds,
  };

  const renderPage = () => {
    switch (page) {
      case "home": return <HomePage onNavigate={navigate} {...pageProps} />;
      case "catalog": return <CatalogPage {...pageProps} initialCategory={catalogCategory} />;
      case "promo": return <PromoPage {...pageProps} />;
      case "delivery": return <DeliveryPage />;
      case "about": return <AboutPage />;
      case "contacts": return <ContactsPage />;
      case "calculator": return <CalculatorPage />;
      default: return <HomePage onNavigate={navigate} {...pageProps} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        activePage={page}
        onNavigate={navigate}
        cartCount={cartItems.reduce((s, i) => s + i.qty, 0)}
        compareCount={compareItems.length}
        onCartOpen={() => setCartOpen(true)}
        onCompareOpen={() => setCompareOpen(true)}
        onOpenProduct={setSelectedProduct}
      />

      <main className="flex-1">
        {renderPage()}
      </main>

      {/* Calculator banner */}
      <div className="bg-brand/10 border-t border-brand/20">
        <div className="container py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#C8A96E] flex items-center justify-center flex-shrink-0">
              <Icon name="Calculator" size={16} className="text-[#141414]" />
            </div>
            <div>
              <div className="font-medium text-sm text-[#141414]">Калькулятор материалов</div>
              <div className="text-xs text-gray-500 hidden md:block">Рассчитайте бетон, плитку, краску и пиломатериалы онлайн</div>
            </div>
          </div>
          <button
            onClick={() => navigate("calculator")}
            className="px-4 py-2 bg-[#141414] text-white text-sm font-medium hover:bg-gray-800 transition-colors whitespace-nowrap"
          >
            Открыть
          </button>
        </div>
      </div>

      <Footer onNavigate={navigate} />

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQty={updateQty}
        onRemove={removeFromCart}
      />

      <CompareDrawer
        open={compareOpen}
        onClose={() => setCompareOpen(false)}
        items={compareItems}
        onRemove={(id) => setCompareItems((prev) => prev.filter((i) => i.id !== id))}
      />

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={addToCart}
          onAddToCompare={addToCompare}
          compareIds={compareIds}
        />
      )}
    </div>
  );
}
