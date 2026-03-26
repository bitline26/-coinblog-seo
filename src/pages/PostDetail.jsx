import { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Calendar, RefreshCw, Clock, ChevronDown, ExternalLink, HelpCircle } from 'lucide-react';
import SummaryBox from '../components/SummaryBox';
import { posts } from '../data/posts';

function TableOfContents({ items }) {
  if (!items || items.length === 0) return null;
  return (
    <div className="toc">
      <div className="toc__title">📋 목차</div>
      <ol className="toc__list">
        {items.map((item, i) => (
          <li key={i}>
            <a href={`#section-${i + 1}`} data-num={`${i + 1}.`}>{item}</a>
          </li>
        ))}
      </ol>
    </div>
  );
}

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="faq__item">
      <button
        className={`faq__question${open ? ' open' : ''}`}
        onClick={() => setOpen(v => !v)}
      >
        <span>Q. {q}</span>
        <ChevronDown size={18} />
      </button>
      <div className={`faq__answer${open ? ' open' : ''}`}>
        {a}
      </div>
    </div>
  );
}

function FAQSection({ items }) {
  if (!items || items.length === 0) return null;
  return (
    <section className="faq">
      <h2 className="faq__title">
        <HelpCircle size={22} />
        자주 묻는 질문 (FAQ)
      </h2>
      {items.map((item, i) => (
        <FAQItem key={i} q={item.q} a={item.a} />
      ))}
    </section>
  );
}

function CTABox() {
  return (
    <div className="cta-box">
      <p className="cta-box__subtitle">무료 1:1 상담 서비스</p>
      <h3 className="cta-box__title">코인 투자, 혼자 고민하지 마세요</h3>
      <p className="cta-box__desc">
        비트라인에서 전문가와 1:1 무료 상담을 받아보세요.<br />
        포트폴리오 구성부터 리스크 관리까지 도와드립니다.
      </p>
      <a
        href="https://bitline.co.kr"
        target="_blank"
        rel="noopener noreferrer"
        className="cta-box__btn"
      >
        비트라인 무료 상담 신청
        <ExternalLink size={16} />
      </a>
    </div>
  );
}

export default function PostDetail() {
  const { slug } = useParams();
  const post = posts.find(p => p.slug === slug);

  if (!post) return <Navigate to="/404" replace />;

  const {
    title, category, date, updatedDate, readTime,
    metaDescription, summaryPoints, tableOfContents,
    thumbnail, thumbnailEmoji, content, faq
  } = post;

  const canonicalUrl = `https://onchainlab.co.kr/post/${post.slug}`;
  const ogImage = thumbnail ? `https://onchainlab.co.kr${thumbnail}` : 'https://onchainlab.co.kr/favicon.svg';

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": metaDescription || title,
    "url": canonicalUrl,
    "datePublished": date,
    "dateModified": updatedDate || date,
    "author": { "@type": "Organization", "name": "온체인랩" },
    "publisher": {
      "@type": "Organization",
      "name": "온체인랩",
      "url": "https://onchainlab.co.kr"
    },
    "image": ogImage,
    "inLanguage": "ko"
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "홈", "item": "https://onchainlab.co.kr" },
      { "@type": "ListItem", "position": 2, "name": category, "item": `https://onchainlab.co.kr/?category=${encodeURIComponent(category)}` },
      { "@type": "ListItem", "position": 3, "name": title, "item": canonicalUrl }
    ]
  };

  return (
    <>
      <Helmet>
        <title>{`${title} — 온체인랩`}</title>
        <meta name="description" content={metaDescription || title} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={`${title} — 온체인랩`} />
        <meta property="og:description" content={metaDescription || title} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content="온체인랩" />
        <meta property="og:image" content={ogImage} />
        <meta property="og:locale" content="ko_KR" />
        <meta property="article:published_time" content={date} />
        {updatedDate && <meta property="article:modified_time" content={updatedDate} />}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${title} — 온체인랩`} />
        <meta name="twitter:description" content={metaDescription || title} />
        <meta name="twitter:image" content={ogImage} />
        <script type="application/ld+json">{JSON.stringify(articleJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
      </Helmet>

      <main className="container">
        <article className="post-detail">
          {/* Breadcrumb */}
          <nav className="breadcrumb">
            <Link to="/">홈</Link>
            <span className="breadcrumb__sep">›</span>
            {category && (
              <>
                <Link to={`/?category=${encodeURIComponent(category)}`}>{category}</Link>
                <span className="breadcrumb__sep">›</span>
              </>
            )}
            <span>{title}</span>
          </nav>

          {/* Back */}
          <Link to="/" className="post-detail__back">
            <ArrowLeft size={15} /> 목록으로
          </Link>

          {/* Category badge */}
          {category && <span className="post-detail__category">{category}</span>}

          {/* Title */}
          <h1 className="post-detail__title">{title}</h1>

          {/* Meta */}
          <div className="post-detail__meta">
            <span className="post-detail__meta-item">
              <Calendar size={14} />
              작성: {date}
            </span>
            {updatedDate && (
              <span className="post-detail__meta-item">
                <RefreshCw size={14} />
                업데이트: {updatedDate}
              </span>
            )}
            {readTime && (
              <span className="post-detail__meta-item">
                <Clock size={14} />
                {readTime}
              </span>
            )}
          </div>

          <hr className="post-detail__divider" />

          {/* Thumbnail */}
          {thumbnail ? (
            <img src={thumbnail} alt={title} className="post-detail__thumb" />
          ) : thumbnailEmoji ? (
            <div className="post-detail__thumb-placeholder">
              <span>{thumbnailEmoji}</span>
            </div>
          ) : null}

          {/* Summary Box */}
          <SummaryBox points={summaryPoints} />

          {/* Table of Contents */}
          <TableOfContents items={tableOfContents} />

          {/* Content */}
          <div
            className="post-body"
            dangerouslySetInnerHTML={{ __html: content }}
          />

          {/* FAQ */}
          <FAQSection items={faq} />

          {/* CTA */}
          <CTABox />
        </article>
      </main>
    </>
  );
}
