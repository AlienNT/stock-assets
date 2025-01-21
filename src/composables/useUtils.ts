import {computed, reactive} from "vue";
import {useConfig} from "@/composables/useConfig.ts";

const {appConfig} = useConfig()

const state = reactive({
    isMobileDevice: false as boolean,
    isMobileScreen: false as boolean,
    isFocusedScreen: false as boolean,
})

export function useUtils() {
    const isMobileDevice = computed(() => {
        return state.isMobileDevice;
    })

    const isMobileScreen = computed(() => {
        return state.isMobileScreen;
    })

    const isFocusedScreen = computed(() => {
        return state.isFocusedScreen;
    })

    function setIsMobileDevice() {
        const {maxTouchPoints} = navigator
        const {type, angle} = screen.orientation

        state.isMobileDevice =
            (type === 'portrait-primary' || maxTouchPoints >= 1 && angle === 0) ||
            (type === "landscape-primary" && maxTouchPoints >= 1 && angle >= 90)
    }

    function setIsMobileScreen(value: boolean = checkIsMobileScreen()) {
        state.isMobileScreen = value
    }

    function checkIsMobileScreen(mobileScreenWidth: number | undefined = appConfig.value.MOBILE_SCREEN_WIDTH) {
        return window.innerWidth <= mobileScreenWidth
    }

    function setIsFocusedScreen(value: boolean) {
        state.isFocusedScreen = value
    }

    return {
        isMobileDevice,
        isMobileScreen,
        setIsMobileDevice,
        setIsMobileScreen,
        checkIsMobileScreen,

        isFocusedScreen,
        setIsFocusedScreen
    }
}