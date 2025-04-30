import config from './config.js';

class AuthService {
    async login(username, password) {
        try {
            const response = await fetch(`${config.apiUrl}${config.endpoints.login}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error('Network error: ' + error.message);
        }
    }

    async signup(email, fullname, username, password) {
        try {
            const user = {
                email,
                fullname,
                username,
                isLoggedIn: true,
                timestamp: new Date().getTime()
            };
            localStorage.setItem('userSession', JSON.stringify(user));
            return { success: true, user };
        } catch (error) {
            throw new Error('Signup failed: ' + error.message);
        }
    }

    isAuthenticated() {
        const session = localStorage.getItem('userSession');
        return session && JSON.parse(session).isLoggedIn;
    }

    requireAuth(redirectPath = 'login.html') {
        if (!this.isAuthenticated()) {
            window.location.href = redirectPath;
            return false;
        }
        return true;
    }

    logout() {
        localStorage.removeItem('userSession');
        window.location.href = 'login.html';
    }

    async saveItem(item) {
        try {
            // Save to localStorage for now (can be replaced with API call)
            const savedItems = JSON.parse(localStorage.getItem('savedItems') || '[]');
            savedItems.push({
                ...item,
                savedAt: new Date().getTime()
            });
            localStorage.setItem('savedItems', JSON.stringify(savedItems));
            return { success: true };
        } catch (error) {
            throw new Error('Save failed: ' + error.message);
        }
    }

    async getSavedItems() {
        try {
            const savedItems = JSON.parse(localStorage.getItem('savedItems') || '[]');
            return savedItems;
        } catch (error) {
            throw new Error('Failed to get saved items: ' + error.message);
        }
    }

    async followUser(username) {
        try {
            const following = JSON.parse(localStorage.getItem('following') || '[]');
            if (!following.includes(username)) {
                following.push(username);
                localStorage.setItem('following', JSON.stringify(following));
                return { success: true, action: 'followed' };
            }
            return { success: false, message: 'Already following' };
        } catch (error) {
            throw new Error('Follow failed: ' + error.message);
        }
    }

    async unfollowUser(username) {
        try {
            const following = JSON.parse(localStorage.getItem('following') || '[]');
            const index = following.indexOf(username);
            if (index > -1) {
                following.splice(index, 1);
                localStorage.setItem('following', JSON.stringify(following));
                return { success: true, action: 'unfollowed' };
            }
            return { success: false, message: 'Not following' };
        } catch (error) {
            throw new Error('Unfollow failed: ' + error.message);
        }
    }

    getFollowStats() {
        const following = JSON.parse(localStorage.getItem('following') || '[]');
        const followers = JSON.parse(localStorage.getItem('followers') || '[]');
        return {
            following: following.length,
            followers: followers.length
        };
    }

    async togglePostAction(postId, action) {
        try {
            const actions = JSON.parse(localStorage.getItem(`${action}s`) || '[]');
            const index = actions.indexOf(postId);
            
            if (index > -1) {
                actions.splice(index, 1);
                localStorage.setItem(`${action}s`, JSON.stringify(actions));
                return { success: true, action: 'removed' };
            } else {
                actions.push(postId);
                localStorage.setItem(`${action}s`, JSON.stringify(actions));
                return { success: true, action: 'added' };
            }
        } catch (error) {
            throw new Error(`${action} action failed: ${error.message}`);
        }
    }

    getActionStatus(postId, action) {
        const actions = JSON.parse(localStorage.getItem(`${action}s`) || '[]');
        return actions.includes(postId);
    }

    saveRecentPage(pageData) {
        try {
            const recentPages = JSON.parse(localStorage.getItem('recentPages') || '[]');
            // Remove duplicate if exists
            const filtered = recentPages.filter(p => p.url !== pageData.url);
            // Add new page at the beginning
            filtered.unshift({
                ...pageData,
                timestamp: new Date().getTime()
            });
            // Keep only last 10 pages
            const updated = filtered.slice(0, 10);
            localStorage.setItem('recentPages', JSON.stringify(updated));
            return { success: true };
        } catch (error) {
            throw new Error('Failed to save recent page: ' + error.message);
        }
    }

    getRecentPages() {
        return JSON.parse(localStorage.getItem('recentPages') || '[]');
    }
}

export default new AuthService();
