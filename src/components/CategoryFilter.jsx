import { categories } from '../data/posts';

export default function CategoryFilter({ active, onChange }) {
  return (
    <div className="category-filter">
      {categories.map(cat => (
        <button
          key={cat}
          className={`category-btn${active === cat ? ' active' : ''}`}
          onClick={() => onChange(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
