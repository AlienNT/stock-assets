import { computed, reactive } from 'vue'
import { StoreInterface } from '@/types/StoreTypes.ts'
import { VideoHitInterface, VideoRequestInterface, VideoResponseInterface } from '@/types/VideoTypes.ts'
import { useApiRequest } from '@/composables/useApiRequest.ts'

const state: StoreInterface<VideoHitInterface> = reactive({
  hits: [],
  totalHits: 0 as number,
  total: 0 as number,
  page: 1
})

export function useVideoStore() {
  const videos = computed(() => state.hits)
  const totalVideos = computed(() => state.totalHits)
  const total = computed(() => state.total)
  const page = computed(() => state.page)

  const videoById = (id: number) => computed(() => {
    return state.hits.find(video => video.id === id)
  })

  function setVideos(videos: VideoHitInterface[]) {
    state.hits = videos
  }

  function addVideos(videos: VideoHitInterface[]) {
    state.hits = [...state.hits, ...videos]
  }

  function fetchVideos() {
    const { request, isLoading } = useApiRequest()

    async function apiRequest(params: VideoRequestInterface) {
      const page = params.page || state.page

      return await request<VideoRequestInterface, VideoResponseInterface>({
        url: 'videos/',
        params: {
          ...params,
          page
        }

      }).then(({ data }) => {
        const { hits, totalHits, total } = data
        addVideos(hits)
        state.totalHits = totalHits
        state.total = total
        return data

      }).catch(error => console.log(error))
    }

    return {
      request: apiRequest, isLoading
    }
  }

  function fetchVideo() {
    const { request, isLoading } = useApiRequest()

    async function apiRequest(params: VideoRequestInterface): Promise<VideoResponseInterface | void> {
      return await request<VideoRequestInterface, VideoResponseInterface>({
        url: 'videos/',
        params

      }).then(({ data }) => {
        const { hits, totalHits, total } = data
        return { hits, totalHits, total }

      }).catch(error => console.log(error))
    }

    return {
      request: apiRequest, isLoading
    }
  }

  function setPage(page: number) {
    state.page = page
  }

  function resetStore() {
    state.hits = []
    state.totalHits = 0 as number
    state.total = 0 as number
    state.page = 1
  }

  return {
    videos,
    videoById,
    totalVideos,
    total,
    addVideos,
    setVideos,
    resetStore,
    fetchVideos,
    fetchVideo,

    page,
    setPage
  }
}