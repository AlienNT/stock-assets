export function calcHeight({width, height, itemWidth, defaultWidth = 250}: {
    width: number | undefined,
    height: number | undefined,
    itemWidth: number | undefined,
    defaultWidth?: number
}) : number {

    return (!height || !width || !itemWidth) ? defaultWidth : itemWidth * (height && width ? height / width : 1)
}