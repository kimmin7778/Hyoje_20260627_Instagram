import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function StoryModal({ isOpen, stories, activeIndex, onClose, onPrev, onNext }) {
  useEffect(() => {
    if (!isOpen) return;

    // Auto progress story every 5 seconds
    const timer = setTimeout(() => {
      onNext();
    }, 5000);

    return () => clearTimeout(timer);
  }, [isOpen, activeIndex, onNext]);

  if (!isOpen || activeIndex === -1 || activeIndex >= stories.length) return null;

  const currentStory = stories[activeIndex];

  return (
    <div className={`story-modal-overlay ${isOpen ? 'open' : ''}`}>
      <div className="story-viewer-container">
        {/* Progress Bars */}
        <div className="story-progress-bar-container">
          {stories.map((story, index) => {
            let className = 'story-progress-fill';
            if (index < activeIndex) {
              className += ' filled';
            } else if (index === activeIndex) {
              className += ' active';
            }
            return (
              <div key={story.id} className="story-progress-track">
                {/* We use key={activeIndex} on the active progress bar to force it to re-render and restart animation */}
                <div 
                  className={className} 
                  key={index === activeIndex ? activeIndex : index} 
                />
              </div>
            );
          })}
        </div>

        {/* Header */}
        <div className="story-viewer-header">
          <div className="story-viewer-user">
            <img
              src={currentStory.avatar}
              alt={currentStory.username}
              className="story-viewer-avatar"
            />
            <span className="story-viewer-username">{currentStory.username}</span>
            <span className="story-viewer-time">{currentStory.timeAgo}</span>
          </div>
          <button className="story-close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        {/* Story Media (Feed Image used as story mockup) */}
        <img
          src={currentStory.storyImage}
          alt="Story content"
          className="story-viewer-media"
        />

        {/* Navigation Buttons */}
        {activeIndex > 0 && (
          <button className="story-nav-btn prev" onClick={onPrev}>
            <ChevronLeft size={24} />
          </button>
        )}
        {activeIndex < stories.length - 1 && (
          <button className="story-nav-btn next" onClick={onNext}>
            <ChevronRight size={24} />
          </button>
        )}
      </div>
    </div>
  );
}
