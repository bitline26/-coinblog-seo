import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>페이지를 찾을 수 없습니다 — 온체인랩</title>
      </Helmet>
      <div className="container not-found">
        <div className="not-found__code">404</div>
        <h1 className="not-found__title">페이지를 찾을 수 없습니다</h1>
        <p className="not-found__desc">요청하신 페이지가 존재하지 않거나 이동되었습니다.</p>
        <Link to="/" className="btn-primary">
          <Home size={18} />
          홈으로 돌아가기
        </Link>
      </div>
    </>
  );
}
