document.addEventListener("DOMContentLoaded", () => {
    loadNotifications();
});

function loadNotifications() {
    const notificationList = document.getElementById("notificationList");
    const notifications = JSON.parse(localStorage.getItem("notifications")) || [];

    notificationList.innerHTML = ""; // Clear previous notifications

    notifications.forEach((notif, index) => {
        const li = document.createElement("li");
        li.classList.add("notification");
        if (notif.unread) {
            li.classList.add("unread");
        }
        li.innerHTML = `
            ${notif.message}
            <button onclick="markAsRead(${index})">✓</button>
        `;
        notificationList.appendChild(li);
    });
}

function markAsRead(index) {
    const notifications = JSON.parse(localStorage.getItem("notifications")) || [];
    notifications[index].unread = false;
    localStorage.setItem("notifications", JSON.stringify(notifications));
    loadNotifications();
}

function markAllRead() {
    const notifications = JSON.parse(localStorage.getItem("notifications")) || [];
    notifications.forEach(notif => notif.unread = false);
    localStorage.setItem("notifications", JSON.stringify(notifications));
    loadNotifications();
}
