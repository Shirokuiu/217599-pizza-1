const valueMap = [
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
    value: {
      price: sauce.price,
      name: valueMap.find(({ name: nameMap }) => sauce.name === nameMap).value,
    },
    isChecked: index === 0,
  }));
