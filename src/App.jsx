import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Stories from './components/Stories';
import StoryModal from './components/StoryModal';
import Suggestions from './components/Suggestions';
import FeedPost from './components/FeedPost';
import { Camera, Search, Heart, Send, Settings, Grid, Award, Bookmark, User, PlusCircle } from 'lucide-react';

const INITIAL_STORIES = [
  { id: 1, username: 'sara_w', avatar: '/images/woman.png', storyImage: '/images/img01.png', timeAgo: '1시간 전', seen: false },
  { id: 2, username: 'johndoe', avatar: '/images/man.png', storyImage: '/images/img02.jpg', timeAgo: '2시간 전', seen: false },
  { id: 3, username: 'elizabeth', avatar: '/images/woman.png', storyImage: '/images/img03.jpg', timeAgo: '3시간 전', seen: false },
  { id: 4, username: 'mike_rock', avatar: '/images/man.png', storyImage: '/images/img04.png', timeAgo: '4시간 전', seen: false },
  { id: 5, username: 'traveler_y', avatar: '/images/woman.png', storyImage: '/images/img05.jpg', timeAgo: '5시간 전', seen: false },
  { id: 6, username: 'developer_x', avatar: '/images/man.png', storyImage: '/images/img06.jpg', timeAgo: '6시간 전', seen: false },
];

const INITIAL_POSTS = [
  {
    id: 1,
    username: 'sky_blue',
    userAvatar: '/images/woman.png',
    postImage: '/images/img01.png',
    likes: 1420,
    caption: '오늘 날씨 너무 맑음! 기분이 좋아지는 푸른 하늘 ☀️',
    location: '서울, 대한민국',
    comments: [
      { username: 'minji_love', text: '진짜 날씨 미쳤네요!' },
      { username: 'hwan_dev', text: '어디인가요?!' }
    ],
    isLiked: false,
    isBookmarked: false,
    timeAgo: '1시간 전'
  },
  {
    id: 2,
    username: 'nature_lover',
    userAvatar: '/images/man.png',
    postImage: '/images/img02.jpg',
    likes: 842,
    caption: '초록초록한 숲길 걷기. 자연이 주는 힐링 🌿💚',
    location: '제주도 사려니숲길',
    comments: [
      { username: 'sohee_pic', text: '공기가 여기까지 느껴지는 것 같아요!' }
    ],
    isLiked: false,
    isBookmarked: false,
    timeAgo: '3시간 전'
  },
  {
    id: 3,
    username: 'daily_look',
    userAvatar: '/images/man.png',
    postImage: '/images/img03.jpg',
    likes: 2043,
    caption: '오늘의 데일리룩. 깔끔하고 편하게 🕶️👔',
    location: '성수동, 서울',
    comments: [
      { username: 'june_sports', text: '핏 너무 좋으시네요!' },
      { username: 'traveler_y', text: '정보 공유 가능한가요?' }
    ],
    isLiked: false,
    isBookmarked: false,
    timeAgo: '5시간 전'
  },
  {
    id: 4,
    username: 'good_mood',
    userAvatar: '/images/woman.png',
    postImage: '/images/img04.png',
    likes: 922,
    caption: '바쁜 일상 속 가끔은 여유롭게 커피 한 잔의 행복 ☕🍰',
    location: '합정역 예쁜 카페',
    comments: [
      { username: 'mike_rock', text: '여기 커피 진짜 맛있죠!' }
    ],
    isLiked: false,
    isBookmarked: false,
    timeAgo: '8시간 전'
  },
  {
    id: 5,
    username: 'coffee_time',
    userAvatar: '/images/man.png',
    postImage: '/images/img05.jpg',
    likes: 1120,
    caption: '따뜻한 아메리카노와 독서. 가을 감성 충만 🍂📖',
    location: '북카페',
    comments: [],
    isLiked: false,
    isBookmarked: false,
    timeAgo: '12시간 전'
  },
  {
    id: 6,
    username: 'design_inspiration',
    userAvatar: '/images/woman.png',
    postImage: '/images/img06.jpg',
    likes: 3210,
    caption: '모던 인테리어 디자인 트렌드. 화이트와 우드의 조화 🪵🏡',
    location: '인테리어 쇼룸',
    comments: [
      { username: 'developer_x', text: '내 방도 이렇게 꾸미고 싶다..' }
    ],
    isLiked: false,
    isBookmarked: false,
    timeAgo: '1일 전'
  },
  {
    id: 7,
    username: 'street_style',
    userAvatar: '/images/man.png',
    postImage: '/images/img07.jpg',
    likes: 643,
    caption: '화려한 도시의 밤거리. 네온 사인이 예쁘다 🌃✨',
    location: '도쿄, 일본',
    comments: [],
    isLiked: false,
    isBookmarked: false,
    timeAgo: '2일 전'
  },
  {
    id: 8,
    username: 'pet_daily',
    userAvatar: '/images/woman.png',
    postImage: '/images/img08.jpg',
    likes: 4120,
    caption: '귀여운 길고양이와 눈이 마주쳤다 🐱🐾 심쿵사 유발..',
    location: '골목길 어딘가',
    comments: [
      { username: 'minji_love', text: '악 너무 귀여워ㅠㅠ' },
      { username: 'travel_pic', text: '츄르 챙겨 다녀야겠어요!' }
    ],
    isLiked: false,
    isBookmarked: false,
    timeAgo: '3일 전'
  },
  {
    id: 9,
    username: 'cooking_chef',
    userAvatar: '/images/man.png',
    postImage: '/images/img09.jpg',
    likes: 1890,
    caption: '오늘 저녁은 직접 만든 수제 파스타! 비주얼 대성공 🍝🍷',
    location: '내 집 주방',
    comments: [
      { username: 'cooking_chef', text: '비법 레시피 원하시면 댓글로 남겨주세요!' }
    ],
    isLiked: false,
    isBookmarked: false,
    timeAgo: '4일 전'
  },
  {
    id: 10,
    username: 'travel_pic',
    userAvatar: '/images/woman.png',
    postImage: '/images/img10.jpg',
    likes: 5012,
    caption: '끝없이 펼쳐진 에메랄드빛 바다. 다시 가고 싶다 🌊✈️',
    location: '몰디브',
    comments: [
      { username: 'elizabeth', text: '와 진짜 대박이네요... 지상낙원!!' }
    ],
    isLiked: false,
    isBookmarked: false,
    timeAgo: '5일 전'
  }
];

export default function App() {
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [stories, setStories] = useState(INITIAL_STORIES);
  const [currentTheme, setCurrentTheme] = useState('light');
  const [activeTab, setActiveTab] = useState('home');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [activeStoryIndex, setActiveStoryIndex] = useState(-1);
  const [toastMessage, setToastMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Create Post Form States
  const [newPostImage, setNewPostImage] = useState('/images/img01.png');
  const [newPostCaption, setNewPostCaption] = useState('');
  const [newPostLocation, setNewPostLocation] = useState('');

  // Toggle dark/light theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setCurrentTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
    setCurrentTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('theme', nextTheme);
    showToast(`${nextTheme === 'dark' ? '다크 모드' : '라이트 모드'}로 전환되었습니다.`);
  };

  // Toast handler
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 2500);
  };

  // Toggle Post Like
  const handleLikeToggle = (postId) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          const isLiked = !post.isLiked;
          return {
            ...post,
            isLiked,
            likes: isLiked ? post.likes + 1 : post.likes - 1
          };
        }
        return post;
      })
    );
  };

  // Toggle Post Bookmark
  const handleBookmarkToggle = (postId) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          const isBookmarked = !post.isBookmarked;
          showToast(isBookmarked ? '게시물이 북마크에 추가되었습니다.' : '북마크가 해제되었습니다.');
          return {
            ...post,
            isBookmarked
          };
        }
        return post;
      })
    );
  };

  // Add Comment
  const handleCommentAdd = (postId, username, text) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [...post.comments, { username, text }]
          };
        }
        return post;
      })
    );
    showToast('댓글이 등록되었습니다.');
  };

  // Story click handler
  const handleStoryClick = (index) => {
    setActiveStoryIndex(index);
    // Mark story as seen
    setStories(
      stories.map((story, idx) =>
        idx === index ? { ...story, seen: true } : story
      )
    );
  };

  // Story Navigation
  const handleNextStory = () => {
    if (activeStoryIndex < stories.length - 1) {
      const nextIndex = activeStoryIndex + 1;
      setActiveStoryIndex(nextIndex);
      setStories(
        stories.map((story, idx) =>
          idx === nextIndex ? { ...story, seen: true } : story
        )
      );
    } else {
      // Close at the end
      setActiveStoryIndex(-1);
    }
  };

  const handlePrevStory = () => {
    if (activeStoryIndex > 0) {
      setActiveStoryIndex(activeStoryIndex - 1);
    }
  };

  // Handle New Post Creation
  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!newPostCaption.trim()) return;

    const newPost = {
      id: posts.length + 1,
      username: 'dongm_coding',
      userAvatar: '/images/man.png',
      postImage: newPostImage,
      likes: 0,
      caption: newPostCaption,
      location: newPostLocation.trim() || '서울, 대한민국',
      comments: [],
      isLiked: false,
      isBookmarked: false,
      timeAgo: '방금 전'
    };

    setPosts([newPost, ...posts]);
    setIsCreateModalOpen(false);
    setNewPostCaption('');
    setNewPostLocation('');
    setActiveTab('home');
    showToast('새로운 게시글이 업로드되었습니다!');
  };

  // Filter posts based on search query
  const filteredPosts = posts.filter(
    (post) =>
      post.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.caption.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <Sidebar
        currentTheme={currentTheme}
        toggleTheme={toggleTheme}
        onCreateClick={() => setIsCreateModalOpen(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Content Area */}
      <main className="main-content">
        {activeTab === 'home' && (
          <div className="feed-container">
            {/* Feed Column */}
            <div className="feed-left">
              {/* Stories Tray */}
              <Stories stories={stories} onStoryClick={handleStoryClick} />

              {/* Feed Posts */}
              {posts.map((post) => (
                <FeedPost
                  key={post.id}
                  post={post}
                  onLikeToggle={handleLikeToggle}
                  onCommentAdd={handleCommentAdd}
                  onBookmarkToggle={handleBookmarkToggle}
                />
              ))}
            </div>

            {/* Suggestions Column */}
            <div className="feed-right">
              <Suggestions />
            </div>
          </div>
        )}

        {/* Search Tab Panel */}
        {activeTab === 'search' && (
          <div style={{ width: '100%', maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h2 style={{ fontFamily: 'var(--font-title)', fontWeight: 800, fontSize: '28px' }}>검색</h2>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="사용자명, 캡션, 위치 등으로 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px 12px 40px',
                  borderRadius: '10px',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
              <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '10px' }}>
              {searchQuery.trim() === '' ? (
                <p style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '40px 0' }}>최근 검색 내역이 없습니다.</p>
              ) : filteredPosts.length === 0 ? (
                <p style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '40px 0' }}>검색 결과가 없습니다.</p>
              ) : (
                filteredPosts.map((post) => (
                  <div key={post.id} className="post-card" style={{ padding: '0 0' }}>
                    <FeedPost
                      post={post}
                      onLikeToggle={handleLikeToggle}
                      onCommentAdd={handleCommentAdd}
                      onBookmarkToggle={handleBookmarkToggle}
                    />
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Explore Tab View */}
        {activeTab === 'explore' && (
          <div style={{ width: '100%', maxWidth: '935px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4px' }}>
              {posts.map((post) => (
                <div
                  key={post.id}
                  style={{
                    position: 'relative',
                    width: '100%',
                    paddingBottom: '100%',
                    cursor: 'pointer',
                    overflow: 'hidden'
                  }}
                  onClick={() => {
                    setActiveTab('home');
                    // Scroll to the post (simulated)
                    setTimeout(() => {
                      showToast(`${post.username}님의 피드로 이동했습니다.`);
                    }, 100);
                  }}
                >
                  <img
                    src={post.postImage}
                    alt="Explore item"
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.3s'
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                    onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      backgroundColor: 'rgba(0, 0, 0, 0.3)',
                      opacity: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      fontWeight: 700,
                      fontSize: '16px',
                      transition: 'opacity 0.2s',
                      gap: '20px'
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.opacity = 1)}
                    onMouseOut={(e) => (e.currentTarget.style.opacity = 0)}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Heart size={20} fill="#fff" /> {post.likes}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Send size={20} fill="#fff" /> {post.comments.length}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Messages Tab View (Mockup Chat Interface) */}
        {activeTab === 'messages' && (
          <div style={{ width: '100%', maxWidth: '935px', height: '80vh', border: '1px solid var(--border-color)', borderRadius: '12px', display: 'flex', overflow: 'hidden', backgroundColor: 'var(--card-bg)' }}>
            {/* Inbox sidebar */}
            <div style={{ width: '350px', borderRight: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ padding: '20px', borderBottom: '1px solid var(--border-color)', fontWeight: 700, fontSize: '18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>dongm_coding</span>
                <PlusCircle size={20} style={{ cursor: 'pointer' }} />
              </div>
              <div style={{ flex: 1, overflowY: 'auto', padding: '10px' }}>
                {stories.map((story) => (
                  <div
                    key={story.id}
                    style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px', borderRadius: '8px', cursor: 'pointer', transition: 'background-color 0.2s' }}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-hover)')}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                    onClick={() => showToast(`${story.username}님과의 대화방을 로드합니다.`)}
                  >
                    <img src={story.avatar} alt="" style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover' }} />
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '14px' }}>{story.username}</div>
                      <div style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>회원님이 스토리에 답장을 보냈습니다.</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Conversation window */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '14px', padding: '20px' }}>
              <Send size={48} style={{ color: 'var(--text-secondary)' }} />
              <h3 style={{ fontSize: '20px', fontWeight: 600 }}>내 메시지</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', textAlign: 'center' }}>친구나 그룹에 비공개 사진과 메시지를 보내보세요.</p>
              <button style={{ backgroundColor: 'var(--accent)', color: '#fff', padding: '8px 16px', borderRadius: '8px', fontWeight: 600, fontSize: '14px' }} onClick={() => showToast('대화방 시작하기')}>메시지 보내기</button>
            </div>
          </div>
        )}

        {/* Notifications Tab View */}
        {activeTab === 'notifications' && (
          <div style={{ width: '100%', maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h2 style={{ fontFamily: 'var(--font-title)', fontWeight: 800, fontSize: '28px' }}>알림</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '16px', backgroundColor: 'var(--card-bg)' }}>
              {[
                { user: 'minji_love', action: '님이 회원님의 댓글을 좋아합니다.', time: '2시간 전', avatar: '/images/woman.png', postImg: '/images/img01.png' },
                { user: 'hwan_dev', action: '님이 회원님의 게시물을 좋아합니다.', time: '5시간 전', avatar: '/images/man.png', postImg: '/images/img01.png' },
                { user: 'sohee_pic', action: '님이 회원님을 팔로우하기 시작했습니다.', time: '1일 전', avatar: '/images/woman.png', button: true },
                { user: 'june_sports', action: '님이 댓글에 회원님을 언급했습니다.', time: '3일 전', avatar: '/images/man.png', postImg: '/images/img03.jpg' }
              ].map((noti, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: idx < 3 ? '1px solid var(--border-color)' : 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img src={noti.avatar} alt="" style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }} />
                    <div style={{ fontSize: '13.5px' }}>
                      <span style={{ fontWeight: 700 }}>{noti.user}</span>
                      <span style={{ color: 'var(--text-primary)' }}>{noti.action}</span>
                      <span style={{ color: 'var(--text-secondary)', marginLeft: '8px', fontSize: '11.5px' }}>{noti.time}</span>
                    </div>
                  </div>
                  {noti.postImg ? (
                    <img src={noti.postImg} alt="" style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: '4px' }} />
                  ) : noti.button ? (
                    <button style={{ backgroundColor: 'var(--accent)', color: '#fff', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 600 }} onClick={() => showToast('맞팔로우 완료!')}>맞팔로우</button>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Profile Tab View */}
        {activeTab === 'profile' && (
          <div style={{ width: '100%', maxWidth: '935px', display: 'flex', flexDirection: 'column', gap: '44px' }}>
            {/* Header info */}
            <header style={{ display: 'flex', gap: '80px', padding: '10px 20px', borderBottom: '1px solid var(--border-color)', paddingBottom: '44px' }}>
              <div style={{ flexShrink: 0 }}>
                <img
                  src="/images/man.png"
                  alt="dongm_coding"
                  style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover', border: '1px solid var(--border-color)', padding: '4px' }}
                />
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <h2 style={{ fontSize: '20px', fontWeight: 300 }}>dongm_coding</h2>
                  <button style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', padding: '6px 16px', borderRadius: '8px', fontSize: '14px', fontWeight: 600 }} onClick={() => showToast('프로필 편집 페이지')}>프로필 편집</button>
                  <button style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', padding: '6px 16px', borderRadius: '8px', fontSize: '14px', fontWeight: 600 }} onClick={() => showToast('보관함 보기')}>보관함 보기</button>
                  <Settings size={20} style={{ cursor: 'pointer' }} />
                </div>
                <div style={{ display: 'flex', gap: '40px', fontSize: '16px' }}>
                  <span>게시물 <strong style={{ fontWeight: 600 }}>{posts.filter(p => p.username === 'dongm_coding').length + 1}</strong></span>
                  <span style={{ cursor: 'pointer' }} onClick={() => showToast('팔로워 목록')}>팔로워 <strong style={{ fontWeight: 600 }}>1.2K</strong></span>
                  <span style={{ cursor: 'pointer' }} onClick={() => showToast('팔로잉 목록')}>팔로잉 <strong style={{ fontWeight: 600 }}>245</strong></span>
                </div>
                <div>
                  <h1 style={{ fontSize: '15px', fontWeight: 600, margin: '0 0 4px 0' }}>동민 | 바이브 코딩</h1>
                  <p style={{ fontSize: '14px', color: 'var(--text-secondary)', whiteSpace: 'pre-wrap' }}>
                    💻 바이브 코딩 클래스 실습 공간<br />
                    🚀 React를 활용한 프리미엄 인스타그램 화면 구현 중!<br />
                    📍 Seoul, South Korea
                  </p>
                </div>
              </div>
            </header>

            {/* Profile Grid Navigation */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '60px', borderTop: '1px solid var(--border-color)', marginTop: '-44px', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>
              <button style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '16px 0', borderTop: '1px solid var(--text-primary)', color: 'var(--text-primary)', marginTop: '-1px' }}>
                <Grid size={16} /> 게시물
              </button>
              <button style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '16px 0' }} onClick={() => showToast('릴스 탭 준비 중')}>
                <Award size={16} /> 릴스
              </button>
              <button style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '16px 0' }} onClick={() => showToast('북마크 탭 준비 중')}>
                <Bookmark size={16} /> 저장됨
              </button>
              <button style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '16px 0' }} onClick={() => showToast('태그된 게시물 준비 중')}>
                <User size={16} /> 태그됨
              </button>
            </div>

            {/* Profile Posts Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '28px' }}>
              {/* Custom uploaded/created posts first */}
              {posts.filter(p => p.username === 'dongm_coding').map((post) => (
                <div key={post.id} style={{ position: 'relative', width: '100%', paddingBottom: '100%', cursor: 'pointer', overflow: 'hidden' }}>
                  <img src={post.postImage} alt="" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
              {/* Default mock post for profile */}
              <div style={{ position: 'relative', width: '100%', paddingBottom: '100%', cursor: 'pointer', overflow: 'hidden' }}>
                <img src="/images/img03.jpg" alt="" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ position: 'relative', width: '100%', paddingBottom: '100%', cursor: 'pointer', overflow: 'hidden' }}>
                <img src="/images/img05.jpg" alt="" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Stories Viewer Modal */}
      <StoryModal
        isOpen={activeStoryIndex !== -1}
        stories={stories}
        activeIndex={activeStoryIndex}
        onClose={() => setActiveStoryIndex(-1)}
        onPrev={handlePrevStory}
        onNext={handleNextStory}
      />

      {/* Create Post Modal */}
      <div className={`modal-overlay ${isCreateModalOpen ? 'open' : ''}`} onClick={() => setIsCreateModalOpen(false)}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="create-modal-header">
            <span>새 게시물 만들기</span>
            <button className="create-modal-close" onClick={() => setIsCreateModalOpen(false)}>취소</button>
          </div>
          <form onSubmit={handleCreatePost} className="create-modal-body">
            {/* Image Selection Selector */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>피드 이미지 선택</label>
              <select
                value={newPostImage}
                onChange={(e) => setNewPostImage(e.target.value)}
                style={{
                  padding: '10px',
                  borderRadius: '8px',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  fontSize: '14px',
                  outline: 'none'
                }}
              >
                <option value="/images/img01.png">img01.png (피드 1 - 푸른 하늘)</option>
                <option value="/images/img02.jpg">img02.jpg (피드 2 - 초록 숲)</option>
                <option value="/images/img03.jpg">img03.jpg (피드 3 - 데일리룩)</option>
                <option value="/images/img04.png">img04.png (피드 4 - 커피 여유)</option>
                <option value="/images/img05.jpg">img05.jpg (피드 5 - 아메리카노 독서)</option>
                <option value="/images/img06.jpg">img06.jpg (피드 6 - 모던 쇼룸)</option>
                <option value="/images/img07.jpg">img07.jpg (피드 7 - 밤거리)</option>
                <option value="/images/img08.jpg">img08.jpg (피드 8 - 길고양이)</option>
                <option value="/images/img09.jpg">img09.jpg (피드 9 - 파스타)</option>
                <option value="/images/img10.jpg">img10.jpg (피드 10 - 에메랄드빛 바다)</option>
              </select>
            </div>

            {/* Selected Image Preview */}
            <div>
              <img
                src={newPostImage}
                alt="Selected preview"
                className="create-image-preview"
              />
            </div>

            {/* Location Input */}
            <input
              type="text"
              placeholder="위치 추가 (예: 서울, 대한민국)"
              value={newPostLocation}
              onChange={(e) => setNewPostLocation(e.target.value)}
              style={{
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
                fontSize: '14px',
                outline: 'none'
              }}
            />

            {/* Caption Input */}
            <textarea
              className="create-textarea"
              placeholder="문구 입력..."
              value={newPostCaption}
              onChange={(e) => setNewPostCaption(e.target.value)}
              required
            />

            {/* Submit */}
            <button type="submit" className="create-submit-btn" disabled={!newPostCaption.trim()}>
              공유하기
            </button>
          </form>
        </div>
      </div>

      {/* Global alert toast notification */}
      {toastMessage && <div className="toast">{toastMessage}</div>}
    </div>
  );
}
