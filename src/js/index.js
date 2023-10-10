import { fetchBreeds, fetchCatByBreed } from "./cat-api";
import '../css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SlimSelect from 'slim-select'
import 'slim-select/dist/slimselect.css';

const ref = {
    selector: document.querySelector('.breed-select'),
    divCatInfo: document.querySelector('.cat-info'),
    loader: document.querySelector('.loader'),
    error: document.querySelector('.error'),
};
const { selector, divCatInfo, loader, error } = ref;

// Show the loader when the page starts
loader.classList.replace('is-hidden', 'loader');
error.classList.add('is-hidden');
divCatInfo.classList.add('is-hidden');

let arrBreedsId = [];

// Fetch breeds when the page loads
fetchBreeds()
    .then(data => {
        data.forEach(element => {
            arrBreedsId.push({ text: element.name, value: element.id });
        });
        initializeSelector();
        // Hide the loader after breeds are loaded
        loader.classList.replace('loader', 'is-hidden');
    })
    .catch(onFetchError);

function initializeSelector() {
    // Initialize the SlimSelect dropdown with the fetched breeds
    const slimSelect = new SlimSelect({
        select: selector,
        data: arrBreedsId,
        placeholder: 'Select a breed',
    });

    selector.addEventListener('change', onSelectBreed);
}

function onSelectBreed(event) {
    const breedId = event.currentTarget.value;

    if (breedId) {
        loader.classList.replace('loader', 'is-hidden');
        selector.classList.add('is-hidden');
        divCatInfo.classList.add('is-hidden');

        fetchCatByBreed(breedId)
            .then(data => {
                loader.classList.replace('loader', 'is-hidden');
                selector.classList.remove('is-hidden');
                const { url, breeds } = data[0];
                divCatInfo.innerHTML = `<div class="box-img"><img src="${url}" alt="${breeds[0].name}" width="400"/></div><div class="box"><h1>${breeds[0].name}</h1><p>${breeds[0].description}</p><p><b>Temperament:</b> ${breeds[0].temperament}</p></div>`
                divCatInfo.classList.remove('is-hidden');
            })
            .catch(onFetchError);
    }
}

function onFetchError(error) {
    selector.classList.remove('is-hidden');
    loader.classList.replace('loader', 'is-hidden');

    Notify.failure('Oops! Something went wrong! Try reloading the page or select another cat breed!', {
        position: 'center-center',
        timeout: 5000,
        width: '400px',
        fontSize: '24px'
    });
}


