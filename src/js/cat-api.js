const url = 'https://api.thecatapi.com/v1';
const api_key = "live_3EULBtv1cWO0CJrbqdz7OdXctY8wWNBsuGsex6UYdbhPNM2d30Vz8TZ1RWpWRKJ6";

function fetchBreeds() {
    return fetch(`${url}/breeds?api_key=${api_key}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        });       
};

function fetchCatByBreed(breedId) {
    return fetch(`${url}/images/search?api_key=${api_key}&breed_ids=${breedId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        });  
};

  export { fetchBreeds, fetchCatByBreed };