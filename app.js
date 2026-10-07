* {
  box-sizing: border-box;
}

:root {
  --bg: #f6f7ff;
  --bg-elevated: #ffffff;
  --bg-soft: #eef2ff;
  --card: rgba(255, 255, 255, 0.88);
  --card-strong: #ffffff;
  --text: #1e2333;
  --muted: #686f88;
  --primary: #7c6cf5;
  --primary-strong: #5f4ae8;
  --pink: #ff5db1;
  --green: #3bc59a;
  --warning: #ffb84d;
  --danger: #ff5a67;
  --shadow: 0 18px 44px rgba(79, 77, 138, 0.12);
  --border: rgba(124, 108, 245, 0.12);
}

body.dark {
  --bg: #0f1220;
  --bg-elevated: #171b2c;
  --bg-soft: #1d2338;
  --card: rgba(21, 27, 44, 0.92);
  --card-strong: #181d2b;
  --text: #edf3ff;
  --muted: #a4acd0;
  --primary: #8d7af7;
  --primary-strong: #7361ef;
  --pink: #ff7ccc;
  --green: #52d0ad;
  --warning: #ffc867;
  --danger: #ff7d8f;
  --shadow: 0 20px 56px rgba(0, 0, 0, 0.25);
  --border: rgba(255, 255, 255, 0.08);
}

html, body {
  margin: 0;
  min-height: 100%;
  font-family: 'Inter', sans-serif;
  background: linear-gradient(180deg, var(--bg) 0%, var(--bg-soft) 100%);
  color: var(--text);
}

body {
  min-height: 100vh;
}

button, input, textarea {
  font: inherit;
}

button {
  cursor: pointer;
}

.hidden {
  display: none !important;
}

.app-shell {
  display: flex;
  min-height: 100vh;
  width: 100%;
}

.sidebar {
  width: 280px;
  padding: 1.2rem;
  background: rgba(255,255,255,0.05);
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.brand-row {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  margin-bottom: 1.5rem;
}

.logo {
  width: 42px;
  height: 42px;
  border-radius: 14px;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, var(--primary), var(--pink));
  color: white;
  font-weight: 800;
  box-shadow: var(--shadow);
}

.logo.large {
  width: 58px;
  height: 58px;
  font-size: 1.7rem;
}

.nav-stack {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  border: 0;
  background: transparent;
  color: var(--text);
  padding: 0.9rem 1rem;
  border-radius: 14px;
  text-align: left;
  font-weight: 600;
  transition: 0.2s ease;
}

.nav-item.active,
.nav-item:hover {
  background: linear-gradient(135deg, rgba(124,108,245,0.14), rgba(255,93,177,0.12));
}

.sidebar-footer {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
}

.main-content {
  flex: 1;
  padding: 1.2rem;
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.9rem 1.1rem;
  margin-bottom: 1rem;
}

.search-wrap {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex: 1;
  background: var(--bg-soft);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 0.75rem 0.9rem;
  color: var(--muted);
}

.search-wrap input,
.search-inline input,
.auth-form input,
.comment-input,
.create-card input,
.create-card textarea,
#friendSearchInput {
  width: 100%;
  border: 1px solid var(--border);
  background: var(--bg-elevated);
  color: var(--text);
  border-radius: 12px;
  padding: 0.85rem 0.9rem;
}

.search-wrap input {
  border: 0;
  background: transparent;
  padding: 0;
  outline: none;
}

.topbar-actions {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-left: 0.8rem;
}

.icon-button,
.primary-button,
.ghost-button,
.danger-button,
.reaction-button,
.toggle-button,
.segment-btn {
  border: 0;
  border-radius: 12px;
  transition: 0.2s ease;
}

.icon-button {
  width: 42px;
  height: 42px;
  background: var(--bg-soft);
  color: var(--text);
  font-size: 1.1rem;
}

.primary-button,
.ghost-button,
.danger-button {
  padding: 0.8rem 1rem;
  font-weight: 700;
}

.primary-button {
  background: linear-gradient(135deg, var(--primary), var(--pink));
  color: white;
}

.ghost-button,
.toggle-button,
.segment-btn {
  background: var(--bg-soft);
  color: var(--text);
}

.ghost-button.small,
.primary-button.small {
  padding: 0.55rem 0.8rem;
  font-size: 0.85rem;
}

.danger-button {
  background: rgba(255, 90, 103, 0.12);
  color: var(--danger);
}

.screen {
  width: 100%;
  min-height: 70vh;
}

.auth-screen {
  display: grid;
  place-items: center;
  min-height: 80vh;
}

.auth-panel,
.card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 24px;
  box-shadow: var(--shadow);
}

.auth-panel {
  width: min(100%, 440px);
  padding: 1.4rem;
}

.auth-brand {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.9rem;
  margin-bottom: 1rem;
}

.auth-brand h1 {
  margin: 0;
  font-size: 2rem;
}

.auth-toggle {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.6rem;
  margin-bottom: 1rem;
}

.toggle-button,
.segment-btn {
  padding: 0.8rem 1rem;
  font-weight: 700;
}

.toggle-button.active,
.segment-btn.active {
  background: linear-gradient(135deg, var(--primary), var(--pink));
  color: white;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.checkbox-row {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  color: var(--muted);
}

.demo-box {
  margin-top: 1rem;
  background: var(--bg-soft);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 0.9rem 1rem;
  color: var(--muted);
}

.demo-box p {
  margin: 0 0 0.5rem;
  font-weight: 700;
  color: var(--text);
}

.demo-box ul {
  margin: 0;
  padding-left: 1rem;
}

.section-heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 0 1rem;
}

.section-heading h2 {
  margin: 0;
  font-size: clamp(1.5rem, 5vw, 2.2rem);
}

.feed-list,
.reels-list,
.notification-list,
.search-results,
.friend-request-list,
.friends-list,
.comment-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.post-card,
.reel-card,
.stack-card {
  padding: 1rem;
}

.post-header,
.reel-header,
.friend-item,
.notification-item,
.admin-item,
.user-pill {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.post-header,
.reel-header {
  justify-content: space-between;
  margin-bottom: 0.8rem;
}

.post-header > div:first-child,
.reel-header > div:first-child,
.friend-item .meta,
.notification-item .meta {
  flex: 1;
}

.avatar {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary), var(--pink));
  display: grid;
  place-items: center;
  font-size: 0.8rem;
  font-weight: 800;
  color: white;
}

.post-text {
  margin: 0.8rem 0;
  line-height: 1.6;
}

.post-image,
.reel-video {
  width: 100%;
  border-radius: 18px;
  object-fit: cover;
  max-height: 420px;
  border: 1px solid var(--border);
  background: var(--bg-soft);
}

.reactions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-top: 1rem;
}

.reaction-button {
  padding: 0.7rem 0.9rem;
  background: var(--bg-soft);
  color: var(--text);
  font-weight: 600;
}

.comment-list {
  margin-top: 0.8rem;
}

.comment-item {
  background: var(--bg-soft);
  color: var(--text);
  border-radius: 12px;
  padding: 0.65rem 0.8rem;
}

.comment-form {
  display: flex;
  gap: 0.6rem;
  margin-top: 0.8rem;
}

.comment-form .comment-input {
  flex: 1;
}

.stack-card {
  margin-bottom: 1rem;
}

.row-split {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.search-inline {
  margin-bottom: 0.8rem;
}

.friend-item,
.notification-item,
.admin-item {
  justify-content: space-between;
  background: var(--bg-soft);
  border-radius: 14px;
  padding: 0.9rem;
}

.friend-item .meta,
.notification-item .meta,
.admin-item .meta {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.friend-actions,
.notification-actions,
.admin-actions {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.user-pill {
  background: var(--bg-soft);
  border-radius: 999px;
  padding: 0.5rem 0.8rem;
  border: 1px solid var(--border);
}

.create-card {
  padding: 1rem;
}

.create-card form {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-top: 1rem;
}

.segmented-control {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
}

.mobile-nav {
  position: fixed;
  bottom: 12px;
  left: 12px;
  right: 12px;
  display: none;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 0.4rem;
  padding: 0.6rem 0.5rem;
  z-index: 50;
}

.mobile-nav .nav-item {
  justify-content: center;
  font-size: 0.75rem;
  padding: 0.7rem 0.4rem;
  flex-direction: column;
}

.profile-header {
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-bottom: 1rem;
}

.profile-cover {
  width: 110px;
  height: 110px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary), var(--pink));
  display: grid;
  place-items: center;
  font-size: 2rem;
  color: white;
  font-weight: 800;
}

.profile-stats {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.8rem;
  margin: 1rem 0;
}

.stat-box {
  background: var(--bg-soft);
  border-radius: 14px;
  padding: 0.9rem 0.7rem;
  text-align: center;
}

.stat-box strong {
  display: block;
  font-size: 1.2rem;
}

.hidden-line {
  color: var(--muted);
}

@media (max-width: 900px) {
  .sidebar {
    display: none;
  }

  .main-content {
    padding-bottom: 5.5rem;
  }

  .mobile-nav {
    display: grid;
  }

  .row-split {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 560px) {
  .auth-panel {
    padding: 1rem;
  }

  .profile-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .profile-stats {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
