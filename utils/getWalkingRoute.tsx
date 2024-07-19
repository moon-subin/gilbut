import axios from 'axios';
import { TMAP_KEY } from '@env';

const getWalkingRoute = async (start, end) => {
  try {
    // console.log('start: ', start);
    // console.log('end: ', end);
    const response = await axios.post('https://apis.openapi.sk.com/tmap/routes/pedestrian?version=1', {
      startX: start.longitude,
      startY: start.latitude,
      endX: end.longitude,
      endY: end.latitude,
      reqCoordType: "WGS84GEO",
      resCoordType: "WGS84GEO",
      startName: "Start",
      endName: "End",
    }, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        appKey: TMAP_KEY,
      },
    });

    if (response.data.features) {
      return response.data.features;
    } else {
      throw new Error('No route data found');
    }
  } catch (error) {
    console.error("Failed to fetch pedestrian route:", error);
    return null;
  }
};

export default getWalkingRoute;