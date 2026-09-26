export type Cake = {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  weightOptions: string[];
  dietary: string[];
  image: string;
};

export const everydayCakes: Cake[] = [
  {
    id: "dutch-chocolate",
    name: "Dutch Chocolate",
    description: "Rich, dense chocolate sponge layered with smooth Belgian chocolate ganache.",
    basePrice: 450,
    weightOptions: ["0.5 kg", "1 kg"],
    dietary: ["100% Eggless"],
    image: "/cakes/dutch-chocolate-450.jpg"
  },
  {
    id: "red-velvet",
    name: "Classic Red Velvet",
    description: "Moist crimson sponge with our signature cream cheese frosting.",
    basePrice: 600,
    weightOptions: ["0.5 kg", "1 kg"],
    dietary: ["100% Eggless"],
    image: "/cakes/red-velvet-600.jpg"
  },
  {
    id: "black-forest",
    name: "Black Forest",
    description: "Classic chocolate sponge, fresh cream, and tart cherries.",
    basePrice: 400,
    weightOptions: ["0.5 kg", "1 kg"],
    dietary: ["100% Eggless"],
    image: "/cakes/black-forest-400.jpg"
  },
  {
    id: "fresh-mango",
    name: "Fresh Mango Cream",
    description: "Vanilla sponge layered with fresh Alphonso mangoes and light whipped cream.",
    basePrice: 550,
    weightOptions: ["0.5 kg", "1 kg"],
    dietary: ["100% Eggless"],
    image: "/cakes/fresh-mango-550.jpg"
  }
];

export const customFlavors = [
  { id: "dutch_chocolate", label: "Dutch Chocolate", basePrice: 450 },
  { id: "red_velvet", label: "Red Velvet", basePrice: 600 },
  { id: "black_forest", label: "Black Forest", basePrice: 400 },
  { id: "fresh_mango", label: "Fresh Mango", basePrice: 550 },
];
