import React, { useState, useRef } from 'react';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from 'lucide-react';

export default function FeedPost({ post, onLikeToggle, onCommentAdd, onBookmarkToggle }) {
  const [commentText, setCommentText] = useState('');
  const [animateHeart, setAnimateHeart] = useState(false);
  const [isCaptionExpanded, setIsCaptionExpanded] = useState(false);
  const commentInputRef = useRef(null);

  // Handle double click on image
  const handleImageDoubleClick = () => {
    setAnimateHeart(true);
    if (!post.isLiked) {
      onLikeToggle(post.id);
    }
    // Reset heart animation after 800ms
    setTimeout(() => {
      setAnimateHeart(false);
    }, 800);
  };

  // Focus comment input when clicking comment button
  const handleCommentIconClick = () => {
    if (commentInputRef.current) {
      commentInputRef.current.focus();
    }
  };

  // Handle comment submit
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    onCommentAdd(post.id, 'dongm_coding', commentText.trim());
    setCommentText('');
  };

  const isLongCaption = post.caption.length > 50;

  return (
    <article className="post-card">
      {/* Header */}
      <div className="post-header">
        <div className="post-user-info">
          <img
            src={post.userAvatar}
            alt={post.username}
            className="post-user-avatar"
          />
          <div>
            <div className="post-username">{post.username}</div>
            <div className="post-location">{post.location}</div>
          </div>
        </div>
        <button className="post-more-btn">
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* Media Image Container with double click logic */}
      <div className="post-media-container" onDoubleClick={handleImageDoubleClick}>
        <img
          src={post.postImage}
          alt="Post content"
          className="post-media"
          loading="lazy"
        />
        {/* Animated Double Click Heart */}
        <div className={`double-click-heart ${animateHeart ? 'animate' : ''}`}>
          <Heart size={80} fill="#ffffff" stroke="#ffffff" />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="post-actions">
        <div className="post-actions-left">
          <button
            className={`post-action-btn ${post.isLiked ? 'liked' : ''}`}
            onClick={() => onLikeToggle(post.id)}
          >
            <Heart size={24} fill={post.isLiked ? 'var(--like-color)' : 'none'} />
          </button>
          <button className="post-action-btn" onClick={handleCommentIconClick}>
            <MessageCircle size={24} />
          </button>
          <button className="post-action-btn">
            <Send size={24} />
          </button>
        </div>
        <button
          className={`post-action-btn ${post.isBookmarked ? 'bookmarked' : ''}`}
          onClick={() => onBookmarkToggle(post.id)}
        >
          <Bookmark size={24} fill={post.isBookmarked ? 'currentColor' : 'none'} />
        </button>
      </div>

      {/* Post details */}
      <div className="post-info">
        {/* Likes Count */}
        <div className="post-likes-count">
          좋아요 {post.likes.toLocaleString()}개
        </div>

        {/* Caption */}
        <div className="post-caption-block">
          <span className="post-caption-user">{post.username}</span>
          <span className="post-caption-text">
            {isLongCaption && !isCaptionExpanded
              ? `${post.caption.substring(0, 50)}...`
              : post.caption}
          </span>
          {isLongCaption && !isCaptionExpanded && (
            <button className="post-caption-more" onClick={() => setIsCaptionExpanded(true)}>
              더 보기
            </button>
          )}
        </div>

        {/* Comments section */}
        {post.comments.length > 2 && (
          <div className="post-comments-summary">
            댓글 {post.comments.length}개 모두 보기
          </div>
        )}

        <div className="post-comments-list">
          {post.comments.slice(-3).map((cmt, idx) => (
            <div key={idx} className="post-comment-item">
              <span className="post-comment-user">{cmt.username}</span>
              <span className="post-comment-text">{cmt.text}</span>
            </div>
          ))}
        </div>

        {/* Time Ago */}
        <div className="post-time">{post.timeAgo}</div>
      </div>

      {/* Add Comment Area */}
      <form className="post-comment-input-area" onSubmit={handleCommentSubmit}>
        <input
          ref={commentInputRef}
          type="text"
          className="post-comment-input"
          placeholder="댓글 달기..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <button
          type="submit"
          className="post-comment-submit"
          disabled={!commentText.trim()}
        >
          게시
        </button>
      </form>
    </article>
  );
}
