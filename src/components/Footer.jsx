import { Bitcoin, Mail, Shield, BookOpen } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__top">
          <div className="footer__brand">
            <div className="footer__logo">
              <Bitcoin size={18} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 6 }} />
              온체인<span>랩</span>
            </div>
            <p className="footer__desc">
              온체인랩은 온체인 데이터 기반의 암호화폐 투자 리서치 블로그입니다.<br />
              코인선물, 레버리지, 거래소 비교, 세금까지 — 데이터로 정리합니다.
            </p>
          </div>
          <div className="footer__meta">
            <div className="footer__meta-item">
              <BookOpen size={14} />
              <span>총 <strong>11개</strong> 리서치 글</span>
            </div>
            <div className="footer__meta-item">
              <Shield size={14} />
              <span>투자 권유 아님 · 독자 판단 책임</span>
            </div>
            <div className="footer__meta-item">
              <Mail size={14} />
              <a href="mailto:info@onchainlab.co.kr">info@onchainlab.co.kr</a>
            </div>
          </div>
        </div>
        <div className="footer__links">
          <a href="/">홈</a>
          <a href="/?category=코인기초">코인기초</a>
          <a href="/?category=선물/레버리지">선물/레버리지</a>
          <a href="/?category=세금">세금</a>
          <a href="/?category=거래소">거래소</a>
          <a href="https://bitline.co.kr" target="_blank" rel="noopener noreferrer">비트라인 무료상담</a>
        </div>
        <p className="footer__copy">© {new Date().getFullYear()} 온체인랩 · onchainlab.co.kr · All rights reserved.<br />암호화폐 투자는 원금 손실 위험이 있으며, 본 사이트의 모든 콘텐츠는 투자 권유가 아닙니다.</p>
      </div>
    </footer>
  );
}
