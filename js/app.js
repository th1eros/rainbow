const API = {
    blue: window.__API_BLUE__ || 'http://localhost:5073',
    red: window.__API_RED__ || 'http://localhost:5074',
    violet: window.__API_VIOLET__ || 'http://localhost:5075',
    silver: window.__API_SILVER__ || 'http://localhost:5076'
};

const api = {
    token: function() {
        return localStorage.getItem('abitat_token');
    },
    headers: function() {
        return {
            'Authorization': 'Bearer ' + (api.token() || ''),
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        };
    },
    save: function(service, type, id, data) {
        return fetch(API[service] + '/api/' + type + (id ? '/' + id : ''), {
            method: id ? 'PUT' : 'POST',
            headers: api.headers(),
            body: JSON.stringify(data)
        }).then(function(r) {
            if (!r.ok) {
                throw new Error('HTTP ' + r.status);
            }
            return r.json();
        });
    },
    del: function(service, type, id) {
        return fetch(API[service] + '/api/' + type + '/' + id, {
            method: 'DELETE',
            headers: api.headers()
        }).then(function(r) {
            if (!r.ok) {
                throw new Error('HTTP ' + r.status);
            }
        });
    },
    get: function(service, type, id) {
        return fetch(API[service] + '/api/' + type + (id ? '/' + id : ''), {
            headers: api.headers()
        }).then(function(r) {
            if (!r.ok) {
                throw new Error('HTTP ' + r.status);
            }
            return r.json();
        });
    }
};

document.body.addEventListener('htmx:configRequest', function(e) {
    if (api.token()) {
        e.detail.headers['Authorization'] = 'Bearer ' + api.token();
    }
    e.detail.headers['X-Requested-With'] = 'XMLHttpRequest';
});

document.body.addEventListener('htmx:afterRequest', function(e) {
    var p = e.detail.pathInfo.requestPath;
    var ct = e.detail.xhr.getResponseHeader('Content-Type') || '';

    if (ct.indexOf('application/json') === -1) {
        return;
    }

    try {
        var d = JSON.parse(e.detail.xhr.responseText);
        if (p.indexOf('/api/auth/authorize') !== -1 && d.success && d.data && d.data.requires2FA) {
            if (typeof render2FA === 'function') {
                render2FA(d.data.username || 'admin');
            }
        }
        if (p.indexOf('/api/auth/verify-2fa') !== -1 && d.success && d.data && d.data.token) {
            localStorage.setItem('abitat_token', d.data.token);
            if (typeof showDashboard === 'function') {
                showDashboard();
            }
        }
        if (p.indexOf('/api/auth/register') !== -1 && d.success) {
            if (typeof renderLogin === 'function') {
                renderLogin();
            }
        }
    } catch (ex) {
        return;
    }
});

document.body.addEventListener('htmx:responseError', function(e) {
    if (e.detail.xhr.status === 401) {
        logout();
    }
});

function logout() {
    localStorage.removeItem('abitat_token');
    if (typeof updateHeaderVisibility === 'function') {
        updateHeaderVisibility();
    }
    if (typeof closeChat === 'function') {
        closeChat();
    }
    if (typeof lockScroll === 'function') {
        lockScroll(true);
    }
    if (typeof renderLogin === 'function') {
        renderLogin();
    }
}