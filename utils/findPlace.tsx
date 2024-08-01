import { GOOGLEMAP_KEY } from '@env';

export default async function findPlace(input) {
  const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(input)}&inputtype=textquery&fields=formatted_address,name,geometry&key=${GOOGLEMAP_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Network response was not ok: ${response.statusText}, ${errorText}`);
    }

    const data = await response.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}
