async function fetchData(endpoint, dataType = 'JSON') {
    try {
        const response = await fetch(endpoint);
        if (!response.ok) throw new Error('Failed to fetch data');
        const b = response.body;
        if (dataType == 'HTML'){
            return await response.text();
        }else{
            return await response.json();
        }
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

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
