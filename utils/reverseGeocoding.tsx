import { GOOGLEMAP_KEY } from '@env';

export default async function reverseGeocoding(latitude, longitude) {
    const apiKey = GOOGLEMAP_KEY; // Replace with your actual API key

    const reverseGeocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

    try {
        const response = await fetch(reverseGeocodeUrl);
        const data = await response.json();

        if (data.status === 'OK') {
            const addressComponents = data.results[0].address_components;
            const filteredAddressComponents = addressComponents.slice(0, 3).reverse();
            const formattedAddress = filteredAddressComponents
                .map(component => component.long_name)
                .join(' ');
            return formattedAddress;
        } else {
            console.error('Geocode error:', data.status);
            return null;
        }
    } catch (error) {
        console.error('Request failed:', error);
        return null;
    }
}
