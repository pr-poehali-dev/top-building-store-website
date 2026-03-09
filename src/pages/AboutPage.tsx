import Icon from "@/components/ui/icon";
import { HERO_IMAGE, CAT_TOOLS, CAT_PLUMBING } from "@/data/products";

export default function AboutPage() {
  return (
    <div className="py-12">
      <div className="container">
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-6">
          <span>Главная</span>
          <Icon name="ChevronRight" size={12} />
          <span className="text-[#141414]">О компании</span>
        </div>

        {/* Hero */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h1 className="font-display text-5xl font-bold uppercase text-[#141414] leading-tight mb-6">
              15 лет на<br />
              <span className="text-brand">рынке</span><br />
              стройматериалов
            </h1>
            <p className="text-gray-600 leading-relaxed mb-6">
              СтройМаркет — крупнейший интернет-магазин строительных материалов в России.
              Мы работаем с 2009 года и за это время помогли более 200 000 клиентов
              реализовать проекты любой сложности.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Работаем как с частными заказчиками, так и с крупными строительными
              компаниями и девелоперами. Гибкие условия сотрудничества, персональный
              менеджер и лучшие цены.
            </p>
          </div>
          <div className="relative">
            <img src={HERO_IMAGE} alt="О компании" className="w-full aspect-square object-cover" />
            <div className="absolute -bottom-4 -left-4 bg-[#141414] p-6 text-white">
              <div className="font-display text-4xl font-bold text-brand">200K+</div>
              <div className="text-sm text-gray-400 mt-1">Довольных клиентов</div>
            </div>
          </div>
        </div>

        {/* Numbers */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border border-gray-100 mb-16">
          {[
            { value: "50 000+", label: "Товаров в каталоге" },
            { value: "15 лет", label: "Успешной работы" },
            { value: "12", label: "Складов по России" },
            { value: "1 день", label: "Минимальный срок доставки" },
          ].map((stat, i) => (
            <div key={i} className="text-center py-8 border-r border-gray-100 last:border-0">
              <div className="font-display text-3xl font-bold text-[#141414] mb-1">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="font-display text-3xl font-bold uppercase text-[#141414] mb-8">Наши принципы</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: "Shield", title: "Качество без компромиссов", desc: "Работаем только с проверенными производителями. Каждый товар сертифицирован и соответствует ГОСТ." },
              { icon: "Users", title: "Клиент в центре", desc: "Наши специалисты помогут подобрать материалы, рассчитать количество и спланировать бюджет." },
              { icon: "Leaf", title: "Ответственный бизнес", desc: "Стремимся к экологичному производству, минимизируем отходы и поддерживаем устойчивое строительство." },
            ].map((item) => (
              <div key={item.title} className="border-l-2 border-brand pl-6 py-2">
                <Icon name={item.icon} size={24} className="text-brand mb-3" />
                <h3 className="font-display font-bold uppercase text-[#141414] mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="mb-16">
          <h2 className="font-display text-3xl font-bold uppercase text-[#141414] mb-8">Команда</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Алексей Петров", role: "Генеральный директор", img: CAT_TOOLS },
              { name: "Мария Козлова", role: "Коммерческий директор", img: CAT_PLUMBING },
              { name: "Дмитрий Иванов", role: "Технический директор", img: HERO_IMAGE },
              { name: "Анна Смирнова", role: "Директор по логистике", img: CAT_TOOLS },
            ].map((person) => (
              <div key={person.name} className="group">
                <div className="aspect-square overflow-hidden mb-3">
                  <img
                    src={person.img}
                    alt={person.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <h4 className="font-medium text-[#141414] text-sm">{person.name}</h4>
                <p className="text-xs text-gray-500">{person.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gray-50 border border-gray-200 p-8 text-center">
          <h3 className="font-display text-2xl font-bold uppercase text-[#141414] mb-3">
            Хотите сотрудничать?
          </h3>
          <p className="text-gray-500 mb-6 max-w-lg mx-auto">
            Мы предлагаем специальные условия для строительных компаний, застройщиков и дизайнеров интерьера.
          </p>
          <button className="bg-[#141414] text-white px-8 py-3 font-display font-semibold uppercase tracking-wide hover:bg-gray-800 transition-colors">
            Связаться с нами
          </button>
        </div>
      </div>
    </div>
  );
}