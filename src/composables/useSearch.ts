import {computed, reactive} from "vue";

const state = reactive({
    searchQuery: "" as string,
})

export function useSearch() {
    const searchQuery = computed(() => state.searchQuery)

    function setSearchQuery(query: string) {
        state.searchQuery = query
    }

    return {
        searchQuery,
        setSearchQuery,
    }
}