export function normalizeSize(size: number): string {
    const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    function niceBytes(x: number): string {

        let l = 0, n = parseInt(String(x), 10) || 0;

        while (n >= 1024 && ++l) {
            n = n / 1024;
        }

        return (n.toFixed(l > 0 ? 1 : 0) + ' ' + units[l]);
    }

    return niceBytes(size)
}

export function getExtension(string: string): string {
    return string.substring(string.lastIndexOf('.') + 1);
}

export function setCSSProperty(property: string, value: string): void {
    document.documentElement.style.setProperty(property, value);
}

export function delay(time: number, func?: Function) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(func && func())
        }, time)
    })
}