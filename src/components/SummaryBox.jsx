import { Zap } from 'lucide-react';

export default function SummaryBox({ points }) {
  if (!points || points.length === 0) return null;

  return (
    <div className="summary-box">
      <div className="summary-box__header">
        <Zap size={20} />
        이 글의 핵심 요약
      </div>
      <ul className="summary-box__list">
        {points.map((point, i) => (
          <li key={i}>{point}</li>
        ))}
      </ul>
    </div>
  );
}
