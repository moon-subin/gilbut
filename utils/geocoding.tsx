import { GOOGLEMAP_KEY } from '@env';

export default async function geocoding(address) {
    const apiKey = GOOGLEMAP_KEY; // Replace with your actual API key
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    try {
        const response = await fetch(geocodeUrl);
        const data = await response.json();

        if (data.status === 'OK') {
            // Assuming you want the coordinates from the first result
            const location = data.results[0]?.geometry.location;
            return location;
        } else {
            console.error('Geocode error:', data.status);
            return null;
        }
    } catch (error) {
        console.error('Request failed:', error);
        return null;
    }
}
