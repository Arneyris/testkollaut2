export default function Home() {
  return (
    <main className="bg-black text-white min-h-screen flex">
      {/* ЛЕВАЯ ЧАСТЬ — меню */}
      <div className="w-1/2 p-10">
        <h1 className="text-4xl font-bold text-yellow-500 mb-6">Kollaut</h1>

        <nav className="space-y-3">
          {/* About */}
          <a
            href="/about"
            className="block w-fit bg-yellow-500 text-black px-6 py-3 rounded-lg font-bold"
          >
            About
          </a>

          {/* Callout Training с подменю справа */}
          <div className="relative group w-fit">
            <button className="block w-fit bg-yellow-500 text-black px-6 py-3 rounded-lg font-bold">
              Callout Training
            </button>

            <div className="absolute top-0 left-full -ml-px hidden group-hover:block group-focus-within:block z-20">
              <ul className="bg-zinc-900 border border-yellow-500 rounded-lg p-2 w-56 shadow-xl">
                <li>
                  <a
                    href="/training/dust_2"
                    className="block px-3 py-2 rounded hover:bg-zinc-800"
                  >
                    Dust 2
                  </a>
                </li>
                <li>
                  <a
                    href="/training/train"
                    className="block px-3 py-2 rounded hover:bg-zinc-800"
                  >
                    Train
                  </a>
                </li>
                <li>
                  <a
                    href="/training/nuke"
                    className="block px-3 py-2 rounded hover:bg-zinc-800"
                  >
                    Nuke
                  </a>
                </li>
              </ul>
            </div>
          </div>

        {/* Drag and Drop */}		  
		<div className="relative group w-fit">
            <button className="block w-fit bg-yellow-500 text-black px-6 py-3 rounded-lg font-bold">
              Drag and Drop
            </button>

            <div className="absolute top-0 left-full -ml-px hidden group-hover:block group-focus-within:block z-20">
              <ul className="bg-zinc-900 border border-yellow-500 rounded-lg p-2 w-56 shadow-xl">
                <li>
                  <a
                    href="/interactivemap/dust_2"
                    className="block px-3 py-2 rounded hover:bg-zinc-800"
                  >
                    Dust 2
                  </a>
                </li>
                <li>
                  <a
                    href="/interactivemap/mirage"
                    className="block px-3 py-2 rounded hover:bg-zinc-800"
                  >
                    Mirage
                  </a>
                </li>
                <li>
                  <a
                    href="/interactivemap/nuke"
                    className="block px-3 py-2 rounded hover:bg-zinc-800"
                  >
                    Nuke
                  </a>
                </li>
              </ul>
            </div>
          </div>


          {/* Dictionary */}
          <a
            href="/dictionary"
            className="block w-fit bg-yellow-500 text-black px-6 py-3 rounded-lg font-bold"
          >
            Locations Dictionary
          </a>
        </nav>
      </div>

		{/* ПРАВАЯ ЧАСТЬ — картинка */}
		<div className="w-1/2 flex items-end justify-end">
		  <img
			src="/hero/character.png"
			alt="Character"
			className="h-screen object-contain"
		  />
		</div>
    </main>
  );
}
