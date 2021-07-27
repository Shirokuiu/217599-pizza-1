const valueMap = [
  {
    name: "Тонкое",
    value: "light",
  },
  {
    name: "Толстое",
    value: "large",
  },
];

export const normalizeDoughs = (doughs) =>
  doughs.map((dough, index) => {
    return {
      ...dough,
      value: {
        price: dough.price,
        image: dough.image,
        name: valueMap.find(({ name: nameMap }) => dough.name === nameMap)
          .value,
      },
      isChecked: index === 0,
    };
  });
