import axios from 'axios';

export default axios.create({
    baseURL: 'https://api.unsplash.com',
    headers: {
        Authorization: 'Client-ID 465ddf1d49d5dedd3fbaf025ec4a7e55b93758aa93bf4d72403785b957512156'
    }
})