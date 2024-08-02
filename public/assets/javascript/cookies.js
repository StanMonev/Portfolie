function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

// Cookie management functions
function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function eraseCookie(name) {
    document.cookie = name + '=; Max-Age=-99999999;';
}

// Generate or get session ID
function getSessionId() {
    let sessionId = getCookie('session_id');
    if (!sessionId) {
        sessionId = generateUUID();
        setCookie('session_id', sessionId, 365); // Set a long expiration for the session ID cookie
    }
    return sessionId;
}

function allowAnalytics() {
    return getCookie('analyticsCookies') === 'true';
}

function allowFunctional() {
    return getCookie('functionalCookies') === 'true';
}

// Load cookies and send analytics data if allowed
function loadCookies() {
    if (allowFunctional()) {
        // Load functional cookies here if needed
    }
    if (allowAnalytics()) {
        sendAnalyticsData();
    }
}
  