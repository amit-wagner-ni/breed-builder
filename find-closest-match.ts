import {GenericBreed, SpotBreed, SpotBreeds} from "./src/types";
import {distance} from "closest-match";
interface Result {
    name: string;
    distance: number;
    alias?: null | string;
}

export function findClosestMatch(input: string, breeds: any): Result {
    let closest: Result = { name: '', distance: Infinity };

    for (const breed in breeds) {
        // Check the name
        const nameDistance = distance(input, breeds[breed].metadata.name);
        if (nameDistance < closest.distance) {
            closest = { name: breeds[breed].metadata.name, distance: nameDistance };
        }

        // Check each alias
        for (const alias of breeds[breed].metadata.aliases) {
            if (typeof alias === 'string') {
                const aliasDistance = distance(input, alias);
                if (aliasDistance < closest.distance) {
                    closest = { name: breeds[breed].metadata.name, alias, distance: aliasDistance };
                }
            }
        }
    }

    if (closest.distance !== 0) {
        console.log({ input, name: closest.name, alias: closest.alias, distance: closest.distance })
    }
    return closest;
}