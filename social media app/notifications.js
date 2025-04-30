document.addEventListener('DOMContentLoaded', () => {
    // Set active state for notifications nav item
    const notificationsNavItem = document.querySelector('.nav-link[data-action="notifications"]');
    if (notificationsNavItem) {
        document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
        notificationsNavItem.classList.add('active');
    }

    // Load notifications
    loadNotifications();
});

function loadNotifications() {
    const todayList = document.querySelector('.notifications-section:first-child .notification-list');
    const weekList = document.querySelector('.notifications-section:last-child .notification-list');

    // Example notifications - replace with actual data loading
    const today = [
        {
            user: 'user_1',
            action: 'liked your post',
            time: '2h ago',
            avatar: 'https://picsum.photos/32/32?1'
        },
        {
            user: 'user_2',
            action: 'started following you',
            time: '4h ago',
            avatar: 'https://picsum.photos/32/32?2'
        }
    ];

    const thisWeek = [
        {
            user: 'user_3',
            action: 'commented on your post',
            time: '2d ago',
            avatar: 'https://picsum.photos/32/32?3'
        }
    ];

    todayList.innerHTML = createNotificationItems(today);
    weekList.innerHTML = createNotificationItems(thisWeek);
}

function createNotificationItems(notifications) {
    return notifications.map(notification => `
        <div class="notification-item">
            <img src="${notification.avatar}" alt="${notification.user}">
            <div class="notification-content">
                <span class="username">${notification.user}</span>
                <span class="action">${notification.action}</span>
                <span class="time">${notification.time}</span>
            </div>
        </div>
    `).join('');
}
