import {ComputedRef, computed, reactive} from "vue";
import {ImageHitInterface, ImageRequestInterface, ImageResponseInterface} from "../types/ImageTypes.ts";
import {useApiRequest} from "../composables/useApiRequest.ts";
import {StoreInterface} from "@/types/StoreTypes.ts";

const state: StoreInterface<ImageHitInterface> = reactive({
    hits: [],
    totalHits: undefined as unknown as number,
    total: undefined as unknown as number
})


export function useImageStore() {
    const images: ComputedRef<ImageHitInterface[]> = computed(() => state.hits)
    const imageById = (id: number) => {
        return state.hits.find((image) => image.id === id)
    }
    const totalImages = computed(() => state.totalHits)
    const total = computed(() => state.total)

    function setImages(images: ImageHitInterface[]) {
        state.hits = images
    }

    function addImages(images: ImageHitInterface[]) {
        state.hits = [...state.hits, ...images]
    }

    function fetchImages() {
        const {request, isLoading} = useApiRequest()

        async function apiRequest(params: ImageRequestInterface) {
            return await request<ImageRequestInterface, ImageResponseInterface>({
                params,
            }).then(({data}) => {
                const {hits, totalHits, total} = {...data}

                addImages(hits)
                state.totalHits = totalHits
                state.total = total

                return {hits, totalHits, total}

            }).catch((error) => {
                console.log({error})
            })
        }

        return {
            request: (params: ImageRequestInterface) => apiRequest(params),
            isLoading
        }
    }

    function fetchImage() {
        const {request, isLoading} = useApiRequest()

        async function apiRequest(params: ImageRequestInterface) {
            return await request<ImageRequestInterface, ImageResponseInterface>({
                params
            }).then(({data}) => {
                const {hits, totalHits, total} = data
                return {hits, totalHits, total}

            }).catch((error) => {
                console.error(error)
            })
        }

        return {
            request: apiRequest,
            isLoading
        }
    }

    return {
        images, imageById, addImages, fetchImages, setImages, totalImages, total, fetchImage
    }
}