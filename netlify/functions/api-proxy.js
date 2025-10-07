exports.handler = async function(event, context) {
    const API_KEY = process.env.MY_API_KEY;
    
    if (!API_KEY) {
        console.error("CRITICAL: MY_API_KEY environment variable is not set.");
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "API key is not configured on the server." })
        };
    }

    const GOOGLE_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${API_KEY}`;

    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const response = await fetch(GOOGLE_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: event.body
        });

        // *** NEW LOGGING LOGIC START ***
        if (!response.ok) {
            const errorText = await response.text();
            // This is the crucial line that will show us the real error from Google
            console.error(`Google API Error: ${response.status} ${response.statusText} - ${errorText}`);
            return { 
                statusCode: response.status, 
                body: errorText 
            };
        }
        // *** NEW LOGGING LOGIC END ***

        const data = await response.json();
        return {
            statusCode: 200,
            body: JSON.stringify(data)
        };

    } catch (error) {
        console.error("Error in serverless function execution:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'An internal server error occurred.' })
        };
    }
};
