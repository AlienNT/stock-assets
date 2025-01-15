import {computed, reactive} from "vue";
import appConfig, {AppConfigInterface} from "@/configs/appConfig.ts";
import apiConfig, {ApiConfigInterface} from "@/configs/apiConfig.ts";

const state = reactive({
    appConfig: {...appConfig} as AppConfigInterface,
    apiConfig: {...apiConfig} as ApiConfigInterface,
})

export function useConfig() {
    const appConfig = computed(() => state.appConfig);
    const apiConfig = computed(() => state.apiConfig);

    return {appConfig, apiConfig};
}