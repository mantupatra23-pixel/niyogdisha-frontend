import Link from 'next/link';

const categories = [
  { name: 'Central Govt Jobs', slug: 'central-government', color: 'bg-blue-600' },
  { name: 'State Govt Jobs', slug: 'state-government', color: 'bg-emerald-600' },
  { name: 'Railway Jobs', slug: 'railway', color: 'bg-amber-600' },
  { name: 'Banking Jobs', slug: 'banking', color: 'bg-indigo-600' },
  { name: 'SSC Jobs', slug: 'ssc', color: 'bg-purple-600' },
  { name: 'UPSC Jobs', slug: 'upsc', color: 'bg-red-600' },
  { name: 'Graduate Jobs', slug: 'graduate', color: 'bg-teal-600' },
  { name: '12th Pass Jobs', slug: '12th-pass', color: 'bg-cyan-600' },
  { name: '10th Pass Jobs', slug: '10th-pass', color: 'bg-orange-600' },
  { name: 'Defence / Police', slug: 'defence', color: 'bg-slate-700' },
];

export default function CategoryGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 my-6">
      {categories.map((cat) => (
        <Link
          key={cat.slug}
          href={`/jobs/${cat.slug}`}
          className={`${cat.color} text-white font-medium text-sm p-3 rounded-lg shadow-sm hover:opacity-95 transition text-center flex items-center justify-center`}
        >
          {cat.name}
        </Link>
      ))}
    </div>
  );
}
