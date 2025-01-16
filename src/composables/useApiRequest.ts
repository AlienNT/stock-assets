import {computed, reactive} from "vue";
import {apiConfig} from "../configs/apiConfig.ts";
import axios, {AxiosProgressEvent, AxiosResponse} from "axios";
import {useUtils} from "@/composables/useUtils.ts";

export interface ApiRequestInterface<RequestInterface> {
    method?: 'GET',
    params?: RequestInterface,
    url?: string,
}

const {searchQuery} = useUtils()

export function useApiRequest() {
    const state = reactive({
        isLoading: false,
        onDownloadProgress: {} as AxiosProgressEvent,
        onUploadProgress: {} as AxiosProgressEvent,
    })

    const isLoading = computed(() => state.isLoading);
    const downloadProgress = computed(() => state.onDownloadProgress);
    const uploadProgress = computed(() => state.onUploadProgress);

    async function request<RequestInterface, ResponseInterface>(
        {
            method = 'GET',
            params,
            url,
        }: ApiRequestInterface<RequestInterface>): Promise<AxiosResponse<ResponseInterface>> {

        state.isLoading = true;

        return axios({
            baseURL: apiConfig.API_URL,
            method,
            url,
            params: {...params, key: apiConfig.API_KEY, q: searchQuery.value},
            onDownloadProgress(progressEvent: AxiosProgressEvent) {
                state.onDownloadProgress = progressEvent
            },
            onUploadProgress(progressEvent: AxiosProgressEvent) {
                state.onUploadProgress = progressEvent
            },
        }).finally(() => {
            state.isLoading = false
        })
    }

    return {
        request,
        isLoading,
        downloadProgress,
        uploadProgress,
    }
}