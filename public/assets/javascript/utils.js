/**
 * utils.js
 *
 * This script contains utility functions used across the application for processing and formatting text.
 * These functions assist with splitting titles, formatting lists, and generating HTML for skills and interests.
 *
 * Key functionalities:
 * - Splitting titles into main and subtitle components.
 * - Formatting multiline text into HTML list items.
 * - Combining skills and interests into a single HTML formatted list.
 */

/**
 * Splits a title string into a main title and a subtitle. The title is expected to contain 
 * a '|' character separating the main title from the subtitle.
 * 
 * @param {string} title - The title string to split (e.g., "Main Title | Subtitle").
 * @returns {Array} - An array where the first element is the main title and the second is the subtitle.
 */
function splitTitle(title) {
    const parts = title.split('|');
    const mainTitle = parts[0];
    const subTitle = parts.length > 1 ? ' ' + parts[1].trim() : '';
    return [mainTitle, subTitle];
}

/**
 * Formats a multiline string into an HTML unordered list. Each line in the input string becomes a list item.
 * 
 * @param {string} text - The multiline text string to format (each line should represent a list item).
 * @returns {string} - An HTML string containing the list items wrapped in <li> tags.
 */
function formatList(text) {
    return text.split('\n').map(item => `<li>${item.trim()}</li>`).join('');
}

/**
 * Formats skills and interests into an HTML unordered list. Both skills and interests are expected 
 * to be multiline strings, with each line representing a separate item.
 * 
 * @param {string} skills - The multiline string representing skills.
 * @param {string} interests - The multiline string representing interests.
 * @returns {string} - An HTML string containing the combined skills and interests wrapped in <li> tags.
 */
function formatSkillsAndInterests(skills, interests) {
    return skills.split('\n').map(skill => `<li>${skill.trim()}</li>`).join('') + 
           interests.split('\n').map(interest => `<li>${interest.trim()}</li>`).join('');
}
