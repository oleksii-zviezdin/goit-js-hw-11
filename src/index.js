import { PixabayAPI } from "./pixabay-api";
import Notiflix from 'notiflix';

const pixabayAPI = new PixabayAPI();

const formEl = document.querySelector(`#search-form`);
const searchBtnEl = document.querySelector(`button[type="submit"]`);
const galleryEl = document.querySelector(`.gallery`);
const loadMoreEl = document.querySelector(`.load-more`);

function handleSearchPhotos(e) {
    e.preventDefault();

    const searchQuery = e.target.elements.searchQuery.value.trim();
    pixabayAPI.q = searchQuery;

    if (!pixabayAPI.q) {
        return
    }

    pixabayAPI.page += 1;
    pixabayAPI.fetchPhotos()
        .then(data => {
            renderingGallery(data.hits);
            loadMoreEl.classList.remove("is-hiden")
        })
        .catch(err => Notiflix.Notify.failure(err));
}

function renderingGallery(img) {
    const markup = img.map(({ webformatURL, tags, likes, views, comments, downloads, previewWidth, previewHeight }) => `<div class="photo-card">
<img width="200" height="200" src="${webformatURL}" alt="${tags}" loading="lazy" />
    <div class="info">
        <p class="info-item">
            <b>Likes:</b>${likes}
        </p>
        <p class="info-item">
            <b>Views:</b>${views}
        </p>
        <p class="info-item">
            <b>Comments:</b>${comments}
        </p>
        <p class="info-item">
            <b>Downloads:</b>${downloads}
        </p>
    </div>
</div>`).join('');
    return galleryEl.insertAdjacentHTML(`beforeend`, markup)
}

formEl.addEventListener(`submit`, handleSearchPhotos);