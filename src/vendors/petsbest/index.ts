import pets from '../../mocks/petsbest-pets.json';
import {findClosestMatch} from "../../../find-closest-match";

export const addPetsBestVendor = (breeds: any) => {
        pets.forEach(pet => {
            const closestMatch = findClosestMatch(pet.name, breeds[pet.species]);
            breeds[pet.species][closestMatch.name]['vendors']['pb'] = pet;
        })
    return breeds;
}