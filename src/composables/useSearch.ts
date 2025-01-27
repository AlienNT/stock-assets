import {computed, reactive} from "vue";
import { BaseRequestInterface, CategoryType, OrderType } from '@/types/BasicTypes.ts'

export type SearchFilterType = Omit<BaseRequestInterface, 'page' | 'per_page' | 'id' | 'key' | 'q' | 'callback' | 'order' | 'pretty' | 'lang'>

const state = reactive({
    searchQuery: "" as string,
    searchOrder: "popular" as OrderType,
    searchCategory: "" as CategoryType,
    filterFields: {
        safesearch: false,
        min_width: undefined,
        min_height: undefined,
        category: "" as CategoryType,
        editors_choice: false,
    } as SearchFilterType
})

export function useSearch() {
    const searchQuery = computed(() => {
        return state.searchQuery
    })

    const searchOrder = computed(() => {
        return state.searchOrder
    })

    const searchCategory = computed(() => {
        return state.searchCategory
    })

    const filterFields = computed(() => {
        return state.filterFields
    })

    function setSearchQuery(query: string) {
        state.searchQuery = query
    }

    function setSearchOrder(order: OrderType) {
        state.searchOrder = order
    }

    function setSearchCategory(category: CategoryType) {
        state.searchCategory = category
    }

    function setFilterFields(filterFields: SearchFilterType) {
        state.filterFields = { ...filterFields }
    }

    return {
        searchQuery,
        setSearchQuery,

        searchOrder,
        setSearchOrder,

        searchCategory,
        setSearchCategory,

        filterFields,
        setFilterFields,
    }
}