import Icon from "@/components/ui/icon";

export default function DeliveryPage() {
  return (
    <div className="py-12">
      <div className="container max-w-4xl">
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-6">
          <span>Главная</span>
          <Icon name="ChevronRight" size={12} />
          <span className="text-[#141414]">Доставка</span>
        </div>

        <h1 className="font-display text-4xl font-bold uppercase text-[#141414] mb-2">Доставка и оплата</h1>
        <p className="text-gray-500 mb-10">Доставим ваш заказ в любую точку России</p>

        {/* Delivery types */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {[
            {
              icon: "Truck",
              title: "Доставка до двери",
              desc: "Доставляем грузовым транспортом прямо на объект",
              price: "от 1 500 ₽",
              time: "1–3 дня",
            },
            {
              icon: "Package",
              title: "Транспортная компания",
              desc: "Отправка через ТК по всей России",
              price: "по тарифам ТК",
              time: "3–14 дней",
            },
            {
              icon: "Store",
              title: "Самовывоз",
              desc: "Забрать заказ можно со склада в Москве",
              price: "Бесплатно",
              time: "сегодня",
            },
          ].map((item) => (
            <div key={item.title} className="border border-gray-200 p-6 hover:border-gray-400 transition-colors">
              <div className="w-12 h-12 bg-[#141414] flex items-center justify-center mb-4">
                <Icon name={item.icon} size={22} className="text-brand" />
              </div>
              <h3 className="font-display font-bold uppercase text-[#141414] mb-2">{item.title}</h3>
              <p className="text-sm text-gray-500 mb-4">{item.desc}</p>
              <div className="flex items-center justify-between border-t border-gray-100 pt-3 mt-auto">
                <div>
                  <div className="text-xs text-gray-400">Стоимость</div>
                  <div className="font-medium text-[#141414] text-sm">{item.price}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-400">Срок</div>
                  <div className="font-medium text-[#141414] text-sm">{item.time}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Free delivery */}
        <div className="bg-[#141414] text-white p-8 mb-12">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 border border-brand/30 flex items-center justify-center flex-shrink-0">
              <Icon name="Gift" size={22} className="text-brand" />
            </div>
            <div>
              <h3 className="font-display text-xl font-bold uppercase mb-2">Бесплатная доставка</h3>
              <p className="text-gray-300 mb-4">
                При заказе от <strong className="text-brand">15 000 ₽</strong> доставка по Москве и МО бесплатна.
                При заказе от <strong className="text-brand">50 000 ₽</strong> — бесплатно по всей России.
              </p>
              <div className="flex items-center gap-2">
                <Icon name="MapPin" size={14} className="text-brand" />
                <span className="text-sm text-gray-400">Работаем по всей территории России</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment */}
        <div className="mb-12">
          <h2 className="font-display text-2xl font-bold uppercase text-[#141414] mb-6">Способы оплаты</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { icon: "CreditCard", label: "Банковской картой", desc: "Visa, MasterCard, МИР" },
              { icon: "Smartphone", label: "СБП", desc: "Система быстрых платежей" },
              { icon: "Building", label: "Для юрлиц", desc: "Счёт и договор" },
              { icon: "Banknote", label: "Наличными", desc: "При получении" },
            ].map((item) => (
              <div key={item.label} className="border border-gray-100 p-4 flex flex-col items-center text-center gap-2">
                <Icon name={item.icon} size={24} className="text-gray-400" />
                <div className="text-sm font-medium text-[#141414]">{item.label}</div>
                <div className="text-xs text-gray-400">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div>
          <h2 className="font-display text-2xl font-bold uppercase text-[#141414] mb-6">Частые вопросы</h2>
          <div className="space-y-3">
            {[
              { q: "Как рассчитывается стоимость доставки?", a: "Стоимость зависит от веса, объёма и удалённости от Москвы. Точная сумма рассчитывается менеджером после оформления заказа." },
              { q: "Можно ли заказать доставку на определённое время?", a: "Да, при оформлении заказа вы можете указать удобный интервал времени. Мы постараемся его соблюсти." },
              { q: "Что делать при повреждении товара при доставке?", a: "При получении обязательно проверьте товар. В случае повреждений составьте акт с курьером и свяжитесь с нами — мы оперативно решим проблему." },
            ].map((item, i) => (
              <div key={i} className="border border-gray-100 p-5">
                <div className="flex items-start gap-3">
                  <Icon name="HelpCircle" size={18} className="text-brand flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-[#141414] mb-2">{item.q}</h4>
                    <p className="text-sm text-gray-500 leading-relaxed">{item.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
