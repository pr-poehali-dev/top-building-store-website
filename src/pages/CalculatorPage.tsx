import { useState } from "react";
import Icon from "@/components/ui/icon";

type CalcType = "concrete" | "tiles" | "paint" | "lumber";

const calculators: { id: CalcType; name: string; icon: string; desc: string }[] = [
  { id: "concrete", name: "Бетон и цемент", icon: "Building2", desc: "Расчёт количества бетона для фундамента, плит и стяжки" },
  { id: "tiles", name: "Плитка и керамика", icon: "LayoutGrid", desc: "Расчёт площади и количества плитки с учётом подрезки" },
  { id: "paint", name: "Краска и штукатурка", icon: "Paintbrush", desc: "Расчёт расхода краски по площади поверхности" },
  { id: "lumber", name: "Пиломатериалы", icon: "Layers", desc: "Расчёт объёма досок, бруса и других пиломатериалов" },
];

function ConcreteCalc() {
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [depth, setDepth] = useState("");
  const result = length && width && depth
    ? (Number(length) * Number(width) * Number(depth)).toFixed(2)
    : null;
  const cementBags = result ? Math.ceil(Number(result) * 300 / 50) : null;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Длина (м)", value: length, set: setLength },
          { label: "Ширина (м)", value: width, set: setWidth },
          { label: "Глубина (м)", value: depth, set: setDepth },
        ].map((f) => (
          <div key={f.label}>
            <label className="block text-xs font-medium text-gray-500 mb-1">{f.label}</label>
            <input
              type="number"
              value={f.value}
              onChange={(e) => f.set(e.target.value)}
              placeholder="0.00"
              className="w-full px-3 py-2.5 border border-gray-200 focus:outline-none focus:border-[#141414] text-sm"
            />
          </div>
        ))}
      </div>
      {result && (
        <div className="bg-gray-50 border border-gray-200 p-4 animate-fade-in">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-gray-500 mb-1">Объём бетона</div>
              <div className="font-display text-3xl font-bold text-[#141414]">{result} м³</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">Цемент М500 (мешки 50 кг)</div>
              <div className="font-display text-3xl font-bold text-brand">{cementBags} шт</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function TilesCalc() {
  const [roomLength, setRoomLength] = useState("");
  const [roomWidth, setRoomWidth] = useState("");
  const [tileSize, setTileSize] = useState("60");
  const [waste, setWaste] = useState("10");

  const area = roomLength && roomWidth ? Number(roomLength) * Number(roomWidth) : null;
  const withWaste = area ? (area * (1 + Number(waste) / 100)).toFixed(2) : null;
  const tileArea = (Number(tileSize) / 100) ** 2;
  const tiles = withWaste ? Math.ceil(Number(withWaste) / tileArea) : null;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Длина помещения (м)</label>
          <input type="number" value={roomLength} onChange={(e) => setRoomLength(e.target.value)} placeholder="0.00"
            className="w-full px-3 py-2.5 border border-gray-200 focus:outline-none focus:border-[#141414] text-sm" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Ширина помещения (м)</label>
          <input type="number" value={roomWidth} onChange={(e) => setRoomWidth(e.target.value)} placeholder="0.00"
            className="w-full px-3 py-2.5 border border-gray-200 focus:outline-none focus:border-[#141414] text-sm" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Размер плитки (см)</label>
          <select value={tileSize} onChange={(e) => setTileSize(e.target.value)}
            className="w-full px-3 py-2.5 border border-gray-200 focus:outline-none focus:border-[#141414] text-sm bg-white">
            {["30", "45", "60", "90"].map((s) => <option key={s} value={s}>{s}×{s} см</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Запас на подрезку (%)</label>
          <select value={waste} onChange={(e) => setWaste(e.target.value)}
            className="w-full px-3 py-2.5 border border-gray-200 focus:outline-none focus:border-[#141414] text-sm bg-white">
            {["5", "10", "15", "20"].map((s) => <option key={s} value={s}>{s}%</option>)}
          </select>
        </div>
      </div>
      {withWaste && (
        <div className="bg-gray-50 border border-gray-200 p-4 animate-fade-in">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="text-xs text-gray-500 mb-1">Площадь</div>
              <div className="font-display text-2xl font-bold text-[#141414]">{area?.toFixed(2)} м²</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">С запасом</div>
              <div className="font-display text-2xl font-bold text-[#141414]">{withWaste} м²</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">Количество плиток</div>
              <div className="font-display text-2xl font-bold text-brand">{tiles} шт</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function PaintCalc() {
  const [area, setArea] = useState("");
  const [layers, setLayers] = useState("2");
  const [coverage, setCoverage] = useState("10");

  const totalArea = area ? Number(area) * Number(layers) : null;
  const liters = totalArea ? (totalArea / Number(coverage)).toFixed(1) : null;
  const cans = liters ? Math.ceil(Number(liters) / 3) : null;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Площадь стен (м²)</label>
          <input type="number" value={area} onChange={(e) => setArea(e.target.value)} placeholder="0"
            className="w-full px-3 py-2.5 border border-gray-200 focus:outline-none focus:border-[#141414] text-sm" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Количество слоёв</label>
          <select value={layers} onChange={(e) => setLayers(e.target.value)}
            className="w-full px-3 py-2.5 border border-gray-200 focus:outline-none focus:border-[#141414] text-sm bg-white">
            {["1", "2", "3"].map((l) => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Расход (м²/л)</label>
          <select value={coverage} onChange={(e) => setCoverage(e.target.value)}
            className="w-full px-3 py-2.5 border border-gray-200 focus:outline-none focus:border-[#141414] text-sm bg-white">
            {["8", "10", "12", "14"].map((c) => <option key={c} value={c}>{c} м²/л</option>)}
          </select>
        </div>
      </div>
      {liters && (
        <div className="bg-gray-50 border border-gray-200 p-4 animate-fade-in">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-gray-500 mb-1">Необходимо краски</div>
              <div className="font-display text-3xl font-bold text-[#141414]">{liters} л</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">Вёдер по 3 литра</div>
              <div className="font-display text-3xl font-bold text-brand">{cans} шт</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function LumberCalc() {
  const [qty, setQty] = useState("");
  const [thickness, setThickness] = useState("");
  const [width2, setWidth2] = useState("");
  const [length2, setLength2] = useState("");

  const volume = qty && thickness && width2 && length2
    ? (Number(qty) * Number(thickness) / 1000 * Number(width2) / 1000 * Number(length2)).toFixed(3)
    : null;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {[
          { label: "Количество (шт)", value: qty, set: setQty, placeholder: "10" },
          { label: "Толщина (мм)", value: thickness, set: setThickness, placeholder: "50" },
          { label: "Ширина (мм)", value: width2, set: setWidth2, placeholder: "150" },
          { label: "Длина (м)", value: length2, set: setLength2, placeholder: "6" },
        ].map((f) => (
          <div key={f.label}>
            <label className="block text-xs font-medium text-gray-500 mb-1">{f.label}</label>
            <input type="number" value={f.value} onChange={(e) => f.set(e.target.value)} placeholder={f.placeholder}
              className="w-full px-3 py-2.5 border border-gray-200 focus:outline-none focus:border-[#141414] text-sm" />
          </div>
        ))}
      </div>
      {volume && (
        <div className="bg-gray-50 border border-gray-200 p-4 animate-fade-in">
          <div>
            <div className="text-xs text-gray-500 mb-1">Объём пиломатериала</div>
            <div className="font-display text-3xl font-bold text-[#141414]">{volume} м³</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CalculatorPage() {
  const [activeCalc, setActiveCalc] = useState<CalcType>("concrete");
  const active = calculators.find((c) => c.id === activeCalc)!;

  return (
    <div className="py-12">
      <div className="container max-w-4xl">
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-6">
          <span>Главная</span>
          <Icon name="ChevronRight" size={12} />
          <span className="text-[#141414]">Калькулятор</span>
        </div>

        <h1 className="font-display text-4xl font-bold uppercase text-[#141414] mb-2">Калькулятор</h1>
        <p className="text-gray-500 mb-8">Рассчитайте нужное количество материалов для вашего проекта</p>

        {/* Calc selector */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {calculators.map((calc) => (
            <button
              key={calc.id}
              onClick={() => setActiveCalc(calc.id)}
              className={`p-4 text-left border transition-all ${
                activeCalc === calc.id
                  ? "border-[#141414] bg-[#141414] text-white"
                  : "border-gray-200 hover:border-gray-400"
              }`}
            >
              <Icon name={calc.icon} size={20} className={`mb-2 ${activeCalc === calc.id ? "text-brand" : "text-gray-400"}`} />
              <div className="text-sm font-medium leading-tight">{calc.name}</div>
            </button>
          ))}
        </div>

        {/* Calc body */}
        <div className="border border-gray-200 p-6">
          <div className="flex items-start gap-3 mb-6 pb-6 border-b border-gray-100">
            <div className="w-10 h-10 bg-[#141414] flex items-center justify-center flex-shrink-0">
              <Icon name={active.icon} size={18} className="text-brand" />
            </div>
            <div>
              <h2 className="font-display font-bold text-lg uppercase text-[#141414]">{active.name}</h2>
              <p className="text-sm text-gray-500">{active.desc}</p>
            </div>
          </div>

          {activeCalc === "concrete" && <ConcreteCalc />}
          {activeCalc === "tiles" && <TilesCalc />}
          {activeCalc === "paint" && <PaintCalc />}
          {activeCalc === "lumber" && <LumberCalc />}

          <div className="mt-6 pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-400">
              * Расчёт является приблизительным. Для точного расчёта обратитесь к нашим специалистам.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
