"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

// Fisher–Yates
function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function Training() {
  const calloutsData = [
    // A side
    { name: "A Plant",                img: "/dust2/a_plant.png" },
    { name: "A Ramp",                 img: "/dust2/a_ramp.png" },
    { name: "A Short",                img: "/dust2/a_short.png" },        // (= Catwalk)

    // B side
    { name: "B Back Site",            img: "/dust2/b_backsite.png" },
    { name: "B Boxes",                img: "/dust2/b_boxes.png" },
    { name: "B Car",                  img: "/dust2/b_car.png" },
    { name: "B Closet",               img: "/dust2/b_closet.png" },
    { name: "B Doors",                img: "/dust2/b_doors.png" },
    { name: "B Tunnel Exit Boxes (Stack)", img: "/dust2/b_tonnel_exit_boxes_stack.png" },
    { name: "B Window",               img: "/dust2/b_window.png" },
    { name: "Back Plat",              img: "/dust2/back_plat.png" },
    { name: "Big Box",                img: "/dust2/big_box.png" },

    // Long / A long area
    { name: "Blue",                   img: "/dust2/blue.png" },
    { name: "Long Car",               img: "/dust2/long_car.png" },
    { name: "Long Corner",            img: "/dust2/long_corner.png" },
    { name: "Long Doors",             img: "/dust2/long_doors.png" },
    { name: "Palm",                   img: "/dust2/palm.png" },
    { name: "Pit",                    img: "/dust2/pit.png" },
    { name: "Pit Plat",               img: "/dust2/pit_plat.png" },
    { name: "Side Pit",               img: "/dust2/side_pit.png" },
    { name: "A Stairs",               img: "/dust2/stairs.png" },
    { name: "Long",            	      img: "/dust2/long.png" },

    // Mid / Short
    { name: "Catwalk",                img: "/dust2/catwalk.png" },         // (= A Short)
    { name: "Close",                  img: "/dust2/close.png" },
    { name: "Close Mid Doors",        img: "/dust2/close_mid_doors.png" },
    { name: "CT Mid",                 img: "/dust2/ct_mid.png" },
    { name: "Right Side Mid",         img: "/dust2/right_side_mid.png" },
    { name: "Top Mid",                img: "/dust2/top_mid.png" },
    { name: "XBox",                   img: "/dust2/xbox.png" },            // можно оставить один из двух
    { name: "Mid",                    img: "/dust2/mid.png" },

    // Spawns / general
    { name: "CT Spawn",               img: "/dust2/ct_spawn.png" },
    { name: "T Spawn",                img: "/dust2/t_spawn.png" },
    { name: "T Spawn Car",            img: "/dust2/t_spawn_car.png" },
    { name: "T Plat",                 img: "/dust2/t_plat.png" },
    { name: "T Ramp",                 img: "/dust2/t_ramp.png" },
    { name: "Suicide",                img: "/dust2/suicide.png" },

    // Tunnels
    { name: "Lower Tunnels",          img: "/dust2/lower_tunnels.png" },
    { name: "Upper Tunnels",          img: "/dust2/upper_tunnels.png" },
    { name: "Tunnels Stair",          img: "/dust2/tunnels_stair.png" },

    // Outside areas
    { name: "Outside Long",           img: "/dust2/outside_long.png" },
    { name: "Outside Tunnels",        img: "/dust2/outside_tunnels.png" },

    // Utility spots & misc
    { name: "Barrels",                img: "/dust2/barrels.png" },
    { name: "Double Stack",           img: "/dust2/double_stack.png" },
    { name: "Elevator",               img: "/dust2/elevator.png" },
    { name: "Fence",                  img: "/dust2/fence.png" },
    { name: "Goose",                  img: "/dust2/goose.png" },
    { name: "Ninja",                  img: "/dust2/ninja.png" },
    { name: "Scaffolding",            img: "/dust2/scaffolding.png" },
    { name: "Short Boost",            img: "/dust2/short_boost.png" },
  ];

  // 1) детерминированно на SSR
  const [callouts, setCallouts] = useState(calloutsData);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [options, setOptions] = useState([]);
  const [mounted, setMounted] = useState(false);

	// 2) шифлим ПОСЛЕ маунта → без расхождений SSR/CSR
	useEffect(() => {
	  setMounted(true);
	  setCallouts(shuffleArray(calloutsData).slice(0, 10)); // только 10 случайных
	  setIndex(0);
	  setScore(0);
	  setShowResult(false);
	}, []);


  // 3) генерим варианты для текущего вопроса
  useEffect(() => {
    if (!mounted || callouts.length === 0) return;
    const names = callouts.map(c => c.name);

    const s = new Set([callouts[index].name]); // правильный
    const OPTIONS_COUNT = Math.min(4, names.length);
    while (s.size < OPTIONS_COUNT) {
      s.add(names[Math.floor(Math.random() * names.length)]);
    }

    const arr = Array.from(s);
    // перемешать варианты
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    setOptions(arr);
  }, [mounted, callouts, index]);

  const handleAnswer = (selected) => {
    if (selected === callouts[index].name) setScore(s => s + 1);
    if (index + 1 < callouts.length) setIndex(i => i + 1);
    else setShowResult(true);
  };

	const restart = () => {
	  setCallouts(shuffleArray(calloutsData).slice(0, 10)); // снова 10 случайных
	  setIndex(0);
	  setScore(0);
	  setShowResult(false);
	};


  return (
    <main className="bg-black text-white min-h-screen p-10">
      <h1 className="text-4xl font-bold text-yellow-500 mb-6">Callout Training — Dust2</h1>

      {showResult ? (
        <div>
          <p className="text-lg mb-4">You scored {score} / {callouts.length}!</p>
          <button onClick={restart} className="bg-yellow-500 text-black px-6 py-3 rounded-lg font-bold">
            Restart
          </button>
        </div>
      ) : (
        <div>
          {/* Пока не смонтировались/не сгенерились данные — небольшой плейсхолдер */}
          {!mounted || options.length === 0 ? (
            <div className="text-zinc-400">Loading…</div>
          ) : (
            <>
              <img
                src={callouts[index].img}
                alt="Callout"
                className="w-96 h-64 object-cover border-4 border-yellow-500 mb-4"
              />
              <div className="grid grid-cols-2 gap-4">
                {options.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleAnswer(option)}
                    className="bg-yellow-500 text-black px-4 py-2 rounded-lg font-bold"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      <Link
        href="/"
        className="inline-block mt-6 bg-yellow-500 text-black px-4 py-2 rounded-lg font-bold"
      >
        ← Back to Home
      </Link>
    </main>
  );
}
