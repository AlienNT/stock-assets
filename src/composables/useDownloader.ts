import {computed, reactive} from "vue";

export function useDownloader() {
    interface FileDownloader {
        file: Blob,
        name: string
    }

    const state = reactive({
        isLoading: false,
    })

    const isLoading = computed(() => state.isLoading)

    function download({src, fileName}: {src: string, fileName?: string}) {
        return new Promise((resolve, reject) => {
            state.isLoading = true

            fetch(src).then(async response => {
                if (response.status === 200) {

                    return {
                        name: fileName || response.url.substring(response.url.lastIndexOf('/') + 1),
                        file: await response.blob()
                    }
                }
                reject('something went wrong')

            }).then((result: FileDownloader | undefined) => {
                if (!result) {
                    return reject('file not found')
                }
                const {name, file} = result

                const src = window.URL.createObjectURL(file);
                const a = document.createElement('a');

                a.href = src;
                a.download = name;
                a.click();

                window.URL.revokeObjectURL(src);
                resolve({file, name})

            }).catch((err) => {
                console.error(err);

            }).finally(() => {
                state.isLoading = false
            })
        })
    }

    return {
        isLoading,
        download,
    }
}