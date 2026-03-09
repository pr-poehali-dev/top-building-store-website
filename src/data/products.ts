export const HERO_IMAGE = "https://cdn.poehali.dev/projects/b9b71d18-7ffe-4fee-a9cc-b4407768b652/files/5b9231e2-fb47-4049-8980-9a9d140a0bd4.jpg";
export const TOOLS_IMAGE = "https://cdn.poehali.dev/projects/b9b71d18-7ffe-4fee-a9cc-b4407768b652/files/b51ec4d3-47d7-4955-a4d5-0338f8cb9bc6.jpg";
export const TILES_IMAGE = "https://cdn.poehali.dev/projects/b9b71d18-7ffe-4fee-a9cc-b4407768b652/files/5272df1d-2782-4638-b5cd-4aaba2cb832f.jpg";
export const CAT_FASTENERS = "https://cdn.poehali.dev/projects/b9b71d18-7ffe-4fee-a9cc-b4407768b652/files/2b08cdb1-3c97-423a-b830-848c9e40dc20.jpg";
export const CAT_TOOLS = "https://cdn.poehali.dev/projects/b9b71d18-7ffe-4fee-a9cc-b4407768b652/files/ca283e9b-1523-46b5-a9ab-03faf8a29d2f.jpg";
export const CAT_ELECTRICAL = "https://cdn.poehali.dev/projects/b9b71d18-7ffe-4fee-a9cc-b4407768b652/files/614cc84f-4dbf-4824-ad8c-62be2a18ea63.jpg";
export const CAT_PLUMBING = "https://cdn.poehali.dev/projects/b9b71d18-7ffe-4fee-a9cc-b4407768b652/files/1268298e-a858-4f47-8675-151334e2bb01.jpg";
export const CAT_BUILDING = "https://cdn.poehali.dev/projects/b9b71d18-7ffe-4fee-a9cc-b4407768b652/files/74ffa855-c38a-4ded-8dbb-653ce43d6e86.jpg";
export const CAT_PAINT = "https://cdn.poehali.dev/projects/b9b71d18-7ffe-4fee-a9cc-b4407768b652/files/29c721f3-25b7-42d3-8cff-fe53f0edd0f6.jpg";

export interface Product {
  id: number;
  name: string;
  category: string;
  categoryName: string;
  price: number;
  oldPrice?: number;
  unit: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  badge?: string;
  image: string;
  brand: string;
  sku: string;
  specs: Record<string, string>;
  searchTags: string[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  image: string;
  count: number;
  subcategories: string[];
}

export const categories: Category[] = [
  {
    id: "fasteners",
    name: "Крепёж",
    icon: "Minus",
    image: CAT_FASTENERS,
    count: 12400,
    subcategories: ["Саморезы", "Болты и гайки", "Анкеры", "Дюбели", "Шпильки", "Гвозди", "Скобы", "Хомуты"],
  },
  {
    id: "tools",
    name: "Инструмент",
    icon: "Wrench",
    image: CAT_TOOLS,
    count: 8900,
    subcategories: ["Дрели и шуруповёрты", "Перфораторы", "Болгарки", "Пилы", "Измерительный", "Ручной инструмент", "Расходники", "Средства защиты"],
  },
  {
    id: "electrical",
    name: "Электрика",
    icon: "Zap",
    image: CAT_ELECTRICAL,
    count: 6700,
    subcategories: ["Кабель и провод", "Розетки и выключатели", "Щиты и автоматы", "Светильники", "Лампочки", "Кабель-каналы", "Гофра", "Счётчики"],
  },
  {
    id: "plumbing",
    name: "Сантехника",
    icon: "Droplets",
    image: CAT_PLUMBING,
    count: 5300,
    subcategories: ["Трубы", "Фитинги", "Смесители", "Унитазы", "Ванны", "Душевые", "Радиаторы", "Насосы"],
  },
  {
    id: "building",
    name: "Стройматериалы",
    icon: "Building2",
    image: CAT_BUILDING,
    count: 9200,
    subcategories: ["Цемент и бетон", "Кирпич", "Блоки", "Пиломатериалы", "Гипсокартон", "Утеплители", "Гидроизоляция", "Кровля"],
  },
  {
    id: "paint",
    name: "Отделка и краска",
    icon: "Paintbrush",
    image: CAT_PAINT,
    count: 4100,
    subcategories: ["Краски", "Грунтовки", "Шпаклёвки", "Штукатурки", "Обои", "Плитка", "Ламинат", "Клеи"],
  },
];

export const products: Product[] = [
  {
    id: 1,
    name: "Саморез универсальный 4.2×75 мм (200 шт)",
    category: "fasteners",
    categoryName: "Крепёж",
    price: 189,
    unit: "уп",
    rating: 4.9,
    reviews: 847,
    inStock: true,
    badge: "Хит",
    image: CAT_FASTENERS,
    brand: "Зубр",
    sku: "STR-00001",
    specs: { "Диаметр": "4.2 мм", "Длина": "75 мм", "Материал": "Сталь оцинк.", "Количество": "200 шт", "Покрытие": "Цинк" },
    searchTags: ["саморез", "4.2", "75", "крепёж"],
  },
  {
    id: 2,
    name: "Саморез кровельный 4.8×35 мм (250 шт)",
    category: "fasteners",
    categoryName: "Крепёж",
    price: 245,
    oldPrice: 290,
    unit: "уп",
    rating: 4.7,
    reviews: 412,
    inStock: true,
    badge: "Акция",
    image: CAT_FASTENERS,
    brand: "Зубр",
    sku: "STR-00002",
    specs: { "Диаметр": "4.8 мм", "Длина": "35 мм", "Покрытие": "RAL 6020", "Количество": "250 шт" },
    searchTags: ["саморез", "кровельный", "4.8", "35"],
  },
  {
    id: 3,
    name: "Анкер-болт M10×100 мм (10 шт)",
    category: "fasteners",
    categoryName: "Крепёж",
    price: 320,
    unit: "уп",
    rating: 4.8,
    reviews: 231,
    inStock: true,
    image: CAT_FASTENERS,
    brand: "Hilti",
    sku: "STR-00003",
    specs: { "Диаметр": "M10", "Длина": "100 мм", "Нагрузка": "до 3200 кг", "Количество": "10 шт" },
    searchTags: ["анкер", "болт", "M10", "100"],
  },
  {
    id: 4,
    name: "Перфоратор SDS+ 800 Вт (бур 6 мм в комплекте)",
    category: "tools",
    categoryName: "Инструмент",
    price: 8490,
    oldPrice: 10200,
    unit: "шт",
    rating: 4.8,
    reviews: 156,
    inStock: true,
    badge: "Акция",
    image: CAT_TOOLS,
    brand: "Makita",
    sku: "STR-00004",
    specs: { "Мощность": "800 Вт", "Тип патрона": "SDS+", "Удар": "2.7 Дж", "Вес": "3.2 кг" },
    searchTags: ["перфоратор", "SDS", "800", "бур"],
  },
  {
    id: 5,
    name: "Бур SDS+ 6×110 мм (5 шт)",
    category: "tools",
    categoryName: "Инструмент",
    price: 390,
    unit: "уп",
    rating: 4.6,
    reviews: 523,
    inStock: true,
    image: CAT_TOOLS,
    brand: "Bosch",
    sku: "STR-00005",
    specs: { "Диаметр": "6 мм", "Длина": "110 мм", "Тип": "SDS+", "Количество": "5 шт" },
    searchTags: ["бур", "6", "110", "SDS"],
  },
  {
    id: 6,
    name: "Диск отрезной по металлу 125×1.2×22.23 мм",
    category: "tools",
    categoryName: "Инструмент",
    price: 65,
    unit: "шт",
    rating: 4.5,
    reviews: 1204,
    inStock: true,
    badge: "Хит",
    image: CAT_TOOLS,
    brand: "Луга",
    sku: "STR-00006",
    specs: { "Диаметр": "125 мм", "Толщина": "1.2 мм", "Посадка": "22.23 мм", "Материал": "Металл" },
    searchTags: ["диск", "125", "отрезной", "металл"],
  },
  {
    id: 7,
    name: "Кабель ВВГнг-LS 3×2.5 мм², 100 м",
    category: "electrical",
    categoryName: "Электрика",
    price: 4800,
    unit: "бухта",
    rating: 4.9,
    reviews: 342,
    inStock: true,
    image: CAT_ELECTRICAL,
    brand: "Севкабель",
    sku: "STR-00007",
    specs: { "Сечение": "3×2.5 мм²", "Длина": "100 м", "Напряжение": "0.66 кВ", "Оболочка": "ПВХ нг-LS" },
    searchTags: ["кабель", "ВВГ", "2.5", "100"],
  },
  {
    id: 8,
    name: "Автомат двухполюсный 25А тип С",
    category: "electrical",
    categoryName: "Электрика",
    price: 890,
    unit: "шт",
    rating: 4.8,
    reviews: 178,
    inStock: true,
    image: CAT_ELECTRICAL,
    brand: "IEK",
    sku: "STR-00008",
    specs: { "Ток": "25А", "Полюса": "2", "Тип": "С", "Стандарт": "IEC 60898" },
    searchTags: ["автомат", "25А", "двухполюсный", "щиток"],
  },
  {
    id: 9,
    name: "Труба полипропиленовая 25 мм PN20, 4 м",
    category: "plumbing",
    categoryName: "Сантехника",
    price: 145,
    unit: "шт",
    rating: 4.7,
    reviews: 289,
    inStock: true,
    image: CAT_PLUMBING,
    brand: "Valtec",
    sku: "STR-00009",
    specs: { "Диаметр": "25 мм", "Класс": "PN20", "Длина": "4 м", "Материал": "PPR" },
    searchTags: ["труба", "полипропилен", "25", "PN20"],
  },
  {
    id: 10,
    name: "Цемент М500 Д0 Portland, мешок 50 кг",
    category: "building",
    categoryName: "Стройматериалы",
    price: 620,
    unit: "мешок",
    rating: 4.9,
    reviews: 891,
    inStock: true,
    badge: "Хит",
    image: CAT_BUILDING,
    brand: "Новоросцемент",
    sku: "STR-00010",
    specs: { "Марка": "М500", "Добавки": "Д0", "Вес": "50 кг", "ГОСТ": "31108-2016" },
    searchTags: ["цемент", "М500", "portland", "50кг"],
  },
  {
    id: 11,
    name: "Брус строительный 100×100×6000 мм, сосна",
    category: "building",
    categoryName: "Стройматериалы",
    price: 890,
    oldPrice: 1100,
    unit: "шт",
    rating: 4.7,
    reviews: 124,
    inStock: true,
    badge: "Акция",
    image: CAT_BUILDING,
    brand: "СибЛес",
    sku: "STR-00011",
    specs: { "Сечение": "100×100 мм", "Длина": "6000 мм", "Порода": "Сосна", "Сорт": "2" },
    searchTags: ["брус", "100x100", "6000", "сосна"],
  },
  {
    id: 12,
    name: "Краска фасадная белая морозостойкая, 15 л",
    category: "paint",
    categoryName: "Отделка",
    price: 4750,
    oldPrice: 5500,
    unit: "ведро",
    rating: 4.6,
    reviews: 98,
    inStock: false,
    badge: "Акция",
    image: CAT_PAINT,
    brand: "Текс",
    sku: "STR-00012",
    specs: { "Объём": "15 л", "Тип": "Фасадная", "Основа": "Акрил", "Расход": "200 г/м²" },
    searchTags: ["краска", "фасадная", "белая", "15л"],
  },
];

export const promos = [
  {
    id: 1,
    title: "Весенняя стройка",
    subtitle: "Скидки до 30% на весь крепёж и инструмент",
    badge: "До −30%",
    color: "from-[#141414] to-[#2a2a2a]",
    image: CAT_TOOLS,
    deadline: "До 30 марта",
  },
  {
    id: 2,
    title: "Ремонт с умом",
    subtitle: "Отделочные материалы — лучшие цены сезона",
    badge: "Скидка 20%",
    color: "from-[#1a1208] to-[#3d2e0a]",
    image: CAT_PAINT,
    deadline: "До 15 апреля",
  },
  {
    id: 3,
    title: "Электрика PRO",
    subtitle: "Кабель, автоматы, щиты — рассрочка 0%",
    badge: "Рассрочка 0%",
    color: "from-[#0a1a1a] to-[#0d3030]",
    image: CAT_ELECTRICAL,
    deadline: "Постоянная",
  },
];
