/**
 * api.js
 *
 * This file contains utility functions for making HTTP requests to various API endpoints.
 * It includes functions for fetching data, posting data, and deleting data, with built-in
 * error handling and support for different data types (e.g., JSON, HTML).
 *
 * Key functionalities:
 * - Fetch data from a given API endpoint, with optional support for different response formats.
 * - Post data to an API endpoint, typically used for saving or updating data.
 * - Delete data from an API endpoint, used for removing records from the server.
 *
 * These functions provide a consistent and reusable way to interact with APIs across the application.
 */

/**
 * Fetches data from a specified API endpoint.
 * 
 * @param {string} endpoint - The API endpoint to fetch data from.
 * @param {string} [dataType='JSON'] - The expected response format, either 'JSON' or 'HTML'. Defaults to 'JSON'.
 * @returns {Promise<any>} - A promise that resolves to the fetched data, either as JSON or text, depending on the dataType.
 * @throws {Error} - Throws an error if the fetch operation fails.
 */
async function fetchData(endpoint, dataType = 'JSON') {
    try {
        const response = await fetch(endpoint);
        if (!response.ok) throw new Error('Failed to fetch data');

        if (dataType === 'HTML') {
            return await response.text();
        } else {
            return await response.json();
        }
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

/**
 * Sends a POST request to a specified API endpoint with the provided data.
 * 
 * @param {string} endpoint - The API endpoint to send data to.
 * @param {Object} data - The data to be sent in the body of the POST request.
 * @returns {Promise<any>} - A promise that resolves to the response data in JSON format.
 * @throws {Error} - Throws an error if the POST operation fails.
 */
async function postData(endpoint, data) {
    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Failed to save data');
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

/**
 * Sends a DELETE request to a specified API endpoint with the provided data.
 * 
 * @param {string} endpoint - The API endpoint to delete data from.
 * @param {Object} data - The data to be sent in the body of the DELETE request.
 * @returns {Promise<any>} - A promise that resolves to the response data in JSON format.
 * @throws {Error} - Throws an error if the DELETE operation fails.
 */
async function deleteData(endpoint, data) {
    try {
        const response = await fetch(endpoint, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Failed to delete data');
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}
