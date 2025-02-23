// Check Offline Support Status
function checkOfflineSupport() {
    if (!navigator.onLine) {
        alert("⚠️ You are offline. Saved posts will sync when you reconnect.");
    } else {
        alert("✅ You are online and all posts are up to date.");
    }
}

// Show Offline Notification
function updateOnlineStatus() {
    let offlineNotification = document.getElementById("offline-notification");
    if (!navigator.onLine) {
        offlineNotification.style.display = "block";
    } else {
        offlineNotification.style.display = "none";
        syncOfflinePosts();
    }
}

// Add New Forum Post
function addPost() {
    let title = document.getElementById("post-title").value;
    let content = document.getElementById("post-content").value;

    if (!title || !content) {
        alert("Please enter both title and content.");
        return;
    }

    let post = { title, content, timestamp: new Date().toISOString() };

    if (!navigator.onLine) {
        // Save post locally if offline
        let offlinePosts = JSON.parse(localStorage.getItem("offlinePosts")) || [];
        offlinePosts.push(post);
        localStorage.setItem("offlinePosts", JSON.stringify(offlinePosts));
        alert("⚠️ Post saved offline and will sync when online.");
    } else {
        // Add Post to UI
        displayPost(post);
    }

    // Clear Input Fields
    document.getElementById("post-title").value = "";
    document.getElementById("post-content").value = "";
}

// Display Post on UI
function displayPost(post) {
    let postHTML = `
        <div class="post">
            <h3>${post.title}</h3>
            <p>${post.content}</p>
            <button class="like-btn" onclick="likePost(this)">👍 Like <span>0</span></button>
        </div>
    `;

    document.getElementById("posts-container").innerHTML += postHTML;
}

// Sync Offline Posts When Back Online
function syncOfflinePosts() {
    let offlinePosts = JSON.parse(localStorage.getItem("offlinePosts")) || [];
    if (offlinePosts.length > 0) {
        alert(`✅ Syncing ${offlinePosts.length} offline posts now...`);
        offlinePosts.forEach(post => displayPost(post));
        localStorage.removeItem("offlinePosts"); // Clear synced posts
    }
}

// Like Post Functionality
function likePost(button) {
    let likeCount = button.querySelector("span");
    likeCount.innerText = parseInt(likeCount.innerText) + 1;
}

// Forum Search Functionality
function searchForum() {
    let query = document.getElementById("search").value.toLowerCase();
    let posts = document.querySelectorAll(".post");

    posts.forEach(post => {
        let text = post.innerText.toLowerCase();
        post.style.display = text.includes(query) ? "block" : "none";
    });
}

// Event Listener for Network Changes
window.addEventListener("online", updateOnlineStatus);
window.addEventListener("offline", updateOnlineStatus);

// Load Offline Posts on Page Load
window.onload = function () {
    updateOnlineStatus();
    syncOfflinePosts();
};


// Dark Mode Toggle
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

