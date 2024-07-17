export enum VENDORS {
    SPOT = 'spot',
    EMBRACE = 'embrace'
}

export enum SPECIES {
    DOG = 'Dog',
    CAT = 'Cat'
}


export type SpotBreeds = SpotBreed[]

export interface SpotBreed {
    species: string
    type: string
    name: string
    alias?: any
    aliases?: any[]
    maxAge: number
    code: string
}

export interface GenericBreed {
    aliases: string[]
    vendors: {
        [VENDORS.SPOT]: TransformedSpotBreed
    }
}

export interface TransformedSpotBreed {
    species: string
    type: string
    name: string
    alias?: string
    aliases: string[]
    maxAge: number
    code: string
}

export interface Alias {
    breedId: number
    alias: string
}