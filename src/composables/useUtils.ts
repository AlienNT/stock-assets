import {computed, reactive} from "vue";
import {useConfig} from "@/composables/useConfig.ts";

const {appConfig} = useConfig()

const state = reactive({
    isMobileDevice: false as boolean,
    isMobileScreen: false as boolean,
})

export function useUtils() {
    const isMobileDevice = computed(() => {
        return state.isMobileDevice;
    })

    const isMobileScreen = computed(() => {
        return state.isMobileScreen;
    })

    function setIsMobileDevice() {
        state.isMobileDevice = /Mobi/i.test(window.navigator.userAgent)
    }

    function setIsMobileScreen(value: boolean = checkIsMobileScreen()) {
        state.isMobileScreen = value
    }

    function checkIsMobileScreen(mobileScreenWidth: number | undefined = appConfig.value.MOBILE_SCREEN_WIDTH) {
        return window.innerWidth <= mobileScreenWidth
    }

    return {
        isMobileDevice,
        isMobileScreen,
        setIsMobileDevice,
        setIsMobileScreen,
        checkIsMobileScreen,
    }
}