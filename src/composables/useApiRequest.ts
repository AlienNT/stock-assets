import { computed, reactive } from 'vue'
import { apiConfig } from '../configs/apiConfig.ts'
import { AxiosProgressEvent } from 'axios'

import { useSearch } from '@/composables/useSearch.ts'
import { UnknownObjectType } from '@/types/BasicTypes.ts'

export interface ApiRequestInterface<RequestInterface> {
  method?: 'GET',
  params?: RequestInterface,
  url?: string,
}

export interface ApiResponseInterface<ResponseInterface> {
  data: ResponseInterface;
  status: number;
}

const { searchQuery, searchOrder, filterFields } = useSearch()

function getParamsString(params: UnknownObjectType): string {
  if (typeof params !== 'object') {
    return ''
  }
  return Object
    .keys(params)
    .map((key: keyof UnknownObjectType) => `${key}=${params[key]}`)
    .join('&')
}

function getUrlString(url: string | undefined, params: string | undefined): string {
  return `${apiConfig.API_URL}${url ? url : ''}${params ? `?${params}` : ''}`
}

export function useApiRequest() {
  const state = reactive({
    isLoading: false,
    onDownloadProgress: {} as AxiosProgressEvent,
    onUploadProgress: {} as AxiosProgressEvent
  })

  const isLoading = computed(() => state.isLoading)
  // const downloadProgress = computed(() => state.onDownloadProgress); //ибо пришлось отказаться от axios по техническим причинам (сторона API)
  // const uploadProgress = computed(() => state.onUploadProgress);

  // async function request<RequestInterface, ResponseInterface>(
  //     {
  //         method = 'GET',
  //         params,
  //         url,
  //     }: ApiRequestInterface<RequestInterface>): Promise<AxiosResponse<ResponseInterface>> {
  //
  //     state.isLoading = true;
  //
  //     return axios({
  //         baseURL: apiConfig.API_URL,
  //         method,
  //         url,
  //         params: {...params, key: apiConfig.API_KEY, q: searchQuery.value},
  //         onDownloadProgress(progressEvent: AxiosProgressEvent) {
  //             state.onDownloadProgress = progressEvent
  //         },
  //         onUploadProgress(progressEvent: AxiosProgressEvent) {
  //             state.onUploadProgress = progressEvent
  //         },
  //     }).finally(() => {
  //         state.isLoading = false
  //     })
  // }

  async function request1<RequestInterface, ResponseInterface>(
    {
      method = 'GET',
      params,
      url
    }: ApiRequestInterface<RequestInterface>): Promise<ApiResponseInterface<ResponseInterface>> {

    state.isLoading = true

    return new Promise((resolve, reject) => {
      try {
        const urlString = getUrlString(url, getParamsString({
          key: apiConfig.API_KEY,
          q: searchQuery.value,
          order: searchOrder.value,
          ...filterFields.value,
          ...params,
        }))

        fetch(urlString, {
          method

        }).then(async response => {
          resolve({
            data: await response.json(),
            status: response.status
          })

        }).finally(() => {
          state.isLoading = false

        }).catch((error) => {
          reject(error)
        })

      } catch (e) {
        console.log('error', e)
        throw new Error(JSON.stringify(e))
      }
    })
  }

  return {
    request: request1,
    isLoading
  }
}