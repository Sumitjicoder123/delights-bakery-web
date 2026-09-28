export type Cake = {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  weightOptions: string[];
  in_stock?: boolean;
  dietary: string[];
  image: string;
  category?: 'Daily Fresh' | 'Newly Launched' | 'Pastries' | 'Desserts' | string;
};

import cakesData from "./cakes.json";

export const everydayCakes: Cake[] = cakesData as Cake[];


export const customFlavors = [
  {
    "id": "blackforest",
    "label": "Black Forest",
    "basePrice": 400
  },
  {
    "id": "butterscotch-crunch",
    "label": "Butterscotch Crunch",
    "basePrice": 380
  },
  {
    "id": "chocho-bronze",
    "label": "Chocho Bronze",
    "basePrice": 350
  },
  {
    "id": "chocholate-crunch",
    "label": "Chocholate Crunch",
    "basePrice": 450
  },
  {
    "id": "chocholate-flex",
    "label": "Chocholate Flex",
    "basePrice": 450
  },
  {
    "id": "chocholate-truffle",
    "label": "Chocholate Truffle",
    "basePrice": 500
  },
  {
    "id": "choco-caremel",
    "label": "Choco Caremel",
    "basePrice": 380
  },
  {
    "id": "choco-chips",
    "label": "Choco Chips",
    "basePrice": 400
  },
  {
    "id": "choco-delight",
    "label": "Choco Delight",
    "basePrice": 380
  },
  {
    "id": "choco-excellent",
    "label": "Choco Excellent",
    "basePrice": 400
  },
  {
    "id": "choco-vanilla",
    "label": "Choco Vanilla",
    "basePrice": 300
  },
  {
    "id": "choco-zebra",
    "label": "Choco Zebra",
    "basePrice": 380
  },
  {
    "id": "fruit-delight",
    "label": "Fruit Delight",
    "basePrice": 500
  },
  {
    "id": "kitkatchoccholate",
    "label": "Kitkat Choccholate",
    "basePrice": 750
  },
  {
    "id": "melting-moment",
    "label": "Melting Moment",
    "basePrice": 550
  },
  {
    "id": "mud-chocholate",
    "label": "Mud Chocholate",
    "basePrice": 300
  },
  {
    "id": "nutella-chocholate",
    "label": "Nutella Chocholate",
    "basePrice": 500
  },
  {
    "id": "redvelvet",
    "label": "Red Velvet",
    "basePrice": 450
  },
  {
    "id": "royal-chocholate",
    "label": "Royal Chocholate",
    "basePrice": 750
  },
  {
    "id": "strawberry-chocholate",
    "label": "Strawberry Chocholate",
    "basePrice": 450
  },
  {
    "id": "whiteforest",
    "label": "White Forest",
    "basePrice": 400
  }
];
