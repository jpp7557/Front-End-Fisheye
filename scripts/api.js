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

export function onlyFocussables(lesFocussables) {
    const firstFocusElement = lesFocussables[0];
    const lastFocusElement = lesFocussables[lesFocussables.length - 1];

    document.addEventListener('keydown', (event) => {

        if (event.key === 'Tab') {
            if (event.shiftKey) {
                // If Shift + Tab is pressed and focus is on the first element, loop back to the last
                if (document.activeElement === firstFocusElement) {
                    event.preventDefault();
                    lastFocusElement.focus();
                }
            } else {
                // If Tab is pressed and focus is on the last element, loop to the first
                if (document.activeElement === lastFocusElement) {
                    event.preventDefault();
                    firstFocusElement.focus();
                }
            }
        }
    });

}