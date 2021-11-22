const DoughClasses = [
  {
    name: "Тонкое",
    value: "light",
  },
  {
    name: "Толстое",
    value: "large",
  },
];

export const normalize = (doughs) =>
  doughs.map((dough, index) => ({
    ...dough,
    classMod: DoughClasses.find(({ name }) => name === dough.name).value,
    isChecked: index === 0,
    radioName: "dough",
  }));
