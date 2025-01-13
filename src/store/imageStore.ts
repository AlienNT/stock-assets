import {computed, ComputedRef, reactive} from "vue";
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

    async function fetchImages(params: ImageRequestInterface, isPaginated: boolean = false) {
        const {request, uploadProgress, downloadProgress, isLoading} = useApiRequest()
        await request<ImageRequestInterface, ImageResponseInterface>({params})
            .then(({data}) => {
                const {hits, totalHits, total} = data
                isPaginated ? setImages(hits) : addImages(hits)
                state.totalHits = totalHits
                state.total = total
            })
            .catch((error) => {
                console.error(error)
            })
        return {
            request,
            uploadProgress,
            downloadProgress,
            isLoading
        }
    }

    return {
        images, imageById, addImages, fetchImages, setImages, totalImages, total
    }
}