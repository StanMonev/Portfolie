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
 * Reorders a list of elements inside a container in their new order that is given with the list of IDs.
 * 
 * @param {string} containerID - The container that contains the elements that need to be reordered.
 * @param {Array} list - List of IDs of the elements in their new order
 * @returns {void}
 * @throws {Error}
 */

function orderElements(containerID, list){
    const container = document.getElementById(containerID);

    if(!container) throw new Error('The container is not found!');

    list.forEach(id => {
        const section = document.getElementById(id);
        if (section) {
            container.appendChild(section);
        }
    });
}
