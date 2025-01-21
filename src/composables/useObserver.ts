import {computed, reactive} from "vue";

export default function useObserver() {
    const state = reactive({
        observer: null as unknown as IntersectionObserver,
        entries: [] as IntersectionObserverEntry[]
    })

    const observer = computed(() => {
        return state.observer
    })

    const entries = computed(() => {
        return state.entries
    })

    const entryByTarget = (target: HTMLElement) => computed(() => {
        return state.entries.find((entry) => entry.target === target)
    })

    function createObserver(
        {
            root,
            rootMargin = "0px",
            threshold = 0
        }: IntersectionObserverInit) {

        const observer = new IntersectionObserver((entries) => {
            state.entries = entries as unknown as IntersectionObserverEntry[]

        }, {
            root,
            rootMargin,
            threshold,
        })

        state.observer = observer as IntersectionObserver;

        return observer
    }

    function observeTarget(target: HTMLElement) {
        state.observer.observe(target)
    }

    return {observer, createObserver, entries, entryByTarget, observeTarget}
}