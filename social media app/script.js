import AuthService from './api/auth.js';

// Add auth check at the beginning
(function() {
    if (!AuthService.requireAuth()) return;
    
    // Store current page as return URL if not authenticated
    sessionStorage.setItem('returnUrl', window.location.pathname);
})();

// Add session check at the beginning
document.addEventListener('DOMContentLoaded', () => {
    checkAuthStatus();
    // Add better image error handling
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            this.classList.add('loading');
            // Try to reload image after error
            if (!this.dataset.retried) {
                this.dataset.retried = true;
                setTimeout(() => {
                    this.src = this.src;
                }, 1000);
            }
        });

        img.addEventListener('load', function() {
            this.classList.remove('loading');
        });
    });

    // Improve image loading with lazy load detection
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });

    // Add loading state while images are loading
    document.querySelectorAll('.post-image').forEach(img => {
        img.classList.add('loading');
        img.addEventListener('load', () => {
            img.classList.remove('loading');
        });
    });

    let cartCount = parseInt(localStorage.getItem('cartCount')) || 0;
    const cartCounter = document.getElementById('cart-count');
    cartCounter.textContent = cartCount;
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const likeButtons = document.querySelectorAll('.like-btn');

    // Cart functionality
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            cartCount++;
            localStorage.setItem('cartCount', cartCount);
            cartCounter.textContent = cartCount;
            button.textContent = 'Added to Cart';
            button.disabled = true;
            setTimeout(() => {
                button.textContent = 'Add to Cart';
                button.disabled = false;
            }, 2000);
        });
    });

    // Improve like functionality
    likeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const icon = button.querySelector('i');
            const likesCount = button.parentElement.querySelector('.likes-count');
            let likes = parseInt(likesCount.textContent) || 0;

            if (icon.classList.contains('far')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                icon.style.color = 'red';
                likes++;
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                icon.style.color = 'black';
                likes--;
            }
            likesCount.textContent = `${likes} likes`;
        });
    });

    // Check if images are loaded
    window.addEventListener('load', () => {
        document.querySelectorAll('.loading').forEach(el => {
            el.classList.remove('loading');
        });
    });

    // Add double-click like functionality
    document.querySelectorAll('.post-image').forEach(image => {
        image.addEventListener('dblclick', function() {
            const likeBtn = this.parentElement.querySelector('.like-btn i');
            if (likeBtn.classList.contains('far')) {
                likeBtn.click();
                showLikeAnimation(this);
            }
        });
    });

    // Like animation
    function showLikeAnimation(element) {
        const heart = document.createElement('i');
        heart.classList.add('fas', 'fa-heart', 'like-animation');
        element.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 1000);
    }

    // Comment functionality
    document.querySelectorAll('.add-comment').forEach(commentSection => {
        const input = commentSection.querySelector('input');
        const button = commentSection.querySelector('button');
        
        button.addEventListener('click', () => {
            if (input.value.trim()) {
                addComment(commentSection, input.value);
                input.value = '';
            }
        });
    });

    function addComment(section, text) {
        const comments = section.previousElementSibling;
        const comment = document.createElement('div');
        comment.classList.add('comment');
        comment.innerHTML = `
            <span class="username">your_username</span>
            <span class="comment-text">${text}</span>
        `;
        comments.appendChild(comment);
    }

    // Story hover effect
    document.querySelectorAll('.story').forEach(story => {
        story.addEventListener('mouseenter', () => {
            story.style.transform = 'scale(1.05)';
        });
        
        story.addEventListener('mouseleave', () => {
            story.style.transform = 'scale(1)';
        });
    });

    // Enhanced button feedback
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = `${size}px`;
            
            ripple.style.left = `${e.clientX - rect.left - size/2}px`;
            ripple.style.top = `${e.clientY - rect.top - size/2}px`;
            
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Improve comment input
    document.querySelectorAll('.add-comment input').forEach(input => {
        const button = input.nextElementSibling;
        
        input.addEventListener('input', () => {
            button.style.opacity = input.value.trim() ? '1' : '0.5';
            button.disabled = !input.value.trim();
        });

        // Add enter key support
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && input.value.trim()) {
                e.preventDefault();
                button.click();
            }
        });
    });

    // Enhanced story interaction
    document.querySelectorAll('.story').forEach(story => {
        story.addEventListener('click', () => {
            story.style.transform = 'scale(0.95)';
            setTimeout(() => {
                story.style.transform = 'scale(1)';
            }, 100);
        });
    });

    // Smooth follow button interaction
    document.querySelectorAll('.follow-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const isFollowing = this.textContent === 'Following';
            
            if (isFollowing) {
                this.textContent = 'Follow';
                this.style.backgroundColor = '';
            } else {
                this.textContent = 'Following';
                this.style.backgroundColor = '#e8f0fe';
            }
        });

        // Show unfollow on hover when following
        btn.addEventListener('mouseover', function() {
            if (this.textContent === 'Following') {
                this.textContent = 'Unfollow';
                this.style.color = '#ed4956';
            }
        });

        btn.addEventListener('mouseout', function() {
            if (this.textContent === 'Unfollow') {
                this.textContent = 'Following';
                this.style.color = '';
            }
        });
    });

    // Add smooth scroll for stories
    const storiesContainer = document.querySelector('.stories');
    let isScrolling = false;
    let startX;
    let scrollLeft;

    storiesContainer.addEventListener('mousedown', (e) => {
        isScrolling = true;
        startX = e.pageX - storiesContainer.offsetLeft;
        scrollLeft = storiesContainer.scrollLeft;
    });

    storiesContainer.addEventListener('mouseleave', () => {
        isScrolling = false;
    });

    storiesContainer.addEventListener('mouseup', () => {
        isScrolling = false;
    });

    storiesContainer.addEventListener('mousemove', (e) => {
        if (!isScrolling) return;
        e.preventDefault();
        const x = e.pageX - storiesContainer.offsetLeft;
        const walk = (x - startX) * 2;
        storiesContainer.scrollLeft = scrollLeft - walk;
    });

    // Enhance stories scrolling
    const stories = document.querySelector('.stories');
    
    // Touch scrolling
    stories.addEventListener('touchstart', (e) => {
        isScrolling = true;
        startX = e.touches[0].pageX - stories.offsetLeft;
        scrollLeft = stories.scrollLeft;
    });

    stories.addEventListener('touchmove', (e) => {
        if (!isScrolling) return;
        e.preventDefault();
        const x = e.touches[0].pageX - stories.offsetLeft;
        const walk = (x - startX) * 2;
        stories.scrollLeft = scrollLeft - walk;
    });

    stories.addEventListener('touchend', () => {
        isScrolling = false;
    });

    // Mouse scrolling
    stories.addEventListener('wheel', (e) => {
        e.preventDefault();
        stories.scrollLeft += e.deltaY;
    });

    // Keyboard navigation
    stories.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            stories.scrollLeft -= 100;
        } else if (e.key === 'ArrowRight') {
            stories.scrollLeft += 100;
        }
    });

    // Follow button functionality
    document.querySelectorAll('.follow-btn').forEach(btn => {
        btn.addEventListener('click', async function() {
            const username = this.closest('.suggestion-item')?.querySelector('.username')?.textContent;
            if (!username) return;

            try {
                if (this.classList.contains('following')) {
                    const response = await AuthService.unfollowUser(username);
                    if (response.success) {
                        this.textContent = 'Follow';
                        this.classList.remove('following');
                        this.style.backgroundColor = '#0095f6';
                        this.style.color = 'white';
                        updateFollowStats();
                    }
                } else {
                    const response = await AuthService.followUser(username);
                    if (response.success) {
                        this.textContent = 'Following';
                        this.classList.add('following');
                        this.style.backgroundColor = '#efefef';
                        this.style.color = '#262626';
                        updateFollowStats();
                    }
                }
            } catch (error) {
                console.error('Follow action failed:', error);
                showError('Failed to update follow status');
            }
        });
    });

    // Update follow stats in UI
    function updateFollowStats() {
        const stats = AuthService.getFollowStats();
        const followersCount = document.querySelector('.followers-count');
        const followingCount = document.querySelector('.following-count');
        
        if (followersCount) followersCount.textContent = stats.followers;
        if (followingCount) followingCount.textContent = stats.following;
    }

    // Initialize follow stats
    document.addEventListener('DOMContentLoaded', () => {
        updateFollowStats();
    });

    // Like button functionality
    document.querySelectorAll('.like-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const icon = this.querySelector('i');
            const likesCount = this.closest('.post').querySelector('.likes-count');
            const currentLikes = parseInt(likesCount.textContent);

            if (icon.classList.contains('far')) {
                icon.classList.replace('far', 'fas');
                icon.style.color = '#ed4956';
                likesCount.textContent = `${currentLikes + 1} likes`;
            } else {
                icon.classList.replace('fas', 'far');
                icon.style.color = '#262626';
                likesCount.textContent = `${currentLikes - 1} likes`;
            }
        });
    });

    // Comment button functionality
    document.querySelectorAll('.comment-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const post = this.closest('.post');
            const commentInput = post.querySelector('.add-comment input');
            commentInput.focus();
        });
    });

    // Share button functionality
    document.querySelectorAll('.share-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const url = window.location.href;
            if (navigator.share) {
                navigator.share({
                    title: 'Check out this post!',
                    url: url
                }).catch(console.error);
            } else {
                // Fallback
                const dummy = document.createElement('input');
                document.body.appendChild(dummy);
                dummy.value = url;
                dummy.select();
                document.execCommand('copy');
                document.body.removeChild(dummy);

                // Show feedback
                const feedback = document.createElement('div');
                feedback.className = 'share-feedback';
                feedback.textContent = 'Link copied!';
                this.appendChild(feedback);
                setTimeout(() => feedback.remove(), 2000);
            }
        });
    });

    // Save button functionality
    document.querySelectorAll('.save-btn').forEach(btn => {
        btn.addEventListener('click', async function() {
            const icon = this.querySelector('i');
            const post = this.closest('.post');
            
            try {
                if (icon.classList.contains('far')) {
                    // Save post
                    const postData = {
                        id: post.dataset.postId || Date.now(),
                        image: post.querySelector('.post-image').src,
                        caption: post.querySelector('.post-caption')?.textContent || '',
                        username: post.querySelector('.post-user .username').textContent,
                        likes: post.querySelector('.likes-count').textContent
                    };

                    await AuthService.saveItem(postData);
                    
                    icon.classList.replace('far', 'fas');
                    this.setAttribute('title', 'Remove from saved');
                    
                    // Show success feedback
                    const feedback = document.createElement('div');
                    feedback.className = 'save-feedback';
                    feedback.textContent = 'Post saved!';
                    this.appendChild(feedback);
                    setTimeout(() => feedback.remove(), 2000);
                } else {
                    // Remove from saved
                    icon.classList.replace('fas', 'far');
                    this.setAttribute('title', 'Save post');
                    
                    // Show feedback
                    const feedback = document.createElement('div');
                    feedback.className = 'save-feedback';
                    feedback.textContent = 'Post removed from saved';
                    this.appendChild(feedback);
                    setTimeout(() => feedback.remove(), 2000);
                }
            } catch (error) {
                console.error('Save failed:', error);
                // Show error feedback
                const feedback = document.createElement('div');
                feedback.className = 'save-feedback error';
                feedback.textContent = 'Save failed';
                this.appendChild(feedback);
                setTimeout(() => feedback.remove(), 2000);
            }
        });
    });

    // Comment posting functionality
    document.querySelectorAll('.add-comment').forEach(commentBox => {
        const input = commentBox.querySelector('input');
        const button = commentBox.querySelector('button');

        button.addEventListener('click', () => addComment(input));
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') addComment(input);
        });

        function addComment(input) {
            const text = input.value.trim();
            if (!text) return;

            const comments = commentBox.closest('.post').querySelector('.post-comments');
            const newComment = document.createElement('div');
            newComment.className = 'comment';
            newComment.innerHTML = `
                <span class="username">${getUsernameFromSession()}</span>
                <span class="comment-text">${text}</span>
            `;
            comments.appendChild(newComment);
            input.value = '';
        }
    });

    // Helper function to get username
    function getUsernameFromSession() {
        const session = JSON.parse(localStorage.getItem('userSession'));
        return session ? session.username : 'user';
    }

    // Profile navigation
    document.querySelector('.profile-pic').addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = 'profile.html';
    });

    // Settings navigation
    document.querySelector('.dropdown-content a:nth-child(2)').addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = 'settings.html';
    });

    // Logout handler
    document.querySelector('.dropdown-content a:last-child').addEventListener('click', (e) => {
        e.preventDefault();
        AuthService.logout();
    });

    // Add navigation handlers
    const nav = {
        home: document.querySelector('.nav-items a:nth-child(1)'),
        messages: document.querySelector('.nav-items a:nth-child(2)'),
        explore: document.querySelector('.nav-items a:nth-child(3)'),
        notifications: document.querySelector('.nav-items a:nth-child(4)')
    };

    // Home navigation
    nav.home.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = 'index.html';
    });

    // Messages navigation
    nav.messages.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = 'messages.html';
    });

    // Explore navigation
    nav.explore.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = 'explore.html';
    });

    // Notifications navigation
    nav.notifications.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = 'notifications.html';
    });
});

// Add profile and settings navigation
document.addEventListener('DOMContentLoaded', () => {
    const profileLink = document.querySelector('.dropdown-content a[href="#"]');
    const settingsLink = document.querySelector('.dropdown-content a:nth-child(2)');

    // Profile link handler
    profileLink.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = 'profile.html';
    });

    // Settings link handler
    settingsLink.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = 'settings.html';
    });
});

// Profile dropdown functionality
document.addEventListener('DOMContentLoaded', () => {
    const profileTrigger = document.getElementById('profileTrigger');
    const profileDropdown = document.getElementById('profileDropdown');
    let isDropdownOpen = false;

    if (profileTrigger && profileDropdown) {
        // Initialize user info
        const userSession = JSON.parse(localStorage.getItem('userSession') || '{}');
        if (userSession.username) {
            profileDropdown.querySelector('.username').textContent = userSession.username;
            profileDropdown.querySelector('.email').textContent = userSession.email || 'user@example.com';
        }

        // Toggle dropdown
        profileTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleDropdown();
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (isDropdownOpen && !profileDropdown.contains(e.target)) {
                closeDropdown();
            }
        });

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && isDropdownOpen) {
                closeDropdown();
            }
        });

        // Handle dropdown items
        profileDropdown.querySelectorAll('.dropdown-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const href = item.getAttribute('href');
                if (item.classList.contains('logout-btn')) {
                    handleLogout();
                } else if (href) {
                    window.location.href = href;
                }
                
                closeDropdown();
            });
        });

        function toggleDropdown() {
            isDropdownOpen = !isDropdownOpen;
            profileTrigger.classList.toggle('active', isDropdownOpen);
            profileDropdown.classList.toggle('show', isDropdownOpen);
            document.body.classList.toggle('dropdown-open', isDropdownOpen);
        }

        function closeDropdown() {
            isDropdownOpen = false;
            profileTrigger.classList.remove('active');
            profileDropdown.classList.remove('show');
            document.body.classList.remove('dropdown-open');
        }

        function handleLogout() {
            localStorage.removeItem('userSession');
            window.location.href = 'login.html';
        }

        // Handle mobile back button
        window.addEventListener('popstate', closeDropdown);

        // Prevent scroll when dropdown is open on mobile
        document.addEventListener('touchmove', (e) => {
            if (document.body.classList.contains('dropdown-open')) {
                e.preventDefault();
            }
        }, { passive: false });
    }
});
