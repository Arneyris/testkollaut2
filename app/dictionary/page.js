import Link from "next/link";

export default function Dictionary() {
  return (
    <main className="p-10 text-white bg-black min-h-screen">
      <h1 className="text-3xl font-bold text-yellow-500">Locations Dictionary</h1>
      <p className="mt-4 mb-6">
        This is the Dictionary page for Kollaut. Here are some common Dust2 terms with translations:
      </p>

      <table className="table-auto border-collapse border border-yellow-500 text-white mb-6">
        <thead>
          <tr className="bg-yellow-500 text-black">
            <th className="border border-yellow-500 px-4 py-2">English</th>
            <th className="border border-yellow-500 px-4 py-2">Russian</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-yellow-500 px-4 py-2">Long Doors</td>
            <td className="border border-yellow-500 px-4 py-2">Двери Лонг</td>
          </tr>
          <tr>
            <td className="border border-yellow-500 px-4 py-2">Pit</td>
            <td className="border border-yellow-500 px-4 py-2">Яма</td>
          </tr>
          <tr>
            <td className="border border-yellow-500 px-4 py-2">Catwalk</td>
            <td className="border border-yellow-500 px-4 py-2">Кошка</td>
          </tr>
          <tr>
            <td className="border border-yellow-500 px-4 py-2">Tunnels</td>
            <td className="border border-yellow-500 px-4 py-2">Тоннели</td>
          </tr>
          <tr>
            <td className="border border-yellow-500 px-4 py-2">B Site</td>
            <td className="border border-yellow-500 px-4 py-2">Плэнт Б</td>
          </tr>
        </tbody>
      </table>

      <Link
        href="/"
        className="inline-block mt-6 bg-yellow-500 text-black px-4 py-2 rounded-lg font-bold"
      >
        ← Back to Home
      </Link>
    </main>
  );
}
