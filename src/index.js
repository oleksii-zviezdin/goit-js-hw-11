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

async function handleSearchPhotos(e) {
    e.preventDefault();

    pixabayAPI.q = e.target.elements.searchQuery.value.trim();

    if (!pixabayAPI.q) {
        Notiflix.Notify.warning(`The field cannot be empty. Please enter a search query`);
        return
    }
    
    divSearchEl.classList.add(`search-fixed`)
    pixabayAPI.page = 1;

    try {
        const { data } = await pixabayAPI.fetchPhotos();         
        const totalPage = Math.ceil(data.totalHits / perPage);
        if (!data.hits.length) {
            galleryEl.innerHTML = '';
            throw new Error()

        } else if (totalPage === pixabayAPI.page) {
            Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images`)
            galleryEl.innerHTML = renderingGallery(data.hits);
            galleryLightBox.refresh();
            loadMoreEl.classList.add("is-hiden");
            return
        }
    
        Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images`)
        galleryEl.innerHTML = renderingGallery(data.hits);
        loadMoreEl.classList.remove("is-hiden")
        galleryLightBox.refresh();
    }

        catch (error) {
        loadMoreEl.classList.add("is-hiden");
        Notiflix.Notify.failure(`Sorry, there are no images matching your search query. Please try again`);
    };
}

async function handleLoadMoreEls(e) {

    pixabayAPI.page += 1;

    try {
        const { data } = await pixabayAPI.fetchPhotos();
        const totalPage = Math.ceil(data.totalHits / perPage);
        if (totalPage === pixabayAPI.page) {
            galleryEl.insertAdjacentHTML(`beforeend`, renderingGallery(data.hits));
            loadMoreEl.classList.add("is-hiden");
            throw new Error();
        }
        
        galleryEl.insertAdjacentHTML(`beforeend`, renderingGallery(data.hits));
        galleryLightBox.refresh();
    } catch (error) {
        Notiflix.Notify.failure(`We're sorry, but you've reached the end of search results`);
    }
}

function renderingGallery(img) {
    return img.map(({ webformatURL, tags, likes, views, comments, downloads, largeImageURL, }) => `
    <a class="gallery__link" href="${largeImageURL}">
        <div class="photo-card">
            <img src="${webformatURL}" "alt="${tags}" loading="lazy" class="gallery__image"/>
        
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
        </div>
    </a>`).join('');
}