import pets from '../../mocks/embrace-pets.json';
import {findClosestMatch} from "../../../find-closest-match";

export const addEmbraceVendor = (breeds: any) => {
  for (const pet of pets) {
    const closestMatch = findClosestMatch(pet.name, breeds[pet.species]);
    breeds[pet.species][closestMatch.name]['vendors']['embrace'] = pet;
  }

  return breeds
}