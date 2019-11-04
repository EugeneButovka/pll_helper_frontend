import axios from 'axios';

// instance for local server - DB for scheme, characterization, simulation data in/out
export const cadServer = axios.create({
    //baseURL: (process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:5000')
    baseURL: 'http://localhost:5000'
});
