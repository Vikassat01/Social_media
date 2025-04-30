document.addEventListener('DOMContentLoaded', () => {
    // Set active state for messages nav item
    const messagesNavItem = document.querySelector('.nav-link[data-action="messages"]');
    if (messagesNavItem) {
        document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
        messagesNavItem.classList.add('active');
    }

    // Initialize messages list
    loadMessageThreads();
});

function loadMessageThreads() {
    const messagesList = document.querySelector('.messages-list');
    const dummyThreads = [
        {
            username: 'user_1',
            lastMessage: 'Hey! How are you?',
            avatar: 'https://picsum.photos/32/32?1'
        },
        {
            username: 'user_2',
            lastMessage: 'That\'s great!',
            avatar: 'https://picsum.photos/32/32?2'
        }
    ];

    messagesList.innerHTML = dummyThreads.map(thread => `
        <div class="message-thread">
            <img src="${thread.avatar}" alt="${thread.username}">
            <div class="thread-info">
                <span class="username">${thread.username}</span>
                <span class="last-message">${thread.lastMessage}</span>
            </div>
        </div>
    `).join('');
}
