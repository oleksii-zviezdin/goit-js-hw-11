import Notiflix from "notiflix";
import { PixabayAPI } from "./pixabay-api";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const galleryLightBox = new SimpleLightbox(`.gallery a`);
const pixabayAPI = new PixabayAPI();

const perPage = pixabayAPI.perPage;

const formEl = document.querySelector(`#search-form`);
const galleryEl = document.querySelector(`.gallery`);
const loadMoreEl = document.querySelector(`.load-more`);
const divSearchEl = document.querySelector(`.search`);

formEl.addEventListener(`submit`, handleSearchPhotos);
loadMoreEl.addEventListener(`click`, handleLoadMoreEls);

function handleSearchPhotos(e) {
    e.preventDefault();

    const searchQuery = e.target.elements.searchQuery.value.trim();
    pixabayAPI.q = searchQuery;

    if (!pixabayAPI.q) {
        return
    }
    
    divSearchEl.classList.add(`search-fixed`)
    pixabayAPI.page = 1;
    pixabayAPI.fetchPhotos()
        .then(data => {            
            const totalPage = Math.ceil(data.totalHits / perPage);
            if (!data.hits.length) {
                galleryEl.innerHTML = '';
                throw new Error()
            } else if (totalPage === pixabayAPI.page) {
                galleryEl.innerHTML = renderingGallery(data.hits);
                return loadMoreEl.classList.add("is-hiden");
            }
            Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images`)
            galleryEl.innerHTML = renderingGallery(data.hits);
            loadMoreEl.classList.remove("is-hiden")
        })
        .catch(() => {
            loadMoreEl.classList.add("is-hiden");
            Notiflix.Notify.failure(`Sorry, there are no images matching your search query. Please try again`);
        });
}

function handleLoadMoreEls(e) {

    pixabayAPI.page += 1;

    pixabayAPI.fetchPhotos()
        .then(data => {
            const totalPage = Math.ceil(data.totalHits / perPage);
            if (totalPage === pixabayAPI.page) {
                galleryEl.insertAdjacentHTML(`beforeend`, renderingGallery(data.hits));
                loadMoreEl.classList.add("is-hiden");
                throw new Error();
            }
            
            
            galleryEl.insertAdjacentHTML(`beforeend`, renderingGallery(data.hits));
        })
        .catch(() => Notiflix.Notify.failure(`We're sorry, but you've reached the end of search results`));
}

function renderingGallery(img) {
    return img.map(({ webformatURL, tags, likes, views, comments, downloads, largeImageURL, }) => `<div class="photo-card">
            <a class="gallery__link" href="${largeImageURL}">
            <img width="350" height="350" src="${webformatURL}" "alt="${tags}" loading="lazy" class="gallery__image"/></a>
        <div class="info">
            <p class="info-item">
                <b class="info-item__statistic">❤️ ${likes}</b>
            </p>
            <p class="info-item">
                <b class="info-item__statistic">👀 ${views}</b>
            </p>
            <p class="info-item">
                <b class="info-item__statistic">💬 ${comments}</b>
            </p>
            <p class="info-item">
                <b class="info-item__statistic">💾 ${downloads}</b>
            </p>
        </div>
</div>`).join('');
}