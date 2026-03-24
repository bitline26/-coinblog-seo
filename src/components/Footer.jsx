import { Bitcoin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__logo">
          <Bitcoin size={18} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 6 }} />
          온체인<span>랩</span>
        </div>
        <p className="footer__desc">
          온체인랩은 온체인 데이터 기반의 암호화폐 투자 인사이트를 제공하는 리서치 블로그입니다.
          이 사이트의 글은 투자 권유가 아니며, 모든 투자 결정은 본인의 판단 하에 이루어져야 합니다.
        </p>
        <div className="footer__links">
          <a href="https://bitline.co.kr" target="_blank" rel="noopener noreferrer">비트라인 무료상담</a>
          <a href="/">홈</a>
        </div>
        <p className="footer__copy">© {new Date().getFullYear()} 온체인랩. All rights reserved. 투자 유의사항: 암호화폐 투자는 원금 손실 위험이 있습니다.</p>
      </div>
    </footer>
  );
}
