import React from 'react';

export default function Stories({ stories, onStoryClick }) {
  return (
    <div className="stories-container">
      {stories.map((story, index) => (
        <div
          key={story.id}
          className="story-item"
          onClick={() => onStoryClick(index)}
        >
          <div className={`story-avatar-wrapper ${story.seen ? 'seen' : ''}`}>
            <img
              src={story.avatar}
              alt={story.username}
              className="story-avatar"
            />
          </div>
          <span className="story-username">{story.username}</span>
        </div>
      ))}
    </div>
  );
}
