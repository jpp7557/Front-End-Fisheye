export async function getJsonArrays(url) {
    try {
        const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Failed to fetch json file from ', url);
    }
    const data = await response.json();
    console.log("data :",data);
    return data; // Return all arrays found from the JSON file
    } catch (error) {
        console.error('Error No Array fetched.', error);
        return { photographers: [] }; // Return an empty array in case of error
    }
}