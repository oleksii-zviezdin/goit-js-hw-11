import { PixabayAPI } from "./pixabay-api";

const pixabayAPI = new PixabayAPI();

const formEl = document.querySelector(`#search-form`);
console.log(formEl)
const searchBtnEl = document.querySelector(`button[type="submit"]`);
const galleryEl = document.querySelector(`.gallery`);

function handleSearchPhotos(e) {
    e.preventDefault();

    // const searchQuery = e.target.elements[`searchQuery`].value.trim();
    // const searchQuery = formEl.elements.searchQuery.value.trim();

    console.log(searchQuery)
    // pixabayAPI.q = searchQuery;

    pixabayAPI.fetchPhotos().then(data => console.log(data));
}

console.log(searchBtnEl)
console.log(galleryEl)

searchBtnEl.addEventListener(`submit`, handleSearchPhotos);