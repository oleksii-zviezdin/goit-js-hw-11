export class PixabayAPI {
    #BASE_URL = `https://pixabay.com/api/`;
    #API_KEY = `35043775-4ad51de805624d481f6825733`;

    #BASE_SEARCH_PARAMS = {
        image_type: `photo`,
        orientation: `horizontal`,
        safesearch: `true`
    }

    // q = null;
    q = `cat`;
    page = 0;
    imageType = `photo`;
    orientation = `horizontal`;
    safesearch = `true`;
    perPage = 40;
    
    fetchPhotos() {
        // const searchParams = new URLSearchParams ({
        //     q: this.q,            
        //     ...this.#BASE_SEARCH_PARAMS,
        //     page: this.page,
        // })

        return fetch(
            // `${this.#BASE_URL}?key=${this.#API_KEY}&${searchParams}`
            `${this.#BASE_URL}?key=${this.#API_KEY}&q=${this.q}&image_type=${this.imageType}&orientation=${this.orientation}&safesearch=${this.safesearch}&per_page=${this.perPage}&page=${this.page}`
            // `${this.#BASE_URL}?key=${this.#API_KEY}&${searchParams}`

        ).then(data => {
            if (!data.ok) {
                throw new Error(`Oops... Something went wrong`);
            }
            console(data);
            return data.json();
        });
    }
}