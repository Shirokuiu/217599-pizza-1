const sauceValueMap = [
  {
    name: "Томатный",
    value: "tomato",
  },
  {
    name: "Сливочный",
    value: "creamy",
  },
];
export const normalizeSauces = (sauces) =>
  sauces.map((sauce, index) => ({
    ...sauce,
    value: sauceValueMap.find(({ name }) => name === sauce.name).value,
    isChecked: index === 0,
  }));
