"use client";

import Link from "next/link";
import { useRef, useState } from "react";

/** =========================
 *  НАСТРОЙКИ
 *  ========================= */
const MAP_SRC = "/maps/dust_2_map.jpg";  // твой файл карты
const MAX_W = "600px";                  // максимальная ширина карты (уменьши/увеличь)
const MAX_H = "600px"; 
const TARGET_DIAMETER_PX = 14;          // видимый кружок-таргет
const HIT_RADIUS_PCT = 7;               // радиус попадания в % (сделай 6–10 для комфорта)

/** =========================
 *  ТОЧКИ DUST2 (x,y в %)
 *  ========================= */
const CALLOUTS = [
  { id: "a_ramp", label: "A Ramp", x: 87, y: 15 },
  { id: "a_ramp_barrels", label: "A Ramp Barrels", x: 84, y: 9},
  { id: "a_site",     label: "A Site Plant",     x: 80, y: 17 },
  { id: "b_back_plat", label: "B Back Plat", x: 10, y: 5},
  { id: "b_boxes", label: "B Boxes", x: 30, y: 25},
  { id: "b_car", label: "B Car", x: 19, y: 30},
  { id: "b_closet", label: "B Closet", x: 18, y: 34},
  { id: "b_doors",    label: "B Doors",    x: 26, y: 23 },
  { id: "b_site",     label: "B Site Plant",     x: 20, y: 12 },
  { id: "b_tonnel_exit_boxes", label: "B Tunnel Exit Boxes", x: 14, y: 31},
  { id: "b_window", label: "B Window", x: 25, y: 13},
  { id: "big_box", label: "Big Box", x: 15, y: 19},
  { id: "blue_box", label: "Blue", x: 73, y: 46},
  { id: "cat", label: "Cat", x: 58, y: 40 },
  { id: "catwalk",      label: "Catwalk", x: 51, y: 48 },
  { id: "close", label: "Close", x: 7, y: 31},
  { id: "close_mid_doors", label: "Close Mid Doors", x: 48, y: 33},
  { id: "ct",         label: "CT Spawn",   x: 61, y: 18 },
  { id: "ct_mid", label: "CT Mid", x: 44, y: 20},
  { id: "double_stack", label: "Double Stack", x: 19, y: 16},
  { id: "elevator", label: "Elevator", x: 76, y: 20},
  { id: "fence", label: "Fence", x: 7, y: 24},
  { id: "goose",      label: "Goose",      x: 80, y: 6 },
  { id: "long", label: "Long", x: 88, y: 35},
  { id: "long_car", label: "Long Car", x: 92, y: 27},
  { id: "long_corner", label: "Long Corner", x: 83, y: 44},
  { id: "long_doors", label: "Long Doors", x: 68, y: 60 },
  { id: "lower_tunnels", label: "Lower Tunnels", x: 34, y: 40},
  { id: "mid", label: "Mid", x: 46, y: 48},
  { id: "ninja", label: "Ninja", x: 66, y: 11},
  { id: "outside_long", label: "Outside Long", x: 70, y:70},
  { id: "outside_tunnels", label: "Outside Tunnels", x: 18, y: 65},
  { id: "palm", label: "Palm", x: 49, y: 55},
  { id: "pit",        label: "Pit",        x: 86, y: 64 },
  { id: "pit_plat", label: "Pit Plat", x: 93, y: 60},
  { id: "right_side_mid", label: "Right Side Mid", x: 42, y: 60},
  { id: "scaffolding", label: "Scaffolding", x: 31, y: 13},
  { id: "short", label: "Short", x: 63, y: 25},
  { id: "short_boost", label: "Short Boost", x: 68, y: 20},
  { id: "side_pit", label: "Side Pit", x: 78, y: 65},
  { id: "stairs", label: "Stairs", x: 61, y: 34},
  { id: "suicide",        label: "Suicide",        x: 45, y: 79 },
  { id: "t_plat", label: "T Plat / Titanic", x: 21, y: 80},
  { id: "t_ramp", label: "T Ramp", x: 12, y: 80},
  { id: "t_spawn",    label: "T Spawn",    x: 41, y: 90 },
  { id: "t_spawn_car", label: "T Spawn Car", x: 12, y: 92},
  { id: "top_mid", label: "Top Mid", x: 51, y: 63},
  { id: "tunnels_stair", label: "Tunnels Stair", x: 30, y: 46},
  { id: "upper_tunnels", label: "Upper Tunnels", x: 14, y: 46},
  { id: "xbox", label: "Xbox", x: 48, y: 40},
];

export default function DragTraining() {
  const mapRef = useRef(null);
  const [placed, setPlaced] = useState({});
  const [dragId, setDragId] = useState(null);
  const [hotId, setHotId] = useState(null);            // 🔹 НОВОЕ: какой таргет подсвечивать
  const [score, setScore] = useState(0);

  function handleDragStart(e, id) {
    setDragId(id);
    e.dataTransfer.setData("text/plain", id);
  }

	function handleDragOver(e) {
	  e.preventDefault();
	  if (!mapRef.current) return;

	  // координаты курсора относительно карты (в %)
	  const rect = mapRef.current.getBoundingClientRect();
	  const relX = ((e.clientX - rect.left) / rect.width) * 100;
	  const relY = ((e.clientY - rect.top) / rect.height) * 100;

	  // найдём ближайший таргет к курсору
	  let nearest = null;
	  let bestDist = Infinity;

	  for (const t of CALLOUTS) {
		const d = Math.hypot(relX - t.x, relY - t.y);
		if (d < bestDist) {
		  bestDist = d;
		  nearest = t;
		}
	  }

	  // если курсор в радиусе — подсветим этот кружок, иначе уберём подсветку
	  if (nearest && bestDist <= HIT_RADIUS_PCT) setHotId(nearest.id);
	  else setHotId(null);
	}


  function handleDrop(e) {
    e.preventDefault();
    const id = dragId ?? e.dataTransfer.getData("text/plain");
    setHotId(null);                                       // 🔹 убрать подсветку после дропа
    if (!id || !mapRef.current) return;

    const rect = mapRef.current.getBoundingClientRect();
    const relX = ((e.clientX - rect.left) / rect.width) * 100;
    const relY = ((e.clientY - rect.top) / rect.height) * 100;

    const target = CALLOUTS.find(c => c.id === id);
    const dist = Math.hypot(relX - target.x, relY - target.y);
    const correct = dist <= HIT_RADIUS_PCT;

    setPlaced(prev => {
      const alreadyCorrect = prev[id]?.correct ? 1 : 0;
      const next = {
        ...prev,
        [id]: {
          x: correct ? target.x : relX,   // снап к центру при попадании
          y: correct ? target.y : relY,
          correct,
        }
      };
      if (correct && !alreadyCorrect) setScore(s => s + 1);
      return next;
    });
  }

  function resetAll() {
    setPlaced({});
    setScore(0);
    setHotId(null);
    setDragId(null);
  }

  const remaining = CALLOUTS.filter(c => !placed[c.id]?.correct);

  return (
    <main className="bg-black text-white min-h-screen p-6">
      <h1 className="text-3xl font-bold text-yellow-500 mb-4">Drag & Drop — Dust2</h1>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* КАРТА */}
        <div
          ref={mapRef}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className="relative w-full border-4 border-yellow-500 rounded-xl overflow-hidden bg-black"
          style={{ maxWidth: MAX_W, maxHeight: MAX_H }}
        >
          <img src={MAP_SRC} alt="Dust2 map" className="block w-full h-auto select-none pointer-events-none" draggable={false} />

          {/* таргеты с подсветкой при dnd в радиусе */}
          {CALLOUTS.map((c) => (
            <div
              key={`t-${c.id}`}
              className={`absolute rounded-full transition
                ${hotId === c.id
                  ? "w-4 h-4 bg-yellow-400 ring-4 ring-yellow-300/70 animate-pulse"
                  : "w-3 h-3 bg-yellow-500/60 hover:ring-4 hover:ring-yellow-300/70"
                }`}
              style={{
                left: `calc(${c.x}% - ${TARGET_DIAMETER_PX / 2}px)`,
                top:  `calc(${c.y}% - ${TARGET_DIAMETER_PX / 2}px)`,
                width: TARGET_DIAMETER_PX,
                height: TARGET_DIAMETER_PX,
              }}
              title={c.label}
            />
          ))}

          {/* метки пользователя */}
          {Object.entries(placed).map(([id, p]) => (
            <div
              key={`p-${id}`}
              className={`absolute -translate-x-1/2 -translate-y-1/2 px-2 py-1 text-[11px] font-bold rounded
                ${p.correct ? "bg-green-500 text-black" : "bg-red-500 text-white"}`}
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
            >
              {CALLOUTS.find(c => c.id === id)?.label}
            </div>
          ))}
        </div>

        {/* ПРАВАЯ КОЛОНКА */}
        <div className="flex-1">
          <div className="mb-3 text-sm">
            Drop the labels onto the correct spots. Hit area radius: <b>{HIT_RADIUS_PCT}%</b>.
          </div>

<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
  {remaining.map((c) => (
    <div
      key={c.id}
      draggable
      onDragStart={(e) => handleDragStart(e, c.id)}
      className="cursor-grab active:cursor-grabbing bg-yellow-500 text-black 
                 px-2 py-1 rounded text-sm font-semibold text-center w-32"
      title="Drag me onto the map"
    >
      {c.label}
    </div>
  ))}
  {remaining.length === 0 && (
    <div className="text-green-400 font-semibold col-span-full">All correct! 🎉</div>
  )}
</div>

          <div className="mt-6 flex items-center gap-3">
            <span className="text-lg">Score: <b>{score / 2}</b> / {CALLOUTS.length}</span> {/* 🔹 фикс */}
            <button onClick={resetAll} className="bg-yellow-500 text-black px-4 py-2 rounded-lg font-bold">
              Reset
            </button>
            <Link href="/" className="bg-zinc-800 text-white px-4 py-2 rounded-lg font-bold">
              ← Back to Main Page
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}