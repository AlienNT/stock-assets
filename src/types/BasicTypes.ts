export type LanguageType =
    "cs"
    | "da"
    | "de"
    | "en"
    | "es"
    | "fr"
    | "id"
    | "it"
    | "hu"
    | "nl"
    | "no"
    | "pl"
    | "pt"
    | "ro"
    | "sk"
    | "fi"
    | "sv"
    | "tr"
    | "vi"
    | "th"
    | "bg"
    | "ru"
    | "el"
    | "ja"
    | "ko"
    | "zh";

export type ColorsType =
    "grayscale"
    | "transparent"
    | "red"
    | "orange"
    | "yellow"
    | "green"
    | "turquoise"
    | "blue"
    | "lilac"
    | "pink"
    | "white"
    | "gray"
    | "black"
    | "brown"

export type CategoryType =
    "backgrounds"
    | "fashion"
    | "nature"
    | "science"
    | "education"
    | "feelings"
    | "health"
    | "people"
    | "religion"
    | "places"
    | "animals"
    | "industry"
    | "computer"
    | "food"
    | "sports"
    | "transportation"
    | "travel"
    | "buildings"
    | "business"
    | "music"

export type OrderType = "popular" | "latest"
export type ImageType = "all" | "photo" | "illustration" | "vector"
export type VideoType = "all" | "film" | "animation"
export type OrientationType = "all" | "horizontal" | "vertical"

export interface BaseRequestInterface {
    key?: string,
    q?: string,
    lang?: LanguageType,
    id?: string,
    category?: CategoryType,
    min_width?: number,
    min_height?: number,
    editors_choice?: boolean,
    safesearch?: boolean,
    order?: OrderType,
    page?: number,
    per_page?: number,
    callback?: string,
    pretty?: boolean
}

export interface BaseResponseInterface<HitInterface> {
    total: number,
    totalHits: number,
    hits: HitInterface[],
}

export interface BaseHitInterface {
    id?: number,
    pageURL?: string,
    views?: number,
    downloads?: number,
    likes?: number,
    comments?: number,
    user_id?: number,
    user?: string,
    userImageURL?: string
}