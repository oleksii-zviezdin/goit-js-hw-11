import Notiflix from "notiflix";

export class PixabayAPI {
    #BASE_URL = `https://pixabay.com/api/`;
    #API_KEY = `35043775-4ad51de805624d481f6825733`;

    #BASE_SEARCH_PARAMS = {
        image_type: `photo`,
        orientation: `horizontal`,
        safesearch: `true`,
        per_page: 40,
    }

    q = null;
    page = 1;
    
    fetchPhotos() {
        const searchParams = new URLSearchParams ({
            q: this.q,            
            ...this.#BASE_SEARCH_PARAMS,
            page: this.page,
        })

        return fetch(`${this.#BASE_URL}?key=${this.#API_KEY}&${searchParams}`)
            .then(data => {
                if (!data.ok) {
                    throw new Error(`Sorry, there are no images matching your search query. Please try again.`);
                }
                console.log(data.hits);
                return data.json();
            })
            .catch(err => Notiflix.Notify.failure(err));
    }
}