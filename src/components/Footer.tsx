import Icon from "@/components/ui/icon";

interface FooterProps {
  onNavigate: (page: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-[#141414] text-white mt-auto">
      <div className="container py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-brand flex items-center justify-center">
                <span className="text-[#141414] font-display font-bold text-lg">С</span>
              </div>
              <div>
                <div className="font-display font-bold uppercase tracking-wide">СтройМаркет</div>
                <div className="text-[10px] text-gray-500 tracking-widest uppercase">Стройматериалы</div>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              Ваш надёжный партнёр в строительстве. Работаем с 2009 года.
            </p>
            <div className="flex gap-2">
              {["Youtube", "Instagram", "Linkedin"].map((social) => (
                <button key={social} className="w-8 h-8 border border-white/10 flex items-center justify-center hover:border-brand hover:text-brand transition-colors">
                  <Icon name="Globe" size={14} />
                </button>
              ))}
            </div>
          </div>

          {/* Links */}
          {[
            {
              title: "Каталог",
              links: ["Пиломатериалы", "Бетон и ЖБИ", "Утеплители", "Плитка и керамика", "Инструменты"],
            },
            {
              title: "Информация",
              links: ["О компании", "Доставка", "Акции", "Контакты", "Вакансии"],
            },
            {
              title: "Покупателям",
              links: ["Как купить", "Оплата", "Возврат", "Гарантия", "Программа лояльности"],
            },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="font-display font-semibold uppercase text-sm tracking-wide mb-4">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <button
                      onClick={() => onNavigate("catalog")}
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contacts */}
        <div className="border-t border-white/10 pt-8 pb-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { icon: "Phone", text: "8 800 123-45-67", sub: "Бесплатно по России" },
              { icon: "Mail", text: "info@stroymarket.ru", sub: "Напишите нам" },
              { icon: "MapPin", text: "Москва, ул. Строителей 15", sub: "Главный офис" },
              { icon: "Clock", text: "Пн–Сб 8:00–20:00", sub: "Режим работы" },
            ].map((contact) => (
              <div key={contact.text} className="flex items-center gap-3">
                <Icon name={contact.icon} size={16} className="text-brand flex-shrink-0" />
                <div>
                  <div className="text-sm text-white">{contact.text}</div>
                  <div className="text-xs text-gray-500">{contact.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-xs text-gray-500">© 2009–2026 СтройМаркет. Все права защищены.</span>
          <div className="flex gap-4">
            <button className="text-xs text-gray-500 hover:text-white transition-colors">Политика конфиденциальности</button>
            <button className="text-xs text-gray-500 hover:text-white transition-colors">Пользовательское соглашение</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
