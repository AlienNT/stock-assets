export interface ApiConfigInterface {
    API_URL: string;
    API_KEY: string;
}

export const apiConfig: ApiConfigInterface = {
    API_URL: 'https://pixabay.com/api/',
    API_KEY: import.meta.env.VITE_API_KEY || '',
}
export default apiConfig;