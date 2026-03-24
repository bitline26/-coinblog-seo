import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { TrendingUp } from 'lucide-react';
import PostCard from '../components/PostCard';
import CategoryFilter from '../components/CategoryFilter';
import { posts } from '../data/posts';

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const paramCategory = searchParams.get('category') || '전체';
  const [active, setActive] = useState(paramCategory);

  useEffect(() => {
    setActive(searchParams.get('category') || '전체');
  }, [searchParams]);

  const handleCategory = (cat) => {
    setActive(cat);
    if (cat === '전체') {
      setSearchParams({});
    } else {
      setSearchParams({ category: cat });
    }
  };

  const filtered = active === '전체'
    ? posts
    : posts.filter(p => p.category === active);

  const sorted = [...filtered].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <>
      <Helmet>
        <title>온체인랩 — 암호화폐 인사이트 & 투자 리서치</title>
        <meta name="description" content="비트코인, 이더리움, 선물거래, 세금, 거래소 가이드까지 — 온체인랩에서 데이터 기반으로 정리했습니다." />
      </Helmet>

      <section className="page-hero">
        <div className="page-hero__inner">
          <h1 className="page-hero__title">
            <span>온체인</span>랩 &nbsp;
            <TrendingUp size={28} style={{ display: 'inline', verticalAlign: 'middle', color: '#f5a623' }} />
          </h1>
          <p className="page-hero__desc">온체인 데이터 기반 · 코인 투자 가이드 · 세금 · 선물거래 · 거래소 비교까지 — 리서치로 정리합니다.</p>
        </div>
      </section>

      <div className="container home-main">
        <CategoryFilter active={active} onChange={handleCategory} />

        {sorted.length === 0 ? (
          <div className="posts-grid">
            <div className="empty-state">
              <h2>아직 등록된 글이 없습니다.</h2>
              <p>곧 유용한 코인 정보 글이 업로드될 예정입니다.</p>
            </div>
          </div>
        ) : (
          <div className="posts-grid">
            {sorted.map(post => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
