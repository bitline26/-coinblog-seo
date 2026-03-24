import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Bitcoin } from 'lucide-react';
import { categories } from '../data/posts';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="header__top">
        <Link to="/" className="header__logo" onClick={() => setMenuOpen(false)}>
          <Bitcoin size={22} />
          온체인<span>랩</span>
        </Link>
        <button
          className="header__menu-btn"
          onClick={() => setMenuOpen(v => !v)}
          aria-label="메뉴 토글"
        >
          {menuOpen ? <X size={24} color="#fff" /> : <Menu size={24} color="#fff" />}
        </button>
      </div>
      <nav className={`header__nav${menuOpen ? ' open' : ''}`}>
        {categories.map(cat => (
          <NavLink
            key={cat}
            to={cat === '전체' ? '/' : `/?category=${encodeURIComponent(cat)}`}
            onClick={() => setMenuOpen(false)}
          >
            {cat}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
