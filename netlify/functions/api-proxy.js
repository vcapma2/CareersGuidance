// /netlify/functions/api-proxy.js

exports.handler = async function(event, context) {
    const API_KEY = process.env.MY_API_KEY; // Your secret API key stored as an environment variable
    const API_URL = 'https://api.example.com/data'; // The URL of the external API

    try {
        const response = await fetch(`${API_URL}?apiKey=${API_KEY}`);
        const data = await response.json();

        return {
            statusCode: 200,
            body: JSON.stringify(data)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to fetch data' })
        };
    }
};
