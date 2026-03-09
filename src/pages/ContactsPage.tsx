import { useState } from "react";
import Icon from "@/components/ui/icon";

export default function ContactsPage() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="py-12">
      <div className="container">
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-6">
          <span>Главная</span>
          <Icon name="ChevronRight" size={12} />
          <span className="text-[#141414]">Контакты</span>
        </div>

        <h1 className="font-display text-4xl font-bold uppercase text-[#141414] mb-10">Контакты</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Info */}
          <div>
            <div className="space-y-6 mb-10">
              {[
                {
                  icon: "Phone",
                  title: "Телефон",
                  lines: ["8 800 123-45-67 (бесплатно)", "+7 (495) 123-45-67"],
                },
                {
                  icon: "Mail",
                  title: "Email",
                  lines: ["info@stroymarket.ru", "sales@stroymarket.ru"],
                },
                {
                  icon: "MapPin",
                  title: "Адрес офиса",
                  lines: ["г. Москва, ул. Строителей, д. 15", "Пн–Пт: 9:00–18:00"],
                },
                {
                  icon: "Clock",
                  title: "Режим работы",
                  lines: ["Пн–Сб: 8:00–20:00", "Вс: 10:00–18:00"],
                },
              ].map((contact) => (
                <div key={contact.title} className="flex gap-4">
                  <div className="w-10 h-10 bg-gray-50 border border-gray-100 flex items-center justify-center flex-shrink-0">
                    <Icon name={contact.icon} size={18} className="text-[#141414]" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">{contact.title}</div>
                    {contact.lines.map((line) => (
                      <div key={line} className="text-sm font-medium text-[#141414]">{line}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Map placeholder */}
            <div className="bg-gray-100 border border-gray-200 h-48 flex items-center justify-center">
              <div className="text-center">
                <Icon name="MapPin" size={32} className="text-gray-300 mx-auto mb-2" />
                <span className="text-sm text-gray-400">Карта — Москва, ул. Строителей, 15</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <div>
            <h2 className="font-display text-2xl font-bold uppercase text-[#141414] mb-6">
              Написать нам
            </h2>
            {sent ? (
              <div className="border border-green-200 bg-green-50 p-8 text-center animate-scale-in">
                <Icon name="CheckCircle" size={40} className="text-green-500 mx-auto mb-3" />
                <h3 className="font-display font-bold uppercase text-[#141414] mb-2">Сообщение отправлено!</h3>
                <p className="text-sm text-gray-500">Мы свяжемся с вами в течение 1 рабочего дня.</p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-4 text-sm text-gray-400 hover:text-[#141414] underline"
                >
                  Отправить ещё
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {[
                  { key: "name", label: "Имя", type: "text", placeholder: "Иван Иванов" },
                  { key: "phone", label: "Телефон", type: "tel", placeholder: "+7 (___) ___-__-__" },
                  { key: "email", label: "Email", type: "email", placeholder: "ivan@example.com" },
                ].map((f) => (
                  <div key={f.key}>
                    <label className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wide">{f.label}</label>
                    <input
                      type={f.type}
                      placeholder={f.placeholder}
                      value={(form as Record<string, string>)[f.key]}
                      onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 focus:outline-none focus:border-[#141414] text-sm transition-colors"
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wide">Сообщение</label>
                  <textarea
                    rows={4}
                    placeholder="Опишите ваш вопрос или запрос..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 focus:outline-none focus:border-[#141414] text-sm resize-none transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#141414] text-white font-display font-semibold uppercase tracking-wide hover:bg-gray-800 transition-colors"
                >
                  Отправить сообщение
                </button>
                <p className="text-xs text-gray-400 text-center">
                  Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
