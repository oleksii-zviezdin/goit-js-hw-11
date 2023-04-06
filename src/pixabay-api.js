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

    get perPage() {
        return this.#BASE_SEARCH_PARAMS.per_page;
    }

    q = null;
    page = 1;
    
    async fetchPhotos() {
        const searchParams = new URLSearchParams ({
            q: this.q,            
            ...this.#BASE_SEARCH_PARAMS,
            page: this.page,
        })

        try {
            const data = await fetch(`${this.#BASE_URL}?key=${this.#API_KEY}&${searchParams}`);
            if (!data.ok) {
                throw new Error(`Sorry, there are no images matching your search query. Please try again`);
            }
            return await data.json();
        } catch (error) {
            return Notiflix.Notify.failure(error);
        }
    }
}

// export class PixabayAPI {
//     #BASE_URL = `https://pixabay.com/api/`;
//     #API_KEY = `35043775-4ad51de805624d481f6825733`;

//     #BASE_SEARCH_PARAMS = {
//         image_type: `photo`,
//         orientation: `horizontal`,
//         safesearch: `true`,
//         per_page: 40,
//     }

//     get perPage() {
//         return this.#BASE_SEARCH_PARAMS.per_page;
//     }

//     q = null;
//     page = 1;


    
//     fetchPhotos() {
//         return axios.get(`${this.#BASE_URL}?key=${this.#API_KEY}&`,{
//             searchParams: {
//                 q: this.q,
//                 ...this.#BASE_SEARCH_PARAMS,
//                 page: this.page,
//         },
//     });
//     }
// }