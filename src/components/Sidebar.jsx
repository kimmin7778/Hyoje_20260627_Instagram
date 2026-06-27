import React from 'react';
import { Home, Search, Compass, Send, Heart, SquarePlus, Moon, Sun, Menu, Camera } from 'lucide-react';

export default function Sidebar({ currentTheme, toggleTheme, onCreateClick, activeTab, setActiveTab }) {
  const menuItems = [
    { id: 'home', label: '홈', icon: Home },
    { id: 'search', label: '검색', icon: Search },
    { id: 'explore', label: '탐색', icon: Compass },
    { id: 'messages', label: '메시지', icon: Send },
    { id: 'notifications', label: '알림', icon: Heart },
    { id: 'create', label: '만들기', icon: SquarePlus, onClick: onCreateClick },
  ];

  return (
    <>
      <aside className="sidebar">
        <div>
          {/* Logo */}
          <div className="sidebar-logo">
            <Camera size={28} className="sidebar-logo-icon" style={{ strokeWidth: 2 }} />
            <span className="sidebar-logo-text">Instagram</span>
          </div>

          {/* Menu Items */}
          <nav className="sidebar-menu">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  className={`sidebar-item ${isActive ? 'sidebar-item-active' : ''}`}
                  onClick={item.onClick ? item.onClick : () => setActiveTab(item.id)}
                >
                  <Icon size={24} style={{ strokeWidth: isActive ? 2.5 : 2 }} />
                  <span className="sidebar-item-text">{item.label}</span>
                </button>
              );
            })}

            {/* Profile Item */}
            <button
              className={`sidebar-item ${activeTab === 'profile' ? 'sidebar-item-active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              <img
                src="/images/man.png"
                alt="My Profile"
                className="sidebar-profile-img"
              />
              <span className="sidebar-item-text">프로필</span>
            </button>
          </nav>
        </div>

        {/* Theme & Menu Footer */}
        <div className="theme-switch-btn">
          <button className="sidebar-item" onClick={toggleTheme} title="테마 전환">
            {currentTheme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
            <span className="sidebar-item-text">
              {currentTheme === 'dark' ? '라이트 모드' : '다크 모드'}
            </span>
          </button>
          <button className="sidebar-item">
            <Menu size={24} />
            <span className="sidebar-item-text">더 보기</span>
          </button>
        </div>
      </aside>

      {/* Mobile Nav Bar */}
      <nav className="mobile-nav">
        <button onClick={() => setActiveTab('home')} className={activeTab === 'home' ? 'liked' : ''}>
          <Home size={24} />
        </button>
        <button onClick={() => setActiveTab('search')}>
          <Search size={24} />
        </button>
        <button onClick={onCreateClick}>
          <SquarePlus size={24} />
        </button>
        <button onClick={() => setActiveTab('explore')}>
          <Compass size={24} />
        </button>
        <button onClick={() => setActiveTab('profile')}>
          <img
            src="/images/man.png"
            alt="My Profile"
            className="sidebar-profile-img"
            style={{ width: 24, height: 24 }}
          />
        </button>
      </nav>
    </>
  );
}
