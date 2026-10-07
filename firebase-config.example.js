const STORAGE_KEY = 'vibe-demo-state-v1';
const NAV_ITEMS = [
  { id: 'feed', label: 'Home', icon: '🏠' },
  { id: 'reels', label: 'Reels', icon: '🎬' },
  { id: 'friends', label: 'Friends', icon: '👥' },
  { id: 'create', label: 'Create', icon: '＋' },
  { id: 'notifications', label: 'Notifications', icon: '🔔' },
  { id: 'profile', label: 'Profile', icon: '👤' },
  { id: 'admin', label: 'Admin', icon: '🛡️', adminOnly: true }
];

const state = {
  currentUserId: null,
  theme: 'light',
  ui: {
    currentView: 'feed'
  },
  users: [],
  posts: [],
  reels: [],
  notifications: [],
  reports: [],
  friendships: [],
  friendRequests: [],
  blocks: [],
  savedPosts: [],
  moderated: []
};

let firebaseReady = false;
let firebaseDb = null;
let firebaseAuth = null;
let firebaseStorage = null;

const authScreen = document.getElementById('authScreen');
const appScreen = document.getElementById('appScreen');
const sidebar = document.getElementById('sidebar');
const topbar = document.getElementById('topbar');
const navDesktop = document.getElementById('navDesktop');
const mobileNav = document.getElementById('mobileNav');
const feedList = document.getElementById('feedList');
const reelsList = document.getElementById('reelsList');
const friendRequestsList = document.getElementById('friendRequestsList');
const friendsList = document.getElementById('friendsList');
const notificationsList = document.getElementById('notificationsList');
const profileContent = document.getElementById('profileContent');
const searchUsersInput = document.getElementById('searchUsersInput');
const friendSearchInput = document.getElementById('friendSearchInput');
const adminContent = document.getElementById('adminContent');
const createPostForm = document.getElementById('createPostForm');
const createReelForm = document.getElementById('createReelForm');

function initializeFirebase() {
  const config = window.firebaseConfig || {};
  if (!config.apiKey || !config.authDomain || !config.projectId) {
    return;
  }

  try {
    const app = firebase.initializeApp(config);
    firebaseAuth = firebase.auth();
    firebaseDb = firebase.firestore();
    firebaseStorage = firebase.storage();
    firebaseReady = true;
  } catch (error) {
    console.warn('Firebase initialization failed, falling back to demo mode:', error);
  }
}

function seedDemoData() {
  const defaultUsers = [
    {
      id: 'user-admin',
      username: 'admin',
      displayName: 'Community Admin',
      email: 'admin@vibe.app',
      bio: 'Maintaining safety',
      isAdmin: true,
      isParent: false,
      privateAccount: false,
      age: 30,
      dob: '1995-06-12',
      avatar: 'A',
      password: 'admin123'
    },
    {
      id: 'user-parent',
      username: 'parent',
      displayName: 'Parent Guardian',
      email: 'parent@vibe.app',
      bio: 'Supervising my child',
      isParent: true,
      isAdmin: false,
      privateAccount: false,
      age: 42,
      dob: '1983-01-19',
      avatar: 'P',
      password: 'parent123'
    },
    {
      id: 'user-maya',
      username: 'maya',
      displayName: 'Maya',
      email: 'maya@vibe.app',
      bio: 'Art, music, and kindness ✨',
      isParent: false,
      isAdmin: false,
      privateAccount: true,
      age: 14,
      dob: '2011-04-20',
      avatar: 'M',
      password: 'demo123'
    },
    {
      id: 'user-leo',
      username: 'leo',
      displayName: 'Leo',
      email: 'leo@vibe.app',
      bio: 'Basketball and bike rides',
      isParent: false,
      isAdmin: false,
      privateAccount: true,
      age: 13,
      dob: '2012-09-09',
      avatar: 'L',
      password: 'demo123'
    },
    {
      id: 'user-zara',
      username: 'zara',
      displayName: 'Zara',
      email: 'zara@vibe.app',
      bio: 'Book club and sunset photos',
      isParent: false,
      isAdmin: false,
      privateAccount: true,
      age: 15,
      dob: '2010-12-06',
      avatar: 'Z',
      password: 'demo123'
    }
  ];

  const defaultFriendships = [
    { id: 'f1', userId: 'user-maya', friendId: 'user-leo', status: 'accepted' },
    { id: 'f2', userId: 'user-maya', friendId: 'user-zara', status: 'accepted' },
    { id: 'f3', userId: 'user-leo', friendId: 'user-zara', status: 'accepted' }
  ];

  const defaultRequests = [
    { id: 'r1', fromUserId: 'user-admin', toUserId: 'user-maya', status: 'pending' },
    { id: 'r2', fromUserId: 'user-zara', toUserId: 'user-leo', status: 'pending' }
  ];

  const defaultPosts = [
    {
      id: 'p1',
      userId: 'user-maya',
      body: 'Sunset sketch club tonight. Looking for artists who like painting in calm places ✨',
      image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
      likes: ['user-leo', 'user-zara'],
      comments: [{ userId: 'user-leo', text: 'Love this vibe!' }],
      createdAt: Date.now() - 60000 * 150
    },
    {
      id: 'p2',
      userId: 'user-leo',
      body: 'Picked up my new bike. Anyone wants to join a safe weekend ride?',
      image: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=1200&q=80',
      likes: ['user-maya'],
      comments: [{ userId: 'user-zara', text: 'That looks fun!' }],
      createdAt: Date.now() - 60000 * 260
    }
  ];

  const defaultReels = [
    {
      id: 'r1',
      userId: 'user-zara',
      title: 'Cozy reading corner',
      caption: 'A calm corner for thoughtful reading',
      video: 'https://www.w3schools.com/html/mov_bbb.mp4',
      likes: ['user-maya'],
      comments: [{ userId: 'user-leo', text: 'This is so peaceful' }],
      createdAt: Date.now() - 60000 * 100
    },
    {
      id: 'r2',
      userId: 'user-leo',
      title: 'After-school energy',
      caption: 'Quick hoops session before dinner',
      video: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
      likes: ['user-zara'],
      comments: [],
      createdAt: Date.now() - 60000 * 210
    }
  ];

  const notifications = [
    { id: 'n1', userId: 'user-maya', text: 'A friend request is waiting', type: 'friend_request' },
    { id: 'n2', userId: 'user-maya', text: 'Your art post was liked by Leo', type: 'like' }
  ];

  const reports = [{ id: 'rep1', type: 'bullying', targetType: 'comment', userId: 'user-maya', status: 'pending' }];

  state.users = defaultUsers;
  state.friendships = defaultFriendships;
  state.friendRequests = defaultRequests;
  state.posts = defaultPosts;
  state.reels = defaultReels;
  state.notifications = notifications;
  state.reports = reports;
  state.savedPosts = [];
  state.blocks = [];
  state.moderated = [];
  state.currentUserId = 'user-maya';
  persistState();
}

function persistState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    seedDemoData();
    return;
  }

  try {
    const parsed = JSON.parse(saved);
    Object.assign(state, parsed);
  } catch (_error) {
    seedDemoData();
  }
}

function getCurrentUser() {
  return state.users.find((u) => u.id === state.currentUserId) || null;
}

function getUserById(userId) {
  return state.users.find((u) => u.id === userId) || null;
}

function renderNav() {
  const currentUser = getCurrentUser();
  const navItems = NAV_ITEMS.filter((item) => !item.adminOnly || (currentUser && currentUser.isAdmin));

  navDesktop.innerHTML = navItems
    .map(
      (item) => `
        <button class="nav-item ${state.ui.currentView === item.id ? 'active' : ''}" data-nav="${item.id}">
          <span>${item.icon}</span>
          <span>${item.label}</span>
        </button>
      `
    )
    .join('');

  mobileNav.innerHTML = navItems
    .map(
      (item) => `
        <button class="nav-item ${state.ui.currentView === item.id ? 'active' : ''}" data-nav="${item.id}">
          <span>${item.icon}</span>
          <span>${item.label}</span>
        </button>
      `
    )
    .join('');
}

function renderAuthState() {
  const currentUser = getCurrentUser();
  if (currentUser) {
    authScreen.classList.add('hidden');
    appScreen.classList.remove('hidden');
    sidebar.classList.remove('hidden');
    topbar.classList.remove('hidden');
    renderNav();
    renderScreen();
    return;
  }

  authScreen.classList.remove('hidden');
  appScreen.classList.add('hidden');
  sidebar.classList.add('hidden');
  topbar.classList.add('hidden');
}

function renderScreen() {
  const screens = document.querySelectorAll('.view-screen');
  screens.forEach((screen) => screen.classList.add('hidden'));
  const currentView = state.ui.currentView;
  const target = document.getElementById(`${currentView}View`);
  if (target) {
    target.classList.remove('hidden');
  }

  if (currentView === 'feed') renderFeed();
  if (currentView === 'reels') renderReels();
  if (currentView === 'friends') renderFriends();
  if (currentView === 'notifications') renderNotifications();
  if (currentView === 'profile') renderProfile();
  if (currentView === 'admin') renderAdmin();
}

function renderFeed() {
  const currentUser = getCurrentUser();
  if (!currentUser) return;

  const friends = getFriendsForUser(currentUser.id);
  const visibleUsers = new Set([currentUser.id, ...friends.map((f) => (f.userId === currentUser.id ? f.friendId : f.userId))]);

  const posts = state.posts.filter((post) => visibleUsers.has(post.userId));
  const sorted = [...posts].sort((a, b) => b.createdAt - a.createdAt);

  if (!sorted.length) {
    feedList.innerHTML = '<div class="card"><p>No posts yet. Add a new friend or publish something kind.</p></div>';
    return;
  }

  feedList.innerHTML = '';
  sorted.forEach((post) => {
    const author = getUserById(post.userId);
    if (!author) return;
    const card = document.getElementById('postTemplate').content.cloneNode(true);
    card.querySelector('[data-name]').textContent = author.displayName;
    card.querySelector('[data-meta]').textContent = `@${author.username} • ${formatTime(post.createdAt)}`;
    card.querySelector('[data-avatar]').textContent = author.avatar || author.displayName[0].toUpperCase();
    card.querySelector('[data-text]').textContent = post.body;
    const imageEl = card.querySelector('[data-image]');
    if (post.image) {
      imageEl.src = post.image;
      imageEl.classList.remove('hidden');
    }
    const likeBtn = card.querySelector('[data-like]');
    const liked = post.likes.includes(currentUser.id);
    likeBtn.textContent = liked ? '♥ Liked' : '♡ Like';
    likeBtn.addEventListener('click', () => toggleLike(post.id, 'post'));
    card.querySelector('[data-comment]').addEventListener('click', () => focusComment(post.id));
    card.querySelector('[data-save]').addEventListener('click', () => toggleSave(post.id));
    card.querySelector('[data-share]').addEventListener('click', () => shareItem(post.id, 'post'));
    card.querySelector('[data-report]').addEventListener('click', () => reportItem(post.id, 'post'));

    const commentList = card.querySelector('[data-comments]');
    commentList.innerHTML = (post.comments || []).map((comment) => {
      const commenter = getUserById(comment.userId);
      return `<div class="comment-item"><strong>${commenter ? commenter.displayName : 'Friend'}:</strong> ${comment.text}</div>`;
    }).join('');

    const form = card.querySelector('.comment-form');
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const input = form.querySelector('.comment-input');
      const value = input.value.trim();
      if (!value) return;
      addComment(post.id, value);
      input.value = '';
      renderFeed();
    });

    feedList.appendChild(card);
  });
}

function renderReels() {
  const currentUser = getCurrentUser();
  if (!currentUser) return;

  const friends = getFriendsForUser(currentUser.id);
  const visibleUsers = new Set([currentUser.id, ...friends.map((f) => (f.userId === currentUser.id ? f.friendId : f.userId))]);
  const reels = state.reels.filter((reel) => visibleUsers.has(reel.userId));
  if (!reels.length) {
    reelsList.innerHTML = '<div class="card"><p>No reels yet. Upload a short video from the Create page.</p></div>';
    return;
  }

  reelsList.innerHTML = '';
  reels.sort((a, b) => b.createdAt - a.createdAt).forEach((reel) => {
    const author = getUserById(reel.userId);
    if (!author) return;
    const card = document.getElementById('reelTemplate').content.cloneNode(true);
    card.querySelector('[data-name]').textContent = author.displayName;
    card.querySelector('[data-meta]').textContent = `@${author.username} • ${formatTime(reel.createdAt)}`;
    card.querySelector('[data-avatar]').textContent = author.avatar || author.displayName[0].toUpperCase();
    const video = card.querySelector('[data-video]');
    video.src = reel.video;
    card.querySelector('[data-caption]').textContent = reel.caption || reel.title;
    const likeBtn = card.querySelector('[data-like]');
    const liked = reel.likes.includes(currentUser.id);
    likeBtn.textContent = liked ? '♥ Liked' : '♡ Like';
    likeBtn.addEventListener('click', () => toggleLike(reel.id, 'reel'));
    card.querySelector('[data-comment]').addEventListener('click', () => alert('Commenting on reels is available in the full backend build.'));
    card.querySelector('[data-save]').addEventListener('click', () => toggleSave(reel.id, 'reel'));
    card.querySelector('[data-share]').addEventListener('click', () => shareItem(reel.id, 'reel'));
    reelsList.appendChild(card);
  });
}

function renderFriends() {
  const currentUser = getCurrentUser();
  if (!currentUser) return;

  const requests = state.friendRequests.filter((request) => request.toUserId === currentUser.id && request.status === 'pending');
  const friends = getFriendsForUser(currentUser.id);

  friendRequestsList.innerHTML = requests.length
    ? requests.map((request) => {
        const from = getUserById(request.fromUserId);
        return `
          <div class="friend-item">
            <div class="meta">
              <div class="avatar">${from ? from.avatar || from.displayName[0] : '?'}</div>
              <div>
                <strong>${from ? from.displayName : 'User'}</strong>
                <div class="hidden-line">@${from ? from.username : 'unknown'}</div>
              </div>
            </div>
            <div class="friend-actions">
              <button class="primary-button small" data-request-action="accept" data-request-id="${request.id}">Accept</button>
              <button class="ghost-button small" data-request-action="decline" data-request-id="${request.id}">Decline</button>
            </div>
          </div>
        `;
      }).join('')
    : '<div class="card"><p>No pending requests.</p></div>';

  friendsList.innerHTML = friends.length
    ? friends.map((friend) => {
        const user = getUserById(friend.userId === currentUser.id ? friend.friendId : friend.userId);
        return `
          <div class="friend-item">
            <div class="meta">
              <div class="avatar">${user ? user.avatar || user.displayName[0] : '?'}</div>
              <div>
                <strong>${user ? user.displayName : 'User'}</strong>
                <div class="hidden-line">@${user ? user.username : 'unknown'}</div>
              </div>
            </div>
            <div class="friend-actions">
              <button class="ghost-button small" data-remove-friend="${friend.id}">Remove</button>
            </div>
          </div>
        `;
      }).join('')
    : '<div class="card"><p>No approved friends yet.</p></div>';

  document.querySelectorAll('[data-request-action]').forEach((button) => {
    button.addEventListener('click', () => handleFriendRequest(button.dataset.requestId, button.dataset.requestAction));
  });
  document.querySelectorAll('[data-remove-friend]').forEach((button) => {
    button.addEventListener('click', () => removeFriend(button.dataset.removeFriend));
  });

  const search = friendSearchInput.value.trim();
  renderUserSearch(search, true);
}

function renderNotifications() {
  const currentUser = getCurrentUser();
  if (!currentUser) return;

  const notifications = state.notifications.filter((notif) => notif.userId === currentUser.id);
  notificationsList.innerHTML = notifications.length
    ? notifications.map((notification) => `
      <div class="notification-item">
        <div class="meta">
          <div class="avatar">!</div>
          <div>
            <strong>${notification.type}</strong>
            <div class="hidden-line">${notification.text}</div>
          </div>
        </div>
      </div>
    `).join('')
    : '<div class="card"><p>No notifications yet.</p></div>';
}

function renderProfile() {
  const currentUser = getCurrentUser();
  if (!currentUser) return;

  const friends = getFriendsForUser(currentUser.id).length;
  const userPosts = state.posts.filter((post) => post.userId === currentUser.id).length;
  const userReels = state.reels.filter((reel) => reel.userId === currentUser.id).length;

  profileContent.innerHTML = `
    <div class="card stack-card">
      <div class="profile-header">
        <div class="profile-cover">${currentUser.avatar || currentUser.displayName[0]}</div>
        <div>
          <h2>${currentUser.displayName}</h2>
          <p class="hidden-line">@${currentUser.username}</p>
          <p>${currentUser.bio || 'A safe social profile.'}</p>
          <div class="friend-actions">
            <button class="ghost-button" id="editProfileBtn">Edit profile</button>
            <button class="ghost-button" id="privacyToggleBtn">${currentUser.privateAccount ? 'Private' : 'Public'} account</button>
          </div>
        </div>
      </div>

      <div class="profile-stats">
        <div class="stat-box"><strong>${friends}</strong>Friends</div>
        <div class="stat-box"><strong>${userPosts}</strong>Posts</div>
        <div class="stat-box"><strong>${userReels}</strong>Reels</div>
        <div class="stat-box"><strong>${currentUser.age || 0}</strong>Age</div>
      </div>

      <div class="card">
        <h3>Guardian controls</h3>
        <ul>
          <li>Friend requests allowed: ${currentUser.privateAccount ? 'Yes' : 'Managed by parent'} </li>
          <li>Message permissions: Approve friends only</li>
          <li>Upload reels: ${currentUser.isParent ? 'Parent managed' : 'Moderated by default'}</li>
        </ul>
      </div>
    </div>
  `;

  document.getElementById('editProfileBtn').addEventListener('click', () => {
    const nextBio = prompt('Update bio:', currentUser.bio || '');
    if (nextBio !== null) {
      currentUser.bio = nextBio.trim();
      persistState();
      renderProfile();
    }
  });

  document.getElementById('privacyToggleBtn').addEventListener('click', () => {
    currentUser.privateAccount = !currentUser.privateAccount;
    persistState();
    renderProfile();
  });
}

function renderAdmin() {
  const currentUser = getCurrentUser();
  if (!currentUser || !currentUser.isAdmin) {
    adminContent.innerHTML = '<div class="card"><p>Unauthorized. Admin access required.</p></div>';
    return;
  }

  const pendingReports = state.reports.filter((report) => report.status === 'pending');
  adminContent.innerHTML = `
    <div class="row-split">
      <div class="card stack-card">
        <h3>Report queue</h3>
        ${pendingReports.length ? pendingReports.map((report) => `
          <div class="admin-item">
            <div class="meta">
              <div class="avatar">! </div>
              <div>
                <strong>${report.type}</strong>
                <div class="hidden-line">${report.targetType}</div>
              </div>
            </div>
            <div class="admin-actions">
              <button class="primary-button small" data-admin-action="resolve" data-report-id="${report.id}">Resolve</button>
            </div>
          </div>
        `).join('') : '<p>No pending reports.</p>'}
      </div>
      <div class="card stack-card">
        <h3>System stats</h3>
        <p>Users: ${state.users.length}</p>
        <p>Posts: ${state.posts.length}</p>
        <p>Reels: ${state.reels.length}</p>
        <p>Reports: ${state.reports.length}</p>
      </div>
    </div>
  `;

  document.querySelectorAll('[data-admin-action]').forEach((button) => {
    button.addEventListener('click', () => {
      resolveReport(button.dataset.reportId);
    });
  });
}

function renderUserSearch(term, friendsMode = false) {
  const results = searchUsersInput.value.trim() || friendSearchInput.value.trim();
  const currentUser = getCurrentUser();
  if (!currentUser) return;

  const matches = state.users.filter((user) => {
    if (user.id === currentUser.id) return false;
    if (!term) return false;
    const haystack = `${user.username} ${user.displayName}`.toLowerCase();
    return haystack.includes(term.toLowerCase());
  });

  const node = document.getElementById('searchResults');
  if (!node) return;

  node.innerHTML = matches.length
    ? matches.map((user) => {
        const requested = state.friendRequests.some((request) => request.fromUserId === currentUser.id && request.toUserId === user.id && request.status === 'pending');
        const isFriend = getFriendsForUser(currentUser.id).some((friend) => (friend.userId === currentUser.id ? friend.friendId : friend.userId) === user.id);
        return `
          <div class="user-pill">
            <div class="avatar">${user.avatar || user.displayName[0]}</div>
            <div>
              <strong>${user.displayName}</strong>
              <div class="hidden-line">@${user.username}</div>
            </div>
            <button class="primary-button small" data-add-friend="${user.id}" ${requested || isFriend ? 'disabled' : ''}>
              ${isFriend ? 'Friends' : requested ? 'Requested' : 'Add friend'}
            </button>
          </div>
        `;
      }).join('')
    : '<div class="card"><p>No matching users.</p></div>';

  document.querySelectorAll('[data-add-friend]').forEach((button) => {
    button.addEventListener('click', () => sendFriendRequest(button.dataset.addFriend));
  });
}

function getFriendsForUser(userId) {
  return state.friendships.filter((entry) => {
    return (entry.userId === userId || entry.friendId === userId) && entry.status === 'accepted';
  });
}

function addComment(postId, text) {
  const post = state.posts.find((p) => p.id === postId);
  if (!post) return;
  post.comments = post.comments || [];
  post.comments.push({ userId: state.currentUserId, text });
  persistState();
}

function toggleLike(itemId, type) {
  const collection = type === 'post' ? state.posts : state.reels;
  const item = collection.find((entry) => entry.id === itemId);
  if (!item) return;

  const idx = item.likes.indexOf(state.currentUserId);
  if (idx >= 0) {
    item.likes.splice(idx, 1);
  } else {
    item.likes.push(state.currentUserId);
  }

  persistState();
  renderScreen();
}

function toggleSave(itemId, type = 'post') {
  const exists = state.savedPosts.some((entry) => entry.id === itemId && entry.type === type);
  if (!exists) {
    state.savedPosts.push({ id: itemId, type });
  } else {
    state.savedPosts = state.savedPosts.filter((entry) => !(entry.id === itemId && entry.type === type));
  }
  persistState();
  renderScreen();
}

function shareItem(itemId, type) {
  const target = type === 'post' ? state.posts.find((p) => p.id === itemId) : state.reels.find((r) => r.id === itemId);
  const fromUser = getCurrentUser();
  const friends = getFriendsForUser(fromUser.id);
  friends.forEach((friend) => {
    const friendId = friend.userId === fromUser.id ? friend.friendId : friend.userId;
    state.notifications.push({
      id: `notif-${Date.now()}-${Math.random()}`,
      userId: friendId,
      type: 'share',
      text: `${fromUser.displayName} shared a ${type}`
    });
  });
  persistState();
  renderNotifications();
}

function reportItem(itemId, type) {
  const category = prompt('Report category: bullying, inappropriate content, spam, or other?', 'bullying');
  if (!category) return;
  state.reports.push({
    id: `report-${Date.now()}`,
    type: category,
    targetType: type,
    userId: state.currentUserId,
    status: 'pending'
  });
  persistState();
  renderAdmin();
}

function resolveReport(reportId) {
  const report = state.reports.find((entry) => entry.id === reportId);
  if (!report) return;
  report.status = 'resolved';
  persistState();
  renderAdmin();
}

function sendFriendRequest(userId) {
  const currentUser = getCurrentUser();
  if (!currentUser) return;

  const alreadyExists = state.friendRequests.some((request) => {
    return (request.fromUserId === currentUser.id && request.toUserId === userId) || (request.fromUserId === userId && request.toUserId === currentUser.id);
  });

  if (alreadyExists) {
    alert('You already have a request or friendship with this user.');
    return;
  }

  state.friendRequests.push({
    id: `request-${Date.now()}`,
    fromUserId: currentUser.id,
    toUserId: userId,
    status: 'pending'
  });

  state.notifications.push({
    id: `n-${Date.now()}`,
    userId: userId,
    type: 'friend_request',
    text: `${currentUser.displayName} sent you a friend request.`
  });

  persistState();
  renderFriends();
  renderNotifications();
}

function handleFriendRequest(requestId, action) {
  const request = state.friendRequests.find((entry) => entry.id === requestId);
  if (!request) return;

  if (action === 'accept') {
    request.status = 'accepted';
    state.friendships.push({
      id: `friend-${Date.now()}`,
      userId: request.fromUserId,
      friendId: request.toUserId,
      status: 'accepted'
    });

    state.notifications.push({
      id: `n-${Date.now()}`,
      userId: request.fromUserId,
      type: 'friend_request_accepted',
      text: `${getCurrentUser().displayName} accepted your friend request.`
    });
  } else {
    request.status = 'declined';
  }

  persistState();
  renderFriends();
  renderNotifications();
}

function removeFriend(friendshipId) {
  state.friendships = state.friendships.filter((entry) => entry.id !== friendshipId);
  persistState();
  renderFriends();
}

function formatTime(timestamp) {
  return new Date(timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

function focusComment(postId) {
  const post = state.posts.find((entry) => entry.id === postId);
  if (!post) return;
  alert('Comment composer is ready for the full backend release.');
}

function createDemoUserSession(username, password) {
  const found = state.users.find((user) => user.email.toLowerCase() === username.toLowerCase() || user.username.toLowerCase() === username.toLowerCase());
  if (!found) return null;
  if (found.password !== password) return null;
  state.currentUserId = found.id;
  persistState();
  renderAuthState();
  return found;
}

function handleLogin(event) {
  event.preventDefault();
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;
  const found = createDemoUserSession(email, password);
  if (!found) {
    alert('Unable to log in. Use the demo accounts listed on the page.');
    return;
  }
  renderAuthState();
}

function handleSignup(event) {
  event.preventDefault();
  const username = document.getElementById('signupUsername').value.trim();
  const displayName = document.getElementById('signupDisplayName').value.trim();
  const email = document.getElementById('signupEmail').value.trim();
  const dob = document.getElementById('signupDob').value;
  const password = document.getElementById('signupPassword').value;
  const privateAccount = document.getElementById('signupPrivate').checked;

  if (!username || !displayName || !email || !dob || !password) {
    alert('Please complete all fields.');
    return;
  }

  const exists = state.users.some((user) => user.email.toLowerCase() === email.toLowerCase() || user.username.toLowerCase() === username.toLowerCase());
  if (exists) {
    alert('An account with this email or username already exists.');
    return;
  }

  const newUser = {
    id: `user-${Date.now()}`,
    username,
    displayName,
    email,
    bio: 'New to Vibe',
    privateAccount,
    isAdmin: false,
    isParent: false,
    age: calculateAge(dob),
    dob,
    avatar: displayName[0].toUpperCase(),
    password
  };

  state.users.push(newUser);
  state.currentUserId = newUser.id;
  persistState();
  renderAuthState();
}

function calculateAge(dob) {
  const birth = new Date(dob);
  const now = new Date();
  let age = now.getFullYear() - birth.getFullYear();
  const monthDiff = now.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birth.getDate())) {
    age -= 1;
  }
  return age;
}

function handleCreatePost(event) {
  event.preventDefault();
  const text = document.getElementById('postText').value.trim();
  const image = document.getElementById('postImage').value.trim();
  if (!text && !image) {
    alert('Please add text or an image before publishing.');
    return;
  }

  state.posts.unshift({
    id: `p-${Date.now()}`,
    userId: state.currentUserId,
    body: text || 'Shared a new memory',
    image: image || '',
    likes: [],
    comments: [],
    createdAt: Date.now()
  });

  document.getElementById('postText').value = '';
  document.getElementById('postImage').value = '';
  persistState();
  state.ui.currentView = 'feed';
  renderNav();
  renderScreen();
}

function handleCreateReel(event) {
  event.preventDefault();
  const title = document.getElementById('reelTitle').value.trim();
  const video = document.getElementById('reelVideo').value.trim();
  const caption = document.getElementById('reelCaption').value.trim();
  if (!video) {
    alert('Please provide a video URL.');
    return;
  }

  state.reels.unshift({
    id: `r-${Date.now()}`,
    userId: state.currentUserId,
    title: title || 'New reel',
    caption: caption || 'A safe community reel',
    video,
    likes: [],
    comments: [],
    createdAt: Date.now()
  });

  document.getElementById('reelTitle').value = '';
  document.getElementById('reelVideo').value = '';
  document.getElementById('reelCaption').value = '';
  persistState();
  state.ui.currentView = 'reels';
  renderNav();
  renderScreen();
}

function attachAuthListeners() {
  document.getElementById('loginForm').addEventListener('submit', handleLogin);
  document.getElementById('signupForm').addEventListener('submit', handleSignup);

  document.querySelectorAll('[data-auth-view]').forEach((button) => {
    button.addEventListener('click', () => {
      const view = button.dataset.authView;
      document.querySelectorAll('.auth-form').forEach((form) => form.classList.add('hidden'));
      document.querySelectorAll('.toggle-button').forEach((toggle) => toggle.classList.remove('active'));
      button.classList.add('active');
      if (view === 'login') document.getElementById('loginForm').classList.remove('hidden');
      if (view === 'signup') document.getElementById('signupForm').classList.remove('hidden');
    });
  });

  document.getElementById('logoutBtnDesktop').addEventListener('click', () => {
    state.currentUserId = null;
    persistState();
    renderAuthState();
  });

  document.getElementById('themeToggle').addEventListener('click', () => {
    state.theme = state.theme === 'light' ? 'dark' : 'light';
    document.body.classList.toggle('dark', state.theme === 'dark');
    persistState();
  });

  document.getElementById('newPostFab').addEventListener('click', () => {
    state.ui.currentView = 'create';
    renderNav();
    renderScreen();
  });

  document.getElementById('notificationsBell').addEventListener('click', () => {
    state.ui.currentView = 'notifications';
    renderNav();
    renderScreen();
  });

  searchUsersInput.addEventListener('input', (event) => renderUserSearch(event.target.value));
  friendSearchInput.addEventListener('input', (event) => renderUserSearch(event.target.value));

  document.querySelectorAll('[data-nav]').forEach((button) => {
    button.addEventListener('click', () => {
      const view = button.dataset.nav;
      state.ui.currentView = view;
      renderNav();
      renderScreen();
    });
  });

  document.querySelectorAll('.segment-btn').forEach((button) => {
    button.addEventListener('click', () => {
      const type = button.dataset.createType;
      document.querySelectorAll('.segment-btn').forEach((node) => node.classList.remove('active'));
      button.classList.add('active');
      if (type === 'post') {
        createPostForm.classList.remove('hidden');
        createReelForm.classList.add('hidden');
      } else {
        createPostForm.classList.add('hidden');
        createReelForm.classList.remove('hidden');
      }
    });
  });

  document.getElementById('notificationsBell').addEventListener('click', () => {
    state.ui.currentView = 'notifications';
    renderNav();
    renderScreen();
  });

  createPostForm.addEventListener('submit', handleCreatePost);
  createReelForm.addEventListener('submit', handleCreateReel);
}

function boot() {
  loadState();
  initializeFirebase();
  document.body.classList.toggle('dark', state.theme === 'dark');
  renderAuthState();
  attachAuthListeners();
  renderNav();
  renderScreen();
}

boot();
