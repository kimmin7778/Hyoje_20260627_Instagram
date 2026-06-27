import React, { useState } from 'react';

export default function Suggestions() {
  const [suggestedUsers, setSuggestedUsers] = useState([
    { id: 1, username: 'minji_love', relation: '바이브코딩 회원님 추천', avatar: '/images/woman.png', following: false },
    { id: 2, username: 'hwan_dev', relation: '회원님을 위한 추천', avatar: '/images/man.png', following: false },
    { id: 3, username: 'sohee_pic', relation: 'Instagram 신규 가입', avatar: '/images/woman.png', following: false },
    { id: 4, username: 'june_sports', relation: 'johndoe님이 팔로우합니다', avatar: '/images/man.png', following: false },
  ]);

  const toggleFollow = (id) => {
    setSuggestedUsers(
      suggestedUsers.map((user) =>
        user.id === id ? { ...user, following: !user.following } : user
      )
    );
  };

  return (
    <div className="suggestions-box">
      {/* Current User Info */}
      <div className="current-user-profile">
        <div className="user-meta">
          <img
            src="/images/man.png"
            alt="My Avatar"
            className="user-meta-avatar"
          />
          <div className="user-meta-names">
            <span className="user-meta-username">dongm_coding</span>
            <span className="user-meta-fullname">동민 | 바이브 코딩</span>
          </div>
        </div>
        <button className="suggestion-switch-btn">전환</button>
      </div>

      {/* Header */}
      <div className="suggestions-header">
        <span className="suggestions-title">회원님을 위한 추천</span>
        <button className="suggestions-seeall">모두 보기</button>
      </div>

      {/* Suggested Users List */}
      <div className="suggestions-list">
        {suggestedUsers.map((user) => (
          <div key={user.id} className="suggestion-item">
            <div className="suggestion-user-info">
              <img
                src={user.avatar}
                alt={user.username}
                className="suggestion-avatar"
              />
              <div>
                <div className="suggestion-username">{user.username}</div>
                <div className="suggestion-reason">{user.relation}</div>
              </div>
            </div>
            <button
              className={`suggestion-follow-btn ${user.following ? 'following' : ''}`}
              onClick={() => toggleFollow(user.id)}
            >
              {user.following ? '팔로잉' : '팔로우'}
            </button>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="suggestions-footer">
        소개 · 도움말 · 홍보 센터 · API · 채용 정보 · <br />
        개인정보처리방침 · 약관 · 위치 · 언어 · Meta Verified <br /><br />
        © 2026 INSTAGRAM FROM META
      </footer>
    </div>
  );
}
