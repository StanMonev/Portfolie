/**
 * cookie.js
 *
 * This file contains utility functions for managing browser cookies and session IDs. 
 * It includes functions for setting, getting, and erasing cookies, as well as generating 
 * a unique session ID and managing user consent for analytics and functional cookies.
 *
 * Key functionalities:
 * - Generate and manage unique session IDs via cookies.
 * - Set, retrieve, and erase cookies.
 * - Check user consent for analytics and functional cookies.
 * - Load cookies and trigger analytics data sending if allowed.
 *
 * These functions help manage user sessions and cookie preferences, ensuring that the 
 * application respects user choices and handles cookies securely.
 */

/**
 * Generates a UUID (Universally Unique Identifier) to be used as a session ID.
 * 
 * @returns {string} - A UUID string in the format 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.
 */
function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

/**
 * Sets a cookie in the browser.
 * 
 * @param {string} name - The name of the cookie.
 * @param {string} value - The value to store in the cookie.
 * @param {number} [days] - The number of days until the cookie expires. If not provided, the cookie will be a session cookie.
 */
function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

/**
 * Retrieves the value of a specific cookie by name.
 * 
 * @param {string} name - The name of the cookie to retrieve.
 * @returns {string|null} - The value of the cookie, or null if the cookie does not exist.
 */
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

/**
 * Erases a specific cookie by name.
 * 
 * @param {string} name - The name of the cookie to erase.
 */
function eraseCookie(name) {
    document.cookie = name + '=; Max-Age=-99999999;';
}

/**
 * Generates or retrieves the session ID stored in cookies. If no session ID exists, it generates a new one.
 * 
 * @returns {string} - The session ID.
 */
function getSessionId() {
    let sessionId = getCookie('session_id');
    if (!sessionId) {
        sessionId = generateUUID();
        setCookie('session_id', sessionId, 365); // Set a long expiration for the session ID cookie
    }
    return sessionId;
}

/**
 * Checks if the user has allowed analytics cookies.
 * 
 * @returns {boolean} - True if analytics cookies are allowed, otherwise false.
 */
function allowAnalytics() {
    return getCookie('analyticsCookies') === 'true';
}

/**
 * Checks if the user has allowed functional cookies.
 * 
 * @returns {boolean} - True if functional cookies are allowed, otherwise false.
 */
function allowFunctional() {
    return getCookie('functionalCookies') === 'true';
}

/**
 * Loads the cookies and sends analytics data if the user has allowed analytics cookies.
 */
function loadCookies() {
    if (allowAnalytics()) {
        sendAnalyticsData();
    }
}
