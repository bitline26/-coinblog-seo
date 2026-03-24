import { Link } from 'react-router-dom';
import { Calendar, Clock } from 'lucide-react';

export default function PostCard({ post }) {
  const { slug, title, category, date, updatedDate, readTime, thumbnail, thumbnailEmoji } = post;

  return (
    <Link to={`/post/${slug}`} className="post-card">
      {thumbnail ? (
        <img src={thumbnail} alt={title} className="post-card__thumb" loading="lazy" />
      ) : (
        <div className="post-card__thumb-placeholder">
          <span>{thumbnailEmoji || '₿'}</span>
        </div>
      )}
      <div className="post-card__body">
        {category && <span className="post-card__category">{category}</span>}
        <h2 className="post-card__title">{title}</h2>
        <div className="post-card__meta">
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Calendar size={13} />
            {updatedDate || date}
          </span>
          {readTime && (
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <Clock size={13} />
              {readTime}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
