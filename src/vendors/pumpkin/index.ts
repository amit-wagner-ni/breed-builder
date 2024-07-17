import dogs from "../../mocks/pumpkin-dog.json";
import cats from "../../mocks/pumpkin-cat.json";
import {findClosestMatch} from "../../../find-closest-match";

export const addPumpkinVendor = (breeds: any) => {
    const petTypes = [dogs, cats];

    petTypes.forEach(petType => {
        petType.forEach(pet => {
            const closestMatch = findClosestMatch(pet.name, breeds[pet.species]);
            breeds[pet.species][closestMatch.name]['vendors']['pumpkin'] = pet;
        })
    });

    return breeds;
}