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

export function normalizeCounter(size: number): string {
    const units = ['', 'K', 'M'];

    function niceBytes(x: number): string {

        let l = 0, n = parseInt(String(x), 10) || 0;

        while (n >= 1000 && ++l) {
            n = n / 1000;
        }

        return (l > 0 ? Math.trunc(10 * n) / 10 : Math.trunc(n)) + units[l];
    }

    return niceBytes(size)
}

export function getExtension(string: string): string {
    return string.substring(string.lastIndexOf('.') + 1);
}

export function setCSSProperty(property: string, value: string): void {
    document.documentElement.style.setProperty(property, value);
}

export function delay(time: number, func?: () => void): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(func && func())
        }, time)
    })
}


export function formattedTime(number: number): string {
    const minutes = Math.trunc(number / 60) || 0
    const seconds = Math.trunc(number % 60) || 0

    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`
}

export function formattedQuality(height: number): string {
    const qualities = {
        720: 'HD',
        1080: 'FHD',
        1440: '2K',
        2160: '4K'
    } as {
        [key: number]: string
    }
    return qualities[height] || height + 'p'
}