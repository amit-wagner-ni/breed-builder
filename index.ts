import axios from "axios";
import {SPECIES, SpotBreed, VENDORS} from "./src/types";
import * as fs from "fs";
import {addEmbraceVendor} from './src/vendors/embrace'
import {addPetsBestVendor} from "./src/vendors/petsbest";
import {addPumpkinVendor} from "./src/vendors/pumpkin";


const SKELETON: Record<string, any> = {
    [SPECIES.DOG]: {},
    [SPECIES.CAT]: {}
}

const buildBreedsFileFromSpot = async (species: SPECIES) => {
    const res = await axios.get(`https://dev-api.spotpetins.com/api/us/v1/values/breeds/${species}`);
    // const res = spotMock
    const breeds = res.data;

    breeds.forEach((breed: SpotBreed) => {
        SKELETON[breed.species][breed.name] = SKELETON[breed.species][breed.name] || {vendors: {}, metadata: {}};
        SKELETON[breed.species][breed.name]['metadata']['aliases'] = editAliases(breed);
        SKELETON[breed.species][breed.name]['metadata']['name'] = breed.name;

        if (breed && breed.aliases && breed.alias) {
            delete breed.aliases
            delete breed.alias
        }

        SKELETON[breed.species][breed.name]['vendors'][VENDORS.SPOT] = breed;
    }, SKELETON)
}

const editAliases = (breed: SpotBreed) => {
    if(breed.aliases) {
        const aliases = breed?.aliases && breed?.aliases.map(alias => alias.alias)
        const breeds = new Set([breed?.alias?.alias, ...aliases])
        return Array.from(breeds);
    }
}

const init = async () => {
    await buildBreedsFileFromSpot(SPECIES.DOG);
    await buildBreedsFileFromSpot(SPECIES.CAT);
    const skeletonWithVendor = addEmbraceVendor({...SKELETON});
    const skeletonWithPetsBestAswell = addPetsBestVendor({...skeletonWithVendor});
    const skeletonWithPumpkinAswell = addPumpkinVendor({...skeletonWithPetsBestAswell});
    fs.writeFile('breeds.json', JSON.stringify(SKELETON), (err) => {
        if (err) {
            console.error(err)
            return
        }
    })
}

init()