var host = window.location.hostname;
var isDev = host === 'localhost' || host === '127.0.0.1';
var params = new URLSearchParams(window.location.search);
var modulesParam = params.get('modules');
var activeModules = modulesParam
    ? modulesParam.split(',')
    : ['blue', 'red', 'violet', 'silver'];

var API = {
    blue: isDev ? 'http://localhost:5073' : 'https://' + host + '/api',
    red: isDev ? 'http://localhost:5074' : 'https://' + host + '/api',
    violet: isDev ? 'http://localhost:5075' : 'https://' + host + '/api',
    silver: isDev ? 'http://localhost:5076' : 'https://' + host + '/api'
};

function filterModules() {
    var allTabs = ['blue', 'red', 'violet', 'silver'];
    allTabs.forEach(function(mod) {
        var tab = document.querySelector('[data-tab="' + mod + '"]');
        var panel = document.getElementById('panel-' + mod);
        if (activeModules.indexOf(mod) === -1) {
            if (tab) tab.style.display = 'none';
            if (panel) panel.style.display = 'none';
        }
    });

    var agentSelect = document.getElementById('chat-agent');
    if (agentSelect) {
        var options = agentSelect.querySelectorAll('option');
        options.forEach(function(opt) {
            var agentModule = opt.value;
            if (activeModules.indexOf(agentModule) === -1) {
                opt.style.display = 'none';
            } else {
                opt.style.display = '';
            }
        });
        var firstVisible = agentSelect.querySelector('option:not([style*="display: none"])');
        if (firstVisible) {
            agentSelect.value = firstVisible.value;
            changeAgent();
        }
    }

    var quickButtons = document.querySelectorAll('.chat-quick button');
    var agentCommands = {
        scan: 'red',
        exploit: 'red',
        report: 'blue',
        lab: 'violet'
    };
    quickButtons.forEach(function(btn) {
        var cmd = btn.textContent.replace('_', '').toLowerCase();
        var agent = agentCommands[cmd];
        if (agent && activeModules.indexOf(agent) === -1) {
            btn.style.display = 'none';
        } else {
            btn.style.display = '';
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    filterModules();
});

var api = {
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