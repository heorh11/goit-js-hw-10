import axios from 'axios';

axios.defaults.headers.common['x-api-key'] = 'live_3EULBtv1cWO0CJrbqdz7OdXctY8wWNBsuGsex6UYdbhPNM2d30Vz8TZ1RWpWRKJ6';


export async function fetchBreeds() {
  try {
    const response = await axios.get('https://api.thecatapi.com/v1/breeds');
    return response.data;
  } catch (error) {
    throw error;
  }
}


export async function fetchCatByBreed(breedId) {
  try {
    const response = await axios.get(
      `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}